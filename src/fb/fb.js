import firebase from 'firebase/app'
import 'firebase/storage'
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyBfagVMBxfHct_5uXmDDJefS3oTxJ-fm2s",
    authDomain: "juz-air-inventory.firebaseapp.com",
    projectId: "juz-air-inventory",
    storageBucket: "juz-air-inventory.appspot.com",
    messagingSenderId: "155388270919",
    appId: "1:155388270919:web:eb984ba08be8a2baaf9462",
    measurementId: "G-KG8YMCTXSD"
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

