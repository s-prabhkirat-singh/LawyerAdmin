import axios from "axios";


const storeToken = (token) => {
    localStorage.setItem("token", token);
    console.log(token);
}

const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
}

export const Signin = async (data) => {
    
    
    
    
   
}