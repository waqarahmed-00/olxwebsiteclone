import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../config/Firebase/firebase';
import './index.css'

export function Register() {
    const [fullName, setFullName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    const signup = async () => {
        try {
            await register({ fullName, age, email, password })
            navigate('/Signin')
        } catch (e) {
            alert(e.message)
        }
    }
    return (

        <div className="register-page-content">
            <div className="register-form-v7-content">
                <div className="register-form-left">
                    <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" alt="form" />
                    <p className="register-text-1">Welcome to OLX "REGISTER"</p>
                    <p className="register-text-3">The trusted community of buyers and sellers.</p>
                    <p className="register-text-2">Privacy policy &amp; Term of service</p>
                </div>
                <form className="register-form-detail" action="#" method="post" id="myform">
                    <div className="register-form-row">
                        <label htmlFor="username">USERNAME</label>
                        <input onChange={(e) => setFullName(e.target.value)} type="text" name="username" id="username" className="register-input-text" />
                    </div>
                    <div className="register-form-row">
                        <label htmlFor="username">AGE</label>
                        <input onChange={(e) => setAge(e.target.value)} type="text" name="userage" id="userage" className="register-input-text" />
                    </div>
                    <div className="register-form-row">
                        <label htmlFor="your_email">E-MAIL</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="your_email" id="your_email" className="register-input-text required" />
                    </div>
                    <div className="register-form-row">
                        <label htmlFor="password">PASSWORD</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="register-input-text" required />
                    </div>
                    <div className="form-row-last">
                        <input onClick={signup} type="button" name="register" className="register-register" defaultValue="Register" />
                        <p className='or'>Or<a className='signIn' onClick={() => navigate('/Signin')}>Sign in</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
}