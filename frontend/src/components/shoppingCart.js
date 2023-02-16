import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import Navbar from "./navbar"



   //cart
   function checkOut(){
    axios({
        url:'mongodb+srv://admin:admin@cluster0.rhoe0pg.mongodb.net/?retryWrites=true&w=majority/checkout',
        method:'get',
        headers:{
            authorization : localStorage.token
        }
    }).then((response)=>{
        console.log(response.data)
    },(error)=>{
        console.log(error);
    })
}




function Cart(){

    let sum=0
    var [pizzaList, setPizzalist] = useState([])
    var [cartUpdateFlag, setCartUpdateFlag] = useState(0)
    var navigate = useNavigate()
    //fething pizza list from backend
    useEffect(()=>{
        axios({
            url : 'mongodb+srv://admin:admin@cluster0.rhoe0pg.mongodb.net/?retryWrites=true&w=majority/shoppingcart',
            method : 'get',
            headers : {
                authorization: localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            setPizzalist(response.data)
        },(error)=>{
            console.log(error)
            navigate('/login')
        })
    },[cartUpdateFlag])

    //decrease the qty of a pizza
    function decreaseQty(pizzaId){
        axios({
            url : 'mongodb+srv://admin:admin@cluster0.rhoe0pg.mongodb.net/?retryWrites=true&w=majority/reducepizza',
            method : 'post',
            data : {
                pizzaid:pizzaId
            },
            headers : {
                authorization : localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            if(response.data.status=='ok') setCartUpdateFlag((cartUpdateFlag)=>cartUpdateFlag+1)
        },(error)=>{
            console.log(error)
        })
    }

    function increaseQty(pizza){
        axios({
            url : 'mongodb+srv://admin:admin@cluster0.rhoe0pg.mongodb.net/?retryWrites=true&w=majority/addtocart',
            method : 'post',
            data : pizza,
            headers : {
                authorization : localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            if(response.data.status=='ok') setCartUpdateFlag((cartUpdateFlag)=>cartUpdateFlag+1)
        },(error)=>{
            console.log(error)
        })
    }


    //remove pizza from cart
    function removePizza(pizzaId){
        console.log(pizzaId)
        axios({
            url : 'mongodb://0.0.0.0:27017/removepizza',
            method : 'post',
            data : {
                pizzaid : pizzaId
            },
            headers : {
                authorization : localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            if(response.data) setCartUpdateFlag((cartUpdateFlag)=>cartUpdateFlag+1)
        },(error)=>{
            console.log(error)
        })
    }

    return(<div>
        <Navbar totalitems ={pizzaList.length}/>
            {pizzaList.map((each,index)=>{
                sum=sum+each.price*each.qty
                return <div className="card p-1 m-2 mb-3  shadow-lg p-3 mb-5 bg-white rounded" key={index}>
                        <div className="row">
                            <div className="col-2">
                                <img className="rounded float-start shadow" style={{width:"10rem",height:"11rem"}} src={each.pizzaimage} alt="Custom Pizza ha No Photo"/>
                            </div>
                            <div className="col-2 my-auto">
                                    <h3 className="card-title">{each.pizzaname}</h3>
                            </div>
                            <div className="col my-auto">
                                    <p className="card-text">
                                        {each.qty >= 2 && 
                                        <button onClick={()=>decreaseQty(each.pizzaid)} className="btn btn-dark">-</button>}
                                        Quantity:{each.qty} 
                                        <button onClick={()=>increaseQty(each)} className="btn btn-dark" >+</button>
                                    </p>
                            </div>
                            <div className="col my-auto">
                                    <p className="card-text"><b>Price :</b>₹{each.price}</p>
                            </div>
                            <div className="col my-auto">
                                    <p className="card-text"><b>Total Price :</b>₹{each.price*each.qty}</p>
                            </div>
                            <div className="col my-auto">
                                    <button onClick={()=>removePizza(each.pizzaid)} className="btn btn-danger" type="button">
                                    <i className="fa-solid fa-trash-can"></i></button>
                            </div>
                            </div>
                        </div>
            })}
        <div className="row">
            <div className="col-3">
                
            </div>
            {
                pizzaList.length<1 ?
                <></>
                :
                <><div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <h5 style={{color:'blue'}}>Total Price : {sum}</h5>
            <Link to='/orderplaced'>
            <button onClick={()=>checkOut()} className="btn btn-primary" type="button">
                <h5><i className="fa-solid fa-money-bill-wave"></i>Checkout</h5>
            </button>
            </Link>
        </div></>
            }
        
        </div>
    </div>)
}
{/* <button onClick={()=>contact()} className="btn btn-warning me-3" type="button">Contact</button> */}



export default Cart