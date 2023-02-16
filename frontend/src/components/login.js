import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  var isloggedin = useSelector(state=>state.isLoggedin)
  const [user, setUser] = useState({ email: "", password: "", name:"" });
  const [resp, setResp] = useState("")
  const dispatch = useDispatch()
  var navigate = useNavigate()

  useEffect(()=>{
    if(isloggedin){
      navigate('/')
    }
  },[])

  const getUser = (e, type) => {
    setResp('')
    switch (type) {
      case "email":
        setUser((user) => {
          return { ...user, email: e.target.value };
        });
        break;

      case "password":
        setUser((user) => {
          return { ...user, password: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  const userLogin = () => {
    if(!user.email || !user.password){
        setResp('Please fill all details')
    }else{
        axios({
            url: "http://localhost:4000/login",
            method: "post",
            data: user,
          }).then(
            (response) => {
              console.log("response from api is ", response.data);
              if(response.data.token){
                window.localStorage.setItem('token',response.data.token)
                dispatch({
                  type : 'LOGIN'
                })
                navigate('/')
              }
              if(response.data.status=='invalid') setResp(response.data.message)
            },
            (error) => {
              setResp('Something went wrong!!');
              console.log("error from api is ", error);
            }
          );
    }
  };

  return (
    <div>
      <div className=" loginbg container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col col-xl-10 s">
            <div className="glass" style={{borderRadius: '1rem'}}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="long-pizza.jpg"
                    alt="pizza img" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className=" p-4 p-lg-5 text-black">
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-pizza-slice fa-2x me-3" style={{color: '#ff6219'}}></i>
                      <span className="h1 fw-bold mb-0">Pizzeria</span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                    <div className="form-outline mb-4">
                      <input type="email" onChange={(e) => getUser(e, "email")} className="form-control form-control-lg" required/>
                      <label className="form-label" >Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" onChange={(e) => getUser(e, "password")} className="form-control form-control-lg" required/>
                      <label className="form-label">Password</label>
                    </div>

                    <div className="d-grid mb-4 text-center">
                      <p style={{color:'red'}}>{resp}</p>
                      <button type="button" onClick={userLogin} className="btn btn-warning btn-lg btn-block">Login</button>
                    </div>
                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? 
                      <Link to="/register" style={{textDecoration: 'none'}}>.  Register here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
