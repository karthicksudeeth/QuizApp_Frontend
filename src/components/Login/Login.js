import { useState ,useEffect} from "react";
import './login.scss';
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import Header from "../../Header/Header";

export default function Login(){
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[dataJson,setDataJson]=useState();
    const navigate=useNavigate();
    const {enqueueSnackbar}=useSnackbar();

    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    // const persistLogin = (username, email) => {
    //     (async()=>{
    //     const response = await fetch('https://api.npms.io/v2/search?q=react');
    // const data = await response.json();
    //     localStorage.setItem("username", username);
    //     })();
        
    //   };
    const HandleLogin=(e)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email":username,"password":password})
        };
        (async()=>{
            const response=await fetch("http://localhost:8081/login",requestOptions);
            const data=await response.json();
            console.log(response);
            
            if( response.ok == true){
                localStorage.setItem("username", data.username);
            localStorage.setItem("email",username);
            
                enqueueSnackbar("Login Success", { variant: "success",
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                } });
                navigate("/home");
               }
               else{
                enqueueSnackbar("Invalid username or password", { variant: "warning",
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                } });

               }

        }
        
        )();
      
        
        
    };

    return (
    <div>
        <Header/>
    
        <div className="container">
        <div className="form-container">
        <h2>Login</h2>
        <form>
            <div className="form-group">
                <label htmlFor="username">Email:</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange}/>

            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <button type="button" onClick={()=>HandleLogin()} disabled={username==''}> Login
                </button>
        
        </form>
        <div className="signup">
            <p>Don't have account?  </p>
            <a type="link" href="" onClick={()=>navigate('/register')}>Sign up</a>
            
        </div>
        </div>
        </div>
        </div>);
    
}
