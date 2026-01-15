import { useForm } from "react-hook-form"
import Img from '../../../assets/auth.png'
import '../../../Utils/styles/form.css'
import { Link, useLocation, useNavigate } from "react-router"
import { useContext, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"
import { AuthContext } from "../../../Context/AuthContext"

interface userInfo {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<userInfo>()
    const userCtx = useContext(AuthContext);
    if (!userCtx) throw new Error("UserContext is missing. Wrap app with UserContext Provider.");

    const { user, sigInUser, googleSignIn } = userCtx;
    const [isVisible, setIsVisible] = useState(false)
    const { state } = useLocation()
    const navigate = useNavigate()
    if (user) navigate(state || "/")

    const formSubmit = async (data: userInfo) => {
        try {
            const res = await sigInUser(data.email, data.password);

            if (res) {
                toast.success(`Welcome Back, ${res.user?.displayName}`);
                reset()
            }
            else toast.error("Something went wrong!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "login failed";
            toast.error(errorMessage);
            console.error(err);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const res = await googleSignIn()
            if (!res.user?.email) throw new Error("Google login failed")

            await axios.post(`${import.meta.env.VITE_SERVER}/citizen`, { name: res.user.displayName, email: res.user.email, photo: res.user.photoURL });
            toast.success(`Welcome Back, ${res.user?.displayName}`)

        } catch (error) {
            console.error(error)
            toast.error("Google login failed")
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center-safe justify-items-center-safe gap-6 m-6 w-11/12 mx-auto">
            <aside className="flex flex-col gap-4 items-center">
                <img src={Img} alt="image" className="w-full h-auto max-w-2xs" />
                <h2 className="text-xl font-semibold">Register at InfraCare Today!</h2>
            </aside>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center gap-3 p-8 pt-12 shadow-md/40 rounded-2xl w-11/12 md:w-3/4">
                <div className="w-full">
                    {errors.email ? <p className="text-sm text-rose-600">{errors.email.message as string}</p> : <label htmlFor="email">Email :</label>}
                    <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter your email" id="email" />
                </div>
                <div className="w-full relative">
                    {errors.password ? <p className="text-sm text-rose-600">{errors.password.message as string}</p> : <label htmlFor="password">Password :</label>}
                    <input type={`${isVisible ? "text" : "password"}`} {...register("password", { required: "password is required" })} placeholder="Enter password" id="password" />
                    <button onClick={() => setIsVisible(!isVisible)} type="button" className="absolute right-2 bottom-1 cursor-pointer -translate-y-1/2" >{isVisible ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
                <p className=" text-sm my-4">Don't have an account? <Link state={state || '/'} to='/register' className="text-sky-500 font-medium hover:text-blue-600 trnsition">Register</Link></p>
                <button disabled={isSubmitting} type="submit" className="btn trnsition">{isSubmitting ? "Logging in..." : "Login"}</button>
                <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="btn-out hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Login with Google</button>
            </form>
        </div>
    )
}