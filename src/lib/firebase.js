import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyDIjCFS-8J5dfxI1wI5LVMq9EDdnk4XeIc",
    authDomain: "ms-ticketing.firebaseapp.com",
    databaseURL: "https://ms-ticketing.firebaseio.com",
    projectId: "ms-ticketing",
    storageBucket: "ms-ticketing.appspot.com",
    messagingSenderId: "1031582636275"
};
firebase.initializeApp(config);

export default firebase;