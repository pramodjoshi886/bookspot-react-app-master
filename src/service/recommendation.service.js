import axios from 'axios';
import { RECOMMEND_SERVICE_DELETE_URL, RECOMMEND_SERVICE_GET_URL, RECOMMEND_SERVICE_POST_URL } from "../API";

export const fetchAllRecommendtions = async()=>{
    try{
    const response = await axios({
                    method: 'GET',
                    url:RECOMMEND_SERVICE_GET_URL,
                });
                console.log('GET All recommends response',response)
                return response;
        }
        catch(e){
            return e;
        }
        }
     

export const addRecommend = async(book)=>{
    try{
      const response =  axios({
            method: 'post',
            url: RECOMMEND_SERVICE_POST_URL,
            data: {
              bookId: book.id,
              bookTitle: book.volumeInfo?.title,
              bookImageLink: book.volumeInfo?.imageLinks?.thumbnail,
              previewLink: book.volumeInfo?.previewLink,
              username: sessionStorage.getItem('userId')
            }
          });
    }catch(e){
        return e;
    }
}

export const deleteRecommend = async(bookId)=>{

    try{
        const response = await axios.delete(`http://localhost:8082/api/bookSpot/unrecommended/${bookId}/${sessionStorage.getItem('userId')}`);
        console.log('Delete successful for book -',bookId)
        return response;
    }catch(e){
        return e;
    }
}
