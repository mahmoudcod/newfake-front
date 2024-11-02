import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://demoblog-h71e.onrender.com/api/auth/register', formData);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Handle successful login (e.g., redirect to dashboard)
      console.log('Login successful:', response.data);

      // You can add navigation here, for example:
      // window.location.href = '/dashboard';

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'An error occurred during login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left side - branding */}
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-blue-600 text-5xl md:text-6xl font-bold mb-4">Facebook</h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>

        {/* Right side - login form */}
        <div className="w-full md:w-[396px] bg-white p-4 rounded-lg shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg font-bold transition
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="text-center">
              <a href="none" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
            <hr className="my-4" />
            <div className="text-center">
              <button
                type="button"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition"
              >
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;