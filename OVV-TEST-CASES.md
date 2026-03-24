# OVV — Comprehensive Test Cases

**Version:** 1.0
**Date:** March 23, 2026

This document contains test cases organized by feature area. Each test case includes a description, preconditions, steps, and expected result. Use these when implementing each feature to ensure correctness.

---

## TC-1: Authentication & User Management

### TC-1.1: Standard Recruit Signup
- **Precondition:** User is not logged in.
- **Steps:**
  1. Navigate to `/register`.
  2. Enter valid email, password (8+ chars), and display name.
  3. Submit form.
- **Expected:** User is created in Supabase Auth. User record is synced to Prisma `users` table with `role: recruit`. User is redirected to onboarding wizard.

### TC-1.2: Signup with Existing Email
- **Precondition:** Email `test@example.com` already registered.
- **Steps:**
  1. Navigate to `/register`.
  2. Enter `test@example.com` with a password.
  3. Submit.
- **Expected:** Error message "An account with this email already exists." No duplicate user created.

### TC-1.3: Login
- **Precondition:** User exists with email `recruit@test.com`.
- **Steps:**
  1. Navigate to `/login`.
  2. Enter email + password.
  3. Submit.
- **Expected:** User is authenticated. Redirect to `/recruit` (dashboard) if recruit, `/admin` if coach_admin.

### TC-1.4: Login with Wrong Password
- **Steps:**
  1. Navigate to `/login`.
  2. Enter valid email + wrong password.
  3. Submit.
- **Expected:** Error message "Invalid email or password." Not logged in.

### TC-1.5: Route Protection — Recruit Routes
- **Precondition:** User is not logged in.
- **Steps:** Navigate to `/recruit/schools`.
- **Expected:** Redirect to `/login`.

### TC-1.6: Route Protection — Admin Routes
- **Precondition:** User is logged in as `recruit`.
- **Steps:** Navigate to `/admin`.
- **Expected:** Redirect to `/recruit` or show 403 error.

### TC-1.7: Route Protection — Coach Accessing Recruit Pages
- **Precondition:** User is logged in as `coach_admin`.
- **Steps:** Navigate to `/recruit/schools`.
- **Expected:** Redirect to `/admin` or show 403 error.

### TC-1.8: Logout
- **Steps:** Click logout button in navigation.
- **Expected:** Session destroyed. User redirected to landing page. Cannot access protected routes.

---

## TC-2: Onboarding Wizard

### TC-2.1: Complete Required Fields Only
- **Precondition:** New recruit user, redirected to onboarding.
- **Steps:**
  1. Select sport: "Football".
  2. Select graduation year: "2027".
  3. Leave all other fields empty.
  4. Click "Continue" / "Finish".
- **Expected:** Profile saved with sport + grad year. Profile completeness = 20%. User redirected to dashboard. Completeness bar shows 20% with "Complete your profile so coaches can find you."

### TC-2.2: Complete All Fields
- **Steps:** Fill in sport, grad year, position, height, weight, GPA, SAT, ACT, high school, city, state, bio, highlights URL.
- **Expected:** Profile completeness = 100%. Bar shows "Profile complete — you're ready."

### TC-2.3: Skip Without Required Fields
- **Steps:** Try to proceed without selecting sport or grad year.
- **Expected:** Validation error. Cannot proceed. Fields highlighted in red.

### TC-2.4: Transfer Recruit Type
- **Steps:**
  1. Select recruit type: "Transfer".
  2. Fill in required fields.
  3. Observe additional fields appear: current school, college stats, eligibility remaining, transfer reason.
  4. Fill in transfer fields.
  5. Submit.
- **Expected:** RecruitProfile saved with `recruitType: "transfer"`, `currentSchool`, `collegeStats`, `eligibilityYears` populated.

### TC-2.5: Profile Completeness Calculation
- **Steps:** Fill in only sport (10%) + grad year (10%) + position (10%).
- **Expected:** Completeness = 30%. Bar shows "You're getting there — add your stats."

---

## TC-3: Invite Link System

### TC-3.1: Generate Invite Link (Coach)
- **Precondition:** Logged in as coach_admin for School A.
- **Steps:**
  1. Navigate to `/admin/invites`.
  2. Click "Generate Invite Link".
  3. Optionally set expiration date.
  4. Click "Create".
- **Expected:** New InviteLink record created with unique code, schoolId = School A, createdBy = coach user. Link displayed in format: `ovv.com/invite/CODE`.

