import { NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "./Logo";
import { UserContext } from "../../Context/AuthContext";
import Loader from "./Loader";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
    const userCtx = useContext(UserContext);
    if (!userCtx) throw new Error("UserContext is missing. Wrap app with UserContext Provider.");

    const { user, loading, signOutUser } = userCtx;
    const [isHover, setIsHover] = useState(false)
    useEffect(() => {
        const func = () => setIsHover(false)
        func()
    }, [user])
    return (
        <header className="w-full bg-(--bg-secondary) shadow-md py-4 sticky z-100 top-0">
            <nav className="w-11/12 mx-auto flex items-center justify-between text-sm font-medium">
                <Logo />
                <div className="space-x-2 hidden md:block">
                    <NavLink className="trns hover:text-gray-600" to='/'>Home</NavLink>
                    <NavLink className="trns hover:text-gray-600" to='/all-items'>All Items</NavLink>
                    <NavLink className="trns hover:text-gray-600" to='/about'>About</NavLink>
                    <NavLink className="trns hover:text-gray-600" to='/contact'>Contact Us</NavLink>
                </div>
                {
                    loading ?
                        <Loader />
                        :
                        user ?
                            <section onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="relative">
                                <div className="flex items-center justify-center gap-2">
                                    {
                                        user?.photoURL ?
                                            <img src={user?.photoURL} alt="user image" className="h-8 aspect-square rounded-full object-cover" />
                                            :
                                            <FaUser className="h-10 w-10 aspect-square" />
                                    }
                                    <IoIosArrowDown className={`trns ${isHover ? "rotate-180" : "rotate-0"}`} />
                                </div>
                                {
                                    isHover
                                    &&
                                    <div className="space-x-2 absolute bottom-0 translate-y-full -translate-x-1/2 p-2 flex flex-col gap-1 bg-(--bg-secondary)">
                                        <NavLink className="trns hover:bg-(--bg) px-4 py-2 trns rounded-sm" to='/dashboard'>Dashboard</NavLink>
                                        <div className="flex flex-col md:hidden gap-2">
                                            <NavLink className="trns hover:bg-(--bg) px-4 py-2 rounded-sm" to='/'>Home</NavLink>
                                            <NavLink className="trns hover:bg-(--bg) px-4 py-2 rounded-sm" to='/all-items'>All Items</NavLink>
                                            <NavLink className="trns hover:bg-(--bg) px-4 py-2 rounded-sm" to='/about'>About</NavLink>
                                            <NavLink className="trns hover:bg-(--bg) px-4 py-2 rounded-sm" to='/contact'>Contact Us</NavLink>
                                        </div>
                                        <button
                                            onClick={signOutUser}
                                            className="btn btn-primary trns rounded-sm shadow-md/30"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                }
                            </section>
                            :
                            <div className="space-x-2">
                                <NavLink className="trns hover:text-gray-600" to='/register'>Register</NavLink>
                                <NavLink className="trns hover:text-gray-600" to='/login'>Login</NavLink>
                            </div>
                }
            </nav>
        </header>
    )
}