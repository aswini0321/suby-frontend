import React,{useState,useEffect} from 'react';
import NavBar from '../components/NavBar.jsx';
import SideBar from '../components/SideBar.jsx';
import Login from '../components/forms/Login.jsx';
import Register from '../components/forms/Register.jsx';
import AddFirm from '../components/forms/AddFirm.jsx';
import AddProduct from '../components/forms/AddProduct.jsx';
import Welcome from '../components/welcome.jsx';
import AllProducts from '../components/AllProducts.jsx';
import {Routes,Route} from 'react-router-dom';
const LandingPage =() =>
{
   const [showLogout,setShowLogout]=useState(false);
   const [showFirmTitle,setShowFirmTitle]=useState(true);
   const[showLogin,setShowLogin]=useState(false);
   const[showRegister,setShowRegister]=useState(false);
   const[showAllProducts,setShowAllProducts]=useState(false);
   const[showFirm,setShowFirm]=useState(false);
   const[showProduct,setShowProduct]=useState(false);
   const[showWelcome,setShowWelcome]=useState(false);
   const LogoutHandler=()=>
   {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('firmId');
        localStorage.removeItem('firmName');
        confirm("Are you sure want to logout?")
        setShowLogout(false);
        setShowFirmTitle(true);
        
   }
   useEffect(()=>
    {
          const firmName=localStorage.getItem('firmName');
          if(firmName)
          {
            setShowFirmTitle(false);
          }
    },[])
  useEffect(()=>
  {
        const loginToken=localStorage.getItem('loginToken');
        if(loginToken)
        {
          setShowLogout(true);
        }
  },[])
  const showLoginHandler=()=>
  {
    setShowLogin(true);
    setShowRegister(false);
    setShowProduct(false);
    setShowFirm(false);
    setShowAllProducts(false);

  }
  const showRegisterHandler=()=>
  {
    setShowRegister(true);
    setShowLogin(false);
    setShowProduct(false);
    setShowFirm(false);
    setShowAllProducts(false);

  }
  const showAllProductsHandler=()=>
  {
    if(showLogout)
    {
    setShowAllProducts(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowProduct(false);
    setShowFirm(false);
    }
    else
    {
      alert("please login");
      setShowLogin(true);
    }

  }
  const showFirmHandler=()=>
  {
    if(showLogout)
    {
    setShowFirm(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowProduct(false);
    setShowAllProducts(false);
    }
    else
    {
      alert("please login");
      setShowLogin(true);
    }

  }
  const showProductHandler=()=>
  {
    if(showLogout)
    {
    setShowProduct(true);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAllProducts(false);
    }
    else
    {
      alert("please login");
      setShowLogin(true);
    }
  }
  const showWelcomeHandler=()=>
  {
    setShowWelcome(true);
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAllProducts(false);
  }
  return(
    <>
        <div className='background'></div>
        <section className="landingSection">
          <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} LogoutHandler={LogoutHandler}/>
          <div className="collectionSection">
          <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          {showWelcome && <Welcome/>}
          {showFirm && showLogout && <AddFirm/>}
          {showProduct && showLogout &&  <AddProduct/>}
          {showAllProducts && showLogout && <AllProducts/>}
          </div>
        </section>
    
    </>
  )
}
export default LandingPage;