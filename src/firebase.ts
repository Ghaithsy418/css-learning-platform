// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_PROJECT.firebaseapp.com',
//   projectId: 'YOUR_PROJECT_ID',
//   messagingSenderId: 'YOUR_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// // Function to request permission and save token to Upstash
// export const requestPermission = async () => {
//   const permission = await Notification.requestPermission();
//   if (permission === 'granted') {
//     const token = await getToken(messaging, {
//       vapidKey: 'YOUR_VAPID_PUBLIC_KEY',
//     });

//     // Send token to your Upstash Redis (use a serverless function/proxy for security)
//     await saveTokenToRedis(token);
//   }
// };