### TC-3.2: Recruit Uses Valid Invite Link
- **Precondition:** Valid invite link exists for School A, not expired.
- **Steps:**
  1. Navigate to `/invite/VALID_CODE`.
  2. Complete signup.
  3. Complete onboarding.
- **Expected:** User created with invite association. InviteLink.usedCount incremented by 1. User sees personalized welcome screen for School A (school branding, coach photo, welcome message).

### TC-3.3: Recruit Uses Expired Invite Link
- **Precondition:** Invite link with `expiresAt` in the past.
- **Steps:** Navigate to `/invite/EXPIRED_CODE`.
- **Expected:** Error message "This invite link has expired. Please contact your coach for a new link." User can still sign up normally via `/register`.

### TC-3.4: Recruit Uses Invalid Invite Code
- **Steps:** Navigate to `/invite/INVALID_CODE`.
- **Expected:** Error message "Invalid invite link." Option to sign up normally.

### TC-3.5: Existing User Uses Invite Link
- **Precondition:** User already has an account.
- **Steps:**
  1. Navigate to `/invite/VALID_CODE`.
  2. User is prompted to log in.
  3. Log in.
- **Expected:** User is tagged with the invite school. Sees welcome screen. usedCount incremented.

### TC-3.6: Deactivate Invite Link (Coach)
- **Steps:**
  1. Navigate to `/admin/invites`.
  2. Click "Deactivate" on an active link.
- **Expected:** Link is deactivated. Recruits visiting the link see "This invite is no longer active."

### TC-3.7: Bulk Generate Invite Links
- **Steps:**
  1. Click "Bulk Generate".
  2. Enter quantity: 25.
  3. Set expiration: 30 days from now.
  4. Submit.
- **Expected:** 25 unique invite links generated. All share the same expiration. All visible in the invite list.

---

## TC-4: Personalized Welcome Screen

### TC-4.1: Welcome Screen Renders Correctly
- **Precondition:** Recruit signed up via invite for School A. School A has logo, primary color #841617, coach photo, welcome video, and welcome message.
- **Steps:** After onboarding, observe the welcome screen.
- **Expected:** Page background uses School A primary color. School logo displayed. Coach photo and name/title shown. Welcome video embedded and playable. Welcome message text displayed. "Start Your Visit" button visible.

### TC-4.2: Click "Start Your Visit"
- **Steps:** Click "Start Your Visit" on welcome screen.
- **Expected:** Navigate to `/recruit/school/[school-slug]`. Analytics event tracked: `welcome.view_welcome`.

### TC-4.3: Welcome Video Plays
- **Steps:** Click play on welcome video.
- **Expected:** Video plays. Analytics event tracked: `welcome.play_welcome_video` with duration.

### TC-4.4: No Welcome Video Uploaded
- **Precondition:** School A has no welcome video.
- **Expected:** Welcome screen shows branded card without video section. No broken video player.

### TC-4.5: Custom Welcome Message Per Invite
- **Precondition:** Invite link has a custom `welcomeMessage` set.
- **Expected:** The custom message is displayed instead of the school's default welcome message.

---

## TC-5: School Browsing & Filters

### TC-5.1: Browse Schools Page Loads
- **Steps:** Navigate to `/recruit/schools`.
- **Expected:** Grid of school cards rendered. Each card shows logo, name, mascot, conference, city/state, primary color accent.

### TC-5.2: Filter by Conference
- **Steps:**
  1. Open conference filter dropdown.
  2. Select "Big 12".
- **Expected:** Only Big 12 schools shown. Other schools hidden.

### TC-5.3: Filter by State
- **Steps:** Select state: "Oklahoma".
- **Expected:** Only Oklahoma schools shown.

### TC-5.4: Multiple Filters Combined
- **Steps:** Select conference: "Big 12" + state: "Texas".
- **Expected:** Only schools that are both Big 12 AND in Texas shown.

### TC-5.5: Search by Name
- **Steps:** Type "Texas Tech" in search bar.
- **Expected:** Only Texas Tech Red Raiders shown. Partial matches work (typing "Tech" shows Texas Tech).

### TC-5.6: No Results
- **Steps:** Search for "XYZNOTASCHOOL".
- **Expected:** "No schools match your filters" message. Option to clear filters.

### TC-5.7: Sort Alphabetically
- **Steps:** Select sort: "Alphabetical".
- **Expected:** Schools ordered A-Z by name.

---

## TC-6: School Detail Page — Immersive Experience

