import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {registerUserThunk} from '../../store/slice/user/user.thunk.js'

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(state=>state.userReducer);

    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "male",
    });

    useEffect(()=>{
            if (isAuthenticated){
                navigate("/");
            }
        }, [isAuthenticated]);

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        console.log(signupData);
    };


    const handleSignup = async () => {
        if (signupData.password!==signupData.confirmPassword){
            return toast.error("Password and Confirm Password does not match");
        }
        const response = await dispatch(registerUserThunk(signupData));
        if (response?.payload?.success){
            navigate("/");
        }
    }


    return (
        <div className="flex justify-center items-center p-6 min-h-screen">
            <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold">Signup</h2>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <FaUser />
                    <input
                        name="fullName"
                        type="text"
                        required
                        placeholder="Full Name"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="30"
                        title="Only letters, numbers or dash"
                        onChange={handleInputChange}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                    <FaUser />
                    <input
                        name="username"
                        type="text"
                        required
                        placeholder="Username"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="30"
                        title="Only letters, numbers or dash"
                        onChange={handleInputChange}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                    <IoKeySharp />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        minlength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        onChange={handleInputChange}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                    <IoKeySharp />
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Confirm Password"
                        minlength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        onChange={handleInputChange}
                    />
                </label>

                {/* <label className="input input-bordered flex items-center gap-2 w-full">
                    <input type="radio" name="radio-4" className="radio radio-primary" checked="checked" />
                    <input type="radio" name="radio-4" className="radio radio-primary" />
                </label> */}
                <div className="flex gap-6 justify-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="radio radio-primary"
                            onChange = {handleInputChange}
                        />
                        <span>Male</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="radio radio-primary"
                            onChange = {handleInputChange}
                        />
                        <span>Female</span>
                    </label>
                </div>

                <button onClick={handleSignup} class="btn btn-primary">Signup</button>
                <p>
                    Already have an account? &nbsp; <Link className="text-blue-400 underline" to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;