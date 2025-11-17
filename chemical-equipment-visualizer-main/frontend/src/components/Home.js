import React from 'react';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center justify-center font-egregio script p-6 text-center">
      <div className="max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        <div className="text-6xl mb-6">
          <span role="img" aria-label="chemical beaker">⚗️</span>
        </div>
        <h1 className="text-4xl font-extrabold text-teal-900 mb-4">
          Welcome to Chemical Equipment Visualizer
        </h1>
        <p className="text-lg text-teal-800 mb-6">
          Your gateway to insightful analysis and visualization of chemical equipment data.
        </p>
        <p className="text-md text-teal-700 mb-8">
          Upload your experiment data, monitor equipment parameters, and optimize your processes with interactive charts and dashboards.
        </p>
        <button
          onClick={() => window.location.href = '/homepage'}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
          aria-label="Go to equipment data homepage"
        >
          Get Started &rarr;
        </button>
      </div>
    </div>
  );
};

export default Home;
