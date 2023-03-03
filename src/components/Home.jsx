import api from '../api/base'
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import BookTableView from "./BookTableView";
import BookCardView from "./BookCardView";
import { UserContext } from "../context/UserContext";
import { AddBookToCart } from "../services/AddBookToCart"

const Home = () => {
    const navigate = useNavigate()
    const {user_id}= useContext(UserContext)
    const booksPerPage = 20
    const [listLayout, setListLayout] = useState('table')
    const [books, setBooks] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [buttonText, setButtonText] = useState('Idle')
    const [buttonID, setButtonID] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get(`/perpustakaan/api/v1/book?page=${pageNumber}&limit=${booksPerPage}`)
                if (response.data.code === 200) {
                    const newBooks = response.data.data.data_per_page
                    setBooks(newBooks)
    
                } else {
                    alert('gagal fetch data')
                }
    
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        fetchBooks()
    }, [pageNumber])

    const handlePageClick = (data) => {
        setPageNumber(data)
    }

    const handleAdd = async (id) => {
        try {
            setButtonID(id)
            setButtonText('Loading')
            await AddBookToCart(id, user_id)
           
        } catch (error) {
            alert(error)
        }
        setButtonText('Idle')
        setButtonID(null)
    }


    const handleClick = (id) => {
        navigate(`/book/${id}`)
    }

    const changeLayout = () => {
        if (listLayout === 'table') {
            setListLayout('card')
            return
        }
        setListLayout('table')
    }

    const changeButtonText = (id) => {
        if (id === buttonID) {
            if (buttonText !== 'Idle') {
                return 'Loading...'
            }
        }
        return 'Add To Cart'
    }

    return (

        <div className="Home">
            <h1>Book Collection List</h1>
            <h3 onClick={changeLayout} >Click here to change to {listLayout === 'table' ? 'Card list view' : 'Table list view'}</h3>
            {listLayout === 'table' ?
                <BookTableView books={books} handleAdd={handleAdd} handleClick={handleClick} changeButtonText={changeButtonText} />
                :
                <BookCardView books={books} handleAdd={handleAdd} handleClick={handleClick} changeButtonText={changeButtonText} />
            }
            <PaginationControl
                page={pageNumber}
                between={3}
                total={260}
                limit={20}
                changePage={(page) => handlePageClick(page)}
                ellipsis={1}
            />
        </div>
    );
}

export default Home;

{/*another way to paginate
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
                activeLinkClassName=""
                
            /> */}