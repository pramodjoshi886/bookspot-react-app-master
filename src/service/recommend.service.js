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

export const postRecommend  = async(book)=>{
    try{
        let config = {
            headers: {
              userId: sessionStorage.getItem('userId'),
            }
          }
    const response = await axios
    .post(RECOMMEND_SERVICE_POST_URL,book,config);
    console.log('Recomme book added successfully',response)
    return response;
}catch(e){
    return e;
}
}      

export const deleteRecommend = async(bookId)=>{

    try{
        const response = await axios.delete(`http://localhost:8082/api/bookSpot/addToRecommendedBooks/${bookId}`);
        console.log('Delete successful for book -',bookId)
        return response;
    }catch(e){
        return e;
    }
}
