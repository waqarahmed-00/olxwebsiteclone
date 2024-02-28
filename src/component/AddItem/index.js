import './index.css'
import { additem } from '../../config/Firebase/firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AddItem() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [images, setImages] = useState()

    const navigate = useNavigate()

    const post = async () => {
        try {
            await additem({ title, description, price, images })
            navigate('/')
        } catch (e) {
            alert(e.message)
        }

    }
    return (
        <div className="adItem-main">
            <section className="adItem-signup">
                <div className="adItem-container">
                    <div className="adItem-signup-content">
                        <form method="POST" id="signup-form" className="adItem-signup-form">
                            <div>
                                <img style={{ width: '20%', marginTop: '-50px', marginBottom: '30px', marginLeft: '40%' }} src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" alt="form" />
                            </div>
                            <div style={{ marginTop: '-20px' }}>
                                <h2 className='heading'>Enter Your Ad Detail</h2>
                            </div>
                            <div style={{ marginTop: '-30px' }} className="adItem-form-group">
                                <label htmlFor="phone_number" className='input-label'>Title</label>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    className="form-input input-field"
                                    name="phone_number"
                                    id="phone_number"
                                />
                            </div>
                            <div className="adItem-form-group">
                                <label htmlFor="phone_number" className='input-label'>Description</label>
                                <input
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    className="form-input input-field"
                                    name="phone_number"
                                    id="phone_number"
                                />
                            </div>
                            <div className="adItem-form-group">
                                <label htmlFor="phone_number" className='input-label'>Price</label>
                                <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="text"
                                    className="form-input input-field"
                                    name="phone_number"
                                    id="phone_number"
                                />
                            </div>
                            <div className="adItem-form-group">
                                <label htmlFor="phone_number" className='input-label'>Images</label>
                                <input
                                    onChange={(e) => setImages([e.target.files])}
                                    type="file"
                                    multiple
                                    className="form-input input-field"
                                    name="phone_number"
                                    id="phone_number"
                                />
                            </div>
                            <div className="adItem-form-group">
                                <input
                                    type="button"
                                    onClick={post}
                                    name="Post"
                                    value='Post'
                                    id="submit"
                                    className="form-submit btn-post"
                                    defaultValue="Submit"
                                />
                            </div>
                            {console.log("Image a gai ", images)}
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}