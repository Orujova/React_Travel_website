import signup from "../assets/images/signup.png";
import faceBook from "../icons/face.svg";
import google from "../icons/google.svg";
import apple from "../icons/apple.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Sign_up() {
  const initialForm = {
    email: "",
    password: "",
    name: "",
    lastname: "",
    phonenumber: "",
    confirmpassword: "",
  };
  const [formState, setFormState] = useState(initialForm);
  const { password, email, name, lastname, phonenumber, confirmpassword } =
    formState;
  const [contactModal, setContactModal] = useState(false);
  const [inputborder, setInputborder] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrorMessage("");
    setInputborder(false);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      password == "" ||
      email == "" ||
      name == "" ||
      lastname == "" ||
      phonenumber == "" ||
      confirmpassword == ""
    ) {
      setErrorMessage("Please fill in all fields!");
      setInputborder(true);
      return;
    } else {
      setErrorMessage("");
    }
    handleOkButtonClick();
  };
  const nav = useNavigate();

  const handleOkButtonClick = () => {
    if (
      password !== "" &&
      email !== "" &&
      name !== "" &&
      lastname !== "" &&
      phonenumber !== "" &&
      confirmpassword !== ""
    ) {
      setFormState(initialForm);
      nav("/flight-search");
    }
  };

  return (
    <section>
      <div className="container">
        <div className="sign_up_page">
          <div>
            <img src={signup} alt="" />
          </div>
          <div>
            <h1>Sign Up</h1>
            <p>
              Let’s get you all st up so you can access your personal account.
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <fieldset>
                  <legend>First Name</legend>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </fieldset>
                <fieldset>
                  <legend>Last Name</legend>
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Email</legend>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="john.doe@gmail.com"
                  />
                </fieldset>
                <fieldset>
                  <legend>Phone Number</legend>
                  <input
                    type="number"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={handleChange}
                    placeholder="29292927222"
                  />
                </fieldset>
              </div>

              <fieldset>
                <legend>Password</legend>
                <input className="signup-placeholder"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="•••••••••••••••••••••••••"
                />
              </fieldset>
              <fieldset>
                <legend>Confirm Password</legend>
                <input 
                 className="signup-placeholder"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="•••••••••••••••••••••••••"
                />
              </fieldset>
              <div>
                <div className="remember">
                  <input type="checkbox" name="remember-me" id="" />
                  <h5>I agree to all the Terms and Privacy Policies</h5>
                </div>
              </div>

              <button className="login_btn" onClick={handleOkButtonClick}>
                Create account
              </button>
              {errorMessage && (
                <h6 className="error-message">{errorMessage}</h6>
              )}
              <h4>
                Already have an account? <Link to="/login">Login</Link>
              </h4>
              <span className="or_login">Or login with</span>
              <div>
                <div>
                  <img src={faceBook} alt="" />
                </div>
                <div>
                  <img src={google} alt="" />
                </div>
                <div>
                  <img src={apple} alt="" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sign_up;
