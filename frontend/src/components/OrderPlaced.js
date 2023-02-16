import react from 'react'
import Navbar from './navbar'
function OrderPlaced(){
    return (
        
        <div className='orde'>
            <Navbar />
            <div class="card " >
  <img class=" giff center card-img-top" src="https://media4.giphy.com/media/peuSUXBXBEhAKlsE4y/giphy.gif?cid=ecf05e47vzi3loq0e5vizzzvz1vz7l8fat6sg308z541l8dn&rid=giphy.gif&ct=g" alt="Card image cap" />
  <div class="card-body">
    <p class="card-text">
    <h1 class="text-center">Order Received...</h1>
        </p>
        <p className='text-center'>Your order is on the way..</p>
  </div>

  
</div>
    
        </div>
        
    )
}
export default OrderPlaced