### TC-6.1: Page Loads with School Branding
- **Precondition:** School has colorPrimary: "#841617", colorSecondary: "#000000", colorAccent: "#FFFFFF".
- **Steps:** Navigate to `/recruit/school/texas-tech`.
- **Expected:** Page background, headers, buttons, and accents use Texas Tech red. CSS custom properties `--school-primary`, `--school-secondary`, `--school-accent` are set.

### TC-6.2: Sticky Section Navigator Renders
- **Expected:** A floating nav with icons/labels for each section (Tour, Football, Academics, NIL, Roster, Alumni, Jersey Room, Video). On desktop: fixed to the side. On mobile: fixed to bottom.

### TC-6.3: Section Navigator Highlights Current Section
- **Steps:** Scroll to the Academics section.
- **Expected:** "Academics" item in the sticky nav is highlighted/active. Other items are not.

### TC-6.4: Section Navigator Click Scrolls to Section
- **Steps:** Click "NIL" in the sticky nav.
- **Expected:** Page smooth-scrolls to the NIL section. NIL becomes the highlighted item.

### TC-6.5: School Header Displays Correctly
- **Expected:** School logo (large), name + mascot, conference badge, city/state, favorite button (heart). Background gradient using school primary color.

### TC-6.6: Analytics: Page View Tracked
- **Expected:** On page load, an analytics event `school.page_view` is queued with `schoolId`.

### TC-6.7: Dark Mode School Branding
- **Steps:** Switch to dark mode. View a school page.
- **Expected:** School colors still applied but adjusted for dark background. Text remains readable. Sufficient contrast on all elements.

---

## TC-7: 360° Virtual Tour

### TC-7.1: Panorama Viewer Loads (Spherical)
- **Precondition:** Facility has a panoramaUrl pointing to an equirectangular image.
- **Steps:** Scroll to Tour section. First POI loads.
- **Expected:** True 360° spherical viewer renders. User can drag to look in all directions (not just pan a flat image). Zoom in/out works.

### TC-7.2: Hotspot Navigation
- **Precondition:** Locker room panorama has a hotspot linked to weight room.
- **Steps:** Click the hotspot arrow in the locker room panorama.
- **Expected:** Smooth transition to weight room panorama. Analytics event: `tour.navigate_poi` with fromFacilityId and toFacilityId.

### TC-7.3: Thumbnail Strip Navigation
- **Steps:** Click the "Weight Room" thumbnail in the bottom strip.
- **Expected:** Viewer transitions to weight room panorama. Thumbnail is highlighted as active.

### TC-7.4: Mini Map Navigation
- **Steps:** Click the weight room pin on the mini campus map.
- **Expected:** Viewer transitions to weight room. Pin is highlighted on map.

### TC-7.5: Expand Mini Map to Full Screen
- **Steps:** Click expand button on mini map.
- **Expected:** Map overlay expands to full screen. All POI pins visible. Click a pin to navigate. Click close to return to panorama.

### TC-7.6: Hotspot Info Popup
- **Steps:** Click a hotspot label (not a navigation arrow) within a panorama.
- **Expected:** Popup with hotspot label and description appears. Click outside to dismiss.

### TC-7.7: Duration Tracking Per POI
- **Steps:**
  1. View locker room panorama for 15 seconds.
  2. Navigate to weight room.
  3. View for 10 seconds.
- **Expected:** Two analytics events: `tour.view_panorama` for locker room (duration ~15000ms) and weight room (duration ~10000ms).

### TC-7.8: 360° Video Playback
- **Precondition:** Facility has `panoramaType: "video"` and a `videoUrl`.
- **Steps:** Navigate to that facility.
- **Expected:** 360° video plays in the spherical viewer. Standard video controls (play, pause, scrub). Can look around while video plays.

### TC-7.9: Fullscreen Mode
- **Steps:** Click fullscreen button on panorama viewer.
- **Expected:** Viewer goes fullscreen. All navigation (hotspots, thumbnails, map) still accessible. ESC or button to exit.

### TC-7.10: Mobile Gyroscope
- **Precondition:** Mobile device with gyroscope.
- **Steps:** Open panorama viewer on mobile.
- **Expected:** Device rotation controls the view direction. Touch drag still works as fallback.

### TC-7.11: Autorotate on Idle
- **Steps:** Open a panorama. Don't interact for 5 seconds.
- **Expected:** Panorama slowly auto-rotates. Any user interaction stops autorotate.

### TC-7.12: No Panorama Available
- **Precondition:** School has no facilities with panoramaUrl.
- **Expected:** Tour section shows a placeholder: "360° tour coming soon" with a campus photo or map.

