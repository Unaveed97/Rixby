import * as firebase from 'firebase'
import 'firebase/firestore'
import { GoogleSignin } from '@react-native-community/google-signin';

const firebaseConfig = {
    apiKey: "AIzaSyDsEm_Yl_SONM8q0hNgagOJAljYUUrbTRs",
    authDomain: "rixby-1.firebaseapp.com",
    databaseURL: "https://rixby-1.firebaseio.com",
    projectId: "rixby-1",
    storageBucket: "rixby-1.appspot.com",
    messagingSenderId: "563591331358",
    appId: "1:563591331358:web:2260efa8767bc1c94a780f",
    measurementId: "G-Y0S5Z9SQVJ"
};
if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '563591331358-js5n0vsdrat8m07jud93k1i1dtsrgf2i.apps.googleusercontent.com',
    offlineAccess: true
});

export async function signup(email, password, name) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        var user = firebase.auth().currentUser;
        user.updateProfile({ displayName: name })
    }).catch((error) => {
        throw error
    })
}

export async function logout() {
    firebase.auth().signOut().then(function () {
        console.log('Logout Successful')
    }).catch(function (error) {
        console.log('Logout Unsuccessful')
    });
}

export async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("Login Successful")
    }).catch(error => {
        throw error;
    })
}

export async function resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        console.log("Email has been sent to you")
    }).catch((error) => {
        throw error
    })
}

export async function emailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        console.log('Email verified = ', user.emailVerified)
    }).catch(error => {
        console.log(error.message)
    });
}

export async function isUserVerified() {
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified)
    if (user) {
        return user.emailVerified
    } else {
        return false
    }

}

export async function changePassword(oldPassword, newPassword) {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
    );
    // Now you can use that to reauthenticate
    await user.reauthenticateWithCredential(credential).then(async () => {
        await user.updatePassword(newPassword).then(function () {
            console.log('password changed successfully')
        }).catch(error => console.log('changePassUtitlity ', error.message));
    }).catch(error => console.log('reauth ', error.message));
}

export async function getUserFirestoreObj() {
    const uid = await getCurrentUid();
    let userObj = null;
    await firebase.firestore().collection('Users').where('userID', '==', uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().userID == uid) {
                userObj = [doc.id, doc.data()];
            }
        })
    }).catch(error => { return null })
    return userObj
}

export async function getFirestoreUserByUid(uid) {
    let userObj = null;
    await firebase.firestore().collection('Users').where('userID', '==', uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().userID == uid) {
                userObj = [doc.id, doc.data()];
            }
        })
    }).catch(error => { return null })
    return userObj
}

export async function getWishlistUsers(adID) {
    let adObj = [];
    await firebase.firestore().collection('Wishlist').where('adID', '==', adID).get().then(snapshot => {
        snapshot.docs.forEach(doc => adObj.push([doc.id, doc.data()]))
    }).catch(error => { return err })
    return adObj
}

export async function isWishlisted(uid, adID) {
    let flag = false;
    await firebase.firestore().collection('Wishlist').where('userID', '==', uid).where('adID', '==', adID).get().then(snapshot => {
        if (!snapshot.empty)
            flag = true
    }).catch(error => { console.log(error.message); return false })
    return flag
}

export async function getCurrentUid() {
    const userId = await firebase.auth().currentUser.uid;
    if (userId)
        return userId
    else
        return await GoogleSignin.getCurrentUser().uid;
}

export async function getCurrentUserObj() {
    userObj = await firebase.auth().currentUser;
    if (userObj) {
        return userObj
    }
    return null
}

async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
}

async function getAdDownloadUrl(category, uid, adId, imageName) {
    var storageRef = firebase.storage().ref();
    var pathRef = storageRef.child(category).child(uid).child(adId + '/' + imageName);
    let url = await pathRef.getDownloadURL()
    return url;
}

export async function uploadAdImage(response, category, uid, adId) {
    let file = await uriToBlob(response.uri)
    const storageRef = firebase.storage().ref().child(category).child(uid).child(adId + '/' + response.fileName);
    await storageRef.put(file)
    let url = await getAdDownloadUrl(category, uid, adId, response.fileName)
    return url
}

export async function deleteAdImage(url) {
    const storageRef=firebase.storage().refFromURL(url)
    await storageRef.delete()
}

export async function uploadProfilePhoto(response, uid) {
    let file = await uriToBlob(response.uri)
    const storageRef = firebase.storage().ref().child('ProfilePhotos').child(uid + '/' + response.fileName)
    await storageRef.put(file)
    let url = await storageRef.getDownloadURL()
    return url
}