import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // useEffect(() => {
  //   if (auth.isAuthenticated && !auth.isSubmitting) {
  //     navigate(auth.user?.homeRoute || "/superdashboard");
  //   }
  // }, [auth.isAuthenticated, auth.isSubmitting, navigate]);

  return (
    <div>
      <Header />
      <div 
        className="min-h-screen pt-24 pb-12"
        style={{
          background: 'linear-gradient(150deg, rgba(58,109,112,1) 0%, rgba(36,52,69,1) 13%, rgba(36,52,69,1) 88%, rgba(58,109,112,1) 99%)',
          color: 'white',
          minHeight: 'calc(100vh - 102px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleLogin}>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
              <img className="max-w-full h-auto" src="/main.png" alt="Main Illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;