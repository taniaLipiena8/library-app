import { useParams} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from '../api/base'
import { AddBookToCart } from "../services/AddBookToCart"
import { UserContext } from "../context/UserContext";

const BookDetail = () => {
    const { id } = useParams()
    const [chosenBook, setChosenBook] = useState({})
    const {user_id}= useContext(UserContext)
    const [buttonText, setButtonText] = useState('Idle')
    const [buttonID, setButtonID] = useState(null)

    useEffect(() => {
        const getBookbyID = async () => {
            try {
                const response = await api.get(`/perpustakaan/api/v1/book/${id}`)
                if (response.data.message === 'Success') {
                    setChosenBook(response.data.data[0])
                }
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getBookbyID()
    }, [id])

    const handleAdd = async () => {
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

    return (
        <div className="bookDetail">
            <h1>Book Detail</h1>
            <div className="card" style={{ width: '50rem' }}>
                <div className="row">
                    <div className="col">
                        <img src={chosenBook.image_l} className="card-img" alt="" style={{ height: '30rem' }} />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{chosenBook.title}</h5>
                            <p className="card-text">Author: {chosenBook.author}</p>
                            <p className="card-text">{chosenBook.publication_year}, publisher: {chosenBook.publisher}</p>
                            <p className="card-text">stok tersedia: {chosenBook.stok}</p>
                            <button className="addCart" onClick={() => handleAdd()}>{buttonText === 'Idle' ? 'Add To Cart' : 'Loading...'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;