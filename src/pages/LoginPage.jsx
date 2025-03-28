import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('session', JSON.stringify({
          email: result.email,
          isAdmin: result.isAdmin
         }));
        console.log(result);
        alert('Login Successful');
        
        window.location.href = '/events'; // Redirect after login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.log("Error: ",error)
      setError('Server error, try again later');
    }
  };

  return (
    <div className="flex flex-col-reverse w-full h-screen md:mt-20  md:flex-row md:justify-center">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" className="w-full py-2 bg-gradient-to-tr from-[#FBDA61] to-[#FF5ACD] text-white rounded-md">
            Login
          </button>

          <div className="text-center mt-4 text-sm">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-gradient-to-tr from-[#FBDA61] to-[#FF5ACD] flex justify-center items-center text-black p-6">
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-semibold">Welcome to EventSphere</h3>
          <p className="mt-4">
            Organize, schedule, and manage your events easily with our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
