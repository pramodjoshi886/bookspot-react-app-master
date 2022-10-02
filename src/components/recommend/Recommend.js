import React from "react";
import "../../App";
import { useAppContext } from "../context/appContext";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const {recommendations, addToRecommend, removeFromRecommend } = useAppContext();

  console.log("recommended are", recommendations);

  //const [state, setState] = useState([]);


  const recommendedChecker = (id) => {
    console.log('inside recommendChecker for id',id)
    console.log('inside recommendChecker - recommendations', recommendations)
    return recommendations.some((book) => book?.bookId === id);
  };

  const navigate = useNavigate();

  const refreshPage = ()=> setTimeout(()=>{ 
      console.log('calling refresh..')
      window.location.reload(false);  
  }, 1000);
 

  const enablerCheck =(userId)=>{
    if(userId === sessionStorage.getItem('userId')){
      return false;
    }
    return true;
  }

  return (
    <div> <Navbar/>
    <button onClick={()=>navigate(-1)} style={{top:20, width:70, left:30}}>
         Back
      </button>
    <div className="favorites">
      {console.log('recommendations before map',recommendations)}
      {recommendations.length > 0 ? (
        recommendations.map((book) => (
          <div className="book">
           {console.log('recommended book inside map',book)}
            <div>
              <h4>{book.volumeInfo? book.volumeInfo?.title : book.bookTitle}</h4>
            </div>
            <div>
            <a target="_blank" href={book.volumeInfo? book.volumeInfo?.previewLink : book.previewLink}>
              <img src={book.volumeInfo? book.volumeInfo?.imageLinks?.thumbnail:book.bookImageLink} alt="#" />
            </a>
            <br/><br/>
            </div>
            <div>
              {console.log('book user id',book?.username)}
              <i><h4>Recommended by {book?.username?book?.username:''}</h4></i>              
            </div>
            <div>
            
              {recommendedChecker(book?.bookId) ? (
                <button onClick={() => {
                  removeFromRecommend(book?.bookId);
                  refreshPage();
                }
                  } disabled={enablerCheck(book?.username)}>
                 Remove from recommendation
                </button>
              ) : (
                <button onClick={() => addToRecommend(book)}>
                  Recommend this book
                </button>
              )}
            </div>
           
          </div>
        ))
      ) : (
        <h1>There are no recommendations!</h1>
      )}
    </div>
    </div>
  );
};

export default Recommend;