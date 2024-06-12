
import axios from "axios";



const storetoken = (token) => {
   localStorage.setItem("tokne", token);
   console.log(token);
}

const gettoken = () => {
   const token = localStorage.getItem("token");
   console.log(token);
   return token
}

export const Signin = async (data) => {



   console.log(data)
   const url = "https://guppy-probable-singularly.ngrok-free.app/api/login" 
   try{

      await axios.post(url,data).then((response) => {
            
            console.log(response.data.token)
            console.log(response)
            storetoken(response.data.token)
            

      }).catch((error) => {

         console.log(error.message)

      });
      
   }catch(error)
   {
      console.log(error.message);

   }

}