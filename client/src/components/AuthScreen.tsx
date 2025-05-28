import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";
import SignUp from "./SignUp";

const AuthScreen: React.FC = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });
  const { setUser, setIsLoggedIn } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleLogIn = async () => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: logInForm.email,
      password: logInForm.password,
    });
    console.log(response);
    if (response.status === 201) {
      console.log("login successful");
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      setIsLoggedIn(true);
    }
  };

  return isSigningUp ? (
    <SignUp setIsSigningUp={setIsSigningUp} />
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-7xl mb-10 italic">Flow MES</div>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          value={logInForm.email}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={logInForm.password}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <button
          className="w-80 h-12 font-bold text-xl border border-gray-200 rounded-lg my-5 cursor-pointer shadow-sm"
          onClick={handleLogIn}
        >
          Log in
        </button>
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <button
          className="w-80 h-12 text-xl text-white border border-gray-200 rounded-lg my-5 cursor-pointer bg-green-500 shadow-sm"
          onClick={() => setIsSigningUp(true)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
