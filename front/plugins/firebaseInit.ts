import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  appId: process.env.FB_APP_ID,
  projectId: process.env.FB_PROJECT_ID,
  authDomain: process.env.FB_AUTH_DOMAIN,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
firebase.analytics()

export default firebase
