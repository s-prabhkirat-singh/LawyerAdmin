import { useForm } from 'react-hook-form';
import { Signin } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import SignIn from '../pages/SignIn';
import { useDispatch } from 'react-redux';
import { signin } from '../Redux/authslice';


export default function SiginComponent() {

  const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm();
  const[error,seterror]= useState("")

  const dispatch = useDispatch();

   function onSubmit(formData) {
      
    console.log(formData);

    



    const url = "http://localhost:8000/api/login";
      try {
        axios.post(url, formData).then((response)=>{
          console.log(response.data);
          console.log(response);
           //localStorage.setItem("token",response.data.token);
           dispatch(signin(response.data.token))
           navigate("/dashboard")

        }).catch((error)=>{
          console.log(error)
          seterror(error.message)
        })
        
        
       
    } catch (error) {
        console.log(error.message);
        return error
    }

      
     
      
    }


   return (

      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
         <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
         </div>

<span className='text-red-500 text-center'>{error}</span>
         <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>

            <p class="mt-8 text-center text-sm text-gray-500">
               Dont have a Password?
               <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Contact Admin Team</a>
            </p>
         </div>
      </div>
   )
}