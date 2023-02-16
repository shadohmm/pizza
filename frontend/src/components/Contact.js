import react from 'react'
import Navbar from './navbar'
function Contact(){
    return(
        
        <div>
            <Navbar />
            <h1>Welcome to help section....</h1>
            <h2>Contact Details</h2>
            <ul>
                <li>Phone :- 123456789</li>
                <li>Email :- helpline@pizzeria.co.in</li>
                <li>Location :- Near Accenture HDC2 waverock</li>
            </ul>

            <h2>Request a Call Back</h2>
         <div>
         <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Phone Number</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="number" />
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
         </div>
        </div>
    )
}
export default Contact