---

## TC-8: Football Section

### TC-8.1: Head Coach Card
- **Expected:** Large card with photo, name, title, career record, years at school, championships, awards, NFL players developed count.

### TC-8.2: Assistant Coaches Grid
- **Expected:** Grid of coach cards with photo, name, title, bio (truncated), years at school. Click to expand full bio.

### TC-8.3: Coach Bio Analytics Tracking
- **Steps:** Click on an assistant coach to view full bio. Read for 8 seconds.
- **Expected:** Analytics event: `football.view_coach_bio` with `coachId`, `coachName`, `duration: ~8000`.

### TC-8.4: Offensive Scheme Display
- **Precondition:** School's football sport has `offensiveScheme: "Air Raid"` and `offenseDescription` filled.
- **Expected:** Scheme name displayed prominently. Description paragraph below.

### TC-8.5: Defensive Scheme Display
- **Same as TC-8.4** but for defensive scheme.

### TC-8.6: Scheme View Tracking
- **Steps:** Scroll to and view the offensive scheme section for 5 seconds.
- **Expected:** Analytics: `football.view_scheme` with `schemeType: "offense"`, `duration: ~5000`.

### TC-8.7: Roster Display
- **Expected:** Table or card grid showing all roster players. Columns: name, number, position, height, weight, year, hometown, photo. Starter badge on starters.

### TC-8.8: Roster Filter by Position
- **Steps:** Select "QB" from position filter.
- **Expected:** Only QBs shown.

### TC-8.9: Performance Stats
- **Expected:** Current record, conference standing, ranking (if any), recent bowl games listed.

---

## TC-9: Academics Section

### TC-9.1: Athlete-Specific Stats at Top
- **Expected:** First thing visible: athlete graduation rate, academic support description, tutoring hours, study hall requirements, student-to-faculty ratio. These appear BEFORE general academic stats.

### TC-9.2: School-Wide Stats
- **Expected:** Enrollment, admission rate, avg SAT/ACT, tuition in/out state, graduation rate, median earnings, retention rate, ranking.

### TC-9.3: College Drill-Down
- **Steps:** Click on "Spears School of Business" in the colleges list.
- **Expected:** Expands to show college description, total students, image, and list of majors within that college.

### TC-9.4: Major Detail
- **Steps:** Click on "Finance" major.
- **Expected:** Major description, degree type, degree pathway (year 1-4 courses), career outcomes (job titles, salaries, growth rates).

### TC-9.5: Analytics Tracking for Academics
- **Steps:** View the academics section for 20 seconds. Click into a specific college. Click into a specific major.
- **Expected:** Events: `academics.view_section` (duration 20s), `academics.view_college`, `academics.view_major`.

---

## TC-10: NIL Section

### TC-10.1: All Fields Public
- **Precondition:** All NIL field visibility set to "public".
- **Expected:** All fields visible to any recruit: collective name, total budget, football spend, all-sports spend, average deal size, notable deals, description.

### TC-10.2: Invite-Only Fields — Non-Invited Recruit
- **Precondition:** `notableDeals` visibility set to "invite_only". Recruit was NOT invited by this school.
- **Expected:** Notable deals section hidden. Other public fields visible.

### TC-10.3: Invite-Only Fields — Invited Recruit
- **Precondition:** Same as TC-10.2 but recruit WAS invited by this school.
- **Expected:** Notable deals section IS visible.

### TC-10.4: Hidden Fields
- **Precondition:** `totalBudget` visibility set to "hidden".
- **Expected:** Total budget not shown to ANY recruit.

### TC-10.5: Coach Updates Visibility
- **Steps:** Coach navigates to NIL settings. Toggles `totalBudget` from "public" to "invite_only". Saves.
- **Expected:** Change persisted. Non-invited recruits no longer see total budget.

### TC-10.6: Duration Tracking
- **Steps:** Recruit views NIL section for 3 minutes.
- **Expected:** Analytics: `nil.view_section` with `duration: ~180000`.

---

## TC-11: Jersey Builder

### TC-11.1: Load Jersey Assets
- **Precondition:** School has jersey assets (3 helmets, 3 jerseys, 3 pants).
- **Steps:** Navigate to jersey room section.
- **Expected:** Asset selector shows helmet options, jersey options, pants options. First option of each is selected by default. Canvas/preview shows the combo.

### TC-11.2: Change Helmet Selection
- **Steps:** Click a different helmet color option.
- **Expected:** Preview immediately updates to show the new helmet with current jersey + pants.

