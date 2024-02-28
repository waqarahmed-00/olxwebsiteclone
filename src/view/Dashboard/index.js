//Import useState for store Products & useEffect for calling API one time when component rendering first time
import { useState, useEffect } from 'react';
//import card component for show products 
import { Card } from '../Card';
// Import DashBoard CSS
import "./index.css"
//Import Header Component from view folder
import Header from '../Header';
//Import Footer Component from view folder
import Footer from '../Footer';
//Import GetAds function 
import { auth, getAds } from '../../config/Firebase/firebase';
//Import For make routing
import { useNavigate } from 'react-router-dom';
//Import for send data to reducer 
import { useDispatch } from 'react-redux'
//import addToCart store
import { addToCart } from '../../Store/cartSlice';

// Start Component
export function Dashboard() {

    //Make State for store Products details
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // Use this for calling API only one time when component start is rendering First time
    useEffect(() => {
        getProducts();
    }, [])

    // Make functon for fetch APIs
    const getProducts = async () => {
        const ads = await getAds()
        console.log("ads in component", ads)
        setProducts(ads)
        console.log(products)
    }

    if (!products.length) {
        return <div>
            <p>Loading...</p>
        </div>
    }

    //Return every thing
    return (
        <div>

            <Header />

            <div>
                <div className='dashboard-slider'>
                    <img src='https://images.olx.com.pk/thumbnails/295176473-800x600.webp' />
                </div>
                <div className='dashboard-images'>
                    <div>
                        <h2>All Categories</h2>
                    </div>
                    <br />
                    <div>
                        <div className='dashboard-div-1'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/mobiles.png?raw=true' />
                            <p>Mobiles</p>
                        </div>
                        <div className='dashboard-div-2'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/vehicles.png?raw=true' />
                            <p>Vehicles</p>
                        </div>
                        <div className='dashboard-div-3'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/propertyForSale.png?raw=true' />
                            <p>Property For Sale</p>
                        </div>
                        <div className='dashboard-div-4'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/propertyForRent.png?raw=true' />
                            <p>Property For Rent</p>
                        </div>
                        <div className='dashboard-div-5'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/camera.png?raw=true' />
                            <p>Electronics & Home Appliances</p>
                        </div>
                        <div className='dashboard-div-6'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/bikes.png?raw=true' />
                            <p>Bikes</p>
                        </div>
                        <div className='dashboard-div-7'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/industrial.png?raw=true' />
                            <p>Business Industrial & Agriculture</p>
                        </div>
                        <div className='dashboard-div-8'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/services.png?raw=true' />
                            <p>Services</p>
                        </div>
                        <div className='dashboard-div-9'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/jobs.png?raw=true' />
                            <p>Jobs</p>
                        </div>
                        <div className='dashboard-div-10'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/animal.png?raw=true' />
                            <p>Animals</p>
                        </div>
                        <div className='dashboard-div-11'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/furniture.png?raw=true' />
                            <p>Furniture & Home Decor</p>
                        </div>
                        <div className='dashboard-div-12'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/fashion.png?raw=true' />
                            <p>Fashion & Beauty</p>
                        </div>
                        <div className='dashboard-div-13'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/books.png?raw=true' />
                            <p>Books, Sports & Hobbies</p>
                        </div>
                        <div className='dashboard-div-14'>
                            <img src='https://github.com/Umersiddiqui4/Olx-website-images/blob/main/OLX%20website%20images/kids.png?raw=true' />
                            <p>Kids</p>
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className="row">
                        {products.map((item) => {
                            const { imageURL, id, description, price, title } = item
                            return (
                                <div key={id} className="col-md-3 mb-4">
                                    <div className="card" style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                                        <img onClick={() => navigate(`/Detail/${id}`)} src={imageURL} className="card-img-top" alt="..." style={{ cursor: 'pointer' }} />
                                        <div className="card-body">
                                            <h5><b>{title}</b></h5>
                                            <p className="card-text">{description}</p>
                                            <h6>RS {price}</h6>
                                        </div>
                                        <div className='text-center '>
                                        <button onClick={() => dispatch(addToCart(item))}  type="button" class="btn btn-primary my-2">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        </div>

    )
}