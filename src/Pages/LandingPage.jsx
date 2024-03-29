import ReviewCard from "../Components/ReviewCard";
import PerfectTripCard from "../Components/PerfectTripCard";
import Navbar from "../Components/Navbar";
import mountain1 from "../assets/images/Mountain1.png";
import mountain2 from "../assets/images/Mountain2.png";
import mountain3 from "../assets/images/Mountain3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import plane from "../icons/plane.svg";
import bed from "../icons/bed.svg";
import telegram from "../icons/telegram.svg";
import hotel from "../icons/hotel.svg";
import hotelpng from "../assets/images/hotel.png";
import flightpng from "../assets/images/Flight.png";
import paperPlane from "../icons/paperPlane.svg";
import MovingComponent from "react-moving-text";
import Aos from "aos";
import Videos from "./Vidoes";
import { connect } from "react-redux";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
function LandingPage({ dispatch }) {
  useEffect(() => {
    Aos.init({});
  }, []);

  const [trip, setTrip] = useState([]);

  const [say, setSay] = useState(3);
  useEffect(() => {
    fetch("http://localhost:1313/trips")
      .then((a) => a.json())
      .then((a) => {
        setTrip(a);
      });
  }, []);

  const increaseCount = () => {
    setSay(say + 3);
  };
  const decreaseCount = () => {
    setSay(3);
  };
  const [showFlight, setShowFlight] = useState(false);
  const [showPlace, setShowPlace] = useState(false);

  const [fromto, setFromto] = useState("");
  const [depart, setDepart] = useState("");
  const [returns, setReturns] = useState("");
  const [passenger, setPassenger] = useState("");

  const [enterdestination, setEnterDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("");

  const nav = useNavigate();

  const fromtoChange = () => {
    dispatch({
      type: "FROMTO_INPUT",
      payload: fromto,
    });
  };
  const departChange = () => {
    dispatch({
      type: "DEPART_INPUT",
      payload: depart,
    });
  };
  const returnChange = () => {
    dispatch({
      type: "RETURN_INPUT",
      payload: returns,
    });
  };

  const passengerChange = () => {
    dispatch({
      type: "PASSENGER_INPUT",
      payload: passenger,
    });
  };

  const commonFunc = (e) => {
    e.preventDefault();
    fromtoChange();
    departChange();
    returnChange();
    passengerChange();
    nav("/flight-listing");
  };
  const enterDestinationChange = () => {
    dispatch({
      type: "ENTERDESTINATION_INPUT",
      payload: enterdestination,
    });
  };
  const checkInChange = () => {
    dispatch({
      type: "CHECKIN_INPUT",
      payload: checkIn,
    });
  };
  const checkOutChange = () => {
    dispatch({
      type: "CHECKOUT_INPUT",
      payload: checkOut,
    });
  };
  const roomChange = () => {
    dispatch({
      type: "ROOM_INPUT",
      payload: rooms,
    });
  };
  const commonFunc2 = (e) => {
    e.preventDefault();
    enterDestinationChange();
    checkInChange();
    checkOutChange();
    roomChange();
    nav("/hotel-listing-one");
  };
  return (
    <>
      <div className="container__full">
        <section>
          <Navbar />
          <div className="introsection-flight-search">
            <Videos />
            <div data-aos-duration="4000" className="introsection-content">
              <MovingComponent
                type="fadeInFromBottom"
                duration="1500ms"
                delay="0s"
                direction="normal"
                timing="ease-out"
                iteration="1"
                fillMode="backwards"
              >
                <h3>Helping Others</h3>
              </MovingComponent>
              <MovingComponent
                type="fadeInFromBottom"
                duration="1500ms"
                delay="0s"
                direction="normal"
                timing="ease-out"
                iteration="1"
                fillMode="backwards"
              >
                <h1>Live & Travel</h1>
              </MovingComponent>
              <MovingComponent
                type="fadeInFromBottom"
                duration="1000ms"
                delay="0.5s"
                direction="normal"
                timing="ease-out"
                iteration="1"
                fillMode="backwards"
              >
                <h5>Special offers to suit your plan</h5>
              </MovingComponent>
            </div>
          </div>
          <div className="container_main">
            <div className="whereFlying">
              <div className="whereFlying_tab">
                <div
                  className={!showFlight ? "flying_tab_active" : null}
                  onClick={() => {
                    setShowFlight(!showFlight);
                    setShowPlace(!showPlace);
                  }}
                >
                  <img src={plane} alt="" /> Flights
                </div>
                <div
                  className={showPlace ? "flying_tab_active" : null}
                  onClick={() => {
                    setShowPlace(!showPlace);
                    setShowFlight(!showFlight);
                  }}
                >
                  <img src={bed} alt="" /> Stays
                </div>
              </div>
              <div
                className={
                  !showFlight
                    ? "show_flying flying-inputs"
                    : "hide_flying flying-inputs"
                }
              >
                <form action="">
                  <fieldset>
                    <legend>From - To</legend>
                    <input
                      value={fromto}
                      onChange={(e) => setFromto(e.target.value)}
                      type="text"
                      placeholder="Lahore - Karachi"
                    />
                
                  </fieldset>
                  <fieldset>
                    <legend>Depart</legend>
                    <input
                      onChange={(e) => setDepart(e.target.value)}
                      type="date"
                      name="departDate"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Return</legend>
                    <input
                      value={returns}
                      onChange={(e) => setReturns(e.target.value)}
                      type="date"
                      id="returnDate"
                      name="returnDate"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Passenger - Class</legend>
                    <select
                      id="passengerClass"
                      name="passengerClass"
                      onChange={(e) => setPassenger(e.target.value)}
                    >
                      <option value="">Passenger Class</option>
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First Class">First Class</option>
                    </select>
                  </fieldset>
                  <div className="flying-btns">
                    <button>
                      {!showFlight ? (
                        <img src={telegram} alt="" />
                      ) : (
                        <img src={hotel} alt="" />
                      )}

                      {!showFlight ? (
                        <Link onClick={commonFunc}>Show Flights</Link>
                      ) : (
                        <Link onClick={commonFunc2}>Show Places</Link>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div
                className={
                  showPlace
                    ? "show_flying flying-inputs"
                    : "hide_flying flying-inputs"
                }
              >
                <form action="">
                  <fieldset>
                    <legend>Enter Destination</legend>
                    <img src={bed} alt="" />
                    <input
                      value={enterdestination}
                      onChange={(e) => setEnterDestination(e.target.value)}
                      type="text"
                      placeholder="Istanbul, Turkey"
                    />
                  </fieldset>
                  <fieldset>
                    <legend>Check In</legend>
                    <input
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      type="date"
                      placeholder="Fri 12/2"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Check Out</legend>
                    <input
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      type="date"
                      placeholder="Sun 12/4"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Rooms & Guests</legend>

                    <select
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                    >
                      <option value="">Rooms & Guests</option>
                      <option value="1 Room - 1 Guest">1 Room - 1 Guest</option>
                      <option value="1 Room - 2 Guests">
                        1 Room - 2 Guests
                      </option>
                      <option value="1 Room - 3 Guests">
                        1 Room - 3 Guests
                      </option>
                      <option value="1 Room - 4 Guests">
                        1 Room - 4 Guests
                      </option>
                      <option value="1 Room - 5 Guests">
                        1 Room - 5 Guests
                      </option>
                      <option value="2 Rooms - 6 Guests">
                        2 Rooms - 6 Guests
                      </option>
                      <option value="2 Rooms - 7 Guests">
                        2 Rooms - 7 Guests
                      </option>
                      <option value="2 Rooms - 8 Guests">
                        2 Rooms - 8 Guests
                      </option>
                      <option value="2 Rooms - 9 Guests">
                        2 Rooms - 9 Guests
                      </option>
                      <option value="2 Rooms - 10 Guests">
                        2 Rooms - 10 Guests
                      </option>
                    </select>
                  </fieldset>

                  <div className="flying-btns">
                    <button>
                      {!showFlight ? (
                        <img src={telegram} alt="" />
                      ) : (
                        <img src={hotel} alt="" />
                      )}

                      {!showFlight ? (
                        <Link onClick={commonFunc}>Show Flights</Link>
                      ) : (
                        <Link onClick={commonFunc2}>Show Places</Link>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="text__button__content ">
              <div>
                <h1>Plan your perfect trip</h1>
                <p>
                  Search Flights & Places Hire to our most popular destinations
                </p>
              </div>
              {/* <button className="btn btn2" onClick={increaseCount}>See All</button> */}
              {say < trip.length ? (
                <div onClick={increaseCount} className="btn btn2 landingbtn">
                  <h4>See More</h4>
                </div>
              ) : (
                <div onClick={decreaseCount} className="btn btn2 landingbtn">
                  <h4>See Less</h4>
                </div>
              )}
            </div>

            <div className="perfect_trip_cards">
              {trip.slice(0, say).map((t, b) => {
                return (
                  <PerfectTripCard
                    key={b}
                    perfectCardImg={t.tripImg}
                    tripName={t.tripName}
                  />
                );
              })}
            </div>
            <div className="flight_hotel">
              <div
                className="flights"
                style={{ backgroundImage: `url(${flightpng})` }}
              >
                {/* <img src={flightpng} alt="" /> */}
                <div>
                  <h1>Flights</h1>
                  <h5>
                    Search Flights & Places Hire to our most popular
                    destinations
                  </h5>
                  <Link to="/flight-search" className="show_flight">
                    <img src={paperPlane} />
                    Show Flights
                  </Link>
                </div>
              </div>
              <div
                className="hotels"
                style={{ backgroundImage: `url(${hotelpng})` }}
              >
                {/* <img src={hotelpng} alt="" /> */}
                <div>
                  <h1>Hotels</h1>
                  <h5>
                    Search hotels & Places Hire to our most popular destinations
                  </h5>
                  <Link to="/hotel-search" className="show_flight">
                    <img src={paperPlane} />
                    Show Hotels
                  </Link>
                </div>
              </div>
            </div>
            <div className="text__button__content ">
              <div>
                <h1>Reviews</h1>
                <p>What people says about Golobe facilities</p>
              </div>
            </div>

            <div className="review_cards">
              <Swiper
                slidesPerView={3}
                spaceBetween={50}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },

                  650: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  900: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“A real sense of community, nurtured”
"
                    cardParagraf="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...
"
                    cardName="Olga"
                    cardTitle="Weave Studios – Kai Tak"
                    cardImg={mountain1}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“The facilities are superb. Clean, bright.”
"
                    cardParagraf="“A real sense of community, nurtured”Really appreciate the help and support from the staff...
"
                    cardName="Thomas"
                    cardTitle="Weave Studios – Olympic"
                    cardImg={mountain2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“A real sense of community, nurtured”
"
                    cardParagraf="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...
"
                    cardName="Eliot"
                    cardTitle="Weave Studios – Kai Tak"
                    cardImg={mountain3}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“A real sense of community, nurtured”
"
                    cardParagraf="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...
"
                    cardName="Olga"
                    cardTitle="Weave Studios – Kai Tak"
                    cardImg={mountain1}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“The facilities are superb. Clean, bright.”
"
                    cardParagraf="“A real sense of community, nurtured”Really appreciate the help and support from the staff...
"
                    cardName="Thomas"
                    cardTitle="Weave Studios – Olympic"
                    cardImg={mountain2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    cardHeading="“A real sense of community, nurtured”
"
                    cardParagraf="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...
"
                    cardName="Eliot"
                    cardTitle="Weave Studios – Kai Tak"
                    cardImg={mountain3}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(LandingPage);
