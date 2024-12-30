import React,{useState} from 'react';
import { API_Path } from '../../data/ApiPath';
const Register=({showLoginHandler})=> {

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);

    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        try{
              const response=await fetch(`${API_Path}/vendor/register`,{
                method:'POST',
                headers:
                {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username, email, password})
              });

              const data=await response.json();
              if(response.ok)
              {
                setUsername("");
                setEmail("");
                setPassword("");
                console.log(data);
                alert("vendor registered successfully");
                showLoginHandler();
              }
              else{
                alert("Details already exist")
              }
        }
        catch(error)
        {
              console.log("registration failed");
              alert("fail to register");
        }
    }
    return (
      <>
      <div className="allpages"></div>
        <div className="registerSection">

            <form className="authForm" onSubmit={handleSubmit}>
            <h1>VENDOR REGISTER</h1><br/>
                <label>userName</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="enter your username"/><br/>
                <label>Email</label>
                <input type="string" name="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/><br/>
                <label>Password</label>
                <input type="password" name="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/><br/>
                <div className="btnSubmit">
                <button type="submit">Submit</button>
                </div>
            </form>

        </div>
        </>
    );
}

export default Register;
