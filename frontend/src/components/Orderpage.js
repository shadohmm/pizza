import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "./navbar";
import Pizza from "./pizza";

function Orderpage(){
    var [pizzaList, setPizzalist] = useState([])
    var navigate = useNavigate()
    useEffect(()=>{
        axios({
            url : 'http://localhost:4000/pizzaDetails',
            method : 'get',
            headers : {
                authorization : localStorage.token
            }
        }).then((response)=>{
                console.log(response.data)
                setPizzalist(response.data)
        },(error)=>{
            navigate('/login')
            console.log(error)
        })
    },[])
    return (
        <div>
            <Navbar/>
            <div className="row">
                {
                    pizzaList.map((element,index)=>{
                        return  <div key={index} className="col-6">
                            <Pizza data={element}/>
                            </div>
                    })
                }
            </div>
        </div>
    )
}
export default Orderpage;