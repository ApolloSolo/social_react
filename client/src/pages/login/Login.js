import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [err, setErr] = useState(null);

  const handleChange = e => {
    setErr(null);
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="email@domain.com"
              name="email"
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
            />

            {err
              ? <p>
                  {err}
                </p>
              : false}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        window.location.assign("/");
      } else throw new Error(data.error);
    } catch (error) {
      setErr(error.message);
    } */
