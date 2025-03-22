import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const store = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    store.login(email, password);
  };

  return (
    <div className="bg-gradient-to-r from-teal-600 to-blue-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          <form
            className="w-full max-w-sm space-y-4"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
            >
              Login
            </button>
          </form>
          <div className="hidden md:block">
            <img
              className="max-w-xs"
              src="/main.png"
              alt="Main Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
