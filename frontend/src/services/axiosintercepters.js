import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
});

// Add a request interceptor to the created instance
http.interceptors.request.use(function (config) {
   // Do something before request is sent
   const token = localStorage.getItem('token');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 }, function (error) {
   // Do something with request error
   return Promise.reject(error);
});

// Add a response interceptor to the created instance
http.interceptors.response.use(function (response) {
   // Any status code that lies within the range of 2xx cause this function to trigger
   // Do something with response data
   return response;
 }, function (error) {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error

   console.log("error", error.message);

   if (error.response && error.response.status === 422) {
      // Redirect to sign-in page if unauthorized or forbidden error occurs
       window.location.href = '/signin'; // Ensure this path matches your sign-in route
   }

   return Promise.reject(error);
});

export default http;