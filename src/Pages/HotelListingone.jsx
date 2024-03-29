import ion_bed from "../assets/images/ion_bed.png";
import user from "../assets/images/user.png";
import Rectangle16 from "../assets/images/Rectangle 16.png";
import Line1 from "../assets/images/Line 1.png";
import Location from "../assets/images/Location.png";
import Star from "../assets/images/Star.png";
import cafe from "../assets/images/cafe.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RiShoppingBag3Line, RiShoppingBag3Fill } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
function HotelListingone({ basketHotel, dispatch, basketHotelBuy }) {
  useEffect(() => {
    localStorage.setItem("basketHotel", JSON.stringify(basketHotel));
  }, [basketHotel]);

  const addToBasket = (id) => {
    dispatch({
      type: "SET_BASKETHOTEL",
      payload: [...basketHotel, { id: id }],
    });
  };
  const removeFromBasket = (id) => {
    dispatch({
      type: "SET_BASKETHOTEL",
      payload: [...basketHotel.filter((ticket) => ticket.id !== id)],
    });
  };

  const addToCard = (id) => {
    dispatch({
      type: "SET_BASKETHOTELBUY",
      payload: [...basketHotelBuy, { id: id }],
    });
  };
  const removeFromCard = (id) => {
    dispatch({
      type: "SET_BASKETHOTELBUY",
      payload: [...basketHotelBuy.filter((ticket) => ticket.id !== id)],
    });
  };
  const [new1, setNew1] = useState(
    localStorage.getItem("enterdestinationinput") || ""
  );
  const [new2, setNew2] = useState(localStorage.getItem("checkIninput") || "");
  const [new3, setNew3] = useState(localStorage.getItem("checkOutinput") || "");
  const [new4, setNew4] = useState(localStorage.getItem("roominput") || "");

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    destination: `${new1}`,
    checkIn: `${new2}`,
    checkOut: `${new3}`,
    roomsGuests: `${new4}`,
    selectedType: "null",
    selectedFreebies: [],
    selectedAmenities: [],
    selectedRating: "",
    priceRange: [0, 1000],
  });

  useEffect(() => {
    fetch("http://localhost:2605/hotels")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const freebiesSet = new Set();
  const amenitiesSet = new Set();

  data.forEach((stay) => {
    stay.freebies.forEach((freebie) => {
      freebiesSet.add(freebie);
    });
    stay.amenities.forEach((amenity) => {
      amenitiesSet.add(amenity);
    });
  });

  const uniqueFreebies = Array.from(freebiesSet);
  const uniqueAmenities = Array.from(amenitiesSet);
  const [numShown, setNumShown] = useState(4);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  function handleShowMore() {
    setNumShown(numShown + 4);
  }

  function handleShowLess() {
    setNumShown(4);
  }
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      selectedType: type,
    }));
  };

  const handleRatingChange = (rating) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      selectedRating: rating,
    }));
  };

  const handlePriceRangeChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      priceRange: value,
    }));
  };

  const handleStyle = {
    backgroundColor: "#8dd3bb",
    border: "2px solid #8dd3bb",
    height: 25,
    width: 25,
    marginTop: -10,
    marginLeft: -1,
    opacity: 1,
  };

  const trackStyle = {
    backgroundColor: "#112211",
    height: 3,
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: [...prevFilter[name], value],
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: prevFilter[name].filter((item) => item !== value),
      }));
    }
  };

  const filteredData = data.filter((stay) => {
    if (
      filter.destination &&
      !stay.destination
        .toLowerCase()
        .startsWith(filter.destination.toLowerCase())
    ) {
      return false;
    }

    if (filter.checkIn && stay.checkIn) {
      const departDateObj = new Date(filter.checkIn);
      const flightDepartDateObj = new Date(stay.checkIn);
      if (departDateObj.getTime() !== flightDepartDateObj.getTime()) {
        return false;
      }
    }

    if (filter.checkOut && stay.checkOut) {
      const returnDateObj = new Date(filter.checkOut);
      const flightReturnDateObj = new Date(stay.checkOut);
      if (returnDateObj.getTime() !== flightReturnDateObj.getTime()) {
        return false;
      }
    }

    if (filter.roomsGuests && stay.roomsGuests !== filter.roomsGuests) {
      return false;
    }

    if (filter.selectedType !== "null" && stay.type !== filter.selectedType) {
      return false;
    }

    // if (filter.selectedRating !== "" && stay.rating < filter.selectedRating) {
    //   return false;
    // }
    if (
      filter.selectedRating &&
      stay.rating <= parseInt(filter.selectedRating)
    ) {
      return false;
    }

    if (filter.priceRange && filter.priceRange.length === 2) {
      const price = parseInt(stay.price);
      const priceRangeStart = parseInt(filter.priceRange[0]);
      const priceRangeEnd = parseInt(filter.priceRange[1]);
      if (price < priceRangeStart || price > priceRangeEnd) {
        return false;
      }
    }
    if (
      filter.selectedFreebies.length > 0 &&
      !filter.selectedFreebies.every((freebie) =>
        stay.freebies.includes(freebie)
      )
    ) {
      return false;
    }
    if (
      filter.selectedAmenities.length > 0 &&
      !filter.selectedAmenities.every((amenity) =>
        stay.amenities.includes(amenity)
      )
    ) {
      return false;
    }
    return true;
  });

  const stayElements = filteredData.slice(0, numShown);

  return (
    <div className="container__full">
      <section className="HotelListingone">
        <div className="container">
          <section className="hotel_listing_roadmap">
            <div className="hotel_listing_roadmap_box">
              <div>
                <img src={ion_bed} alt="" />
                <span>Enter Destination</span>
                <input
                  type="text"
                  name="destination"
                  placeholder="Istanbul, Turkey"
                  value={filter.destination}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="hotel_listing_roadmap_box">
              <div>
                <input
                  type="date"
                  placeholder="Check In"
                  name="checkIn"
                  value={filter.checkIn}
                  onChange={handleFilterChange}
                />
                <span>Check In</span>
              </div>
            </div>

            <div className="hotel_listing_roadmap_box">
              <div>
                <input
                  type="date"
                  placeholder="Check Out"
                  name="checkOut"
                  value={filter.checkOut}
                  onChange={handleFilterChange}
                />
                <span>Check Out</span>
              </div>
            </div>

            <div className="hotel_listing_roadmap_box">
              <div>
                <div>
                  <img src={user} alt="" />

                  <select
                    name="roomsGuests"
                    value={filter.roomsGuests}
                    onChange={handleFilterChange}
                    id="roomsGuests"
                  >
                    <option value="">Rooms & Guests</option>
                    <option value="1 Room - 1 Guest">1 Room - 1 Guest</option>
                    <option value="1 Room - 2 Guests">1 Room - 2 Guests</option>
                    <option value="1 Room - 3 Guests">1 Room - 3 Guests</option>
                    <option value="1 Room - 4 Guests">1 Room - 4 Guests</option>
                    <option value="1 Room - 5 Guests">1 Room - 5 Guests</option>
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

                  <span>Rooms & Guests</span>
                </div>
              </div>
            </div>
          </section>

          <section className="hotel_listing_main_section">
            <div>
              <h3>Filters</h3>

              <div className="filte_box">
                <div>
                  <h4>Price</h4>
                </div>
                <div>
                  <Slider
                    range
                    min={0}
                    max={1000}
                    value={filter.priceRange}
                    onChange={handlePriceRangeChange}
                    handleStyle={handleStyle}
                    trackStyle={trackStyle}
                  />
                  <div className="filter_values">
                    <span>${filter.priceRange[0]}</span>
                    <span>${filter.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <img src={Rectangle16} alt="" />

              <div className="filte_box">
                <div>
                  <h4>Rating</h4>
                </div>
                <div className="filter_rating_flex">
                  <div className="filter_rating">
                    <button
                      className={
                        filter.selectedRating === "0" ? "ratingActive" : ""
                      }
                      onClick={() => handleRatingChange(0)}
                    >
                      <span>0+</span>
                    </button>
                  </div>
                  <div className="filter_rating">
                    <button
                      className={
                        filter.selectedRating === "1" ? "ratingActive" : ""
                      }
                      onClick={() => handleRatingChange(1)}
                    >
                      <span>1+</span>
                    </button>
                  </div>
                  <div className="filter_rating">
                    <button
                      className={
                        filter.selectedRating === "2" ? "ratingActive" : ""
                      }
                      onClick={() => handleRatingChange(2)}
                    >
                      <span>2+</span>
                    </button>
                  </div>
                  <div className="filter_rating">
                    <button
                      className={
                        filter.selectedRating === "3" ? "ratingActive" : ""
                      }
                      onClick={() => handleRatingChange(3)}
                    >
                      <span>3+</span>
                    </button>
                  </div>
                  <div className="filter_rating">
                    <button
                      className={
                        filter.selectedRating === "4" ? "ratingActive" : ""
                      }
                      onClick={() => handleRatingChange(4)}
                    >
                      <span>4+</span>
                    </button>
                  </div>
                </div>
              </div>
              <img src={Rectangle16} alt="" />

              <div className="filte_box">
                <div>
                  <h4>Freebies</h4>
                </div>
                <div>
                  <div className="filter_airlines_flex">
                    {uniqueFreebies.map((freebie) => (
                      <label key={freebie}>
                        <input
                          type="checkbox"
                          name="selectedFreebies"
                          value={freebie}
                          checked={filter.selectedFreebies.includes(freebie)}
                          onChange={handleCheckboxChange}
                        />
                        <span>{freebie}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <img src={Rectangle16} alt="" />

              <div className="filte_box">
                <div>
                  <h4>Trips</h4>
                </div>
                <div>
                  <div className="filter_airlines_flex">
                    {uniqueAmenities.map((amenity) => (
                      <label key={amenity}>
                        <input
                          type="checkbox"
                          name="selectedAmenities"
                          value={amenity}
                          checked={filter.selectedAmenities.includes(amenity)}
                          onChange={handleCheckboxChange}
                        />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  className="clear_filter"
                  onClick={() =>
                    setFilter({
                      destination: ``,
                      checkIn: ``,
                      checkOut: ``,
                      roomsGuests: ``,
                      selectedType: "null",
                      selectedFreebies: [],
                      selectedAmenities: [],
                      selectedRating: "",
                      priceRange: [0, 1000],
                    })
                  }
                >
                  Clear Filter
                </button>
              </div>
            </div>

            <div className="line_up"></div>

            <div className="hotel_listing_places">
              <div>
                <div
                  className={`flight_listing_places_box ${
                    activeIndex === 0 ? "active" : ""
                  }`}
                  onClick={() => handleClick(0)}
                >
                  <button onClick={() => handleTypeChange("hotel")}>
                    <p>Hotel</p>
                  </button>

                  {activeIndex === 0 && <div className="boxline" />}
                </div>
                <img src={Line1} alt="" />

                <div
                  className={`flight_listing_places_box ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                  onClick={() => handleClick(1)}
                >
                  <button onClick={() => handleTypeChange("resort")}>
                    <p>Resort</p>
                  </button>

                  {activeIndex === 1 && <div className="boxline" />}
                </div>
                <img src={Line1} alt="" />

                <div
                  className={`flight_listing_places_box ${
                    activeIndex === 2 ? "active" : ""
                  }`}
                  onClick={() => handleClick(2)}
                >
                  <button onClick={() => handleTypeChange("motel")}>
                    <p>Motel</p>
                  </button>

                  {activeIndex === 2 && <div className="boxline" />}
                </div>
              </div>

              <div className="hotel_listing_page_count">
                <p>
                  Showing {stayElements.length} of
                  <span>{filteredData.length} places</span>
                </p>
              </div>

              {stayElements.map((ticket) => {
                const inBasket = basketHotel.find((t) => t.id === ticket.id);
                const inBasketBuy = basketHotelBuy.find(
                  (t) => t.id === ticket.id
                );
                return (
                  <div className="hotel_listing_places_name" key={ticket.id}>
                    <div style={{ backgroundImage: `url(${ticket.image})` }}>
                      <div>
                        <Link to={`/Swipers/${ticket.id}`}>
                          <button
                            style={{ border: "none" }}
                            className="favorities_listing_img_frame"
                          >
                            <p>9 images</p>
                          </button>
                        </Link>
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

                      <div className="view_places_flex">
                        <div className="filter_rating e">
                          {inBasket ? (
                            <button onClick={() => removeFromBasket(ticket.id)}>
                              <MdFavorite className="favorutie_heart" />
                            </button>
                          ) : (
                            <button onClick={() => addToBasket(ticket.id)}>
                              <MdFavoriteBorder className="favorutie_heart" />
                            </button>
                          )}
                        </div>
                        <Link to={`/hotel-listing-two/${ticket.id}`}>
                          View Place
                        </Link>
                        <div className="add_to_basket">
                          {inBasketBuy ? (
                            <button onClick={() => removeFromCard(ticket.id)}>
                              <RiShoppingBag3Fill />
                            </button>
                          ) : (
                            <button onClick={() => addToCard(ticket.id)}>
                              <RiShoppingBag3Line />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {numShown < filteredData.length ? (
                <button className="show_result" onClick={handleShowMore}>
                  Show More
                </button>
              ) : (
                <button className="show_result" onClick={handleShowLess}>
                  Show Less
                </button>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(HotelListingone);
