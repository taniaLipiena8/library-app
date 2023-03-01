import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import api from '../api/base'
import { Link, useNavigate } from "react-router-dom";

const Home = ({ books, handlePageClick, handleAdd, buttonText, buttonID }) => {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/book/${id}`)
    }

    return (
        <div className="Home">
            <h1>Book Collection List</h1>
            
            <table className="table">
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
                                <td><img src={book.image_m} /></td>
                                <td>{book.title}</td>
                                <td>{Math.ceil(book.average_ratting)}</td>
                                <td>{book.stok}</td>
                                <td className="homeBtn">
                                    <button onClick={() => handleClick(book.id)}>View Detail</button>
                                    <button onClick={() => handleAdd(book.id)}>{
                                        buttonID === book.id ?
                                            buttonText === 'Idle' ? 'Add To Cart' : 'Loading...' : 'Add To Cart'}</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'< previous'}
                nextLabel={"next >"}
                breakLabel="..."
                marginPagesDisplayed={3}
                pageRangeDisplayed={2}
                pageCount={8}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />

        </div>
    );
}

export default Home;