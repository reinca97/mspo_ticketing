import * as firebase from "firebase";
const config = {
    authDomain: "ms-ticketing.firebaseapp.com",
    databaseURL: "https://ms-ticketing.firebaseio.com",
    projectId: "ms-ticketing",
    storageBucket: "ms-ticketing.appspot.com",
    messagingSenderId: "1031582636275"
};
firebase.initializeApp(config);

export default firebase;