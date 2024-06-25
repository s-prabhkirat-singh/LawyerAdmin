import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';


export default function Faq() {

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({
      defaultValues: {
         headerdescription: "",
        
      }
   });

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [homedata, setHomadata] = useState()

   // setting the url to show the image
   const [metaimage, setMetaImage] = useState("")
  
   const [headerbgimage, setheaderbgimage] = useState("")
   const [image, setImage] = useState("")


   // we will check Faq the if someone changed the file if yes then it will be updated and we will update the data.metaimagefile
   const [metaimageFile, setMetaImageFile] = useState(null)
   const [headerbgimageFile, setheaderbgimageFile] = useState(null)
   const [imageFile, setimageFile] = useState(null)

   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getFaqData/2")
            .then(response => {
               const data = response.data.data;
               setHomadata(data);
               setValue('metatitle', data.metatitle);
               setValue('metadescription', data.metadescription);
               setValue('metatags', data.metatags);
               setValue('metaimage', data.metaimage);
               setValue('headertitle', data.headertitle);
               setValue('headerdescription', data.headerdescription);
               setValue('headerbuttonlink', data.headerbuttonlink);
               setValue('headerbuttonlabel', data.headerbuttonlabel);
               setValue('title', data.title);
               setValue('description', data.description);
               setValue('headerbgimage',data.headerbgimage)
               setValue('image',data.image)

               // setting the url to show the image
               setMetaImage('http://localhost:8000/uploads/'+data.metaimage);
               setheaderbgimage('http://localhost:8000/uploads/'+data.headerbgimage);
               setImage('http://localhost:8000/uploads/'+data.image);
             

               setError("");
               setLoading(false);
            }).catch(error => {
               setError(error.message);
               setLoading(false);
            })
      } catch (error) {
         setError(error.message);
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchdata()
   }, [update])

   const handleFileChange = (event, setFile , setimageurl) => {

      console.log(event)
      console.log(event.target.files[0])

      const file = event.target.files[0];
      if (file) {
         setFile(file);
        const imageUrl = URL.createObjectURL(file);
        setimageurl(imageUrl)
      }


   }

   const create = async (data) => {
      setLoading(true)
      data.id = 2;

      try {
         console.log("data values", data)
         const formData = new FormData();


         metaimageFile == null ? "" : data.metaimage = metaimageFile;
         headerbgimageFile == null ? "" : data.headerbgimage = headerbgimageFile;
         imageFile == null ? "" : data.image = imageFile;

         for (const [key, value] of Object.entries(data)) {

            console.log(key.value)
            formData.append(key, value);
         }






         const config = {
            headers: {
               'description-type': 'multipart/form-data',
            },
         };

         await axios.post("http://localhost:8000/api/addFaqData", formData, config).then((response) => {
            setError("");
            setUpdate(!update);
            setLoading(false);
         }).catch(error => {
            setError(error.message);
            setLoading(false);
         }).finally(() => {

            metaimageFile == null ? "" : setMetaImageFile(null);
            headerbgimageFile == null ? "" : setheaderbgimageFile(null);
            imageFile == null ? "" : imageFile(null);


         })


      } catch (error) {
         setError(error.message);
         setLoading(false);
      }
   }

   return (
      <div className="w-full">
         <h1 className='text-gray-800 text-2xl font-semibold text-start p-3'>Faq Section</h1>
         <div className='p-5'>
            <form className='description-center' onSubmit={handleSubmit(create)}>
               <div className="flex flex-col flex-wrap justify-center">
                  <div className='p-2 mt-2'>
                     <label htmlFor="title" className="block text-lg font-medium leading-6 text-gray-900">Title</label>
                     <div className="mt-2">
                        <input
                           id="title"
                           name="title"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metatitle', { required: 'metatitle is required' })}
                        />
                        {errors.metatitle && <p className="text-red-500 text-sm">{errors.metatitle.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="discription" className="block text-lg font-medium leading-6 text-gray-900">Description</label>
                     <div className="mt-2">
                        <input
                           id="discription"
                           name="discription"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metadescription', { required: 'description is required' })}
                        />
                        {errors.metadescription && <p className="text-red-500 text-sm">{errors.metadescription.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="tags" className="block text-lg font-medium leading-6 text-gray-900">Tags</label>
                     <div className="mt-2">
                        <input
                           id="tags"
                           name="tags"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metatags', { required: 'metatags is required' })}
                        />
                        {errors.metatags && <p className="text-red-500 text-sm">{errors.metatags.message}</p>}
                     </div>
                  </div>
               </div>

               <div className="flex flex-col flex-wrap justify-center mt-2">
                  <div className='p-2 mt-2'>
                     <label htmlFor="metaimage" className="block text-lg font-medium leading-6 text-gray-900">Metaimage</label>
                     <div className="mt-2">
                        <input
                           id="metaimage"
                           name="metaimage"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           onChangeCapture={(e) => handleFileChange(e, setMetaImageFile , setMetaImage)}


                           className="block w-3/4 file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metaimage')}
                        />
                        {/* <button id="metaimage" name="metaimage" onClick={(e) => handleFileChange(e, setMetaImageFile)}>img</button> */}
                        {errors.metaimage && <p className="text-red-500 text-sm">{errors.metaimage.message}</p>}
                     </div>
                     {metaimage && (
                        <div>
                           <label htmlFor="metaimage" className="block text-sm font-medium leading-6 text-gray-900">Current Metaimage</label>
                           <img src={`${metaimage}`} alt="metaimage" className="w-1/2 h-44" />
                        </div>
                     )}

                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="headertitle" className="block text-lg font-medium leading-6 text-gray-900">Header Title</label>
                     <div className="mt-2">
                        <input
                           id="headertitle"
                           name="headertitle"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headertitle', { required: 'headertitle is required' })}
                        />
                        {errors.headertitle && <p className="text-red-500 text-sm">{errors.headertitle.message}</p>}
                     </div>
                  </div>
                  <div className='p-2 mt-2'>
                     <label htmlFor="headerbgimage" className="block text-lg font-medium leading-6 text-gray-900">Headerbgimage</label>
                     <div className="mt-2">
                        <input
                           id="headerbgimage"
                           name="headerbgimage"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           onChangeCapture={(e) => handleFileChange(e, setheaderbgimageFile , setheaderbgimage)}


                           className="block w-3/4 file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbgimage')}
                        />
                        {/* <button id="metaimage" name="metaimage" onClick={(e) => handleFileChange(e, setMetaImageFile)}>img</button> */}
                        {errors.headerbgimage && <p className="text-red-500 text-sm">{errors.headerbgimage.message}</p>}
                     </div>
                     {headerbgimage && (
                        <div>
                           <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Current Header BG Image</label>
                           <img src={`${headerbgimage}`} alt="headerbgimage" className="w-1/2 h-44" />
                        </div>
                     )}

                  </div>
                  <div className='p-2 mt-2'>
                     <label htmlFor="headerdescription" className="block text-lg font-medium leading-6 text-gray-900">Header Description</label>

                     <div className='flex flex-row flex-wrap justify-center mt-2 w-3/4'>
                        <RTE label="Headerdescription :" name="headerdescription" control={control} defaultValue={getValues("headerdescription")} />
                     </div>

                  </div>
               </div>

               <div className="flex flex-col flex-wrap justify-center mt-2">
                  <div className='p-2 mt-2'>
                     <label htmlFor="headerbuttonlabel" className="block text-lg font-medium leading-6 text-gray-900">headerbuttonlabel</label>
                     <div className="mt-2">
                        <input
                           id="headerbuttonlabel"
                           name="headerbuttonlabel"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbuttonlabel', { required: 'headerbuttonlabel is required' })}
                        />
                        {errors.headerbuttonlabel && <p className="text-red-500 text-sm">{errors.headerbuttonlabel.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="headerbuttonlink" className="block text-lg font-medium leading-6 text-gray-900">Header Button Link</label>
                     <div className="mt-2">
                        <input
                           id="headerbuttonlink"
                           name="headerbuttonlink"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbuttonlink', { required: 'headerbuttonlink is required' })}
                        />
                        {errors.headerbuttonlink && <p className="text-red-500 text-sm">{errors.headerbuttonlink.message}</p>}
                     </div>
                  </div>

                
               </div>





               <div className="flex flex-col flex-wrap justify-center mt-2 mb-2">

               <div className='p-2 mt-2'>
                     <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                     <div className="mt-2">
                        <input
                           id="title"
                           name="title"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('title', { required: 'title is required' })}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                     </div>
                  </div>


                  <div className='p-2 mt-2'>
                     <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">description</label>
                     <div className="mt-2">
                        <input
                           id="description"
                           name="description"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('description', { required: 'description is required' })}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                     </div>
                  </div>
                  <div className='p-2 mt-2'>
                     <label htmlFor="image" className="block text-lg font-medium leading-6 text-gray-900">image</label>
                     <div className="mt-2">
                        <input
                           id="image"
                           name="image"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           onChangeCapture={(e) => handleFileChange(e, setimageFile , setimage)}


                           className="block w-3/4 file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('image')}
                        />
                        {/* <button id="metaimage" name="metaimage" onClick={(e) => handleFileChange(e, setMetaImageFile)}>img</button> */}
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                     </div>
                     {image && (
                        <div>
                           <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Current Image</label>
                           <img src={`${image}`} alt="image" className="w-1/2 h-44" />
                        </div>
                     )}

                  </div>

                 


                  

                  
               </div>

               <div className="flex flex-col flex-wrap justify-center ">
                  <button
                     type="submit"
                     className="w-56 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     disabled={loading}
                  >
                     {loading ? 'Loading...' : 'Submit'}
                  </button>
               </div>

               {error && (
                  <div className="flex flex-row flex-wrap justify-center mt-2">
                     <p className="text-red-500 text-sm">{error}</p>
                  </div>
               )}
            </form>
         </div>
      </div>
   );
}