import { useState } from "react";
import "./signup.scss";
import { useNavigate } from "react-router-dom"; 
import { auth, createUserDocumentFromAuth } from "../../services/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Input({ type, input, value, onChange, name, placeholder }) {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        required
        value={value}
        onChange={onChange}
        name={name}
      />
    </>
  );
}

function SignUp() {
  const [inputFormValues, setInoutFormValues] = useState(defaultFormValues);
  const { displayName, email, password, confirmPassword } = inputFormValues;

  function handleChange(e) {
    const { name, value } = e.target;
    setInoutFormValues({ ...inputFormValues, [name]: value });
  }
const navigate = useNavigate(); //  initialize navigate
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.dismiss()
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Update displayName in Firebase Auth
      
       await updateProfile(user, {
        displayName: displayName,
      });

      // Save in Firestore
      await createUserDocumentFromAuth(user, { displayName });

      toast.success(`User created successfully with !${displayName}`);
      navigate('/')
      window.location.reload();

      setInoutFormValues(defaultFormValues); // reset form

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in instead.");
      } else {
        
        toast.error("Error in sign up: " + error.message)
        
      }
    }
  };

  return (
    <div className="signup-section">
      <h1>Sign-up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          input="User Name"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          placeholder="user name"
        />
        <Input
          type="email"
          input="E-mail"
          value={email}
          onChange={handleChange}
          name="email"
          placeholder="email"
        />
        <Input
          type="password"
          input="Password"
          value={password}
          onChange={handleChange}
          name="password"
          placeholder="password"
        />
        <Input
          type="password"
          input="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          placeholder="confirm password"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
