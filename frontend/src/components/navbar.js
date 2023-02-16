import { useReducer,useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode"


function Navbar(props){
  var [cartCount, setCartCount] = useState([])
  var [userName, setUserName] = useState([])
  var navigate = useNavigate()
  const getemail=()=>{
    let email=""
    if(localStorage.token){
        const decode = jwt(localStorage.getItem('token'));
        console.log(decode)
        email=decode.email
        return email
    } 
    
}

const email=getemail()
console.log(email)




var [cartCount, setCartCount] = useState(0)

//fething cart count
useEffect(()=>{
  axios({
      url : 'http://localhost:4000/shoppingcart',
      method : 'get',
      headers : {
          authorization: localStorage.token
      }
  }).then((response)=>{
      console.log(response.data.length)
      setCartCount(response.data.length)
     
  },(error)=>{
      console.log(error)
  })
},[cartCount])



 








  var isloggedin = useSelector(state=>state.isLoggedin)

 function contact(){
  window.location.href='/contact'
 }

  function logout(){
    localStorage.clear()
    window.location.href='/'
  }
    return(
     
      <nav className="navbar navbar-expand-lg  shadow-lg p-3 mb-5 bg-white rounded ">
        <div className="container-fluid">
          <div className="align-self-start">
          <Link className="navbar-brand " to="/" >
           <strong>Pizzeria</strong> 
            <img src="./PizzeriaLogo.png" alt="Logo" width="60" height="50" className="d-inline-block align-text-center"/>
          </Link>
          {isloggedin && <>
            <Link  to="/order" className="col col-2 m-4 ">Order Pizza</Link>
            <Link to="/build" className="col">Build Ur Pizza</Link>
           {/* <a className="col">Hello </a> */}
          </>}
          {!isloggedin && <>
            <Link to="/login" className="col col-2">Order Pizza</Link>
            <Link to="/login" className="col">Build Ur Pizza</Link>
          </>}
          </div>
          <div className="align-self-start">
          {!isloggedin && 
          <Link to='/login'>
          <button className="btn btn-warning me-3" type="button">Login</button>
        </Link>}
          {isloggedin && <>
          
            <button onClick={()=>contact()} className="btn btn-warning me-3" type="button">Help</button>
           <button onClick={()=>logout()} className="btn btn-warning me-3" type="button">LogOut</button>
          <Link to='/cart'>
            <button type="button" className="btn btn-warning" ><i className="fa-solid fa-cart-shopping">
            {props.totalitems ?
              props.totalitems
               :
               cartCount
             
            }


              </i></button>
          </Link></>}
          </div>


        </div>
      </nav>







    )

}
export default Navbar;