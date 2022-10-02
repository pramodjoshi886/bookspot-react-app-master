import React from "react";
import "../../App";
import { useAppContext } from "../context/appContext";
import Navbar from "../navbar/Navbar";
import {fetchAllFavorites} from "../../service/favorite.service"
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  console.log("favorites are", favorites);

  const navigate = useNavigate();

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id);
    return boolean;
  };

  // const fetchFavorites = async()=>{
  //   let response = await fetchAllFavorites(sessionStorage.getItem('userId'));
  //   if(response.status===200){         
  //    favorites = response.data
  //     console.log("favs in favorite class",favorites)           
  //   }else{
  //     console.log(response);
  //   }
  // }

  //   console.log(' before fetchFavotites()')
  //  fetchFavorites();

  return (
    <div> <Navbar />
    <button onClick={()=>navigate(-1)} style={{top:20, width:70, left:30}}>
         Back
      </button>
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <div key={book.id} className="book">
           
            <div>
              <h4>{book.volumeInfo.title}</h4>
            </div>
            <div>
            <a target="_blank" href={book.volumeInfo.previewLink}>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="#" />
            </a>
            </div>
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
        ))
      ) : (
        <h1>You don't have any favorite books yet!</h1>
      )}
    </div>
    </div>
  );
};

export default Favorites;
