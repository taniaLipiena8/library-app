import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = () => {
    const {username} = useContext(UserContext)
    const navigate = useNavigate()

    const onLogOut = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        navigate('/login')
    }

    return (
        <nav className="Nav">
            {username &&
                <ul>
                    <div>
                        <li> <Link to={'/book'} >Daftar buku</Link></li>
                        <li> <Link to={'/cart'}>Keranjang</Link></li>
                    </div>
                    <div>
                        <li> <a >Hello, {username}</a> </li>
                        <li onClick={onLogOut}> <a >Logout</a> </li>
                    </div>

                </ul>
            }
        </nav>
    );
}

export default Nav;