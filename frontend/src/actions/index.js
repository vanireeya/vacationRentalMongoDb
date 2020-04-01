import axios from "axios";


export const LOGIN = "login";

const ROOT_URL = "http://localhost:3001";

export const login = (values, callback) => {

  const data = axios.post(`${ROOT_URL}/login`, values, { withCredentials: true })
    .then((response) => {
      callback(response);
      if (response.data.status == 1) {
        let res = {
          status: 1,
          data: {
            uid: response.data.info.uid,
            email: response.data.info.email,
            firstname: response.data.info.firstname,
            lastname: response.data.info.lastname,
            profileImage: response.data.info.profileImage,
            type: response.data.info.type
          }
        }
        return res;

      } else {
        return response.data;

      }


    }, (error) => {
      callback(error);
      return error;
    })

  return {
    type: LOGIN,
    payload: data
  };

}


