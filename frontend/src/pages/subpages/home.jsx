import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
axios.defaults.baseURL = 'https://6t7m9ptx-8000.inc1.devtunnels.ms/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default function Home() {

   const { register, handleSubmit, formState: { errors }, setValue } = useForm();

   const [loading, setloading] = useState(false)

   const [error, seterror] = useState("")

   const [homedata, sethomedata] = useState()

   const create = async (data) => {
      setloading(true);
      data.id = 1;
      console.log('Data to be sent:', data);
    
      try {
        const response = await axios.post("/api/addHomeData", data);
    
        console.log('Response received:', response);
    
        // Assuming the data is in response.data.data
        // setHomeData(response.data.data);
    
        seterror("");
        setloading(false);
    
        // Uncomment and modify according to your response structure
        // setValue('metatitle', response.data.data.metatitle);
        // setValue('metadescription', response.data.data.metadescription);
        // setValue('metatags', response.data.data.metatags);
        // setValue('metaimage', response.data.data.metaimage);
        // setValue('headertitle', response.data.data.headertitle);
        // setValue('headerdescription', response.data.data.headerdescription);
        // setValue('headerbuttonlabel', response.data.data.headerbuttonlabel);
        // setValue('headerbuttonlink', response.data.data.headerbuttonlink);
        // setValue('headerbgimage', response.data.data.headerbgimage);
        // setValue('bottomsectiontitle', response.data.data.bottomsectiontitle);
        // setValue('bottomsectiondescription', response.data.data.bottomsectiondescription);
        // setValue('bottomsectionimage', response.data.data.bottomsectionimage);
    
      } catch (error) {
        console.log('Error:', error);
        seterror(error.message);
        setloading(false);
    
        // Log error details for debugging
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
        } else if (error.request) {
          console.log('Request data:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
      }
    };
    
   const fetchdata = async () => {
      setloading(true)
      try {

         await axios.get("http://localhost:8000/api/getHomeData/1", {

         })

            .then(response => {

               console.log(response.data.data)
               sethomedata(response.data.data)



               seterror("")


               setValue('metatitle', response.data.data.metatitle);
               setValue('metadescription', response.data.data.metadescription);
               setValue('metatags', response.data.data.metatags);
               setValue('metaimage', response.data.data.metaimage);
               setValue('headertitle', response.data.data.headertitle);
               setValue('headerdescription', response.data.data.headerdescription);
               setValue('headerbuttonlabel', response.data.data.headerbuttonlabel);
               setValue('headerbuttonlink', response.data.data.headerbuttonlink);
               setValue('headerbgimage', response.data.data.headerbgimage);
               setValue('bottomsectiontitle', response.data.data.bottomsectiontitle);
               setValue('bottomsectiondescription', response.data.data.bottomsectiondescription);
               setValue('bottomsectionimage', response.data.data.bottomsectionimage);




               setloading(false)

            }).catch(error => {

               setloading(false)
            })

      } catch (error) {
         console.log("error", error)
         seterror(error.message)
         setloading(false)
      }
   }
   useEffect(() => {
      fetchdata()

   }, [])





   // const create = async (data) => {

      
   //    setloading(true)
   //    data.id=1;
   //    console.log(data);

   //    try {
            
   //       await axios.post("http://localhost:8000/api/addHomeData", { data})

   //          .then(response => {

   //             console.log(response)
   //             //sethomedata(response.data.data)



   //             seterror("")


   //             /*setValue('metatitle', response.data.data.metatitle);
   //             setValue('metadescription', response.data.data.metadescription);
   //             setValue('metatags', response.data.data.metatags);
   //             setValue('metaimage', response.data.data.metaimage);
   //             setValue('headertitle', response.data.data.headertitle);
   //             setValue('headerdescription', response.data.data.headerdescription);
   //             setValue('headerbuttonlabel', response.data.data.headerbuttonlabel);
   //             setValue('headerbuttonlink', response.data.data.headerbuttonlink);
   //             setValue('headerbgimage', response.data.data.headerbgimage);
   //             setValue('bottomsectiontitle', response.data.data.bottomsectiontitle);
   //             setValue('bottomsectiondescription', response.data.data.bottomsectiondescription);
   //             setValue('bottomsectionimage', response.data.data.bottomsectionimage);*/




   //             setloading(false)

   //          }).catch(error => {

   //             setloading(false)
   //          })

   //    } catch (error) {
   //       console.log("error", error)
   //       seterror(error.message)
   //       setloading(false)
   //    }
   // }


   return (

      <div className="w-full ">

         <h1 className='text-blue-600 text-2xl font-semibold text-center mt-5'>Home Section</h1>
         <div className='p-5'>


            <form className='content-center' onSubmit={handleSubmit(create)}>

               <div className="flex flex-row flex-wrap justify-center">

                  <div className='p-2'>
                     <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                     <div className="mt-2">
                        <input
                           id="title"
                           name="title"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metatitle', { required: 'metatitle is required' })}
                        />
                        {errors.metatitle && <p className="text-red-500 text-sm">{errors.metatitle.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="discription" className="block text-sm font-medium leading-6 text-gray-900">Discription</label>
                     <div className="mt-2">
                        <input
                           id="discription"
                           name="discription"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metadescription', { required: 'discription is required' })}
                        />
                        {errors.metadescription && <p className="text-red-500 text-sm">{errors.metadescription.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                     <div className="mt-2">
                        <input
                           id="tags"
                           name="tags"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metatags', { required: 'metatags is required' })}
                        />
                        {errors.metatags && <p className="text-red-500 text-sm">{errors.metatags.message}</p>}
                     </div>
                  </div>



               </div>


               <div className="flex flex-row flex-wrap justify-center mt-2">

                  <div className='p-2'>
                     <label htmlFor="metaimage" className="block text-sm font-medium leading-6 text-gray-900">Metaimage</label>
                     <div className="mt-2">
                        <input
                           id="metaimage"
                           name="metaimage"
                           type="file"
                           accept='image/*'
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metaimage', { required: 'metaimage is required' })}
                        />
                        {errors.metaimage && <p className="text-red-500 text-sm">{errors.metaimage.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headertitle" className="block text-sm font-medium leading-6 text-gray-900">headertitle</label>
                     <div className="mt-2">
                        <input
                           id="headertitle"
                           name="headertitle"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headertitle', { required: 'discription is required' })}
                        />
                        {errors.headertitle && <p className="text-red-500 text-sm">{errors.headertitle.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headerdescription" className="block text-sm font-medium leading-6 text-gray-900">Headerdescription</label>
                     <div className="mt-2">
                        <input
                           id="headerdescription"
                           name="headerdescription"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerdescription', { required: 'headerdescription is required' })}
                        />
                        {errors.headerdescription && <p className="text-red-500 text-sm">{errors.headerdescription.message}</p>}
                     </div>
                  </div>



               </div>



               <div className="flex flex-row flex-wrap justify-center mt-2">

                  <div className='p-2'>
                     <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Headerbuttonlable</label>
                     <div className="mt-2">
                        <input
                           id="headerbuttonlable"
                           name="headerbuttonlable"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbuttonlabel', { required: 'headerbuttonlable is required' })}
                        />
                        {errors.headerbuttonlabel && <p className="text-red-500 text-sm">{errors.headerbuttonlabel.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Headerbgimage</label>
                     <div className="mt-2">
                        <input
                           id="headerbgimage"
                           name="headerbgimage"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbgimage', { required: 'headerbgimage is required' })}
                        />
                        {errors.headerbgimage && <p className="text-red-500 text-sm">{errors.headerbgimage.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headerbuttonlink" className="block text-sm font-medium leading-6 text-gray-900">Headerbuttonlink</label>
                     <div className="mt-2">
                        <input
                           id="headerbuttonlink"
                           name="headerbuttonlink"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbuttonlink', { required: 'headerbuttonlink is required' })}
                        />
                        {errors.headerbuttonlink && <p className="text-red-500 text-sm">{errors.headerbuttonlink.message}</p>}
                     </div>
                  </div>



               </div>


               <div className="flex flex-row flex-wrap justify-center mt-2">

                  <div className='p-2'>
                     <label htmlFor="bottomsectiontitle" className="block text-sm font-medium leading-6 text-gray-900">Bottomsectiontitle</label>
                     <div className="mt-2">
                        <input
                           id="bottomsectiontitle"
                           name="bottomsectiontitle"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('bottomsectiontitle', { required: 'bottomsectiontitle is required' })}
                        />
                        {errors.bottomsectiontitle && <p className="text-red-500 text-sm">{errors.bottomsectiontitle.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="bottomsectiondescription" className="block text-sm font-medium leading-6 text-gray-900">Bottomsectiondescription</label>
                     <div className="mt-2">
                        <input
                           id="bottomsectiondescription"
                           name="bottomsectiondescription"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('bottomsectiondescription', { required: 'bottomsectiondescription is required' })}
                        />
                        {errors.bottomsectiondescription && <p className="text-red-500 text-sm">{errors.bottomsectiondescription.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="bottomsectionimage" className="block text-sm font-medium leading-6 text-gray-900">Bottomsectionimage</label>
                     <div className="mt-2">
                        <input
                           id="bottomsectionimage"
                           name="bottomsectionimage"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('bottomsectionimage', { required: 'bottomsectionimage is required' })}
                        />
                        {errors.bottomsectionimage && <p className="text-red-500 text-sm">{errors.bottomsectionimage.message}</p>}
                     </div>
                  </div>



               </div>









               <div className="flex flex-row flex-wrap w-full justify-center ">
                  <button type="submit" className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>
               </div>
            </form>


         </div>


      </div>
   )
}