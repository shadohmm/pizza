import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Rowtab from "./Rowtab";
import { Link, useNavigate } from "react-router-dom";
function BuildPage() {
    var [cost, setCost] = useState(0);
    var [resp, setResp] = useState('')
    const navigate = useNavigate()

    const getPrice = (data, check) => {
        setResp('')
        if (check === true) {
            setCost(prev => { return prev + data })
        }
        else {
            setCost(prev => { return prev - data })
        }
        
    }

    var [pizza, setpizza] = useState([])

    //getting ingrediants from backend
    useEffect(() => {
        axios({
            url: "http://localhost:4000/ingredients",
            method: "get",
            headers : {
                authorization : localStorage.token
            }
        }).then((response) => {
            console.log("response from all pizza api", response)
            setpizza(response?.data)

        }, (error) => {
            console.log("Error from all pizza s api ", error)
            navigate('/login')
        })
    }, [])

    //add to cart
    const addToCart=(cost)=>{
        if(cost<=200) {
            setResp('Cost should be atlest 200')
        }else{
            axios({
                url : "http://localhost:4000/addtocart",
                method : 'post',
                data : {
                    pizzaname : 'Custom Pizza',
                    pizzaid : Math.random()*1000,
                    price : cost,
                    pizzaimage: "https://media.istockphoto.com/id/1077400460/vector/build-your-own-pizza-set.jpg?s=1024x1024&w=is&k=20&c=_WzA3txb8J5BX3PokQMpUcIRN9haiJEN16Fw7297yY4="

                },
                headers : {
                    authorization : localStorage.token
                }
            }).then((response)=>{
                console.log(response.data)
                navigate('/cart')
            },(error)=>{
                console.log(error)
                setResp('Somethig went wrong!!')
            })

        }
        
    }


    return (
        <div>
            <Navbar />
            <p style={{ 'textAlign': 'center' }}>Pizzeria now gives you options to build you own pizza. Customize your pizza by choosing ingredients from the list given below</p>


            {/* table display */}


            <div className="d-flex justify-content-center text-center" >
                <table className="table  table-striped " style={{ 'marginRight': '15%', 'marginLeft': '15%', 'border': '2px solid grey' }} >
                    { 
                        //for individual rows    
                        pizza.map((each,index) => {
                            return <tbody  key={index}><Rowtab  data={each} getPriceHandler={getPrice} /></tbody>
                        })
                    }
                </table>  
            </div>
            <div className="text-center">
                    <h6 style={{color:'red'}}>{resp}</h6>
            </div>
            <div style={{margin:'0 15%',color:'blue'}}>
                <h3>Total Cost: ₹ {cost}</h3>
            </div> 
            <div className="d-grid gap-2 col-4 mx-auto">
                <button onClick={()=>{addToCart(cost)}} type="button"  className="btn btn-dark" style={{'color':'orange'}}><h4>Build Ur Pizza</h4></button> 
            </div>
        </div>
    )
}
export default BuildPage;