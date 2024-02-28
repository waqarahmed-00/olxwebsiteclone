//Import useNavigate for land navigate pages
// import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import {auth} from '../../config/Firebase/firebase';


//start component
export function Card(props) {
    //destructuring the props value
    const { id, imageURL, description, price, title } = props

    //make variable of useNavigate 
    // const navigate = useNavigate()

    return (
        <div>
            
            {/* <div className="container text-center">
                <div className="col-md-3 mb-4">
                    <div className="card" style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}
                        onClick={() => navigate(`/Detaill/${id}`)} >
                        <img src={imageURL} className="card-img-top" alt="..." style={{ cursor: 'pointer' }} />
                        <div className="card-body">
                            <h5><b>{title}</b></h5>
                            <p className="card-text">{description}</p>
                            <h6>RS {price}</h6>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}
