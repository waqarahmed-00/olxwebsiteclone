import { useState } from 'react';
import { signin } from '../../config/Firebase/firebase';
import './index.css'
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const login = async () => {
    try {
      await signin({ email, password })
      navigate('/')
    } catch (e) {
      alert(e.message)
    }
  }

  return (

    <div className="signin-page-content">
      <div className="signin-form-v7-content">
        <div className="signin-form-left">
          <img style={{ width: '50%' }} src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" alt="form" />
          <p className="signin-text-1">Welcome to OLX  "SIGN IN"</p>
          <p className="signin-text-3">The trusted community of buyers and sellers.</p>
          <p className="signin-text-2">Privacy policy &amp; Term of service</p>
        </div>
        <form className="signin-form-detail" action="#" method="post" id="myform">
          <div className="signin-form-row">
            <label htmlFor="your_email">E-MAIL</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" name="your_email" id="your_email" className="signin-input-text" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
          </div>
          <div className="signin-form-row">
            <label htmlFor="password">PASSWORD</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="signin-input-text" required />
          </div>
          <div className="signin-form-row-last">
            <input onClick={login} type="button" name="Sign In" className="signin-register" value='Sign In' />
            <p>Or<a onClick={() => navigate('/Register')}>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}