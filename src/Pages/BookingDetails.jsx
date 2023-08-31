import plane from "../icons/plane.svg";
import vifi from "../icons/vifi.svg";
import timer from "../icons/timer.svg";
import fastfood from "../icons/fastfood.svg";
import seat from "../icons/seat.svg";
import leftline from "../icons/leftline.svg";
import rightline from "../icons/rightline.svg";
import radioBlack from "../icons/radioBlack.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import face from "../icons/face.svg";
import google from "../icons/google.svg";
import apple from "../icons/apple.svg";
import mail from "../icons/mail.svg";
import visa from "../icons/visaBlack.svg";
import radio from "../icons/radio.svg";
import addCard from "../icons/addCard.svg";
import checkbox from "../icons/checkbox.svg";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
function BookingDetails() {
  const initialForm = {
    cardnumber:"",
    expdate:"",
    cvc:"",
    nameoncard:"",
    country:""  ,
    phonenumber:""
  };
  const [formState, setFormState] = useState(initialForm);
  const { cardnumber,expdate,cvc,nameoncard,country,phonenumber } = formState;
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
      country == "" || nameoncard == ""|| cvc == ""|| expdate == ""|| cardnumber == ""||phonenumber ==""
    ) {
      setErrorMessage("Please fill in all fields!");

      return;
    }
 
     else {
      
      setErrorMessage("");
    }
    handleOkButtonClick();

  };
 

  const nav=useNavigate()
  const handleOkButtonClick = () => {
    if (country !== "" && nameoncard !== "" &&cvc !== ""&& expdate !== ""&& cardnumber !== "") {
      setFormState(initialForm);
      nav(`/booking-detailsCard/${id}`)
    }  
    
  };
  const handleOkButtonClicknum = () => {
    if (phonenumber!=="") {
      setFormState(initialForm);
      setOpen(!open);
    }  
    
  };

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleNewClick = () => {
    setIsActive(!isActive);
  };

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hide, setHide] = useState(false);
  if (hide) {
    setOpen(false);
    setShowModal(false);
    setHide(false);
  }

  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2605/tickets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const formattedDate = new Date(data.departDate).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <section
      className={
        showModal ? "booking_detail blur_booking_detail " : "booking_detail"
      }
    >
      <div className="container_main">
        <div className="airbus_section">
          <div>
            <div className="emirates">
              <div className="emirates__airbus">
                <h2>{data.airline} A380 Airbus</h2>
                <h1>${data.price}</h1>
              </div>
              <div className="return__date">
                <h3>Return {formattedDate}</h3>
                <h3>{data.durationstring}</h3>
              </div>
              <div className="emirates_logos">
                <div className="emirates_main_logo">
                  <img src={data.image} alt="" />
                  <div>
                    <h1>{data.airline}</h1>
                    <span>Airbus A320</span>
                  </div>
                </div>
                <div className="emirates_svgs">
                  <div>
                    <img src={plane} alt="" />
                  </div>
                  <div>
                    <img src={vifi} alt="" />
                  </div>
                  <div>
                    <img src={timer} alt="" />
                  </div>
                  <div>
                    <img src={fastfood} alt="" />
                  </div>
                  <div>
                    <img src={seat} alt="" />
                  </div>
                </div>
              </div>

              <div className="flight_time">
                <h1>{data.departTime}</h1>
                <h3>Newark(EWR)</h3>
                <img src={leftline} alt="" />
                <img src={plane} alt="" />
                <img src={rightline} alt="" />
                <h1>{data.arrivalTime}</h1>
                <h3>Newark(EWR)</h3>
              </div>
            </div>
            <div className="pay__main">
              <div
                className={
                  !isActive ? "pay__in__full bg-salmon" : "pay__in__full"
                }
              >
                <div>
                  <h3>Pay in full</h3>
                  <p>Pay the total and you are all set</p>
                </div>
                {
                  isActive ?
                  <img onClick={handleClick} src={radioBlack} alt="" />: <img onClick={handleClick} src={radio} alt="" />

                }
               
              </div>
              <div className={isActive ? "pay__part bg-salmon" : "pay__part"}>
                <div>
                  <h3>Pay part now, part later</h3>
                  <p>
                    Pay $207.43 now, and the rest ($207.43) will be
                    automatically charged to the same payment method on Nov 14,
                    2022. No extra fees.
                  </p>
                </div>
                {
                  
                  !isActive ?
                  <img onClick={handleClick} src={radioBlack} alt="" />: <img onClick={handleClick} src={radio} alt="" />

                }
              </div>
            </div>
            <div
              className={
                open ? "login__signUp hide_login_signUp" : "login__signUp"
              }
            >
              <h1>Login or Sign up to book</h1>
              <form onSubmit={handleSubmit}>
              <input type="number"
               name="phonenumber"
               value={phonenumber}
               onChange={handleChange} 
               placeholder="Phone Number" />
 <p>
                We’ll call or text you to confirm your number. Standard message
                and data rates apply. Privacy Policy
              </p>
              <button className='login_btn'  onClick={handleOkButtonClicknum}>Continue</button>
            {errorMessage && (
                  <h6 className="error-message">{errorMessage}</h6>
                )}
              {/* <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="continue"
              >
                <h2>Continue</h2>
              </div> */}
               </form>
             
              <div className="or">
                <h3>Or</h3>
              </div>
              <div className="login_logos">
                <div>
                  <img src={face} alt="" />
                </div>
                <div>
                  <img src={google} alt="" />
                </div>
                <div>
                  <img src={apple} alt="" />
                </div>
              </div>
              <div className="mail">
                <img src={mail} alt="" />
                <h2>Continue with email</h2>
              </div>
            </div>
            <div
              className={
                open ? "show_login_signUp add_new_card" : "add_new_card"
              }
            >
              <div>
                <div>
                  <img src={visa} alt="" />
                  <h2>
                    **** 4321 <span>02/27</span>
                  </h2>
                </div>
                <img src={radio} alt="" />
              </div>
              <div>
                <img
                  onClick={() => {
                    setShowModal(!showModal);
                    setErrorMessage("")
                    // setHide(!hide)
                  }}
                  src={addCard}
                  alt=""
                />
                <span>Add a card</span>
              </div>
            </div>
            {
                    showModal && 
                    <div className={hide ? "modal hide_modal" : "modal"}>
                    <form onSubmit={handleSubmit}>
                    <h1>Add a card  <AiOutlineClose className="modal_close" onClick={()=>setHide(!hide)}/></h1>
                    <AiOutlineClose className="modal_close" onClick={()=>{
                      setOpen(!open)
                      setErrorMessage("")
                      setHide(!hide)
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

          <div className="economy">
            <div className="economy_div">
              <img src={data.airportImg} alt="" />
              <div className="economy_text">
                <h3>{data.passengerClass} </h3>
                <h1>{data.airline} A380 Airbus</h1>
                <div>
                  <div>
                    <p>{data.rating}</p>
                  </div>
                  <h4>
                    {data.reviewQuality} {data.reviewCount} reviews
                  </h4>
                </div>
              </div>
            </div>
            <div>
              <h2>
                Your booking is protected by <span>golobe</span>{" "}
              </h2>
            </div>
            <div className="economy_price">
              <h2 className="price_details">Price Details</h2>
              <div>
                <h2>Base Fare </h2>
                <h2>$400</h2>
              </div>
              <div>
                <h2>Discount</h2>
                <h2>$400</h2>
              </div>
              <div>
                <h2>Taxes</h2>
                <h2>$400</h2>
              </div>
              <div>
                <h2>Service Fee</h2>
                <h2>$400</h2>
              </div>
              <div>
                <h2>Total</h2>
                <h2>$400</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDetails;
