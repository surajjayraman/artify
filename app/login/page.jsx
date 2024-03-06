"use client";
import "@styles/login.scss";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const login_form = new FormData();
    login_form.append("email", email);
    login_form.append("password", password);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
          password,
        callbackUrl: "/",
      });

      if (response.ok) {
        console.log("Login successful!");
      }
    } catch (err) {
      console.log("Login failed!", err.message);
    }
  };
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor"></img>
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            required
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          ></input>
          <button type="submit">Log In</button>
        </form>
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default Login;
