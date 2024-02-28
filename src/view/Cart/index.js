import Header from "../Header"
import Footer from "../Footer"
import './index.css'
import { removeFromCart  } from "../../Store/cartSlice"

import { useSelector, useDispatch } from 'react-redux'


export function Cart() {

    const carts = useSelector((state) => state.cart)
    console.log("getCArt useSelector", carts)
    const dispatch = useDispatch()
    return (
        <div>
            <Header />
            <div className="cart_favourite_div">
                <h1 className="cart_favourite_text">Favourites & Saved </h1> <br />
                { !carts.length ? <p className="favourite_msg">No favorites yet.</p>
                 :<p className="favourite_msg">{carts.length} Items in favourite </p>}

            </div>
            {carts.map((item) => {
                const {title, description, imageURL, price} = item
                return <div className="favourite_cart_info_div">
                    <div className="info_part_div">
                        <div className="cart_img_div">
                            <img className="cart_img" src={imageURL} />
                        </div>
                        <div className="cart_detail_div">
                            <p className="cart_detail_brand">Brand: {title} </p>
                            <p className="cart_detail_decription">Description: {description}</p>
                            <p className="cart_detail_quantity">Price : {price}</p>

                        </div>
                        <div className="cart_quantity_div">
                            <button onClick={() => dispatch(removeFromCart(item))} className="cart_delete_btn"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>


                </div>
            })}
            <Footer />

        </div>
    )
}