import Button from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Login from '../login/Login';
import Navbar from "../navbar/Navbar";
import React, { useState } from 'react';
import { register } from "../../service/auth.service";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // const [email, setUsername1] = useState('')

  const validate = (e) => {
    if (!name) {
      toast.info('Name should not be empty!')
      return false;
    } else if (!password) {
      toast.info('Password should not be empty!')
      return false;

    } else if (!email) {
      toast.info('Email should not be empty!')
      return false;
    }
    handleRegister(e);

  }
  
  const delay = () => setTimeout(() => {
    navigate('/login')
  }, 2000);

  const redirectToLogin = () => {

    navigate('/login')
  }
  const handleRegister = (e) => {
    e.preventDefault()
    const res = register(name, email, password)
    res.then((response) => {
      console.log('In handleRegister', response)

      if (response.status == '200') {
        toast.success('Registration Successful!')
        delay()

      }
    }).catch(e => toast.info('User already exist'))
  }

  return (
    <>
      <div>
        <ToastContainer/>
        <div className='body'>
          <div className=" col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div className='side'>
              <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 d-flex  justify-content-center align-items-center">
                <h1 className="head"
                  data-testid="loginheader"
                  id="loginhead">
                  Register Here!</h1>
              </div>
            </div>
          </div>

          <div className='mobo'>
            <Form>
              <Form.Group>
                <Form.Label className='user'>Name  </Form.Label><br></br>
                <input
                  id="loginuser"
                  className="text-center rounded-pill px-4 p-1 bg-input"
                  value={name}
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group><br></br>

              <Form.Group className="mb-3">
                <Form.Label className='user'>Password</Form.Label><br></br>
                <input
                  id="loginuser"
                  className="text-center rounded-pill px-4 p-1 bg-input"
                  value={password}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group><br></br>
              <Form.Group className="mb-3">
                <Form.Label className='user'>Email</Form.Label><br></br>
                <input
                  id="loginuser"
                  className="text-center rounded-pill px-4 p-1 bg-input"
                  value={email}
                  type="text"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group><br></br>

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='user1' >Email </Form.Label><br></br>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group><br></br>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='user3'>Password</Form.Label><br></br>
          <Form.Control
            type="password"
            placeholder="Password"
          />
        </Form.Group><br></br> */}

              <button1 onClick={validate} variant="primary" type="submit">Sign Up
              </button1><br></br><br></br>
              <p style={{fontSize:25}} className='acc2'>Already have an account?</p>
              <p style={{fontSize:25}} className='acc3' onClick={redirectToLogin}>Login</p>
            </Form>
            <br></br><br></br><br></br><br></br><br></br><br></br>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
