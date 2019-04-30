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