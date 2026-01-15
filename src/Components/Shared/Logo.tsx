import { Link } from "react-router";

export default function Logo() {
    return (
        <Link to='/' className="flex items-end gap-1">
            <img src={'/logo.svg'} alt="logo" className="h-7 w-auto invert" />
            <span className="font-bold text-xl">Micro Task</span>
        </Link>
    )
}