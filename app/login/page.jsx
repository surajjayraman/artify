import "@styles/login.scss";
import { useState } from "react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor"></img>
      <div className="login_content">
        <form>
          <input type="email" placeholder="Email" name="email" required></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          ></input>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
