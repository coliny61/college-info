// =============================================================================
// Social Authentication Service
// College Visit Platform
// =============================================================================
// Google and Apple sign-in via Firebase Auth.
// Buttons auto-hide when credentials are not configured.
// =============================================================================

import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { isFirebaseConfigured, auth, db } from './firebase';
import type { User } from '@/types';

// ---------------------------------------------------------------------------
// Availability checks
// ---------------------------------------------------------------------------

export function isGoogleSignInAvailable(): boolean {
  return isFirebaseConfigured && !!process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
}

export function isAppleSignInAvailable(): boolean {
  return isFirebaseConfigured && Platform.OS === 'ios';
}

// ---------------------------------------------------------------------------
// Google Sign-In
// ---------------------------------------------------------------------------

export async function signInWithGoogle(): Promise<User> {
  if (!auth) throw new Error('Firebase Auth not configured');

  const clientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  if (!clientId) throw new Error('Google Web Client ID not configured');

  const redirectUri = AuthSession.makeRedirectUri();
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const request = new AuthSession.AuthRequest({
    clientId,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
    responseType: AuthSession.ResponseType.IdToken,
  });

  const result = await request.promptAsync(discovery);

  if (result.type !== 'success' || !result.params.id_token) {
    throw new Error('Google sign-in cancelled or failed');
  }

  const credential = GoogleAuthProvider.credential(result.params.id_token);
  const userCred = await signInWithCredential(auth, credential);
  return ensureUserDoc(userCred.user);
}

// ---------------------------------------------------------------------------
// Apple Sign-In
// ---------------------------------------------------------------------------

export async function signInWithApple(): Promise<User> {
  if (!auth) throw new Error('Firebase Auth not configured');

  // Generate nonce
  const rawNonce = Crypto.getRandomBytes(32)
    .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    rawNonce,
  );

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  if (!appleCredential.identityToken) {
    throw new Error('Apple sign-in failed: no identity token');
  }

  const oauthProvider = new OAuthProvider('apple.com');
  const credential = oauthProvider.credential({
    idToken: appleCredential.identityToken,
    rawNonce,
  });

  const userCred = await signInWithCredential(auth, credential);

  // Apple only provides name on first sign-in
  const displayName = appleCredential.fullName
    ? [appleCredential.fullName.givenName, appleCredential.fullName.familyName]
        .filter(Boolean)
        .join(' ')
    : undefined;

  return ensureUserDoc(userCred.user, displayName);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function ensureUserDoc(
  fbUser: import('firebase/auth').User,
  displayNameOverride?: string,
): Promise<User> {
  if (!db) throw new Error('Firestore not configured');

  const userRef = doc(db, 'users', fbUser.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const displayName =
      displayNameOverride ?? fbUser.displayName ?? fbUser.email?.split('@')[0] ?? 'User';

    await setDoc(userRef, {
      email: fbUser.email ?? '',
      displayName,
      role: 'recruit',
      favorites: [],
      createdAt: serverTimestamp(),
    });

    return {
      id: fbUser.uid,
      email: fbUser.email ?? '',
      displayName,
      role: 'recruit',
      favorites: [],
      createdAt: new Date().toISOString(),
    };
  }

  const data = snap.data();
  return {
    id: fbUser.uid,
    email: fbUser.email ?? data.email ?? '',
    displayName: data.displayName ?? fbUser.displayName ?? '',
    role: data.role ?? 'recruit',
    favorites: data.favorites ?? [],
    linkedRecruitId: data.linkedRecruitId,
    schoolId: data.schoolId,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}
