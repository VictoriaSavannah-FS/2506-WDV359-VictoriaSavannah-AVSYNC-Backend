// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// // Process user profile updates with validation
// export const updateUserProfile = functions
//   .region("us-central1")
//   .https.onCall(async (data, context) => {
//     try {
//       if (!context.auth) {
//         throw new functions.https.HttpsError(
//           "unauthenticated",
//           "User must be authenticated"
//         );
//       }
//       const { displayName, photoURL, preferences } = data;
//       const userId = context.auth.uid;
//       // Validate input data
//       const updateData: any = {
//         updatedAt: admin.firestore.Timestamp.now(),
//       };
//       if (displayName) {
//         if (typeof displayName !== "string" || displayName.length < 2) {
//           throw new functions.https.HttpsError(
//             "invalid-argument",
//             "Display name must be at least 2 characters"
//           );
//         }
//         updateData.displayName = displayName.trim();
//       }
//       if (photoURL) {
//         if (!isValidURL(photoURL)) {
//           throw new functions.https.HttpsError(
//             "invalid-argument",
//             "Invalid photo URL"
//           );
//         }
//         updateData.photoURL = photoURL;
//       }
//       if (preferences) {
//         updateData.preferences = {
//           theme: preferences.theme || "light",
//           notifications: preferences.notifications || true,
//           units: preferences.units || "metric",
//           language: preferences.language || "en",
//         };
//       }
//       // Update user document
//       await admin
//         .firestore()
//         .collection("users")
//         .doc(userId)
//         .set(updateData, { merge: true });
//       // Update Firebase Auth profile if needed
//       if (displayName || photoURL) {
//         await admin.auth().updateUser(userId, {
//           displayName: displayName || undefined,
//           photoURL: photoURL || undefined,
//         });
//       }
//       return { success: true, message: "Profile updated successfully" };
//     } catch (error) {
//       console.error("Profile update error:", error);

//       if (error instanceof functions.https.HttpsError) {
//         throw error;
//       }
//       throw new functions.https.HttpsError(
//         "internal",
//         "Failed to update profile"
//       );
//     }
//   });
// // Get user analytics data
// export const getUserAnalytics = functions
//   .region("us-central1")
//   .https.onCall(async (data, context) => {
//     try {
//       if (!context.auth) {
//         throw new functions.https.HttpsError(
//           "unauthenticated",
//           "Authentication required"
//         );
//       }
//       const userId = context.auth.uid;
//       const { startDate, endDate } = data;
//       // Query user activity from multiple collections
//       const [weatherRequests, locationUpdates, appSessions] = await Promise.all(
//         [
//           admin
//             .firestore()
//             .collection("weather_cache")
//             .where("userId", "==", userId)
//             .where("timestamp", ">=", startDate)
//             .where("timestamp", "<=", endDate)
//             .get(),
//           admin
//             .firestore()
//             .collection("location_history")
//             .where("userId", "==", userId)
//             .where("timestamp", ">=", startDate)
//             .where("timestamp", "<=", endDate)
//             .get(),
//           admin
//             .firestore()
//             .collection("app_sessions")
//             .where("userId", "==", userId)
//             .where("startTime", ">=", startDate)
//             .where("startTime", "<=", endDate)
//             .get(),
//         ]
//       );
//       const analytics = {
//         weatherRequests: weatherRequests.size,
//         locationUpdates: locationUpdates.size,
//         appSessions: appSessions.size,
//         totalSessionTime: appSessions.docs.reduce((total, doc) => {
//           const session = doc.data();
//           return total + (session.duration || 0);
//         }, 0),
//         mostUsedFeatures: calculateMostUsedFeatures(weatherRequests.docs),
//       };
//       return analytics;
//     } catch (error) {
//       console.error("Analytics error:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Failed to get user analytics"
//       );
//     }
//   });
// // Helper function to validate URLs
// function isValidURL(string: string): boolean {
//   try {
//     new URL(string);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }
// // Helper function to calculate feature usage
// function calculateMostUsedFeatures(docs: any[]): string[] {
//   const features: { [key: string]: number } = {};

//   docs.forEach((doc) => {
//     const data = doc.data();
//     if (data.feature) {
//       features[data.feature] = (features[data.feature] || 0) + 1;
//     }
//   });
//   return Object.entries(features)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 5)
//     .map(([feature]) => feature);
// }
