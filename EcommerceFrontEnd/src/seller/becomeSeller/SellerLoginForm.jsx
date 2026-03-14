import React from 'react';

const SellerLoginForm = ({ handleShowPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle seller login logic
    console.log('Seller login form submitted');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Seller Login</h1>
        <p className="text-gray-500">Log in to your seller account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-sm">
          Don't have a seller account?{' '}
          <button
            onClick={handleShowPage}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};

export default SellerLoginForm;