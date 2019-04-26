import firebase from "../lib/firebase";


export const onGetDataList = () => {
    return new Promise( resolve => {
        firebase.database().ref("/seats").once('value')
            .then(  snapshot => {
                resolve( snapshot.val() ) ;
            });
    });

};

