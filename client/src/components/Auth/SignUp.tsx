import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../context/AuthContext";

interface SignUpProps {
  setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSigningUp }) => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser, setIsLoggedIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const validateSignUp = () => {
    if (
      !signUpForm.email.includes("@") ||
      !signUpForm.username ||
      !signUpForm.password ||
      signUpForm.password !== signUpForm.confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    console.log(validateSignUp());
    if (validateSignUp()) {
      const response = await axios.post(`${serverUrl}/auth/signup`, {
        email: signUpForm.email,
        username: signUpForm.username,
        password: signUpForm.password,
      });
      console.log(response);
      if (response.status === 201) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        setIsLoggedIn(true);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-7xl mb-10 italic">Flow EBR</div>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          value={signUpForm.email}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signUpForm.username}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signUpForm.password}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={signUpForm.confirmPassword}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <button
          className="w-80 h-12 text-xl font-bold border border-gray-200 rounded-lg my-5 cursor-pointer bg-green-300 shadow-sm"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <button
          className="w-80 h-12 font-bold text-xl border border-gray-200 rounded-lg my-5 cursor-pointer shadow-sm "
          onClick={() => setIsSigningUp(false)}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
