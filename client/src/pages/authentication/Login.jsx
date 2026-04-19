import React, {useState, useEffect} from 'react';
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserThunk} from '../../store/slice/user/user.thunk.js'

function Login() {

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(state=>state.userReducer);

    useEffect(()=>{
        if (isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleInputChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        console.log(loginData);
    };

    const handleLogin = async () =>{
        const response = await dispatch(loginUserThunk(loginData));
        if (response?.payload?.success){
            navigate("/");
        }
        // console.log("Login");
        // toast.success("Login Successful");
    }

    

    return (
        <div className="flex justify-center items-center p-6 min-h-screen">
            <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold">Login</h2>
                <label class="input validator w-full">
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
                        onChange = {handleInputChange}
                    />
                </label>

                <label class="input validator w-full">


                    <IoKeySharp />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        minlength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        onChange = {handleInputChange}
                    />
                </label>
            <button onClick={handleLogin} class="btn btn-primary">Login</button>
            <p>
                Don't have an account? &nbsp; <Link className="text-blue-400 underline" to="/signup">Sign Up</Link>
            </p>
            </div>
        </div>
    )
}

export default Login