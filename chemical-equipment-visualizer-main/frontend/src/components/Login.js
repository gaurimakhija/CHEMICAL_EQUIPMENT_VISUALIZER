import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    console.log("Login component rendered");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/token/', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/homepage');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 flex flex-col items-center justify-center font-egregio script p-4" aria-label="Chemical login page">
            <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl p-8" style={{ 
                backgroundImage: "radial-gradient(circle at 20% -10%, rgba(0, 150, 150, 0.08), transparent 35%), radial-gradient(circle at 100% 0%, rgba(0, 100, 180, 0.08), transparent 30%)" 
            }}>
               
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-teal-50 border border-teal-200 rounded-full flex items-center justify-center mx-auto mb-4" aria-label="Lab icon">
                        <span role="img" aria-label="Beaker" style={{ fontSize: 22 }}>⚗️</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Lab Access</h2>
                    <p className="text-gray-600 mt-2">Sign in to run your experiments</p>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6" aria-label="Demo credentials">
                    <p className="font-semibold text-teal-800 text-sm uppercase tracking-wide">Demo Credentials</p>
                    <div className="mt-2 space-y-1 text-sm">
                        <p className="text-teal-700"><span className="font-medium">Username:</span> user@gauri</p>
                        <p className="text-teal-700"><span className="font-medium">Password:</span> @gaurifossee</p>
                    </div>
                </div>

              
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6" role="alert" aria-live="polite">
                        <p className="text-red-700 text-sm text-center">{error}</p>
                    </div>
                )}

             
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Login form">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate("/register")}
                            className="font-semibold text-teal-600 hover:text-teal-500 transition-colors duration-200 focus:outline-none focus:underline"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


