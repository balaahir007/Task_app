import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../zustand/authStore.js';
import { validateLogin } from '../../validation/authValidation.js';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState(null)
    const location = useLocation()
    const redirect = location?.state?.fromPage || '/'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { loginUser, isLoading } = useAuthStore()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validateLogin({...form})
            await loginUser(form);
            navigate(redirect)
        } catch (err) {
            setErrorMsg(err.message || 'login failed')
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                {
                    errorMsg && <span className='text-red-500'>{errorMsg}</span>
                }
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2  flex items-center cursor-pointer justify-center rounded hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? <span className='w-6 h-6 border-2 border-t-transparent  rounded-full  animate-spin border-white'></span> : <span>Login</span>}
                </button>
                <p className="text-sm text-center">
                    Don’t have an account?{' '}
                    <span
                        className="text-blue-600  cursor-pointer"
                        onClick={() => navigate('/signup')}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
