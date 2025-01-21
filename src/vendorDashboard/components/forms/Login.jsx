import React, { useState } from 'react';
import { API_Path } from '../../data/ApiPath';  // Make sure this path is correct for your API endpoint

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState("");    // State to manage email input
    const [password, setPassword] = useState(""); // State to manage password input

    // Login form submit handler
    const LoginHandler = async (e) => {
        e.preventDefault();
        
        try {
            // Send login request to the backend API
            const response = await fetch(`${API_Path}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }) // Sending the email and password in the request body
            });

            const data = await response.json();  // Parse the response as JSON
            console.log('Login response:', data);

            if (response.ok) { // Check if response is successful
                alert("Login successful");

                // Store the login token, vendor ID, firm ID, and firm name in localStorage
                localStorage.setItem('loginToken', data.token);
                localStorage.setItem('vendorId', data.vendorId);
                localStorage.setItem('firmId', data.firmId);  // Ensure the backend sends firmId
                localStorage.setItem('firmName', data.firmName);  // Ensure the backend sends firmName

                // Reload page or redirect
                window.location.reload(); // Optional: You can replace this with React Router redirection to avoid page reload
                showWelcomeHandler();  // Show the welcome handler if provided

            } else {
                alert("Invalid login credentials");
            }

        } catch (error) {
            console.error('Login or API error:', error);
        }
    };

    return (
        <>
            <div className="allpages"></div>
            <div className="loginsection">
                <form className="authForm" onSubmit={LoginHandler}>
                    <h1>VENDOR LOGIN</h1><br />
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                        placeholder="Enter your email"
                    /><br />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                        placeholder="Enter your password"
                    /><br />
                    <div className="btnSubmit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;


// import React,{useState} from 'react';
// import { API_Path } from '../../data/ApiPath';
// const Login=({showWelcomeHandler})=> {

//      const [email,setEmail]=useState("");
//      const [password,setPassword]=useState("");
//      const LoginHandler=async(e)=>
//      {
//         e.preventDefault();
//         try
//         {
//             const response=await fetch(`${API_Path}/vendor/login`,{
//                             method:'POST',
//                             headers:
//                             {
//                                 'Content-Type':'application/json'
//                             },
//                             body:JSON.stringify({email, password})
//                           });
//                           const data=await response.json();
//                           console.log(data);
//               if(response.ok)
//               {
//                   alert("login successfull");
//                   localStorage.setItem('loginToken',data.token);
//                   window.location.reload();
//                   showWelcomeHandler();
//                   const vendorId=data.vendorId;
//                   console.log("vendorid is",vendorId);
//                   const vendorResponse=await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`);
//                   const vendorData=await vendorResponse.json();
//                   console.log(vendorResponse);
//                   if(vendorResponse.ok)
//                   {
//                     if(vendorData.vendor.firm[0])
//                     {
//                     const vendorFirmId =vendorData.vendorFirmId;
//                     const vendorFirmName=vendorData.vendor.firm[0].firmName;
//                     console.log(vendorFirmId);
//                     console.log(vendorFirmName);
//                     localStorage.setItem('firmId',vendorFirmId);
//                     localStorage.setItem('firmName',vendorFirmName);
//                     }
//                     else{
//                         alert("no firm registered");
//                     }
//                   }
//               }
//               else
//               {
//                 alert("Invalid login credentials");
//               }
//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//      }
//     return (
    
//        <>
//        <div className="allpages"></div>
//         <div className="loginsection">
//             <form className="authForm" onSubmit={LoginHandler}>
//             <h1>VENDOR LOGIN</h1><br/>
//                 <label>Email</label>
//                 <input type="text"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="enter your email"/><br/>
//                 <label>Password</label>
//                 <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}   placeholder="enter your password"/><br/>
//                 <div className="btnSubmit">
//                 <button type='submit'>Submit</button>
//                 </div>
//             </form>

//         </div>
//         </>
//     );
// }

// export default Login;