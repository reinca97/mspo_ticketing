import firebase from "../lib/firebase";


export const onGetDataList = () => {
    return new Promise( resolve => {
        firebase.database().ref("/seats").once('value')
            .then(  snapshot => {
                resolve( snapshot.val() ) ;
            });
    });
};

export const getSeatData = (path) =>{

    return new Promise( resolve =>{
        firebase.database().ref(`${path}`).once('value')
            .then( snapshot => resolve(snapshot.val() )
            );
    });
};


export const setSeatData = (path, seatData) =>{

    return new Promise( resolve =>{
        firebase.database().ref(`${path}`).set(seatData).then(
            result=>resolve(result),
                err=>resolve(null,err)
        )
    })
};

export const getUserData = uid =>{

    return new Promise( resolve =>{
        firebase.database().ref(`users/${uid}`).once('value').then(snapshot =>
            resolve( snapshot.val() )
        )
    })
};

export const setUserData = (uid, userData) =>{

    return new Promise( resolve =>{
        firebase.database().ref(`users/${uid}`).set(userData).then(
            result=>resolve(result),
            err =>resolve(null,err)
        )
    })
};
