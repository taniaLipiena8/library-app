import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Nav = () => {
    const auth = localStorage.getItem('username')
    const navigate = useNavigate()

    const onLogOut = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        navigate('/login')
    }

    return (
        <nav className="Nav">
            {auth ?
                <ul>
                    <li> <Link to={'/book'}>Daftar buku</Link></li>
                    <li> <Link to={'/cart'}>Keranjang</Link></li>
                    <li> Hello, {auth}</li>
                    <li onClick={onLogOut}> Logout</li>
                </ul> :
                <ul>
                    <li> <Link to={'/login'}>Daftar buku</Link></li>
                    <li> <Link to={'/login'}>Keranjang</Link></li>
                    <li> <Link to={'/login'}>Login</Link></li>
                </ul>
            }
        </nav>
    );
}

export default Nav;