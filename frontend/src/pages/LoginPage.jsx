import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const err = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    }

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-yellow-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-yellow-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label for="" className="block mt-3 text-xl text-yellow-700 text-center font-semibold">
                            Login
                        </label>

                        <form method="POST" onSubmit={handleSubmit} className="mt-10">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    className={`mt-1 block w-full h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${err ? 'border-red-500 bg-red-100 animate-pulse' : 'border-none'
                                        }`}
                                    required />
                            </div>

                            <div className="mt-7">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className={`mt-1 block w-full h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${err ? 'border-red-500 bg-red-100 animate-pulse' : 'border-none'
                                        }`}
                                    required />
                            </div>

                            <div className="mt-7 flex">
                                <label for="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                <div className="w-full text-right">
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-7">
                                <button className="bg-yellow-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>

                            <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2" >Don't have an account?</label>
                                    <Link to={'/register'} className=" text-yellow-800 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage