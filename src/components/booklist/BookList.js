import React, { useState, useEffect } from "react";
import "../../App";
import { API_URL } from "../../API";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Header.css';
import Card from 'react-bootstrap/Card';
import { getSearchedBooks } from "../../service/search.service"


const BookList = () => {

  const options = [
    { value: 'all', label: 'Categories' },
    { value: 'drama', label: 'Drama' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'science', label: 'Science' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'horror', label: 'Horror' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' }
  ]
  const [category, setCategory] = useState()
  const onChange = (e) => {
    console.log(e);
    setCategory(e)
  }
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState([]);

  const [booksTemp, setBooksTemp] = useState([]);

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  const navigate = useNavigate();

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id);
    return boolean;
  };

  const handleSearch = () => {
    const searchedBooks = getSearchedBooks(search)
    searchedBooks.then((sbooks) => {
      console.log('sbook', sbooks)
      if (sbooks.status === 200) {
        setBooks(sbooks.data.items)
      }
    })
  }

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data.items);
        setBooks(res.data.items);
        setBooksTemp(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (category?.value === "all") {
      setBooks(booksTemp)
    } else {
      console.log('bookstemp:', booksTemp)
      const temp = booksTemp.filter((val) => {
        if (val?.volumeInfo?.categories) {
          return val?.volumeInfo?.categories[0]?.toLowerCase().includes(category?.value?.toLowerCase());
        }
      });
      console.log(temp, category?.value)
      setBooks(temp);
    }
  }, [category])

  return (
    <div>
      <Navbar />
      <div className='holder'>
        <header className='header'>
          <div className='header-content flex flex-c text-center text-white'>
            <h2 className='header-title text-capitalize'>
              Find your book of choice
            </h2>
            <br />
            {/* <h2 className='header-text fs-18 fw-3'>
              Welcome to BookSpot
            </h2> */}
            {/* <SearchForm /> */}
            <div className='mobo'>
              <Form.Group>
                <Form.Label className='search'>Search Books</Form.Label><br></br><br></br>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  id="loginuser"
                  className="text-center rounded-pill px-4 p-1 bg-input"
                  type="text1"
                  placeholder="Enter author name/Book title"
                />
              </Form.Group><br></br>
              <button onClick={handleSearch} variant="primary" type="submit" >Search
              </button>
            </div>
          </div>
        </header>
      </div>
      <div className="book-list">
        <div
          className="category"
          style={{ display: "flex", position: "absolute", top: 15, right: 370, backgroundColor: "black" }}
        >
          <Select style={{ backgroundColor: "black" }}
            onChange={onChange}
            defaultValue={options[0]}
            options={options}
          />
        </div>
        {books?.map((book) => (
          <div key={book.id} className="book">
            <Card onClick={() => navigate(`/books/${book.id}`)} style={{ width: "20rem", padding: '10px 5px 10px', backgroundColor: '#F5FFFA', border: '1px solid 	#F0FFF0' }}>
              <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} style={{ borderRadius: '8px' }} />
              <Card.Body>
                <Card.Title style={{ marginTop: 10 }}><h3>{book.volumeInfo.title}</h3></Card.Title>
                <Card.Text>
                  By <i>{book.volumeInfo ? book.volumeInfo.authors : 'author not available'}</i>
                </Card.Text>
              </Card.Body>
            </Card>

            <div>
              {favoritesChecker(book.id) ? (
                <button onClick={() => removeFromFavorites(book.id)}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(book)}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
