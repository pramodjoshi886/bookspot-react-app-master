import axios from "axios";
import {COMMENT_SERVICE_URL} from "../API";


export const fetchComments =async(bookId)=>{
  console.log('inside comment GET service...')
  console.log('incoming book Id',bookId)
    let config = {
        headers: {
          bookId: bookId,
        }
      }
      try {
        const res = await axios.get(COMMENT_SERVICE_URL,config)
        console.log("Fetched comment response", res);
        return res;
      } catch (error) {
          console.log(error);
          return error;
      }
    
    
    }

export const postComment =async(bookId,comment)=>{
  console.log('inside comment post service...')
  console.log('incoming bookID',bookId)
  console.log('incoming comment',comment)
        let config = {
            headers: {
              bookId: bookId.value,
            }
          }
          let body ={
            userName : sessionStorage.getItem('userId'),
            userComment : comment
          }
          try {
            const res = await axios.post(COMMENT_SERVICE_URL,body,config)
            console.log("Posted comment successfully", res);
            return res;
          } catch (error) {
              console.log(error);
              return error;
          }
        
        
        }