import axios from "axios";

export const getSearchedBooks = async(searchKey)=>{
    try{
    const response = await axios({
                    method: 'GET',
                    url:`https://www.googleapis.com/books/v1/volumes?q=+${searchKey}+&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU+&maxResults=40`
                });
                console.log('search results ',response)
                return response;
        }
        catch(e){
            return e;
        }
        }