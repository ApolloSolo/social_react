import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./register.scss";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [err, setErr] = useState(null);

  const handleChange = e => {
    setErr(null);
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await register(inputs)
      window.location.assign("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            {err
              ? <p>
                  {err}
                </p>
              : false}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default Register;
