// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import axios from "axios";
// import { Request, Response } from "express";
// // Initialize Firebase Admin SDK
// admin.initializeApp();
// // CORS configuration for web clients
// const corsOptions = {
//   origin: [
//     "http://localhost:19006", // Expo web dev
//     "https://yourapp.com", // Production web
//   ],
//   credentials: true,
// };

// // Weather API proxy to secure API keys
// export const getWeather = functions
//   .region("us-central1")
//   .runWith({
//     timeoutSeconds: 30,
//     memory: "256MB",
//   })
//   .https.onCall(async (data, context) => {
//     try {
//       // Authenticate user
//       if (!context.auth) {
//         throw new functions.https.HttpsError(
//           "unauthenticated",
//           "User must be authenticated to access weather data"
//         );
//       }
//       const { latitude, longitude, units = "metric" } = data;
//       // Validate input
//       if (!latitude || !longitude) {
//         throw new functions.https.HttpsError(
//           "invalid-argument",
//           "Latitude and longitude are required"
//         );
//       }
//       // Make secure API call with server-side API key
//       const apiKey = functions.config().openweather.api_key;
//       const response = await axios.get(
//         "https://api.openweathermap.org/data/2.5/weather",
//         {
//           params: {
//             lat: latitude,
//             lon: longitude,
//             appid: apiKey,
//             units,
//           },
//           timeout: 10000,
//         }
//       );
//       // Transform and sanitize data
//       const weatherData = {
//         location: {
//           name: response.data.name,
//           country: response.data.sys.country,
//           coordinates: {
//             latitude: response.data.coord.lat,
//             longitude: response.data.coord.lon,
//           },
//         },
//         current: {
//           temperature: Math.round(response.data.main.temp),
//           feelsLike: Math.round(response.data.main.feels_like),
//           humidity: response.data.main.humidity,
//           pressure: response.data.main.pressure,
//           description: response.data.weather[0].description,
//           icon: response.data.weather[0].icon,
//           windSpeed: response.data.wind?.speed || 0,
//           windDirection: response.data.wind?.deg || 0,
//           visibility: response.data.visibility || 0,
//         },
//         timestamp: admin.firestore.Timestamp.now(),
//         userId: context.auth.uid,
//       };
//       // Cache result in Firestore
//       await admin
//         .firestore()
//         .collection("weather_cache")
//         .doc(`${context.auth.uid}_${latitude}_${longitude}`)
//         .set(weatherData, { merge: true });
//       return weatherData;
//     } catch (error) {
//       console.error("Weather API error:", error);

//       if (error instanceof functions.https.HttpsError) {
//         throw error;
//       }
//       throw new functions.https.HttpsError(
//         "internal",
//         "Failed to fetch weather data"
//       );
//     }
//   });
// // Geocoding proxy for address to coordinates conversion
// export const geocodeAddress = functions
//   .region("us-central1")
//   .https.onCall(async (data, context) => {
//     try {
//       if (!context.auth) {
//         throw new functions.https.HttpsError(
//           "unauthenticated",
//           "Authentication required"
//         );
//       }
//       const { address } = data;
//       if (!address) {
//         throw new functions.https.HttpsError(
//           "invalid-argument",
//           "Address is required"
//         );
//       }
//       const apiKey = functions.config().mapbox.api_key;
//       const response = await axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           address
//         )}.json`,
//         {
//           params: {
//             access_token: apiKey,
//             limit: 5,
//             types: "address,poi,place",
//           },
//           timeout: 10000,
//         }
//       );
//       const locations = response.data.features.map((feature: any) => ({
//         address: feature.place_name,
//         coordinates: {
//           longitude: feature.center[0],
//           latitude: feature.center[1],
//         },
//         relevance: feature.relevance,
//         placeType: feature.place_type[0],
//       }));
//       return { locations };
//     } catch (error) {
//       console.error("Geocoding error:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Failed to geocode address"
//       );
//     }
//   });
