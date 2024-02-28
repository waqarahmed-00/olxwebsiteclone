import { useNavigate } from 'react-router-dom'
import './index.css'
import { useState, useEffect } from 'react';
//Import Current User check Firebase function 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../config/Firebase/firebase';
//Import signout feature from firebase
import { signOut } from "firebase/auth";
//import this for fetch userData
import { profileData } from '../../config/Firebase/firebase';

import { useSelector } from 'react-redux'

function Header() {
    const navigate = useNavigate()
    const carts = useSelector((state) => state.cart)


    //Make Users State to check user logged in or not 
    const [user, setUser] = useState(null)
    const [found, setFound] = useState([])

    //When user click on register button he will be redirect on SIgnin page 
    const register = () => {
        navigate('/Signin')
    }

    //Copy this feature from firebase 
    const logOut = async () => {
        const auth = getAuth();
        await signOut(auth)
        navigate('/')
    }

    // Use this for check one time user logged In or not
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("user " ,user)
                const uid = user
                setUser(uid.email)
            } else {
                setUser(null)
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
                const foundItem = pdata.filter((res) => res.email === user)
                setFound(foundItem)
                console.log("foundItem", foundItem)
            } catch (e) {
                alert(e.message)
            }
        }
    }, [user])

    return (
        <div className="main-div">
            <div className='header'>
                <div className='header-top'>
                    <div className='top-logo'>
                        <a href='#'><img src='https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png' /></a>
                    </div>
                    <div className='top-car-logo'>
                        <img src='https://img.freepik.com/premium-vector/front-car-silhouette-automotive-logo-design-vector_198454-349.jpg?w=2000' />
                        <span>MOTORS</span>
                    </div>
                    <div className='top-property-logo'>
                        <img src='https://cdn4.iconfinder.com/data/icons/12-town-house-vector-shapes/209/house-shape-PhotoshopSupply.com-9-512.png' />
                        <p>PROPERTY</p>
                    </div>
                </div>
                <div className='header-bottom'>
                    <div className='olx-logo'>
                        <a href='#'><img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/6416e4b9ef1a50eb27816b6e922a9c637a007a6f/OLX%20website%20images/olxLogo.png?raw=true' /></a>
                    </div>
                    <div className='form'>
                        <div>
                            <select>
                                <option disabled>Use current location</option>
                                <option>Pakistan</option>
                                <option>Karachi, Sindh</option>
                                <option>Hyderabad, Sindh</option>
                                <option>Sakkur, Sindh</option>
                                <option>Larkana, Sindh</option>
                                <option>Mirpur Khas, Sindh</option>
                            </select>
                            <input type='text' placeholder='Find Cars, Mobile Phones and more... ' />
                            <button className='search-btn'>
                                <img src='https://static-00.iconduck.com/assets.00/search-icon-2044x2048-psdrpqwp.png' />
                            </button>
                            {user && found[0] ? (
                                <div className='profile-parent'>
                                    {user && found[0].image ? <img className='parent-image' src={found[0].image} />
                                        : <img className='parent-image' src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" />
                                    }
                                    <div className='profile-child'>
                                        {user && found[0].image ? <img className='child-image' src={found[0].image} />
                                            : <img className='child-image' src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png" />
                                        }
                                        <p className='hello'>Hello,</p>
                                        <h3 className='current-user-name'>{found[0].fullName}</h3>
                                        <p onClick={() => navigate('/Profile')} className='edit-profile'>View and edit your profile</p>
                                        <button onClick={() => logOut(user.email)} className='logout-btn'>Logout</button>
                                    </div>
                                </div>)

                                :
                                <div className='login-div'>
                                    <a onClick={register}>Login</a>
                                </div>
                            }
                            <div className='cart_icon_div'>
                                <i onClick={() => navigate('/Cart')} class="fa-solid fa-cart-shopping cart_icon"></i>
                                <p className='cart_length'>{carts.length}</p>
                            </div>

                            <div onClick={() => navigate('/AddItem')} className='sell-btn'>
                                <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
                                <div className='sell-text'>
                                    <img src='https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg' />
                                    <span className='sell-text' >SELL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> <br /> <br />
            <div className='section' >
                <div className='all-category'>
                    <select>
                        <option>All category</option>
                    </select>
                    <span>Mobile Phones</span>
                    <span>Cars</span>
                    <span>Motorcycles</span>
                    <span>Houses</span>
                    <span>Video-Audios</span>
                    <span>Tablets</span>
                    <span>Land & Plots</span>
                </div>
            </div>
        </div>
    )
}
export default Header