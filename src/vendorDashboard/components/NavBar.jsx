import React from 'react';
const NavBar=({showLoginHandler,showRegisterHandler,showLogout, LogoutHandler})=>
{
    const firmName=localStorage.getItem('firmName');
    return(
    
         <div className="navSection">
            <div className="company">
              vendorDashBoard
            </div>
            <div className="firmName">
             <h3>FirmName:{firmName}</h3>
            </div>
            <div className="userAuth">
               {!showLogout?
               <>
                <span onClick={showLoginHandler}>
                Login/
             </span>
             <span onClick={showRegisterHandler}>
                Register
             </span>
               </>
              :<span onClick={LogoutHandler}>
              Logout
           </span> }
            
         </div>
         </div>
    )
    
}
export default NavBar;
