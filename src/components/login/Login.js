import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import './Stylesheet.css'
import {login} from "../../service/auth.service"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validate = (e) =>{
      if(!username){
        toast.info('Username should not be empty!')
        return false;
      }else if(!password){
        toast.info('Password should not be empty!')
        return false;
      }
      handleLogin(e);
      
  }

  const handleLogin=()=>{
    const loginResponse = login(username,password);
    loginResponse.then((res)=>{
      console.log('In handle login',res);
      if(res.status=='200'){
        toast.success('Login Successful!')
        sessionStorage.setItem('userId', username)        
        navigate('/booklist')
      }else{
        toast.error('Invalid Credentials!')
      }
    })
  }

  // const onclick = async (e) =>{
  //   e.preventDefault();
  //   try{
  //     let response = new LoginService().login(
  //       username,password
  //     );
  //     response.then((res)=>{
  //       console.log(res)
  //       //if(res.data.token)
  //       localStorage.setItem('token',res.data.token);
  //       localStorage.setItem('username',username);
  //       history.push('/dashboard');
  //     }).catch((res)=>{
  //       alert(res.response.data.message)
  //     });
     
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  const register = ()=>{
    navigate('/register')
  }
  
  return (<>
    <div>
      <ToastContainer/>
    <div className='body'>
            <div className=" col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div className='side'>
              <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 d-flex  justify-content-center align-items-center">
                <h1 className="head"
                  data-testid="loginheader"
                  id="loginhead"><br></br>
                  Login Here!</h1>
                </div>
              </div>
    <Form>
      <div className='mobo'>
      <Form.Group>
        <Form.Label className='user'>Username</Form.Label><br></br>
        <input
                    id="loginuser"
                    className="text-center rounded-pill px-4 p-1 bg-input"
                    value={username}
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
      </Form.Group><br></br>

      <Form.Group className="mop" controlId="formBasicPassword">
        <Form.Label className='user'>Password</Form.Label><br></br>
        <Form.Control  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
      </Form.Group><br></br>
      <button1 onClick={validate} variant="primary" type="submit" >Login
      </button1><br></br>
      </div>
      <p className="acc">Don't have an account? </p>
      <p style={{fontSize:25}}className="register" onClick={register}>Register</p><br></br>

    </Form>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
    </div>
    </div>
    </>
  );
}

export default Login;