### TC-11.3: Save Combo
- **Precondition:** Recruit is logged in.
- **Steps:** Build a combo. Click "Save".
- **Expected:** JerseySelection record created (userId, schoolId, helmetId, jerseyId, pantsId). Toast notification: "Jersey combo saved!" Analytics: `jersey.save_combo`.

### TC-11.4: Coach Sees Jersey Save
- **Steps:** After recruit saves a combo, coach opens their analytics dashboard.
- **Expected:** Recent activity shows "[Recruit Name] saved a jersey combo." Recruit's engagement score includes the +15 for jersey save.

### TC-11.5: Download as Image
- **Steps:** Click "Share" → "Download Image".
- **Expected:** PNG file downloads showing the jersey combo composited together with school logo and OVV branding.

### TC-11.6: Share to Twitter/X
- **Steps:** Click "Share" → Twitter/X button.
- **Expected:** Twitter share dialog opens with pre-filled text ("Check out my jersey combo at [School Name] on @OVV!") and the shareable URL. Image is attached via OG tags.

### TC-11.7: Shareable URL with OG Preview
- **Steps:** Copy the shareable link. Paste in a messaging app or social media.
- **Expected:** Rich preview shows: jersey combo image, "My Jersey Combo — [School Name]", "Built on OVV — Official Virtual Visit". URL format: `ovv.com/jersey/[uniqueId]`.

### TC-11.8: Share Analytics
- **Steps:** Click each share option.
- **Expected:** Analytics events: `jersey.share_combo` with metadata `{ platform: "download" }`, `{ platform: "twitter" }`, etc.

### TC-11.9: No Jersey Assets
- **Precondition:** School has no jersey assets.
- **Expected:** Jersey Room section shows: "Jersey builder coming soon for [School Name]."

---

## TC-12: Video & Media

### TC-12.1: Coach Intro Video
- **Precondition:** School has a coach intro video uploaded for the head coach.
- **Expected:** Video appears in the coaching staff section. Shows coach name + "Welcome Message" label. Playable.

### TC-12.2: Highlight Reel
- **Precondition:** School has a highlight reel video.
- **Expected:** Video appears in the Video & Media section under "Highlights". Embedded player with controls. Autoplay off.

### TC-12.3: Day-in-the-Life Content
- **Precondition:** School has day-in-the-life videos from current players.
- **Expected:** Video gallery showing player name, thumbnail. Click to play.

### TC-12.4: Video Duration Tracking
- **Steps:** Play a highlight video for 45 seconds, then pause.
- **Expected:** Analytics: `video.view_highlight` with `duration: ~45000`.

### TC-12.5: No Videos
- **Precondition:** School has no videos.
- **Expected:** Video & Media section either hidden or shows "Videos coming soon."

---

## TC-13: Favorites

### TC-13.1: Add Favorite
- **Steps:** On a school detail page, click the heart icon.
- **Expected:** Heart fills in / turns solid. Favorite record created in DB. Analytics: `school.favorite`.

### TC-13.2: Remove Favorite
- **Steps:** Click the filled heart icon.
- **Expected:** Heart becomes outline again. Favorite record deleted. Analytics: `school.unfavorite`.

### TC-13.3: View Favorites Page
- **Steps:** Navigate to `/recruit/favorites`.
- **Expected:** Grid of school cards for all favorited schools. Each card shows school info + remove button.

### TC-13.4: Favorite Persists Across Sessions
- **Steps:** Favorite a school. Log out. Log back in. Visit favorites page.
- **Expected:** School still favorited.

### TC-13.5: No Favorites
- **Expected:** "You haven't favorited any schools yet. Browse schools to get started." with link to school browsing.

---

## TC-14: Recruit Profile

### TC-14.1: Edit Profile
- **Steps:**
  1. Navigate to `/recruit/profile`.
  2. Change position from "QB" to "WR".
  3. Save.
- **Expected:** Profile updated. Position now shows "WR". Profile completeness recalculated.

### TC-14.2: Profile Completeness Updates
- **Steps:** Add GPA (was empty). Save.
- **Expected:** Profile completeness increases by 10%.

### TC-14.3: Upload Profile Photo
- **Steps:** Click photo upload. Select a JPG under 10MB. Upload.
- **Expected:** Photo uploaded to storage. profilePhotoUrl updated. Photo displayed on profile.

### TC-14.4: Invalid File Upload
- **Steps:** Try to upload a 15MB file.
- **Expected:** Error: "File too large. Maximum 10MB."

