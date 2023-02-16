import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "", name:"" });
  const [resp, setResp] = useState("");
  var navigate = useNavigate()
  var isloggedin = useSelector(state=>state.isLoggedin)

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

      case "name":
        setUser((user) => {
            return { ...user, name: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  const userRegister = () => {
    if(!user.email || !user.name || !user.password){
        setResp('Please fill all details')
    }else{
        axios({
            url: "http://localhost:4000/register",
            method: "post",
            data: user,
          }).then(
            (response) => {
              console.log("response from api is ", response.data);
              if(response.data.status=='ok') navigate('/login')
              if(response.data.status=='duplicate') setResp(response.data.message)
            },
            (error) => {
              setResp('Something went wrong');
              console.log("error from api is ", error);
            }
          );
          console.log(user)

    }
  };

  return (
    <div>
     
      <div className=" bg px-4 py-5 px-md-5 text-center text-lg-start shadow-lg p-3 mb-5 bg-white rounded  " style={{backgroundColor: '#fae0d2'}}>
        <div className="container  opacity-100" >
          <div className="gx-lg-5 d-flex justify-content-center" >
            <div className="mb-5 mb-lg-0" >
                <div className="glass" >
                  <div className="py-5 px-md-5">
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-pizza-slice fa-2x me-3" style={{color: '#ff6219'}}></i>
                      <span className="h1 fw-bold mb-3">Pizzeria</span>
                    </div>
                    {/* <!--  name input --> */}
                    <div className="form-outline mb-4">
                      <input type="text" onChange={(e) => getUser(e, "name")} className="form-control" required/>
                      <label className="form-label">User Name</label>
                    </div>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                      <input type="email" onChange={(e) => getUser(e, "email")} className="form-control" required/>
                      <label className="form-label">Email address</label>
                    </div>
                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                      <input type="password" onChange={(e) => getUser(e, "password")} className="form-control" required/>
                      <label className="form-label">Password</label>
                    </div>
                    <div className="text-center">
                      <p style={{color:'red'}}>{resp}</p>
                    </div>
                    <div className="d-grid">
                      {/* <!-- Submit button --> */}
                      <button type="submit" onClick={userRegister} className="btn btn-primary btn-block">
                      Sign up
                      </button>
                    </div>
                    <div className="text-center">
                      <Link to="/login" style={{textDecoration:'none'}}> Log In here </Link>
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

export default Register;
