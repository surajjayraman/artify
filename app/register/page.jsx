"use client";
import "@styles/Register.scss";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      />
      <div className="register_content">
        <form className="register_content_form">
          <input type="text" placeholder="Username" name="username" required />
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile"></img>
            <p>Upload Profile Photo</p>
          </label>
          <button type="submit">Register</button>
        </form>
        <button className="google" type="button" onClick={() => {}}>
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default Register;
