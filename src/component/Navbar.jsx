import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
import { FaUserAlt } from 'react-icons/fa'
import { TbLogout } from 'react-icons/tb'
import { BsFillCartCheckFill } from 'react-icons/bs'

const Navbar = () => {

    const [cookie, removeCookie] = useCookies(["userToken"])
    const navigate = useNavigate()
    const token = localStorage.getItem("userToken")

    const onLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#17345f",
            confirmButtonText: "Yes, sure",
            cancelButtonColor: "#F47522",
            cancelButtonText: "Not now",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "logout success, see you 👋🏻",
                    showConfirmButton: false,
                    timer: 1500,
                });
                localStorage.removeItem("userToken");
                localStorage.removeItem("name");
                localStorage.removeItem("id");
                localStorage.removeItem("role");
                localStorage.removeItem("partner_id");
                localStorage.removeItem("idclient");
                // localStorage.setItem("idpartner", data.partner_id);
                navigate('/login')
            }
        });
    }

    return (
        <div className='relative bg-bozz-one'>
            <div className='container mx-auto py-px-10'>
                <div className="navbar text-white">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-2xl">EO Bozz</a>
                        <div className='pl-5'>
                            <Link to={"/"} className="btn btn-ghost normal-case text-lg">Home</Link>
                        </div>
                    </div>

                    <div className="flex-none gap-2">
                        <div className="form-control text-black">
                            <input type="text" placeholder="Search" className="input input-bordered bg-white text-bozz-one" />
                        </div>
                            {token ? (
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://placeimg.com/80/80/people" />
                                        </div>
                                    </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-bozz-six text-bozz-one border border-bozz-one rounded-box w-32">
                                    <li>
                                        <Link to={'/profile'}
                                            className="justify-between"><FaUserAlt className='text-md'
                                                 />Profile</Link>
                                    </li>
                                    <li>
                                        <Link to={'/transaction'}
                                            className="justify-between flex text-sm"><BsFillCartCheckFill className='text-md'
                                            />My order</Link>
                                    </li>
                                    <li onClick={onLogout}><a className="justify-between"><TbLogout className='text-lg' />Logout</a></li>
                                </ul>
                                </div>
                            ) : <div className='flex gap-5'>
                                <Link to='/login' ><button className='bg-bozz-six text-bozz-one ring-2 ring-bozz-two'>Login</button></Link>
                                <Link to='/register/user' ><button className='bg-bozz-six text-bozz-one ring-2 ring-bozz-two'>Register as Clients</button></Link>
                            </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
