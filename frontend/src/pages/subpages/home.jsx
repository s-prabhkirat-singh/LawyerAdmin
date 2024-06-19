import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';

export default function Home() {
   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({
      defaultValues: {
         headerdescription: "",
         bottomsectiondescription: ""
      }
   });

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [homedata, setHomadata] = useState()

   const [metaimage, setMetaImage] = useState("")
   const [headerbgimage, setHeaderbgImage] = useState("")
   const [bottomsectionimage, setBottomSectionImage] = useState("")
   const [metaimageFile, setMetaImageFile] = useState(null)
   const [headerbgimageFile, setHeaderbgImageFile] = useState(null)
   const [bottomsectionimageFile, setBottomSectionImageFile] = useState(null)

   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getHomeData/1")
            .then(response => {
               const data = response.data.data;
               setHomadata(data);
               setValue('metatitle', data.metatitle);
               setValue('metadescription', data.metadescription);
               setValue('metatags', data.metatags);
               setValue('metaimage', data.metaimage);
               setValue('headertitle', data.headertitle);
               setValue('headerdescription', data.headerdescription);
               setValue('headerbuttonlabel', data.headerbuttonlabel);
               setValue('headerbuttonlink', data.headerbuttonlink);
               setValue('headerbgimage', data.headerbgimage);
               setValue('bottomsectiontitle', data.bottomsectiontitle);
               setValue('bottomsectiondescription', data.bottomsectiondescription);
               setValue('bottomsectionimage', data.bottomsectionimage);
               setMetaImage(data.metaimage);
               setHeaderbgImage(data.headerbgimage);
               setBottomSectionImage(data.bottomsectionimage);
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

   const handleFileChange = (event, setFile) => {
      
      console.log(event)
      setFile(event.target.files[0]);
      console.log(metaimageFile)
     
   }

   const create = async (data) => {
      setLoading(true)
      data.id = 1;
      
      try {
         console.log(data)
         const formData = new FormData();
         
            
            metaimageFile==null?"":data.metaimage=metaimageFile;
            headerbgimageFile==null?"":data.headerbgimage=headerbgimageFile;
            bottomsectionimageFile==null?"":data.bottomsectionimage=bottomsectionimageFile;

         
         // formData.append('metaimage', metaimageFile);
         // formData.append('headerbgimage', headerbgimageFile);
         // formData.append('bottomsectionimage', bottomsectionimageFile);
 
         for (const [key, value] of Object.entries(data)) {
            
            console.log(key.value)
              formData.append(key, value);
          }

      






         
       

         const config = {
           headers: {
             'content-type': 'multipart/form-data',
           },
         };

         await axios.post("http://localhost:8000/api/addHomeData", formData, config).then((response) => {
            setError("");
            setUpdate(!update);
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

   return (
      <div className="w-full">
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
                     <label htmlFor="discription" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                     <div className="mt-2">
                        <input
                           id="discription"
                           name="discription"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metadescription', { required: 'description is required' })}
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
                           autoComplete="text"
                           accept='image/*'
                           onChangeCapture={(e) => handleFileChange(e, setMetaImageFile)}
                          
                          
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metaimage')}
                        />
                        {/* <button id="metaimage" name="metaimage" onClick={(e) => handleFileChange(e, setMetaImageFile)}>img</button> */}
                        {errors.metaimage && <p className="text-red-500 text-sm">{errors.metaimage.message}</p>}
                     </div>
                     {metaimage && (
                        <div>
                           <label htmlFor="metaimage" className="block text-sm font-medium leading-6 text-gray-900">Current Metaimage</label>
                           <img src={`http://localhost:8000/uploads/${metaimage}`} alt="metaimage" className="w-20 h-20" />
                        </div>
                     )}
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headertitle" className="block text-sm font-medium leading-6 text-gray-900">Header Title</label>
                     <div className="mt-2">
                        <input
                           id="headertitle"
                           name="headertitle"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headertitle', { required: 'headertitle is required' })}
                        />
                        {errors.headertitle && <p className="text-red-500 text-sm">{errors.headertitle.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headerdescription" className="block text-sm font-medium leading-6 text-gray-900">Header Description</label>
                     <RTE label="Headerdescription :" name="headerdescription" control={control} defaultValue={getValues("headerdescription")} />
                  </div>
               </div>

               <div className="flex flex-row flex-wrap justify-center mt-2">
                  <div className='p-2'>
                     <label htmlFor="headerbuttonlabel" className="block text-sm font-medium leading-6 text-gray-900">Header Button Label</label>
                     <div className="mt-2">
                        <input
                           id="headerbuttonlabel"
                           name="headerbuttonlabel"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbuttonlabel', { required: 'headerbuttonlabel is required' })}
                        />
                        {errors.headerbuttonlabel && <p className="text-red-500 text-sm">{errors.headerbuttonlabel.message}</p>}
                     </div>
                  </div>

                  <div className='p-2'>
                     <label htmlFor="headerbuttonlink" className="block text-sm font-medium leading-6 text-gray-900">Header Button Link</label>
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

                  <div className='p-2'>
                     <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Header Background Image</label>
                     <div className="mt-2">
                        <input
                           id="headerbgimage"
                           name="headerbgimage"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           
                           onChangeCapture={(e) => handleFileChange(e, setHeaderbgImageFile)}
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbgimage')}
                        />
                        
                        {errors.headerbgimage && <p className="text-red-500 text-sm">{errors.headerbgimage.message}</p>}
                     </div>
                     {headerbgimage && (
                        <div>
                           <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Current Header Background Image</label>
                           <img src={`http://localhost:8000/uploads/${headerbgimage}`} alt="headerbgimage" className="w-20 h-20" />
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex flex-row flex-wrap justify-center mt-2">
                  <div className='p-2'>
                     <label htmlFor="bottomsectiontitle" className="block text-sm font-medium leading-6 text-gray-900">Bottom Section Title</label>
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
                     <label htmlFor="bottomsectiondescription" className="block text-sm font-medium leading-6 text-gray-900">Bottom Section Description</label>
                     <div className='flex flex-row flex-wrap justify-center mt-2 w-2/3'>

<RTE label="Bottomsectiondescription :" name="bottomsectiondescription" control={control} defaultValue={getValues("bottomsectiondescription")} />
</div>

                  </div>

                  <div className='p-2'>
                     <label htmlFor="bottomsectionimage" className="block text-sm font-medium leading-6 text-gray-900">Bottom Section Image</label>
                     <div className="mt-2">
                        <input
                           id="bottomsectionimage"
                           name="bottomsectionimage"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                          
                           onChangeCapture={(e) => handleFileChange(e, setBottomSectionImageFile)}
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('bottomsectionimage')}
                        />
                        
                        {errors.bottomsectionimage && <p className="text-red-500 text-sm">{errors.bottomsectionimage.message}</p>}
                     </div>
                     {bottomsectionimage && (
                        <div>
                           <label htmlFor="bottomsectionimage" className="block text-sm font-medium leading-6 text-gray-900">Current Bottom Section Image</label>
                           <img src={`http://localhost:8000/uploads/${bottomsectionimage}`} alt="bottomsectionimage" className="w-20 h-20" />
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex flex-row flex-wrap justify-center mt-2">
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
