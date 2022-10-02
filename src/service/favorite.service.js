import axios from 'axios';
import { FAVORTIE_SERVICE_URL } from "../API";

export const fetchAllFavorites = async(userId)=>{
    try{
    const response = await axios({
                    method: 'GET',
                    url:FAVORTIE_SERVICE_URL,
                    headers: {
                        userId: userId
                    }
                });
                console.log('GET All favs response',response)
                return response;
        }
        catch(e){
            return e;
        }
        }

export const addFavorite  = async(book, userId)=>{
    try{
    const response = await axios
    .post(FAVORTIE_SERVICE_URL, book, {
      headers: { userId: userId },
    });
    console.log('Favoritie book added successfully',response)
    return response;
}catch(e){
    return e;
}
}      

export const deleteFavorite = async(bookId, userId)=>{

    try{
        const response = await axios.delete(FAVORTIE_SERVICE_URL,{
            params: { bookId: bookId},
            headers: {
                userId: userId
            }
        });
        console.log('Delete successful for book -',bookId)
        return response;
    }catch(e){
        return e;
    }
}
