import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './index.css'
// import Header from "../Header/Index";
import Header from "../Header";
import Footer from "../Footer";
import { doc, getDoc, getFirestore } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';




function Detail() {
    const { id } = useParams();
    console.log("Id chale", id)
    const [selectedDetail, setSelectedDetail] = useState([])
    const db = getFirestore();


    useEffect(() => {
        getAdDetail();
    }, [id])


    const getAdDetail = async () => {
        try {
            const docRef = doc(db, "adsItem", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setSelectedDetail(docSnap.data())
            } else {
                console.log("No such document!");
            }
        } catch (e) {
            console.log(e.message)

        }

    }

    if (selectedDetail.length == 0) {
        return (
            <h1>Loading....</h1>
        )
    }

    return (
        <div>
            <Header />
            {console.log("Selected Data", selectedDetail)}

            <div className="main-div">
                <Swiper
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper">

                    {selectedDetail.imageURL.map(((item, index) => {
                        // { console.log("Images URLs", selectedDetail.imageURL) }
                        return <SwiperSlide key={index} >
                            <img src={item} className="swipper-img" />
                        </SwiperSlide>
                    }))}

                </Swiper>


                <div className="card" style={{ width: "18rem;" }}>
                    <div className="card-body">
                        <h1 className="card-text"> Rs {selectedDetail.price}</h1>
                        {/* <h3 className="card-text">{selectedDetail}</h3> */}
                    </div>
                </div>

                <div className="card" style={{ width: "18rem;" }}>
                    <div className="card-body">
                        <h3 className="card-text">Details</h3>
                        <p className="card-text">Price:  <b>{selectedDetail.price} </b></p>
                    </div>
                </div>

                <div className="card" style={{ width: "18rem;" }}>
                    <div className="card-body">
                        <h3 className="card-text">Description</h3>
                        <p className="card-text">{selectedDetail.description}</p>
                    </div>
                </div>

            </div>
            <div className="user-information">
                <div className="profile">
                    <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" />
                </div>
                <div className="user-name">
                    <h6> <b>Waqar Rana</b></h6>
                    <p>Member since Sept 2020</p>
                    <a target="_blank" href="https://www.facebook.com/waqar.rana.1253236?mibextid=ZbWKwL">see profile</a>
                </div>
                <div className="number">
                    <p>Show phone number</p>
                    <img src="https://toppng.com/uploads/preview/contact-call-icon-white-color-11563547287agzjm4lc3s.png" />
                </div>
                <div className="number1">
                    <p>Chat</p>
                    <img src="https://www.pngitem.com/pimgs/m/207-2079043_live-chat-icon-png-white-png-download-white.png" />
                </div>

            </div>
            <Footer />
        </div>

    )

}
export default Detail