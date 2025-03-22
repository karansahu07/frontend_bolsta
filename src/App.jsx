import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/sideBar';
import { navigations } from './navigations';
import roles from './constants/roles';

const App = () => {
  // Mock user info - replace with your actual user data
  const userInfo = {
    name: 'Amar Singh',
    email: 'amar@bolsta.com',
    role: roles.ADMIN
  };

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar 
          navigations={navigations} 
          userRole={userInfo.role}
          userInfo={userInfo}
          logoSrc="/public/bolsta_logo.png"
        />
        
        <main className="flex-1 p-4 md:ml-64 min-h-screen">
          {/* Your main content goes here */}
          <h1 className="text-2xl font-bold">Your Content</h1>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;