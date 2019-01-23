import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
let config = {
    apiKey: "AIzaSyDBGz-hDIwXRprwcWVG8E1XGLv_OFNjYGE",
    authDomain: "react-firebase-scopic-basic.firebaseapp.com",
    databaseURL: "https://react-firebase-scopic-basic.firebaseio.com",
    projectId: "react-firebase-scopic-basic",
    storageBucket: "react-firebase-scopic-basic.appspot.com",
    messagingSenderId: "159943718071"
};
firebase.initializeApp(config);
/*firebase.firestore().settings({
    timestampsInSnapshots: true
});*/

export default firebase;