---

## TC-15: Coach Dashboard & Analytics

### TC-15.1: Dashboard Overview Cards
- **Precondition:** Coach has invited 20 recruits. 12 have visited. Total engagement time is 340 minutes.
- **Expected:** Cards show: "20 Invited Recruits", "12 Visited", "340 min Total Engagement", "Top Recruit: [Name] (Score: 87)".

### TC-15.2: Activity Feed
- **Expected:** Chronological list of recent recruit activities on the coach's school page. Most recent first.

### TC-15.3: Engagement Table Sorting
- **Steps:** Click "Engagement Score" column header.
- **Expected:** Table sorted by engagement score descending. Highest scores first.

### TC-15.4: Engagement Score Accuracy
- **Precondition:** Recruit A has: 10 min total time, visited 5 sections, drilled into 3 sub-items, favorited school, saved jersey combo.
- **Expected:** Score calculated as: Time (30% * normalized_time) + Diversity (20% * 5/7) + Depth (20% * depth_score) + Intent (30% * (15 + 15) / max_intent). Score should be in 70-90 range.

### TC-15.5: AI Insight Generation
- **Precondition:** Recruit B has engagement score > 25. Spent most time on NIL (5 min) and Academics (3 min). Explored "Finance" major.
- **Steps:** View recruit B's detail panel. Click "View Insight".
- **Expected:** AI-generated text: similar to "[Name] spent [X] minutes on your program, focusing primarily on NIL and Academics. They explored the Finance major in the Spears Business School. Suggestion: During their in-person visit, connect them with your NIL collective leadership and arrange a business school tour."

### TC-15.6: Recruit Detail — Section Breakdown
- **Steps:** Click on a recruit in the engagement table.
- **Expected:** Side panel opens with: bar chart of time per section, list of specific content engaged, session timeline with timestamps.

### TC-15.7: CSV Export
- **Steps:** Click "Export" button on analytics dashboard.
- **Expected:** CSV file downloads with columns: recruit name, email, position, grad year, total time, sections viewed, engagement score, last visit date.

### TC-15.8: Analytics Scoped to School
- **Precondition:** Coach A manages School A. Recruit visited both School A and School B.
- **Expected:** Coach A only sees analytics for recruit's activity on School A. No visibility into School B data.

---

## TC-16: Recruit CRM

### TC-16.1: Add Tag to Recruit
- **Steps:**
  1. Open recruit detail panel.
  2. Type tag: "Top Target".
  3. Press enter.
- **Expected:** Tag saved. Appears as a badge on the recruit's row in the table.

### TC-16.2: Remove Tag
- **Steps:** Click "x" on a tag badge.
- **Expected:** Tag removed from recruit.

### TC-16.3: Add Note
- **Steps:**
  1. Open recruit detail.
  2. Type note: "Spoke with his HS coach, very interested in our program."
  3. Submit.
- **Expected:** Note saved with timestamp. Appears in notes list on recruit detail. Coach name attached.

### TC-16.4: Multiple Notes Chronological
- **Steps:** Add 3 notes at different times.
- **Expected:** Notes displayed in reverse chronological order (newest first). Each shows timestamp and content.

### TC-16.5: Create Recruit List
- **Steps:**
  1. Navigate to `/admin/lists`.
  2. Click "Create List".
  3. Name: "Top 2027 Targets".
  4. Save.
- **Expected:** List created. Appears in lists page.

### TC-16.6: Add Recruit to List
- **Steps:**
  1. Open recruit detail.
  2. Click "Add to List".
  3. Select "Top 2027 Targets".
- **Expected:** Recruit added to list. Appears in list view.

### TC-16.7: Update Recruit Status
- **Steps:**
  1. Open recruit detail.
  2. Change status from "Invited" to "Engaged".
- **Expected:** Status updated. Status badge changes color/label in the engagement table.

### TC-16.8: Filter Engagement Table by Tag
- **Steps:** Click tag "Top Target" to filter.
- **Expected:** Only recruits with "Top Target" tag shown.

### TC-16.9: Filter by Status
- **Steps:** Select status filter: "Engaged".
- **Expected:** Only recruits with status "Engaged" shown.

---

## TC-17: Recruit Search (Coach)

### TC-17.1: Search by Position
- **Steps:** In `/admin/recruits/search`, select position: "QB".
- **Expected:** All recruits with position "QB" shown, regardless of whether they were invited.

