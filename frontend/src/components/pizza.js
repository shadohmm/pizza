import axios from "axios"
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import React, {  useState } from "react";
export default function Pizza(props){

    const addToCart=()=>{
        axios({
            url : "http://localhost:4000/addtocart",
            method : 'post',
            data : {
                pizzaname : props.data.name,
                pizzaid : props.data.id,
                pizzaimage : props.data.image,
                price : props.data.price
            },
            headers : {
                authorization : localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
        },(error)=>{
            console.log(error)
        })
    }

    //model boot strap model
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return<>
        <div className="card my-2 px-2  shadow-lg p-3 mb-5 bg-white rounded m-2 float-left " style={{width : "100%", height:'90%', margin:'100px'}}>
            <div className="row">
                <div className="col-9">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4 text-center">
                                <h5 className="card-title">{props.data.name}</h5>
                                <div className="ps-2">
                                    <i className="fa-sharp fa-solid fa-square" style={{color: props.data.type != 'nonveg'?'green':'red'}}></i>
                                </div>
                                <h6 className="mt-5">₹{props.data.price}</h6>
                            </div>
                            <div className="col-8">
                            <p className="card-text">{props.data.description}</p>
                            <p className="card-taxt"><b>Ingrediants : </b>{props.data.ingredients.map((each,index)=>{
                                return <small key={index}>{each},</small>
                            })}</p>
                            <p className="card-taxt"><b>Topping : </b>{props.data.topping.map((each,index)=>{
                                return <small key={index}>{each},</small>
                            })}</p>
                            </div>
                        </div>
                        </div>
                </div>
                <div className="col-3 text-center">
                    <img src={props.data.image} style={{width:'8rem',height:'8rem'}} className="rounded float-end" onClick={handleShow} alt="pizza"/>
                    <Link to="/cart" onClick={addToCart} className="btn btn-warning ms-1">Add to Cart</Link>
                </div>
            </div>

{/* boot strap model for large item display */}



      <Modal show = {show}>
        <Modal.Header >
          <Modal.Title>{props.data.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={props.data.image}></img>
          <p>{props.data.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>CLOSE</button>
        </Modal.Footer>
      </Modal>
    </div>




       
    </>
}