import Footer from "./footer";
import Navbar from "./navbar";

function Home(){
return(
    <div>
        <Navbar/>
        <h1 style={{'textAlign':'center'}}>Our Story</h1><br/>
        <p className="story">We believe in good We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come upwith wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers Their enthusiastic response provedthat Pizzena's Fresh Pan Pizza is the Tastlest Pan Pizza Ever!</p>
        <p className="story">Ever since we launched the Tastest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butterest Domino's Fresh PanPizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match</p>
        <p className="story">We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and funexcuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzena's FreshPan Pizza is the Tastiest Pan Pizza, Ever!</p>
        <div className="container1">
            <div className="image1">
        <img className="ing" src="https://www.shutterstock.com/image-photo/raw-dough-pizza-ingredients-spices-600w-526830277.jpg" alt="" height='300px'/>
        </div>
        <div className='text1'>
            <h2 style={{'fontWeight':'light'}}>Ingredients</h2>
            <p>We're ruthless about goodness. We have no qualms about tearig up a day-old lettuce leaf (straight from the farm),or streaming a baby(carrot). Cut Cut Chop Chop Steam Steam Stir Stir. While they're still young and fresh -that's our motto . It makes the kitchen a better place.</p>
        </div>
        </div>
        <div className="container2">
        <div className='text2'>
            <h1 >Our Chefs</h1>
            <p style={{'marginTop':'10px','marginRight':'10px'}}>They make sauces sing and salads dance. They create magic with skill,knowledge ,passion,and stirring spoons (among other thigs ). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you. </p>
        </div>
            <div >
        <img src="https://www.shutterstock.com/image-photo/happy-chef-600w-437116033.jpg" alt="" id="image2" height="300px"/>
        </div>
        
        </div>
        <div className="container1">
            <div className="image3">
        <img  src="https://www.shutterstock.com/image-photo/vintage-analog-kitchen-countdown-timer-600w-669255388.jpg" alt="" height='280px'/>
        </div>
        <div className='text3'>
            <h1>45 min delivery</h1>
        </div>
        </div>
        <Footer />
    </div>
    
        
)
}
export default Home;