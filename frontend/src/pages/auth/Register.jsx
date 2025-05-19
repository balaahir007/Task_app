import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../../zustand/authStore';
import { validateRegister } from '../../validation/authValidation';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMsg,setErrorMsg] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { registerUser,isLoading } = useAuthStore()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validateRegister({...form})
            await registerUser(form);
            navigate('/');
        } catch (err) {
            setErrorMsg(err.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-green-600">Sign Up</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-600 focus:outline-none"
                        aria-label="Toggle Password Visibility"
                    >
                        {showPassword ? <FaEyeSlash className='cursor-pointer' /> : <FaEye className='cursor-pointer' />}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-600 focus:outline-none"
                        aria-label="Toggle Confirm Password Visibility"
                    >
                        {showConfirmPassword ? <FaEyeSlash className='cursor-pointer' /> : <FaEye className='cursor-pointer' />}
                    </button>
                </div>
                {
                    errorMsg && <span className='text-red-500 '>{errorMsg}</span>
                }

                <button
                    type="submit"
                    className="w-full bg-green-600 flex items-center justify-center cursor-pointer text-white py-2 rounded hover:bg-green-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? <span className='w-6 h-6 border-2 border-t-transparent  rounded-full  animate-spin border-white'></span> : <span>Register</span>}

                </button>

                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
