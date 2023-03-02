import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Nav = ({handleCartClick}) => {
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
                    <div>
                        <li> <Link to={'/book'} >Daftar buku</Link></li>
                        <li> <Link to={'/cart'} onClick={handleCartClick}>Keranjang</Link></li>
                    </div>
                    <div>
                        <li> Hello, {auth}</li>
                        <li onClick={onLogOut}> Logout</li>
                    </div>

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