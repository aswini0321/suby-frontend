import React,{useState} from 'react';
import { API_Path } from '../../data/ApiPath';
const Login=({showWelcomeHandler})=> {

     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const LoginHandler=async(e)=>
     {
        e.preventDefault();
        try
        {
            const response=await fetch(`${API_Path}/vendor/login`,{
                            method:'POST',
                            headers:
                            {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({email, password})
                          });
                          const data=await response.json();
                          console.log(data);
              if(response.ok)
              {
                  alert("login successfull");
                  localStorage.setItem('loginToken',data.token);
                  window.location.reload();
                  showWelcomeHandler();
                  const vendorId=data.vendorId;
                  console.log("vendorid is",vendorId);
                  const vendorResponse=await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`);
                  const vendorData=await vendorResponse.json();
                  console.log(vendorResponse);
                  if(vendorResponse.ok)
                  {
                    if(vendorData.vendor.firm[0])
                    {
                    const vendorFirmId =vendorData.vendorFirmId;
                    const vendorFirmName=vendorData.vendor.firm[0].firmName;
                    console.log(vendorFirmId);
                    localStorage.setItem('firmId',vendorFirmId);
                    localStorage.setItem('firmName',vendorFirmName);
                    }
                    else{
                        alert("no firm registered");
                    }
                  }
              }
              else
              {
                alert("Invalid login credentials");
              }
        }
        catch(error)
        {
            alert("login failed");
            console.log(error);
        }
     }
    return (
    
       <>
       <div className="allpages"></div>
        <div className="loginsection">
            <form className="authForm" onSubmit={LoginHandler}>
            <h1>VENDOR LOGIN</h1><br/>
                <label>Email</label>
                <input type="text"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="enter your email"/><br/>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}   placeholder="enter your password"/><br/>
                <div className="btnSubmit">
                <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
        </>
    );
}

export default Login;