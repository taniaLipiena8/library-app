const BookTableView = ({ books, handleAdd, handleClick, changeButtonText }) => {
    return (
        <table className="table" style={{ width: '70rem' }}>
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Avg Rating</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody>
                {
                    books.map((book) => (
                        <tr key={book.id}>
                            <td><img src={book.image_m} style={{ height: '200px', width: '130px' }} alt="book" /></td>
                            <td style={{ width: '35rem' }}>{book.title}</td>
                            <td>{Math.ceil(book.average_ratting)}</td>
                            <td>{book.stok}</td>
                            <td className="homeBtn" >
                                <button className="viewDetail" onClick={() => handleClick(book.id)}>View Detail</button>
                                <button className="addCart" onClick={() => handleAdd(book.id)}>{changeButtonText(book.id)}</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default BookTableView;