import Review from "../Components/Review";
import right_arrow from "../assets/images/right arrow.png";
import Star from "../assets/images/Star.png";
import splash from "../icons/splash.svg";
import Location from "../assets/images/Location.png";
import room1 from "../assets/images/room1.png";
import room2 from "../assets/images/room2.png";
import room3 from "../assets/images/room3.png";
import service1 from "../assets/images/service1.png";
import service2 from "../assets/images/service2.png";
import service3 from "../assets/images/service3.png";
import service4 from "../assets/images/service4.png";
import service5 from "../assets/images/service5.png";
import service6 from "../assets/images/service6.png";
import service7 from "../assets/images/service7.png";
import service8 from "../assets/images/service8.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function HotelListingtwo() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2605/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const areImagesAvailable = data.staysImages && data.staysImages.length > 0;
  const staysImages = areImagesAvailable ? data.staysImages.slice(1, 5) : [];
  return (
    <>
      <section className="HotelListingtwo">
        <div className="container">
          <section className="choose_place_sec">
            <p>{data.destination}</p>
            <img src={right_arrow} alt="" />
            <p>{data.name}</p>
          </section>

          <section className="hotel_general_info">
            <div className="hotel_info">
              <div>
                <h3>{data.name}</h3>
                <div>
                  <div>
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                  </div>
                  <p>5 Star Hotel</p>
                </div>
              </div>
              <div>
                <div>
                  <img src={Location} alt="" />
                  <p>{data.location}</p>
                </div>
                <div>
                  <button className="hotel_frame">
                    <p>{data.rating}</p>
                  </button>
                  <p>
                    <span>{data.reviewQuality}</span> {data.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="hotel_book">
              <h2>
                ${data.price}
                <span>/night</span>
              </h2>
              <div>
                <Link
                  className="hotel_button "
                  to={`/hotels-booking-details/${id}`}
                  state={{ room: data.name }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </section>

          <section className="hotel_images">
            <img src={data.image} alt="" />
            <div>
              {areImagesAvailable && (
                <div>
                  <div>
                    <img src={staysImages[0]} alt="" />
                    <img src={staysImages[1]} alt="" />
                  </div>
                  <div>
                    <img src={staysImages[2]} alt="" />
                    <img src={staysImages[3]} alt="" />
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="straight_line"></div>

          <section className="hotel_overview">
            <h4>Overview</h4>
            <p>{data.overview}</p>

            <div>
              <div className="hotel_overview_box">
                <div>
                  <h3>{data.rating}</h3>
                  <div>
                    <h4>{data.reviewQuality}</h4>
                    <span>{data.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
              <div className="hotel_overview_box">
                <div>
                  <h3>
                    <img src={splash} alt="" />
                  </h3>
                  <div>
                    <span>Near park</span>
                  </div>
                </div>
              </div>
              <div className="hotel_overview_box">
                <div>
                  <h3>
                    <img src={splash} alt="" />
                  </h3>

                  <span>Near nightlife</span>
                </div>
              </div>
              <div className="hotel_overview_box">
                <div>
                  <h3>
                    <img src={splash} alt="" />
                  </h3>

                  <span>Near theater</span>
                </div>
              </div>
              <div className="hotel_overview_box">
                <div>
                  <h3>
                    <img src={splash} alt="" />
                  </h3>

                  <span>Clean Hotel</span>
                </div>
              </div>
            </div>
          </section>

          <div className="straight_line"></div>

          <section className="hotel_rooms">
            <h4>Available Rooms</h4>
            <div>
              <div className="hotel_rooms_box">
                <div>
                  <img src={room1} alt="" />
                  <p>Superior room - 1 double bed or 2 twin beds</p>
                </div>
                <div>
                  <h3>
                    ${data.room1price}
                    <span>/night</span>
                  </h3>

                  <Link
                    to={`/hotels-booking-details/${id}`}
                    state={{
                      room: "Superior room - 1 double bed or 2 twin beds",
                    }}
                  >
                    <button className="hotel_button">Book now</button>
                  </Link>
                </div>
              </div>
              <div className="straight_line room_straight_line"></div>
              <div className="hotel_rooms_box">
                <div>
                  <img src={room2} alt="" />
                  <p>Superior room - City view - 1 double bed or 2 twin beds</p>
                </div>
                <div>
                  <h3>
                    ${data.room2price}
                    <span>/night</span>
                  </h3>
                  <Link
                    to={`/hotels-booking-details/${id}`}
                    state={{
                      room: "Superior room - City view - 1 double bed or 2 twin beds",
                    }}
                  >
                    <button className="hotel_button">Book now</button>
                  </Link>
                </div>
              </div>
              <div className="straight_line room_straight_line"></div>
              <div className="hotel_rooms_box">
                <div>
                  <img src={room2} alt="" />
                  <p>Standard Room</p>
                </div>
                <div>
                  <h3>
                    ${data.room3price}
                    <span>/night</span>
                  </h3>
                  <Link
                    to={`/hotels-booking-details/${id}`}
                    state={{
                      room: "Standard Room",
                    }}
                  >
                    <button className="hotel_button">Book now</button>
                  </Link>
                </div>
              </div>
              <div className="straight_line room_straight_line"></div>
              <div className="hotel_rooms_box">
                <div>
                  <img src={room3} alt="" />
                  <p>Two-Bedroom Suite</p>
                </div>
                <div>
                  <h3>
                    ${data.room4price}
                    <span>/night</span>
                  </h3>
                  <Link
                    to={`/hotels-booking-details/${id}`}
                    state={{
                      room: "Two-Bedroom Suite",
                    }}
                  >
                    <button className="hotel_button">Book now</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="straight_line"></div>

          <section className="hotel_map">
            <div>
              <h4>Location/Map</h4>
            </div>

            <iframe
              src={data.iframe}
              width="100%"
              height="450"
              style={{ border: 0, marginBottom: "8px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div>
              <img src={Location} alt="" />
              <p>{data.location}</p>
            </div>
          </section>

          <div className="straight_line"></div>

          <section className="hotel_service">
            <h4>Amenities</h4>
            <div>
              <div>
                <div className="hotel_service_type">
                  <img src={service1} alt="" />
                  <p>Outdoor pool</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service1} alt="" />
                  <p>Indoor pool</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service2} alt="" />
                  <p>Spa and wellness center</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service3} alt="" />
                  <p>Restaurant</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service4} alt="" />
                  <p>Room service</p>
                </div>
              </div>
              <div>
                <div className="hotel_service_type">
                  <img src={service5} alt="" />
                  <p>Fitness center</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service6} alt="" />
                  <p>Bar/Lounge</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service7} alt="" />
                  <p>Free Wi-Fi</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service8} alt="" />
                  <p>Tea/coffee machine</p>
                </div>
                <div className="hotel_service_type">
                  <img src={service4} alt="" />
                  <p>Room service</p>
                </div>
              </div>
            </div>
          </section>

          <div className="straight_line"></div>

          <section className="hotel_review">
            <div>
              <h4>Reviews</h4>

              <div>
                <h1>4.2</h1>
                <div>
                  <h4>Very good</h4>
                </div>
              </div>
            </div>

            <Review />
          </section>
        </div>
      </section>
    </>
  );
}
