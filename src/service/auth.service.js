import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const register = (username, email, password) => {
  try{
    const response = axios.post(API_URL + "create", {
      username,
      email,
      password,
    })
    return response;
  }catch(e){
    return e;
  }
  // return axios.post(API_URL + "create", {
  //   username,
  //   email,
  //   password,
  // })
  //   .then((response) => {
  //     if (response.status == "200") {
  //       return response.data;
  //     }
  //   });
};

export const login = async(username, password) => {

  try{
  const response = await axios
  .post(API_URL + "login", {
    username,
    password,
  })
  console.log('login response in auth.service',response)
  return response;
}catch(e){
  return e;
}
  // return axios
  //   .post(API_URL + "login", {
  //     username,
  //     password,
  //   })
   
};

