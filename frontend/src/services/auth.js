import axios from "axios";



const storetoken = (token) => {
   localStorage.setItem("tokne", token);
   console.log(token);
}

const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
}

export const Signin = async (data) => {
    
    
    
    
   
}