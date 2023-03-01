import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../api/base'

const BookDetail = ({ handleAdd, buttonText, buttonID }) => {
    const { id } = useParams()
    const [chosenBook, setChosenBook] = useState({})

    useEffect(() => {
        console.log(id);
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

    return (
        <div>
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
                            <a href="#" className="btn btn-primary" onClick={() => handleAdd(chosenBook.id)}>{buttonText === 'Idle' ? 'Add To Cart' : 'Loading...'}</a>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default BookDetail;