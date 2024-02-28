//Import firebase
import { initializeApp } from "firebase/app";
// Import Signin and Register with firebase 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Import Firebase data base firestore
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// Import Storage area from firebase where images are upload
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { doc, deleteDoc } from "firebase/firestore";



// copy this config from firebase 
const firebaseConfig = {
    apiKey: "AIzaSyCP7099Ao-nGJ2uNxizf3PA6ojBPu1K1XI",
    authDomain: "olxwebsitedatabase.firebaseapp.com",
    projectId: "olxwebsitedatabase",
    storageBucket: "olxwebsitedatabase.appspot.com",
    messagingSenderId: "626802827430",
    appId: "1:626802827430:web:c15286a2b2a47d454f1467"
};

//create variable for all imported item which are import from database
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function register(userInfo) {
    const { fullName, age, email, password } = userInfo
    await createUserWithEmailAndPassword(auth, email, password)
    await addDoc(collection(db, "users"), {
        fullName,
        age,
        email,
    });
    alert("Successfully Register")
}

export async function signin(userinfo) {
    const { email, password } = userinfo
    await signInWithEmailAndPassword(auth, email, password)
    alert("Logged in Successfully")
}

export async function additem(adinfo) {
    // Destructure the data
    const { title, description, price, images } = adinfo
    const imageArray = Array.from(images[0])
    const arr = [];
    for (let i = 0; i < imageArray.length; i++) {
        const file = imageArray[i];
        //set Images in firebase storage
        const storageRef = ref(storage, `ads/${file.name}`);
        await uploadBytes(storageRef, file);
        const Url = await getDownloadURL(storageRef)

        console.log(`File ${i} uploaded, download URL: ${Url}`)
        arr.push(Url);
    }

    console.log(`arr uploaded, download URL: ${arr}`)

    //Set Data into firestore database
    await addDoc(collection(db, "adsItem"), {
        title,
        description,
        price,
        imageURL: arr,
    });
    alert("Ad Post Sucessfully")
}

export async function getAds() {

    const querySnapshot = await getDocs(collection(db, "adsItem"));
    const ads = [];
    querySnapshot.forEach((doc) => {
        const ad = doc.data()
        ad.id = doc.id
        ads.push(ad)
    });
    return ads

}

export const profileData = async () => {
    const postAds = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        const dat = doc.data()
        dat.id = doc.id
        postAds.push(dat)
    });
    return postAds
}

export async function profileUpdate(currentUserInfo, img) {
    console.log("e:", currentUserInfo)
    console.log("img:", img)
    const userData = currentUserInfo[0]
    try {

        const storageRef = ref(storage, `usersprofile/${img.name}`);
        await uploadBytes(storageRef, img);
        const Url = await getDownloadURL(storageRef)
        console.log(Url)
        await addDoc(collection(db, "users"), {
            fullName: userData.fullName,
            age: userData.age,
            email: userData.email,
            image: Url,

        });
        const ver = await deleteDoc(doc(db, "users", userData.id))
        console.log(ver)
        alert("Update Changes (:")


    } catch (e) {
        alert(e.message)

    }




}