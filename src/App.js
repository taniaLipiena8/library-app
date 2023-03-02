import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from './api/base'
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./components/Home";
import BookDetail from "./components/BookDetail"
import Cart from "./components/Cart";


function App() {
  const [books, setBooks] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const booksPerPage = 20

  const [buttonText, setButtonText] = useState('Idle')
  const [buttonID, setButtonID] = useState(null)

  const userid = localStorage.getItem('user_id')
  const navigate = useNavigate()

  const handlePageClick = (data) => {
    setPageNumber(data.selected + 1)
    console.log(data.selected);
  }

  const handleAdd = async (id) => {
    try {
      setButtonID(id)
      setButtonText('Loading')
      const response = await api.post('/perpustakaan/api/v1/cart', {
        user_id: userid,
        book_id: id
      })

      if (response.data.code === 200) {
        alert(response.data.message)
        setButtonText('Idle')
        setButtonID(null)
      }
    }
    catch (error) {
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(`/perpustakaan/api/v1/book?page=${pageNumber}&limit=${booksPerPage}`)
        if (response.data.code === 200) {
          setBooks(response.data.data.data_per_page)

        } else {
          alert('gagal fetch data')
        }

      } catch (error) {
        alert(error.response.data.message)
      }

    }
    fetchBooks()
  }, [pageNumber])



  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/book" element={<Home books={books} handlePageClick={handlePageClick} handleAdd={handleAdd} buttonText={buttonText} buttonID={buttonID} />} />
        <Route path="/book/:id" element={<BookDetail handleAdd={handleAdd} buttonText={buttonText} buttonID={buttonID} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