### TC-17.2: Search by Graduation Year
- **Steps:** Select grad year: "2027".
- **Expected:** Only 2027 recruits shown.

### TC-17.3: Combined Filters
- **Steps:** Position: "WR", State: "Texas", Grad Year: "2027".
- **Expected:** Only Texas WRs in the 2027 class shown.

### TC-17.4: Send Invite from Search
- **Steps:** Click "Send Invite" on a recruit in search results.
- **Expected:** Invite link generated for this coach's school. Option to copy link.

### TC-17.5: Full Profile Visible
- **Steps:** Click on a recruit from search results.
- **Expected:** Full profile displayed: name, position, height/weight, GPA, test scores, high school, bio, highlights URL.

### TC-17.6: No Results
- **Steps:** Filter by position "K" (punter) + state "Alaska".
- **Expected:** "No recruits match your filters." message.

---

## TC-18: Program Manager (Coach)

### TC-18.1: Edit School Description
- **Steps:**
  1. Navigate to `/admin/program`.
  2. Edit description field.
  3. Save.
- **Expected:** Description updated in DB. Reflected on the public school page.

### TC-18.2: Upload School Logo
- **Steps:** Upload a PNG logo image.
- **Expected:** Logo stored. Displayed on school pages and cards.

### TC-18.3: Manage Facilities — Add POI
- **Steps:**
  1. Navigate to `/admin/program/facilities`.
  2. Click "Add Facility".
  3. Fill in: name "Players' Lounge", type "lounge", description, upload 360° photo.
  4. Save.
- **Expected:** Facility created. Appears in the 360° tour for this school.

### TC-18.4: Manage Facilities — Add Hotspot
- **Steps:**
  1. Open an existing facility.
  2. Click "Add Hotspot".
  3. Set position (x, y), label, description, linked facility ID.
  4. Save.
- **Expected:** Hotspot appears in the panorama viewer at the correct position.

### TC-18.5: Manage Roster — Add Player
- **Steps:**
  1. Navigate to `/admin/program/roster`.
  2. Click "Add Player".
  3. Fill in all fields.
  4. Save.
- **Expected:** Player added to roster. Visible on school page.

### TC-18.6: Manage Roster — Mark Starter
- **Steps:** Toggle "Starter" on a player.
- **Expected:** Player shows starter badge on the school page. Appears first in sorted roster.

### TC-18.7: Manage Videos — Add Highlight Reel
- **Steps:**
  1. Navigate to `/admin/program/videos`.
  2. Click "Add Video".
  3. Type: "Highlight Reel". Title, description, URL.
  4. Save.
- **Expected:** Video added. Appears in Video & Media section of school page.

### TC-18.8: Manage NIL Visibility
- **Steps:**
  1. Navigate to `/admin/program/nil`.
  2. Toggle `totalBudget` from "public" to "hidden".
  3. Save.
- **Expected:** Total budget no longer visible to any recruit on the school page.

### TC-18.9: Set Welcome Video
- **Steps:** Upload a welcome video (MP4, under 2 min).
- **Expected:** Video stored. Plays on the personalized welcome screen for invited recruits.

### TC-18.10: Set Default Welcome Message
- **Steps:** Type a welcome message. Save.
- **Expected:** Message displayed on welcome screen for all invited recruits (unless overridden per invite).

---

## TC-19: Analytics Tracking System

### TC-19.1: Event Batching
- **Steps:** Perform 5 quick actions on a school page (click hotspot, switch sections, etc.).
- **Expected:** Events queued client-side. NOT immediately sent. Sent on next flush (30s timer or batch size 50).

### TC-19.2: Flush on Batch Size
- **Steps:** Perform 50+ quick actions.
- **Expected:** Once queue hits 50, immediate flush via POST to `/api/analytics/track`.

### TC-19.3: Flush on Page Unload
- **Steps:** Perform 3 actions. Close the browser tab.
- **Expected:** Events flushed via `navigator.sendBeacon` before page closes.

### TC-19.4: Duration Heartbeat Tracking
- **Steps:** View a section for 30 seconds.
- **Expected:** Heartbeat ping events sent every 10 seconds (3 events). Duration accumulated server-side.

### TC-19.5: Failed Flush Re-Queue
- **Steps:** Simulate a network failure during flush.
- **Expected:** Events re-queued. Attempted again on next flush cycle.

### TC-19.6: Session ID Consistency
- **Steps:** Perform actions across multiple pages in the same browser session.
- **Expected:** All events share the same sessionId. New session on new browser open.

