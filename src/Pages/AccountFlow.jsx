
import { connect } from 'react-redux'
import accountBack from "../assets/images/accountBack.png"
import john from "../assets/images/John.png"
import { Link } from 'react-router-dom'
import visa from "../icons/visaBlack.svg"
import radio from "../icons/radio.svg"
import addCard from "../icons/addCard.svg"
import checkbox from "../icons/checkbox.svg"
import { AiOutlineClose } from "react-icons/ai";
import swal from 'sweetalert';
import { RiDeleteBackFill } from "react-icons/ri";
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
function AccountFlow({basketHotelBuy,hotels,dispatch,tickets,basketTicketBuy}) {

  const initialForm = {
    cardnumber:"",
    expdate:"",
    cvc:"",
    nameoncard:"",
    country:""  
  };
  const [formState, setFormState] = useState(initialForm);
  const { cardnumber,expdate,cvc,nameoncard,country } = formState;
  const [contactModal, setContactModal] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrorMessage("");
    
    };
  const [errorMessage, setErrorMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    if (
      country == "" || nameoncard == ""|| cvc == ""|| expdate == ""|| cardnumber == ""
    ) {
      setErrorMessage("Please fill in all fields!");

      return;
    }
 
     else {
      
      setErrorMessage("");
    }
    handleOkButtonClick();

  };
  const showSwal=()=>{
    swal({
        title: "Are you sure you want to pay?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        className:"sweetSwall"
     
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("The payment was processed successfully", {
            icon: "success",
            className:"sweetSwall"
          });
        } else {
          swal("The payment was not processed!",{
            className:"sweetSwall"
          })
         
        }
      });
    setOpen(!open)
  }
  const nav=useNavigate()
 
  const handleOkButtonClick = () => {
    if (country !== "" && nameoncard !== "" &&cvc !== ""&& expdate !== ""&& cardnumber !== "") {
      setFormState(initialForm);
      showSwal()
    }  
    
  };
    const [showFlight,setShowFlight]=useState(true)
    const [showStays,setShowStays]=useState(false)
    const [showModal,setShowModal]=useState(false)
    const [showCard,setShowCard]=useState(false)
    const [open,setOpen]=useState(true)
   
    if(open){
        setShowCard(false)
        setShowModal(false)
        setOpen(false)
      } 
  
    
       
      const addToCard = (id) => {
        dispatch({
          type: "SET_BASKETTICKETBUY",
          payload: [...basketTicketBuy, { id: id }],
        });
      };
      const removeFromCard = (id) => {
        dispatch({
          type: "SET_BASKETTICKETBUY",
          payload: [...basketTicketBuy.filter((ticket) => ticket.id !== id)],
        });
      };

      const addToHotelCard = (id) => {
        dispatch({
          type: "SET_BASKETHOTELBUY",
          payload: [...basketHotelBuy, { id: id }],
        });
      };
      const removeFromHotelCard = (id) => {
        dispatch({
          type: "SET_BASKETHOTELBUY",
          payload: [...basketHotelBuy.filter((ticket) => ticket.id !== id)],
        });
      };
      
  return (
   <section className='account_section'>
        <div className="container_main">
            <div className='account_back'><img src={accountBack} alt="" /></div>
            <div className='account_logo'>
            <img src={john} alt="" />
                <h1>John Doe.</h1>
            <p>john.doe@gmail.com</p>
            </div>
            <h1 className='account_h1'>Tickets/Bookings</h1>
            <div className='account_tab'>
                <div className={showFlight?"account_active_tab":null} onClick={()=>{
                    setShowStays(!showStays)
                    setShowFlight(!showFlight)
                    
                    }}>
                        <h1> Flights</h1>
                        <span>{basketTicketBuy.length} marked</span>
                       </div>
                <div className={showStays?"account_active_tab":null}  
                onClick={()=>{setShowStays(!showStays)
                    setShowFlight(!showFlight)
                   
                }}>
                    <h1>Stays</h1>
                    <span>{basketHotelBuy.length} marked</span>
                    </div>
              
               
            </div>
           
            <div >
            <div style={showFlight? {display:"block"}:{display:"none"}}>
            {
           tickets.length ? basketTicketBuy.map((basketItem)=>{
          let ticket=tickets.find((a)=>a.id===basketItem.id)
          const inBasketBuy = basketTicketBuy.find(
            (t) => t.id === basketItem.id)
          return(
             <div  className='account_card'  key={ticket.id}>
                <div><img src={ticket.image} alt="" /></div>
                <div>
                    <div><h4>{ticket.from}</h4>
                    <h2>{ticket.departTime}</h2>
                    </div>
                    <div><h2>—</h2></div>
                    <div><h4>{ticket.to}</h4>
                    <h2>{ticket.arrivalTime}</h2>
                    </div>
                </div>
                <div>
                    <div>
                    <h4>Date</h4>
                    <h2>{ticket.departDate}</h2>
                    </div>
                    <div><h2>—</h2></div>
                    <div>
                        <h4>Return Date</h4>
                        <h2>{ticket.returnDate}</h2>
                    </div>
                </div>
                <div>
                <Link onClick={()=>setShowCard(!showCard)} to="" href="">Download Ticket</Link>

                
                </div>
                <div className="add_to_basket">
                        {inBasketBuy ? (
                          <button onClick={() => removeFromCard(ticket.id)}>
                            <RiDeleteBackFill  className='remove_basket'/>
                          </button>
                        ) : (
                          <button onClick={() => addToCard(ticket.id)}>
                            <RiDeleteBackFill className='remove_basket'/>
                          </button>
                        )}
                      </div>

          </div>
          )
        }):null
       } 
            </div>
            <div  style={showStays?{display:"block"}:{display:"none"} }>
                
            {
          hotels.length?  basketHotelBuy.map((basketItem)=>{
          let ticket=hotels.find((a)=>a.id===basketItem.id)
          const inBasketBuy = basketHotelBuy.find(
            (t) => t.id === basketItem.id)
          return(
           
             <div  className='account_card'  key={ticket.id}>
              <div className='account_hotel_image'><img src={ticket.image} alt="" /></div>
              <div>
                <div>
                    
                    <h4>{ticket.destination}</h4>
                    </div>
                    <div><h2>—</h2></div>
                   
                    <h4>{ticket.location}</h4>
                    </div>
             
                <div>
                    <div>
                    <h4>Name</h4>
                        <h2>{ticket.name}</h2>
                  
                    </div>
                    <div><h2>—</h2></div>
                    <div>
                    <h4>price</h4>
                    <h2>{ticket.price}</h2>
                    </div>
                </div>
                <div>
                <Link onClick={()=>setShowCard(!showCard)} to="" href="">Download Ticket</Link>
                </div>
                <div className="add_to_basket">
                        {inBasketBuy ? (
                          <button onClick={() => removeFromHotelCard(ticket.id)}>
                            <RiDeleteBackFill className='remove_basket' />
                          </button>
                        ) : (
                          <button onClick={() => addToHotelCard(ticket.id)}>
                            <RiDeleteBackFill  className='remove_basket' />
                          </button>
                        )}
                      </div>
          </div>
       
          )
        }):null
       }
            </div>

            {showCard && 
                <div className='account-card'>
                    <div className="add_new_card show_login_signUp account_new_card" >
                    <AiOutlineClose className="modal_close" onClick={()=>setShowCard(!showCard)}/>
                   <div>
                     <div>
                 <img src={visa} alt="" />
                       <h2>**** 4321 <span>02/27</span></h2>
                     </div>
                       <img src={radio} alt="" />
       
                   </div>
                   <div>
                      <img onClick={()=>setShowModal(!showModal)}  src={addCard} alt="" />
                      <span>Add a card</span>
                   </div>
                 </div>
                </div>
                   
                }
                {
                    showModal && 
                    <div className='modal'>
                    <form onSubmit={handleSubmit}>
                    <h1>Add a card  <AiOutlineClose className="modal_close" onClick={()=>setHide(!hide)}/></h1>
                    <AiOutlineClose className="modal_close" onClick={()=>{
                      setOpen(!open)
                      setErrorMessage("")
                    }}/>
                    <fieldset>
                   
                       <legend>Card Number</legend>
                       <input type="number"
                       name="cardnumber"
                       value={cardnumber}
                       onChange={handleChange} 
                         placeholder="4321 4321 4321 4321"/>
                         <img src={visa} alt="" />
                       </fieldset>
                       <div>
                       <fieldset>
                       <legend>Exp. Date</legend>
                       <input
                       name="expdate"
                       value={expdate}
                       onChange={handleChange} 
                        type="text"    placeholder="02/27"/>
                       
                       </fieldset>
                       <fieldset>
                       <legend>CVC</legend>
                       <input
                       name="cvc"
                       value={cvc}
                       onChange={handleChange} 
                        type="number"  placeholder="123"/>
                       </fieldset>
                       </div>
           
                       <fieldset>
                       <legend>Name on Card</legend>
                       <input
                            name="nameoncard"
                            value={nameoncard}
                            onChange={handleChange}

                        type="text"  placeholder="John Doe"/>
                       </fieldset>
           
                       <fieldset>
                       <legend>Country or Region</legend>
                       <input
                        name="country"
                        value={country}
                        onChange={handleChange}
                        type="text"  placeholder="United States"/>
                       </fieldset>
                       <h4><img src={checkbox} alt="" />Securely save my information for 1-click checkout</h4>
                       <button className='login_btn'  onClick={handleOkButtonClick}>Add Card</button>
            {errorMessage && (
                  <h6 className="error-message">{errorMessage}</h6>
                )}
                      
                       <p>By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</p>
                    </form>
                    
               </div>
                }
            </div>
         
        </div>
       
      
   </section>
  )
}


const t=(a)=>a
export default connect(t)(AccountFlow)