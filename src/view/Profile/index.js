import Header from "../Header"
import Footer from "../Footer"
import { useState, useEffect } from "react"
import './index.css'
import { profileData, profileUpdate } from "../../config/Firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"

//This component is used for used for update profile of current user 
export function Profile() {

    //In this state user's uploaded image is store
    const [img, setImg] = useState([])

    //In this state current user's information and email is store 
    const [currentUser, setCurrentUser] = useState([])

    //If current users information is found the all data of current user is store in this state 
    const [found, setFound] = useState([])

    //for navigate to dashbaord after update the profile 
    const navigate = useNavigate()

    //This use effect is used to check user logedin or not if login so the email of the user is set to current user state 
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("user " ,user)
                const uid = user
                setCurrentUser(uid.email)
            } else {
                setCurrentUser(null)
            }
        });
    }, [])


    //this useEffect is used to get current user's data from firebase (Profile Data have all user's data which are register in this website and this function is make in the firebase section)  so if the current user's information is match so it is stored in found state & this is state is rendor when the user is changed 
    useEffect(() => {
        fetchData()

        async function fetchData() {
            try {
                const pdata = await profileData()
                console.log('Pdata', pdata)
                const foundItem = pdata.filter((res) => res.email === currentUser)
                setFound(foundItem)
                console.log("foundItem", foundItem)
            } catch (e) {
                alert(e.message)
            }
        }
    }, [currentUser])

    //this function make for profile update When user click on save changes button after profile updating redirect on dashboard
    async function saveChanges() {
        await profileUpdate(found, img)
        navigate('/')
    }

    // when this component rendor first the so we have no data of user in found state so thats why we make this condition 
    if (!found.length) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    //Return all things 
    return (
        <div>
            <Header /> 
            <div className="main-div">
                <div className="main-content">
                    <div className="container">
                        <div className="profile-edit-section">
                            <h4>Edit Profile</h4>
                        </div>
                        <hr />
                        <div className="edit-profile-image">
                            <h5>Profile Photo</h5>
                        </div>
                        <div className="image-upload">
                            {currentUser && found[0].image ? <img src={found[0].image} />
                                : <img src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" />
                            }
                            <div>
                                <label>Upload Photo</label>
                                <input type="file" onChange={(e) => setImg(e.target.files[0])}></input>
                                <p>JPG, JPEG, PNG Min: 400px, Max: 1024px</p>
                            </div>
                        </div>
                        <hr />
                        <div className="profile-name-input">
                            <label>Name</label> <br />
                            <input value={found ? `${found[0].fullName}` : ''} type="text"></input>
                        </div>
                        <div className="profile-age-input">
                            <label >Age</label> <br />
                            <input value={found ? `${found[0].age}` : ''} type="text"></input>
                        </div>
                        <div className="profile-email-input">
                            <label >Email</label> <br />
                            <input value={found ? `${found[0].email}` : ''} type="text"></input>
                        </div>
                        <div className="text-area">
                            <textarea placeholder="About me (optional)"></textarea>
                        </div>
                        <div className="btn-save">
                            <button onClick={saveChanges} className="save-changes-btn" onclick="alert('Button Clicked!')">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}