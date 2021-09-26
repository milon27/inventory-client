import firebase from 'firebase/app'
import 'firebase/storage'
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "" + process.env.apiKey,
    authDomain: "" + process.env.authDomain,
    projectId: "" + process.env.projectId,
    storageBucket: "" + process.env.storageBucket,
    messagingSenderId: "" + process.env.messagingSenderId,
    appId: "" + process.env.appId,
    measurementId: "" + process.env.measurementId
};
//firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();

export default firebase

