import { useState, useEffect, useContext } from "react";
import api from '../api/base'
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { UserContext } from "../context/UserContext";

const Cart = () => {
    const navigate = useNavigate()
    const {user_id}= useContext(UserContext)
    const [cart, setCart] = useState([])

    const fetchCart = async () => {
        try {
            const resp = await api.get(`/perpustakaan/api/v1/cart?user_id=${user_id}`)
            if (resp.data.code === 200) {
                if (resp.data.message === 'Data not found') {
                    alert('Cart is empty')
                    navigate('/book')
                }
                setCart(resp.data.data)
            } else {
                alert('gagal fetch cart')
            }
        } catch (error) {
            alert(error.resp.data.message)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleDelete = async (id) => {
        try {
            const resp = await api.delete(`/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${id}`)
            if (resp.data.code === 200) {
                alert(resp.data.message)
            }
        } catch (error) {
            alert(error.resp.data.message)
        }

        fetchCart()

    }

    return (
        <div className="Cart">
            <div className="Cart-list ">
                {cart.map((cartItem) => (
                    <CartItem cartItem = {cartItem} handleDelete={handleDelete} key={cartItem.id}/>
                ))}
            </div>
        </div>
    );
}

export default Cart;