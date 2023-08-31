import Star from "../assets/images/Star.png";
import flightDetail1 from "../assets/images/flightDetail1.png";
import flightDetail2 from "../assets/images/flightDetail2.png";
import flightDetail3 from "../assets/images/flightDetail3.png";
import flightDetail4 from "../assets/images/flightDetail4.png";
import flightDetail5 from "../assets/images/flightDetail5.png";
import flightDetail6 from "../assets/images/flightDetail6.png";
import timer from "../assets/images/timer.png";
import airplane from "../assets/images/airplane.png";
import Wifi from "../assets/images/Wifi.png";
import ion_fast_food from "../assets/images/ion_fast-food.png";
import airline_seat from "../assets/images/airline-seat.png";
import airplane_line1 from "../assets/images/airplane_line1.png";
import airplanebig from "../assets/images/airplanebig.png";
import airplane_line2 from "../assets/images/airplane_line2.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FlightDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2605/tickets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const formattedDate = new Date(data.departDate).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <section className="FlightDetails">
      <div className="container">
        <section className="hotel_general_info">
          <div className="hotel_info">
            <div>
              <h3>{data.airline} A380 Airbus </h3>
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
            <h2>${data.price}</h2>
            <div>
             

              <button className="hotel_button">
                <Link to={`/booking-details/${id}`}>Book now</Link>
              </button>
            </div>
          </div>
        </section>

        <section className="flight_detail_img">
          <img src={data.airportImg} alt="" />
        </section>

        <section className="flight_economy_feat">
          <div>
            <h3>Basic Economy Features</h3>
        
          </div>

          <div>
            <img src={flightDetail1} alt="" />
            <img src={flightDetail2} alt="" />
            <img src={flightDetail3} alt="" />
            <img src={flightDetail4} alt="" />
            <img src={flightDetail3} alt="" />
            <img src={flightDetail4} alt="" />
            <img src={flightDetail4} alt="" />
            <img src={flightDetail5} alt="" />
            <img src={flightDetail6} alt="" />
          </div>
        </section>

        <section className="flight_airline_policy">
          <h3>{data.airline} Airlines Policies</h3>
          <div>
            <div>
              <img src={timer} alt="" />
              <span>
                Pre-flight cleaning, installation of cabin HEPA filters.
              </span>
            </div>
            <div>
              <img src={timer} alt="" />
              <span>
                Pre-flight cleaning, installation of cabin HEPA filters.
              </span>
            </div>
          </div>
        </section>

        <section className="flight_return">
          <div>
            <h4>Return {formattedDate}</h4>
            <p>{data.durationstring}</p>
          </div>

          <div className="flight_return_box">
            <div>
              <div>
                <img src={data.image} alt="" />
                <div>
                  <h5>{data.airline}</h5>
                  <span>Airbus A320</span>
                </div>
              </div>
              <div>
                <img src={airplane} alt="" />
                <div className="flight_return_line"></div>
                <img src={Wifi} alt="" />
                <div className="flight_return_line"></div>
                <img src={timer} alt="" />
                <div className="flight_return_line"></div>
                <img src={ion_fast_food} alt="" />
                <div className="flight_return_line"></div>
                <img src={airline_seat} alt="" />
              </div>
            </div>

            <div>
              <div>
                <h5>{data.departTime}</h5>
                <p>Newark(EWR)</p>
              </div>

              <div>
                <img src={airplane_line1} alt="" />
                <img src={airplanebig} alt="" />
                <img src={airplane_line2} alt="" />
              </div>

              <div>
                <h5>{data.arrivalTime}</h5>
                <p>Newark(EWR)</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </section>
  );
}
