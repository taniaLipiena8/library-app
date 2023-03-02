import { Route, Routes, useNavigate , Navigate} from "react-router-dom";
import { useState, useEffect } from "react";
import api from './api/base'
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./components/Home";
import BookDetail from "./components/BookDetail"
import Cart from "./components/Cart";
import { PrivateRoute } from "./components/PrivateRoute";


function App() {
  const [books, setBooks] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [temp, setTemp] = useState(0)
  const auth = localStorage.getItem('user_id')

  const booksPerPage = 20

  const [buttonText, setButtonText] = useState('Idle')
  const [buttonID, setButtonID] = useState(null)

  const userid = localStorage.getItem('user_id')
  const navigate = useNavigate()

  const handlePageClick = (data) => {
    setPageNumber(data)
   
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
  }, [pageNumber, temp])



  return (
    <div className="App">
      <Nav handleCartClick/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/book" element={<PrivateRoute><Home books={books} handlePageClick={handlePageClick} handleAdd={handleAdd} buttonText={buttonText} buttonID={buttonID} pageNumber={pageNumber} /></PrivateRoute>} /> 
        
        <Route path="/book/:id" element={<PrivateRoute><BookDetail handleAdd={handleAdd} buttonText={buttonText} buttonID={buttonID} /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
