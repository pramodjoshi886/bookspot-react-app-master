import { createContext, useContext } from "react";
import { useState , useEffect} from "react";
import axios from "axios";
import { FAVORTIE_SERVICE_URL ,RECOMMEND_SERVICE_GET_URL} from "../../API";
import {fetchAllFavorites,addFavorite,deleteFavorite} from "../../service/favorite.service"
// import {fetchAllRecommendtions, postRecommend, deleteRecommend}  from "../../service/recommend.service"
import {fetchAllRecommendtions, addRecommend, deleteRecommend}  from "../../service/recommendation.service"


const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Appcontext must be within appContextProvider!");
  }

  return context;
};

const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);


  const config = {
    headers:{
      userId: sessionStorage.getItem('userId'),
    }
  };

  const fetchFavorites = () =>{
    axios.get(FAVORTIE_SERVICE_URL,config)
    .then((res)=>{
      console.log(res)
      if(res.status=='200'){
      console.log('successfully fetched favourites from service : ',res) 
      console.log(res.data)
      setFavorites(res.data)
      }else{
        console.log("Error while fetching favourite books : ",res);
      }
    })
    .catch(e=>console.log(e)) 
  }

  const fetchRecommend =()=>{
    axios.get(RECOMMEND_SERVICE_GET_URL)
    .then((res)=>{
      console.log('fetch recommend',res)
      if(res.status=='200'){
      console.log('successfully fetched recommends from service : ',res) 
      console.log(res.data)
      setRecommendations(res.data)
      }else{
        console.log("Error while fetching recommends books : ",res);
      }
    })
    .catch(e=>console.log(e)) 
  }

  useEffect(()=>{
    fetchFavorites();
    fetchRecommend();
  },[])

  //  const fetchFavorites = useEffect(() => {
  //   axios.get(FAVORTIE_SERVICE_URL,config)
  //   .then((res)=>{
  //     console.log(res)
  //     if(res.status=='200'){
  //     console.log('successfully fetched favourites from service : ',res) 
  //     console.log(res.data)
  //     setFavorites(res.data)
  //     console.log('favorties after setting', favorites)
  //     }else{
  //       console.log("Error while fetching favourite books : ",res);
  //     }
  //   })
  //   .catch(e=>console.log(e)) 
  // }, [])

  // const fetchRecommend = useEffect(() => {
  //   axios.get(FAVORTIE_SERVICE_URL)
  //   .then((res)=>{
  //     console.log(res)
  //     if(res.status=='200'){
  //     console.log('successfully fetched recommends from service : ',res) 
  //     console.log(res.data)
  //     setRecommendations(res.data)
  //     console.log('recommendations after setting', recommendations)
  //     }else{
  //       console.log("Error while fetching recommends books : ",res);
  //     }
  //   })
  //   .catch(e=>console.log(e)) 
  // }, [])


  const addToFavorites = (book) => {
    localStorage.setItem('userId', 'psrjd');
    let addResponse = addFavorite(book, sessionStorage.getItem('userId'));
    console.log('addResponse',addResponse);  

    const oldFavorites = [...favorites];

    const newFavorites = oldFavorites.concat(book);

    setFavorites(newFavorites);
  };


  const addToRecommend = (book) => {
    let addResponse = addRecommend(book);
    console.log('addResponse',addResponse); 
    const existing = [...recommendations];

    const allRecommendations = existing.concat(book);

    setRecommendations(allRecommendations);
  };

  const removeFromFavorites = (id) => {

    let deleteResponse = deleteFavorite(id, sessionStorage.getItem('userId'));
    console.log('deleteResponse',deleteResponse);  
    const oldFavorites = [...favorites];
    const newFavorites = oldFavorites.filter((book) => book.id !== id);

    setFavorites(newFavorites);
  };

  const removeFromRecommend = (id) => {
    let deleteResponse = deleteRecommend(id);
    console.log('deleteResponse',deleteResponse); 
    const existing = [...recommendations];
    const allRecommendations = existing.filter((book) => book.id !== id);

    setRecommendations(allRecommendations);
  };

  return (
    <AppContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites,recommendations, addToRecommend, removeFromRecommend }}
    >
      {console.log('favorties after setting', favorites)}
      {console.log('recommendations after setting', recommendations)}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
