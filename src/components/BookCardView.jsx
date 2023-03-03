const BookCardView = ({books, handleAdd, handleClick, changeButtonText}) => {
    
    return (
        <div className="card-view">
            {books.map((book) => (
                <div className="card" style={{ height: '13rem', width: '50rem', margin: '10px' }} key={book.id}>
                    <div className="row">
                        <div className="col-md-4" >
                            <img src={book.image_m} className="card-img" alt="" style={{ height: '205px', width: '130px', marginLeft: '20px' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="card-title-first">
                                    <h5 >{book.title} </h5>
                                    <p >Average rating: {Math.ceil(book.average_ratting)}</p>
                                </div>
                                <div className="card-text-first">
                                    <p className="author">{book.author}</p>
                                    <p >stok tersedia: {book.stok}</p>
                                </div>
                                <div>
                                    <button className="viewDetail" onClick={() => handleClick(book.id)}>View Detail</button>
                                    <button className="addCart" onClick={() => handleAdd(book.id)}>{changeButtonText(book.id)}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookCardView;