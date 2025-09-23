import { useState } from "react";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../services/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SignUp from "../SignUp/SignUp";
import "./signin.scss";
function SignIn() {
  const navigate = useNavigate();

  async function signGoogleUser() {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
    navigate("/");
  }

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", { duration: 4000 });
      navigate("/"); // redirect after email/password login
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("Invalid email.", { duration: 4000 });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.", { duration: 4000 });
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Email or password is incorrect.", { duration: 4000 });
      } else {
        toast.error("Login error: " + error.message, { duration: 4000 });
      }
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="page-contents">
      <div className="page-content">
        <div className="login-section">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="button-row">
              <button type="submit">Login</button>
              <button type="button" onClick={signGoogleUser}>
                Login with Google
              </button>
            </div>
          </form>
        </div>

        <SignUp />
      </div>
    </div>
  );
}

export default SignIn;
