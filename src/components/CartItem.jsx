const CartItem = ({cartItem, handleDelete}) => {
    return (
        
        <div className="card" style={{ width: '30rem' }} >

            <div className="row">
                <div className="col">
                    <img src={cartItem.image_m} className="card-img" alt="" style={{ height: '20rem' }} />
                </div>
                <div className="col">
                    <div className="card-body">
                        <div className="title">
                            <h5 className="card-title">{cartItem.title}</h5>
                        </div>
                        <div className="card-bottom">
                            <p className="card-text">sisa stok: {cartItem.stok}</p>
                            <button className="deleteBtn" onClick={() => handleDelete(cartItem.id)}>delete</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;