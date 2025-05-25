import { useState } from "react";

const AuthScreen: React.FC = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-5xl mb-10 italic">Flow MES</div>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          value={logInForm.email}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={logInForm.password}
          onChange={(e) => handleChange(e)}
          className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-5 shadow-sm pl-3 focus:outline-none"
        />
        <button className="w-80 h-12 font-bold text-xl border border-gray-200 rounded-lg my-5 cursor-pointer shadow-sm">
          Login
        </button>
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <button className="w-80 h-12 text-xl text-white border border-gray-200 rounded-lg my-5 cursor-pointer bg-green-500 shadow-sm">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
