"use client";
import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response.ok) {
        router.push("/");
      }
      if (response.error) {
        setError("Invalid email or password. Please try again.");
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
          {error && <p className="error">{error}</p>}
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
