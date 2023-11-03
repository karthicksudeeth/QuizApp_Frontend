import { useState, useEffect,useTransition } from "react";
import './register.scss';
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import {Alert} from "@mui/material";
import Header from "../../Header/Header";


function Register(){
    const[password,setPassword]=useState('');
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[mobile,setMobile]=useState('');
    const[confirmpassword,setConfirmPassword]=useState('');
    const[loginState,setLoginState]=useState(true);
    const {enqueueSnackbar}=useSnackbar();

    const handlestate=()=>{
        console.log(loginState);
        
        console.log(loginState);
    }
    const logout=()=>{
        setLoginState(false);
    }
    
    const navigate=useNavigate();

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleNameChange=(e)=>{
        setName(e.target.value);
    }
    const handleMobileChange=(e)=>{
        setMobile(e.target.value);
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    const handleConfirmPassword=(e)=>{
        setConfirmPassword(e.target.value);
    }
    const HandleRegister=()=>{
      if(validateInput()){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name":name,"email":email,"mobile":mobile,"password":password })
      };
      (async()=>{
          const response=await fetch("http://localhost:8081/user/add",requestOptions);
          const responseJson= await response.json(); 
          
          if(validateInput()==true && response.ok==true){
            // console.log(responseJson.message);
         
            enqueueSnackbar(responseJson.message, { variant: "success",
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            } });
            navigate("/login");
           } 

           if(response.ok==false){
            enqueueSnackbar(responseJson.message, { variant: "warning",
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            } });

           }
      }
      )();
      }
           
           
  
    };

    const validateInput = () => {
    
        if (!name) {
          enqueueSnackbar("Name is a required field", { variant: "warning" ,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }});
          return false;
        }
        if (!email) {
          enqueueSnackbar("Email is a required field", { variant: "warning" ,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }});
          return false;
        }
        if (!mobile) {
          enqueueSnackbar("Mobile is a required field", { variant: "warning" ,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }});
          return false;
        }
        if (!password) {
          enqueueSnackbar("Password is a required field", { variant: "warning" ,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }});
          return false;
        }

        if (password.length < 6) {
          enqueueSnackbar("Password must be at least 6 characters", {
            variant: "warning",
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            }
          });
          return false;
        }
        if (password !== confirmpassword) {
          enqueueSnackbar("Password and confirm password do not match", { variant: "warning",
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          } });
          return false;
        }
        return true;
      };
    

    return (
      <div>
        <Header/>
     
      <div className="container">
        <div className="form-container">
          <h2>Register</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input
                type="password"
                id="mobile"
                value={confirmpassword}
                onChange={handleConfirmPassword}
              />
            </div>

            <button
              type="button"
              onClick={() => HandleRegister()}
              disabled={
                name == "" ||
                email == "" ||
                mobile == "" ||
                password == "" ||
                confirmpassword == "" || password!=confirmpassword
              }
            >
              {" "}
              Register
            </button>
          </form>
          <div className="GoToLogin">
            <p>Have an account?   </p>
            <a type="link" href="" onClick={()=>navigate('/login')}>Go to Login</a>
            
        </div>
        </div>
        </div>
      </div>
    );
}

export default Register;