### TC-19.7: Intersection Observer Duration
- **Steps:** Scroll the Academics section into view. Wait 5 seconds. Scroll away.
- **Expected:** `academics.view_section` event with `duration: ~5000`.

### TC-19.8: Video Watch Time
- **Steps:** Play a video for 20 seconds. Pause. Play for 10 more seconds. Navigate away.
- **Expected:** Total watch time tracked: ~30 seconds. Single event with accumulated duration.

---

## TC-20: Responsive / Mobile

### TC-20.1: School Page on Mobile (375px)
- **Steps:** View school detail page on 375px width device.
- **Expected:** All sections stack vertically. No horizontal overflow. Images scale. Text is readable. Sticky nav moves to bottom.

### TC-20.2: 360° Viewer on Mobile
- **Expected:** Full-width viewer. Touch drag to look around. Pinch to zoom. Fullscreen available.

### TC-20.3: Jersey Builder on Mobile
- **Expected:** Asset selector scrolls horizontally. Preview visible. Save/share buttons accessible.

### TC-20.4: Coach Dashboard on Mobile
- **Expected:** Tables scroll horizontally. Cards stack. Charts resize.

### TC-20.5: Navigation on Mobile
- **Expected:** Hamburger menu or bottom nav. All routes accessible.

---

## TC-21: Dark Mode

### TC-21.1: System Preference Detected
- **Precondition:** OS set to dark mode.
- **Steps:** Open OVV for the first time.
- **Expected:** App renders in dark mode automatically.

### TC-21.2: Manual Toggle
- **Steps:** Click theme toggle. Switch from dark to light.
- **Expected:** Entire app switches to light mode. Preference persisted.

### TC-21.3: School Colors in Dark Mode
- **Precondition:** School primary color is bright red (#CC0000).
- **Steps:** View school page in dark mode.
- **Expected:** Red is used as accents on dark background. Text on red backgrounds is white and readable. Sufficient contrast (WCAG AA).

### TC-21.4: School Colors in Light Mode
- **Same school.**
- **Expected:** Red used as accents on light background. Text on red backgrounds is white. Light mode backgrounds are white/gray, not overwhelming.

---

## TC-22: Error Handling

### TC-22.1: School Not Found
- **Steps:** Navigate to `/recruit/school/nonexistent-slug`.
- **Expected:** 404 page with "School not found" message. Link back to browse schools.

### TC-22.2: API Error on School Load
- **Steps:** Simulate DB connection failure.
- **Expected:** Error boundary catches. User sees "Something went wrong. Please try again." with retry button.

### TC-22.3: Analytics API Failure
- **Steps:** Analytics track endpoint returns 500.
- **Expected:** Events re-queued silently. No user-visible error. Retry on next flush.

### TC-22.4: Unauthorized API Access
- **Steps:** Call `/api/admin/dashboard` without auth.
- **Expected:** 401 Unauthorized response.

### TC-22.5: Coach Accessing Wrong School
- **Precondition:** Coach for School A calls `/api/admin/recruits` for School B.
- **Expected:** 403 Forbidden. Only own school data accessible.

---

## TC-23: Performance

### TC-23.1: School Page Load Time
- **Expected:** Full school detail page (including all data) loads in < 3 seconds on 4G connection.

### TC-23.2: 360° Panorama Load
- **Expected:** First panorama image loads and renders in < 5 seconds. Subsequent panoramas preloaded in background.

### TC-23.3: Analytics Batch Insert
- **Expected:** Batch of 50 events inserted in < 500ms.

### TC-23.4: Dashboard Query Performance
- **Precondition:** 500 invited recruits, 50,000 analytics events.
- **Expected:** Dashboard loads in < 2 seconds. Engagement scores pre-computed, not calculated on every request.

---

## TC-24: Landing Page (Marketing)

### TC-24.1: Dual-Audience Messaging
- **Expected:** Landing page speaks to both recruits ("Explore any program from home") and coaches ("See what your recruits care about"). Clear CTAs for each audience.

### TC-24.2: School Preview Cards
- **Expected:** Featured schools shown with limited info. "Sign up to explore" CTA.

### TC-24.3: Pricing Section
- **Expected:** Tier comparison table with clear feature differentiation. No free tier shown.

### TC-24.4: CTA Routing
- **Steps:** Click "I'm a Recruit" CTA.
- **Expected:** Navigate to `/register`.
- **Steps:** Click "I'm a Coach" CTA.
- **Expected:** Navigate to a contact/demo request form or `/register` with coach flow.

---
