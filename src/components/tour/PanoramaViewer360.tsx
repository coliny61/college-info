// =============================================================================
// PanoramaViewer360 - Three.js WebView-based 360 Viewer
// College Visit Platform
// =============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  Platform,
} from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { DARK_THEME } from '@/theme';
import { generate360Html } from './panorama360Html';
import type { ImageSourcePropType } from 'react-native';
import type { Hotspot } from '@/types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PanoramaViewer360Props {
  panoramaUrl: string;
  panoramaSource?: ImageSourcePropType;
  hotspots?: Hotspot[];
  onHotspotPress?: (hotspot: Hotspot) => void;
  schoolColor?: string;
  onError?: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PanoramaViewer360({
  panoramaUrl,
  panoramaSource,
  hotspots = [],
  onHotspotPress,
  schoolColor = DARK_THEME.accent,
  onError,
}: PanoramaViewer360Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let dataUri: string;

        if (panoramaSource) {
          // Resolve local asset to URI
          const resolved = Image.resolveAssetSource(panoramaSource);
          if (!resolved?.uri) throw new Error('Cannot resolve local asset');

          if (Platform.OS === 'web') {
            dataUri = resolved.uri;
          } else {
            // Read file as base64
            const base64 = await FileSystem.readAsStringAsync(resolved.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            dataUri = `data:image/jpeg;base64,${base64}`;
          }
        } else if (panoramaUrl) {
          // Download remote URL to local cache, then read as base64
          const cacheUri = FileSystem.cacheDirectory + 'panorama_temp.jpg';
          await FileSystem.downloadAsync(panoramaUrl, cacheUri);
          const base64 = await FileSystem.readAsStringAsync(cacheUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          dataUri = `data:image/jpeg;base64,${base64}`;
        } else {
          throw new Error('No panorama source provided');
        }

        if (cancelled) return;

        // Convert hotspots to 360 format (spread evenly if no lon/lat defined)
        const hotspots360 = hotspots.map((hs, index) => ({
          id: hs.id,
          label: hs.label,
          lon: (index * (360 / Math.max(hotspots.length, 1))) % 360,
          lat: 0,
        }));

        const htmlContent = generate360Html(dataUri, hotspots360, schoolColor);
        setHtml(htmlContent);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.warn('[PanoramaViewer360] Failed to load:', err);
        setFailed(true);
        setLoading(false);
        onError?.();
      }
    })();

    return () => { cancelled = true; };
  }, [panoramaUrl, panoramaSource, schoolColor]);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === 'hotspot' && data.id && onHotspotPress) {
          const hotspot = hotspots.find((h) => h.id === data.id);
          if (hotspot) onHotspotPress(hotspot);
        }
      } catch {
        // Ignore malformed messages
      }
    },
    [hotspots, onHotspotPress],
  );

  if (failed) return null;

  if (loading || !html) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={schoolColor} />
        <Text style={styles.loadingText}>Preparing 360{'\u00B0'} view...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
        onError={() => { setFailed(true); onError?.(); }}
        scrollEnabled={false}
        bounces={false}
        allowsInlineMediaPlayback
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg900,
  },
  loadingText: {
    color: DARK_THEME.bg300,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
});
