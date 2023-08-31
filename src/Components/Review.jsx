import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "./Pagination";
import warningflag from "../assets/images/warningflag.png";
function Review() {
  //review
  const [operation, setOperation] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:1313/reviews")
      .then((a) => a.json())
      .then((a) => setData(a));
  }, []);
  
  const [product, setProduct] = useState({
    name: "John Devid",
    comment: "",
    image:
      "https://smilequestdental.com/wp-content/uploads/2016/11/test24-4.jpg",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setProduct({
      name: "John Devid",
      comment: "",
      image:
        "https://smilequestdental.com/wp-content/uploads/2016/11/test24-4.jpg",
    });
    e.preventDefault();
    fetch("http://localhost:1313/reviews", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => {
      setData([product, ...data]);
    });
  };
  // const deleteItem = (id) => {
  //   fetch(`http://localhost:1313/reviews/${id}`, {
  //     method: "DELETE",
  //   }).then(() => {
  //     setData([...data.filter((t) => t.id !== id)]);
  //   });
  // };
 
  
  const [activePage, setActivePage] = useState(1);
  const productPerPage = 4;
  const totalPageCount = Math.ceil(data.length / productPerPage);
  // if (activePage > totalPageCount) {
  //   setActivePage(totalPageCount);
  // }
  const start = (activePage - 1) * productPerPage;
  const end = start + productPerPage;
  console.log(activePage)
  return (
    <>
      <form className="review_form" onSubmit={handleSubmit}>
        <div
          className={
            !operation
              ? "review_operations review_operations_hide"
              : "review_operations review_operations_show"
          }
        >
          <div>
            {/* <input required value={product.name} onChange={handleChange} name='name' type="text" placeholder='Your name'/> */}
            <input
              value={product.comment}
              onChange={handleChange}
              name="comment"
              type="text"
              placeholder="Your comment"
            />
            <button
              disabled={product.comment.length > 0 ? false : true}
              onClick={() => setOperation(!operation)}
            >
              Give your review
            </button>
          </div>
        </div>
        <a
          className={!operation ? null : "hide_a"}
          onClick={() => setOperation(!operation)}
        >
          Give your review
        </a>
      </form>
      <div className="hotel_review_contain">

        {data.slice(start, end).map((a) => (
          <div className="hotel_review_contain_sec" key={a.id}>
            <div>
              <img className="review_person" src={a.image} />
              <div className="review_main">
                <div className="review_content">
                  <div>
                    <h5>{a.rating} Amazing</h5>
                    <span>|</span>
                    <span>{a.name}</span>
                  </div>
                  <p>{a.comment}</p>
                </div>
                <img src={warningflag} alt="" />
              </div>
            </div>
            <div className="straight_line hotel_review_firstline"></div>
          </div>
        ))}
      </div>
      <Pagination
        totalPageCount={totalPageCount}
        setActivePage={setActivePage}
        activePage={activePage}
      />
    </>
  );
}

export default Review;
