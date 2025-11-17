
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  // Initial fetch for history
  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  // Fetch user's upload history
  const fetchHistory = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setError("");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/equipment/history/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        await refreshTokenAndRetry(fetchHistory);
      } else {
        setError("Failed to fetch history. Please try again later.");
      }
    }
  };

  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found. Please log in.");
      navigate("/login");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file); 

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/equipment/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      navigate(`/results/${response.data.dataset_id}`);
    } catch (err) {
      if (err.response?.status === 401) {
        await refreshTokenAndRetry(handleUpload);
      } else if (err.response?.data?.error) {
        setError(`Error: ${err.response.data.error}`);
      } else {
        setError("Error uploading file. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshTokenAndRetry = async (retryFunction) => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        }
      );
      localStorage.setItem("access_token", res.data.access);
      await retryFunction();
    } catch (err) {
      setError("Session expired. Please log in again.");
      navigate("/login");
    }
  };

  
  const handleHistoryClick = (datasetId) => {
    navigate(`/results/${datasetId}`);
  };

  
  const toggleHistory = () => setShowHistory(!showHistory);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-lg mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <span role="img" aria-label="flask" className="text-4xl">
              ⚗️
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            Chemical Equipment Lab
          </h1>
          <p className="text-base text-gray-600 mb-2">
            Interactive test and analysis for your chemical equipment data.
          </p>
        </div>

      
        <div className="bg-white border-l-4 border-blue-300 rounded-lg shadow p-5 mb-6">
          <h2 className="text-xl font-semibold text-teal-800 mb-3">
            Test Your Equipment Knowledge
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Q1:</span> What is the primary use of a volumetric flask?
              <br />
              <span className="text-sm text-gray-600">
                A) Weighing solids  B) Preparing solutions  C) Heating liquids
              </span>
            </div>
            <div>
              <span className="font-medium">Q2:</span> Which CSV file column is critical for pressure data analysis?
              <br />
              <span className="text-sm text-gray-600">
                A) sample_id  B) pressure_Pa  C) solution_color
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-gradient-to-bl from-teal-50 to-blue-100 border border-teal-200 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md shadow-lg px-6 py-8 mb-7">
          <label htmlFor="file-upload" className="block cursor-pointer">
            <div className="flex flex-col items-center justify-center h-44">
              <svg
                className="w-10 h-10 mb-2 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1M12 12v6m0 0l-2-2m2 2l2-2"
                />
              </svg>
              <p className="font-semibold text-teal-700">
                Add your chemical equipment CSV file
              </p>
              <span className="mt-1 mb-2 text-xs text-teal-600 bg-white px-2 rounded-full shadow-inner">
                Only CSV with columns: sample_id, [measurement]...
              </span>
              <span className="text-xs text-gray-500">
                Max size: 800x400 rows, recommended headers: sample_id, equipment, reading, time
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".csv"
              />
              {file && (
                <span className="text-sm text-teal-600 mt-3">Selected file: {file.name}</span>
              )}
            </div>
          </label>

          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Analyze File"}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>

        
        <div className="text-center">
          <button
            onClick={toggleHistory}
            className="text-teal-600 font-egregio script hover:underline focus:outline-none"
          >
            {showHistory ? "Hide" : "Show"} Upload History
          </button>
        </div>
        {showHistory && (
          <div className="mt-5 bg-white rounded-xl shadow-lg border-l-4 border-blue-300 p-5 animate-slide-down">
            <h2 className="text-xl font-egregio script text-teal-800 mb-3 text-center">
              Upload History
            </h2>
            {history.length > 0 ? (
              <ul className="space-y-2">
                {history.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleHistoryClick(item.id)}
                    className="p-2 bg-blue-50 rounded hover:bg-teal-50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-egregio script text-gray-700">
                        {item.filename}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.uploaded ? new Date(item.uploaded).toLocaleString() : ""}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No history found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
