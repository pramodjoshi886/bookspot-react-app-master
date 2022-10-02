import React, { useState, useEffect } from "react";
import "../../App";
import { Navigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { BOOK_DETAILS_URL } from "../../API";
import { useNavigate } from "react-router-dom";
import Comment from "../comment/Comment";
import Navbar from "../navbar/Navbar";

const BookDetails = () => {
  const [book, setBook] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const { recommendations, addToRecommend, removeFromRecommend } = useAppContext();

  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        console.log('service call with id',res);
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const recommendChecker = (id) => {
    if(Object.keys(recommendations).length===0){
      return false;
    }
    const boolean = recommendations.some((book) => book.id === id);
    return boolean;
  };

  return (
    <div>
       <Navbar/>
      <button onClick={()=>navigate("/booklist")} style={{top:20, width:70, left:30}}>
         Back
      </button>
    <div className="book-details">
    
      <div className="book-image">
        <h2>{book?.volumeInfo?.title}</h2>
        <a target="_blank" href={book?.volumeInfo?.previewLink}>
        <img style={{border:'1px solid black'}} src={book?.volumeInfo?.imageLinks?.thumbnail} alt="#" />
        </a>

        {recommendChecker(book?.id) ? (
                <button onClick={() => removeFromRecommend(book.id)}>
                  Remove from recommendation
                </button>
              ) : (
                <button onClick={() => addToRecommend(book)}>
                  Recommend this book
                </button>
              )}
          
      </div>
      <div className="book-description">
        <h2>Description</h2>
        <p>{book?.volumeInfo && book?.volumeInfo?.description}</p>
        <h2>Authors</h2>
        <p>{book.volumeInfo && book.volumeInfo.authors}</p>
        <h2>Publisher</h2>
        <p>{book.volumeInfo && book.volumeInfo.publisher}</p>
        <h2>Published Date</h2>
        <p>{book.volumeInfo && book.volumeInfo.publishedDate}</p>
        <h2>Rated</h2>
        <p>{book.volumeInfo && book.volumeInfo?.averageRating}</p>
      </div>
      
    </div>
    <Comment  value={book.id} />
    </div>
  );
};

export default BookDetails;
