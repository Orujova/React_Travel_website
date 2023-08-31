import leftline from "../icons/leftline.svg";
import rightline from "../icons/rightline.svg";
import radioBlack from "../icons/radioBlack.svg";
import hotel from "../icons/hotel.svg";
import rightvector from "../icons/rightvector.svg";
import { useParams, useLocation } from "react-router-dom";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BookingDetails() {
  const initialForm = {
    cardnumber: "",
    expdate: "",
    cvc: "",
    nameoncard: "",
    country: "",
    phonenumber: "",
  };
  const [formState, setFormState] = useState(initialForm);
  const { cardnumber, expdate, cvc, nameoncard, country, phonenumber } =
    formState;
  const [contactModal, setContactModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrorMessage("");
  };
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      country == "" ||
      nameoncard == "" ||
      cvc == "" ||
      expdate == "" ||
      cardnumber == "" ||
      phonenumber == ""
    ) {
      setErrorMessage("Please fill in all fields!");

      return;
    } else {
      setErrorMessage("");
    }
    handleOkButtonClick();
  };

  const [statefor, setStatefor] = useState(false);
  const nav = useNavigate();
  const handleOkButtonClick = () => {
    if (
      country !== "" &&
      nameoncard !== "" &&
      cvc !== "" &&
      expdate !== "" &&
      cardnumber !== ""
    ) {
      // setFormState(initialForm);
      setErrorMessage("")
      setStatefor(!statefor);
      
      //  nav(`/hotel-detailsCard/${id}`);
    }
  };

  const handleOkButtonClicknum = () => {
    if (phonenumber !== "") {
      setFormState(initialForm);
      setOpen(!open);
    }
  };
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hide, setHide] = useState(false);
  if (hide) {
    setOpen(false);
    setShowModal(false);
    setHide(false);
  }

  const loc = useLocation();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleNewClick = () => {
    setIsActive(!isActive);
  };

  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2605/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const checkIn = new Date(data.checkIn).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const checkOut = new Date(data.checkOut).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <section className="booking_detail">
        <div className="container">
          <div className="booking_detail_header">
            <h4>{data.destination}</h4>
            <img src={rightvector} alt="" />
            <h4>{data.name}</h4>
          </div>
        </div>
        <div className="container_main">
          <div className="airbus_section">
            <div>
              <div className="emirates">
                <div className="emirates__airbus">
                  <h2>{loc.state.room}</h2>
                  <h1>$240</h1>
                </div>

                <div className="emirates_logos">
                  <div className="emirates_main_logo emirates_main_logo_two">
                    <img src={data.image} alt="" />
                    <div>
                      <h1>{data.name}</h1>
                      <span>{data.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flight_time">
                  <h1>{checkIn}</h1>
                  <h3>Check-In</h3>
                  <img src={leftline} alt="" />
                  <img src={hotel} alt="" />
                  <img src={rightline} alt="" />
                  <h1>{checkOut}</h1>
                  <h3>Check-Out</h3>
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
                  {isActive ? (
                    <img onClick={handleClick} src={radioBlack} alt="" />
                  ) : (
                    <img onClick={handleClick} src={radio} alt="" />
                  )}
                </div>
                <div className={isActive ? "pay__part bg-salmon" : "pay__part"}>
                  <div>
                    <h3>Pay part now, part later</h3>
                    <p>
                      Pay $207.43 now, and the rest ($207.43) will be
                      automatically charged to the same payment method on Nov
                      14, 2022. No extra fees.
                    </p>
                  </div>
                  {!isActive ? (
                    <img onClick={handleClick} src={radioBlack} alt="" />
                  ) : (
                    <img onClick={handleClick} src={radio} alt="" />
                  )}
                </div>
              </div>

              <div
                className={
                  open ? "login__signUp hide_login_signUp" : "login__signUp"
                }
              >
                <h1>Login or Sign up to book</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  <p>
                    We’ll call or text you to confirm your number. Standard
                    message and data rates apply. Privacy Policy
                  </p>
                  <button
                    className="login_btn"
                    onClick={handleOkButtonClicknum}
                  >
                    Continue
                  </button>
                  {errorMessage && (
                    <h6 className="error-message">{errorMessage}</h6>
                  )}
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
                      setErrorMessage("");
                    }}
                    src={addCard}
                    alt=""
                  />
                  <span>Add a new card</span>
                </div>
              </div>
              {showModal && (
                <div className={hide ? "modal hide_modal" : "modal"}>
                  <form onSubmit={handleSubmit}>
                    <h1>
                      Add a card{" "}
                      <AiOutlineClose
                        className="modal_close"
                        onClick={() => setHide(!hide)}
                      />
                    </h1>
                    <AiOutlineClose
                      className="modal_close"
                      onClick={() => {
                        setOpen(!open);
                        setErrorMessage("");
                        setHide(!hide);
                      }}
                    />
                    <fieldset>
                      <legend>Card Number</legend>
                      <input
                        type="number"
                        name="cardnumber"
                        value={cardnumber}
                        onChange={handleChange}
                        placeholder="4321 4321 4321 4321"
                      />
                      <img src={visa} alt="" />
                    </fieldset>
                    <div>
                      <fieldset>
                        <legend>Exp. Date</legend>
                        <input
                          name="expdate"
                          value={expdate}
                          onChange={handleChange}
                          type="text"
                          placeholder="02/27"
                        />
                      </fieldset>
                      <fieldset>
                        <legend>CVC</legend>
                        <input
                          name="cvc"
                          value={cvc}
                          onChange={handleChange}
                          type="number"
                          placeholder="123"
                        />
                      </fieldset>
                    </div>

                    <fieldset>
                      <legend>Name on Card</legend>
                      <input
                        name="nameoncard"
                        value={nameoncard}
                        onChange={handleChange}
                        type="text"
                        placeholder="John Doe"
                      />
                    </fieldset>

                    <fieldset>
                      <legend>Country or Region</legend>
                      <input
                        name="country"
                        value={country}
                        onChange={handleChange}
                        type="text"
                        placeholder="United States"
                      />
                    </fieldset>
                    <h4>
                      <img src={checkbox} alt="" />
                      Securely save my information for 1-click checkout
                    </h4>

                    <button className="login_btn" onClick={handleOkButtonClick}>
                      <Link  className="hotel_modal_a"
                        to={statefor ? `/hotel-detailsCard/${id}` : ""}
                        state={{
                          place: loc.state.room,
                        }}
                      >
                        {" "}
                        Add a card
                      </Link>
                    </button>

                    {errorMessage && (
                      <h6 className="error-message">{errorMessage}</h6>
                    )}

                    <p>
                      By confirming your subscription, you allow The Outdoor Inn
                      Crowd Limited to charge your card for this payment and
                      future payments in accordance with their terms. You can
                      always cancel your subscription.
                    </p>
                  </form>
                </div>
              )}
            </div>

            <div className="economy">
              <div className="economy_div">
                <img src={data.image} alt="" />
                <div className="economy_text">
                  <h3>{data.name}</h3>
                  <h1>{loc.state.room}</h1>
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
                  Your booking is protected by <span>golobe</span>
                </h2>
              </div>
              <div className="economy_price">
                <h2 className="price_details">Price Details</h2>
                <div>
                  <h2>Base Fare </h2>
                  <h2>$240</h2>
                </div>
                <div>
                  <h2>Discount</h2>
                  <h2>$0</h2>
                </div>
                <div>
                  <h2>Taxes</h2>
                  <h2>$20</h2>
                </div>
                <div>
                  <h2>Service Fee</h2>
                  <h2>$5</h2>
                </div>
                <div>
                  <h2>Total</h2>
                  <h2>$265</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookingDetails;
