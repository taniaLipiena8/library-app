import { useState, useEffect } from "react";
import api from '../api/base'
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()
    const userid = localStorage.getItem('user_id')
    const [cart, setCart] = useState([])
    console.log(userid);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const resp = await api.get(`/perpustakaan/api/v1/cart?user_id=${userid}`)
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
        fetchCart()
    }, [])

    const handleDelete = async (id) => {
        try {
            const resp = await api.delete(`/perpustakaan/api/v1/cart?user_id=${userid}&book_id=${id}`)
            if (resp.data.code === 200) {
                alert(resp.message)
            }
        } catch (error) {
            alert(error.resp.data.message)
        }

    }


    return (
        <div className="Cart">
            {console.log(cart)}
            <div className="row ">
                {cart.map((cartItem) => (
                    <div key={cartItem.id} className="col-md-4 my-2">
                        <div className="card shadow-sm" style={{ height: '250px' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <img src={cartItem.image_m} />
                                    </div>
                                    <div className="col">
                                        <h5 className="card-subtitle mb-2 text-left">
                                            {cartItem.title}
                                        </h5>
                                        <p className="card-text">sisa stok: {cartItem.stok}</p>
                                        <button className="deleteBtn" onClick={() => handleDelete(cartItem.id)}>delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Cart;