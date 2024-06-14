import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
   // Do something before request is sent
   return config;
 }, function (error) {
   // Do something with request error
   const token = localStorage.getItem('token');
   if(token){
      config.headers.Authorization = `Bearer ${token}`;
   }
   return Promise.reject(error);
 });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   return response;
 }, function (error) {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error

   if (error.response && error.response.status === 422) {
      // Redirect to sign-in page if unauthorized or forbidden error occurs
      window.location.href = '/signin'; // Ensure this path matches your sign-in route
    }

   return Promise.reject(error);
 });