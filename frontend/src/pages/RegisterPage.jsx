import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/authActions';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone_no, setPhone_no] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState(false);

    const [matched_password, setMatched_password] = useState('')
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, isAuthenticated)


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(email, first_name, last_name, phone_no, password, password2))
    }

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-yellow-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-yellow-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label for="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Register
                        </label>
                        <form onSubmit={handleSubmit} method="#" action="#" className="mt-10">

                            <div className="mt-7">
                                <input type="text" placeholder="Fist Name" name="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <input type="text" placeholder="Last Name" name="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <input type="text" placeholder="+ Phone No" name="phone_no" value={phone_no} onChange={(e) => setPhone_no(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <input type="password" placeholder="Confirm Password" name="confirm_password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>

                            <div className="mt-7">
                                <button type='submit' className="bg-yellow-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Register
                                </button>
                            </div>

                            <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2" >Already have an account?</label>
                                    <Link to={'/login'} className=" text-yellow-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Login
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

export default RegisterPage