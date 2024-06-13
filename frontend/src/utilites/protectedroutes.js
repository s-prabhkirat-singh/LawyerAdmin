
import { useEffect } from 'react';

import { useNavigate , useLocation} from 'react-router-dom';

export default function ProtectedRoutes({children})
{
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {

     const token = localStorage.getItem('token');

     if(!token){
         navigate('/signin'); // Redirect to sign-in if token is not found
     }

     if (location.pathname === '/signin' && token) {
      navigate('/dashboard'); // Redirect to dashboard if token is found
    }

   }, [navigate,location]);
 
   return children;

}