import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import api from '../api/base'
import { Link, useNavigate } from "react-router-dom";

const Home = ({ books, handlePageClick, handleAdd, buttonText, buttonID }) => {
    const navigate = useNavigate()
    const [listLayout, setListLayout] = useState('table')

    const handleClick = (id) => {
        navigate(`/book/${id}`)
    }

    const changeLayout=()=>{

        if(listLayout==='table'){
            setListLayout('card') 
            return
        }
        setListLayout('table')
        
    }

    return (
        
        <div className="Home">
            <h1>Book Collection List</h1>
            <h3 onClick={changeLayout} >Click here to change to {listLayout === 'table'? 'Card list view' : 'Table list view'}</h3>
            {listLayout === 'table' ?
                <table className="table" style={{width:'70rem'}}>
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
                                    <td style={{width:'35rem'}}>{book.title}</td>
                                    <td>{Math.ceil(book.average_ratting)}</td>
                                    <td>{book.stok}</td>
                                    <td className="homeBtn" >
                                        <button className="viewDetail" onClick={() => handleClick(book.id)}>View Detail</button>
                                        <button className="addCart" onClick={() => handleAdd(book.id)}>{
                                            buttonID === book.id ?
                                                buttonText === 'Idle' ? 'Add To Cart' : 'Loading...' : 'Add To Cart'}</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> :
                
                    books.map((book) => (
                        <div className="card" style={{ height: '13rem', width: '50rem', margin: '10px' }} key={book.id}>
                            <div className="row">
                                <div className="col-md-4" >
                                    <img src={book.image_m} className="card-img" alt="" style={{ height: 'auto', width: '130px', marginLeft:'20px'}} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="card-title-first">
                                            <h5 >{book.title}</h5>
                                            <p >Average rating: {Math.ceil(book.average_ratting)}</p>
                                        </div>
                                        <div className="card-text-first">
                                            <p className="author">{book.author}</p>
                                            <p >stok tersedia: {book.stok}</p>
                                        </div>
                                        <div>
                                            <button className="viewDetail" onClick={()=>handleClick(book.id)}>View Detail</button>
                                            <button className="addCart" onClick={() => handleAdd(book.id)}>{buttonText === 'Idle' ? 'Add To Cart' : 'Loading...'}</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            }

            <ReactPaginate
                previousLabel={'< previous'}
                nextLabel={"next >"}
                breakLabel="..."
                marginPagesDisplayed={3}
                pageRangeDisplayed={2}
                pageCount={15}
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