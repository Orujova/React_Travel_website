import loginImage from "../assets/images/loginImage.png";
import faceBook from "../icons/face.svg";
import google from "../icons/google.svg";
import apple from "../icons/apple.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialForm = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialForm);
  const { password, email } = formState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrorMessage("");
  };
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password == "" || email == "") {
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
    if (password !== "" && email !== "") {
      setFormState(initialForm);
      nav("/flight-search");
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="login_page">
            <div>
              <h1>Login</h1>
              <p>Login to access your Golobe account</p>
              <form onSubmit={handleSubmit}>
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
                  <legend>Password</legend>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="•••••••••••••••••••••••••"
                  />
                </fieldset>
                <div>
                  <div className="remember">
                    <input type="checkbox" name="remember-me" id="" />
                    <h5>Remember Me</h5>
                  </div>
                  <span>Forgot Password</span>
                </div>

                <button className="login_btn" onClick={handleOkButtonClick}>
                  Login
                </button>
                {errorMessage && (
                  <h6 className="error-message">{errorMessage}</h6>
                )}
                <h4>
                  Don’t have an account?
                  <span>
                    <Link to="/sign-up"> Sign up</Link>
                  </span>
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
            <div>
              <img src={loginImage} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
