import { connect } from "react-redux";
import { useState } from "react";
import Star from "../assets/images/Star.png";
import cafe from "../assets/images/cafe.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";


function Favorities({ basketHotel, hotels, dispatch, tickets, basketTicket }) {
  const [showTicket, setShowTicket] = useState(true);
  const [showHotel, setShowHotel] = useState(false);
  useEffect(() => {
    localStorage.setItem("basketTicket", JSON.stringify(basketTicket));
  }, [basketTicket]);
  const addToBasket = (id) => {
    dispatch({
      type: "SET_BASKETTICKET",
      payload: [...basketTicket, { id: id }],
    });
  };

  const removeFromBasket = (id) => {
    dispatch({
      type: "SET_BASKETTICKET",
      payload: [...basketTicket.filter((ticket) => ticket.id !== id)],
    });
  };

  useEffect(() => {
    localStorage.setItem("basketHotel", JSON.stringify(basketHotel));
  }, [basketHotel]);

  const addToHotelBasket = (id) => {
    dispatch({
      type: "SET_BASKETHOTEL",
      payload: [...basketHotel, { id: id }],
    });
  };
  const removeFromHotelBasket = (id) => {
    dispatch({
      type: "SET_BASKETHOTEL",
      payload: [...basketHotel.filter((ticket) => ticket.id !== id)],
    });
  };


  return (
    <section className="Favorities">
      <div className="container">
        <section className="favorities_category">
          <h2>Favourites</h2>
          <div className="favorities_category_box">
            <div
              className={showTicket ? "active_box" : null}
              onClick={() => {
                setShowHotel(!showHotel);
                setShowTicket(!showTicket);
              }}
            >
              <h4>Flights</h4>
              <span>
                {basketTicket.length ? basketTicket.length + " marked" : null}
              </span>
            </div>
            <span className="flight_return_line"></span>

            <div
              className={showHotel ? "active_box" : null}
              onClick={() => {
                setShowTicket(!showTicket);
                setShowHotel(!showHotel);
              }}
            >
              <h4>Places</h4>
              <span>
                {basketHotel.length ? basketHotel.length + " marked" : null}
              </span>
            </div>
          </div>
        </section>

        <section className="favourites_places">
          <div className={showHotel ? "show_hotels" : "hide_hotels"}>
            {hotels.length
              ? basketHotel.map((basketItem) => {
                  let ticket = hotels.find((a) => a.id === basketItem.id);
                  const inBasket = basketHotel.find((t) => t.id === basketItem.id);
                  return (
                    <div className="favoritie-card" key={ticket.id}>
                      <div
                        className="hotel_listing_places_name"
                        
                      >
                        <div
                          style={{ backgroundImage: `url(${ticket.image})` }}
                        >
                          <div className="favorities_listing_img_frame">
                            <p>9 images</p>
                          </div>
                        </div>

                        <div className="hotel_listing_places_name_feat">
                          <div>
                            <div className="hotel_listing_places_sec">
                              <h3>{ticket.name}</h3>
                              <div>
                                <div>
                                  <img src={Location} alt="" />
                                  <p>{ticket.location}</p>
                                </div>

                                <div>
                                  <div>
                                    <img src={Star} alt="" />
                                    <img src={Star} alt="" />
                                    <img src={Star} alt="" />
                                    <img src={Star} alt="" />
                                    <img src={Star} alt="" />

                                    <p>5 Star Hotel</p>
                                  </div>

                                  <div>
                                    <img src={cafe} alt="" />
                                    <p>
                                      <span>{ticket.amenities.length}</span>{" "}
                                      Aminities
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <button className="hotel_frame">
                                    <p>{ticket.rating}</p>
                                  </button>
                                  <p>
                                    <span>{ticket.reviewQuality}</span>{" "}
                                    {ticket.reviewCount} reviews
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p>starting from</p>
                              <h4>
                                {ticket.price}
                                <span>/night</span>
                              </h4>
                              <p>excl. tax</p>
                            </div>
                          </div>

                          <div className="rectangle4">.</div>
                           <div className="favourites_btns">
                          <Link  to={`/hotel-listing-two/${ticket.id}`}>
                            <div className="view_places_flex">
                              <button >
                                View Place
                              </button>
                            </div>
                          </Link>
                          <div className="add_to_basket">
                          {inBasket ? (
                          <button onClick={() => removeFromHotelBasket(ticket.id)}>
                            <MdFavorite className="favorutie_heart"/>
                          </button>
                        ) : (
                          <button onClick={() => addToHotelBasket(ticket.id)}>
                             <MdFavorite className="favorutie_heart"/>
                          </button>
                        )}
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div className={showTicket ? "show_tickets" : "hide_tickets"}>
            {tickets.length
              ? basketTicket.map((basketItem) => {
                  let ticket = tickets.find((a) => a.id === basketItem.id);
                  const inBasket = basketTicket.find((t) => t.id === basketItem.id);
                  return (
                    <div className="favoritie-card" key={ticket.id}>
                      <div
                        className="flight_listing_places_name"
                        
                      >
                        <div
                          style={{ backgroundImage: `url(${ticket.image})` }}
                        ></div>

                        <div className="flight_listing_places_name_feat">
                          <div>
                            <div>
                              <button className="flight_frame">
                                <p>{ticket.rating}</p>
                              </button>
                              <p>
                                <span>{ticket.reviewQuality}</span>{" "}
                                {ticket.reviewCount} reviews
                              </p>
                            </div>
                            <div>
                              <p>starting from</p>
                              <h4>${ticket.price}</h4>
                            </div>
                          </div>

                          <div>
                            <div>
                              <div>
                                <div>
                                  <h3>
                                    {ticket.departTime} - {ticket.arrivalTime}
                                  </h3>
                                  <span>{ticket.airline}</span>
                                </div>

                                <p>non stop</p>

                                <div>
                                  <h3>{ticket.durationstring}</h3>
                                  <span>{ticket.passengerClass}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3>
                                {ticket.departDate} - {ticket.returnDate}
                              </h3>
                              <p>
                                {ticket.from}-{ticket.to}
                              </p>
                            </div>
                          </div>

                          <div className="rectangle4">.</div>
                          <div className="favourites_btns">
                          <Link to={`/flight-details/${ticket.id}`}>
                            <div className="view_places_flex">
                              <button className="view_places_flex">
                                View Place
                              </button>
                             
                            </div>
                          </Link>
                          <div className="add_to_basket">
                          {inBasket ? (
                          <button onClick={() => removeFromBasket(ticket.id)}>
                           <MdFavorite className="favorutie_heart"/>
                          </button>
                        ) : (
                          <button onClick={() => addToBasket(ticket.id)}>
                            <MdFavorite  className="favorutie_heart"/>
                              
                          </button>
                        )}
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </section>
      </div>
    </section>
  );
}
const t = (a) => a;
export default connect(t)(Favorities);
