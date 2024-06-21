import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';


export default function About() {

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({
      defaultValues: {
         headerdescription: "",
         section1description: ""
      }
   });

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [homedata, setHomadata] = useState()

   const [metaimage, setMetaImage] = useState("")
   const [section1image, setsection1image] = useState("")
   const [bottomsectionimage, setBottomSectionImage] = useState("")

   const [metaimageFile, setMetaImageFile] = useState(null)
   const [section1imageFile, setsection1imageFile] = useState(null)
   const [bottomsectionimageFile, setBottomSectionImageFile] = useState(null)

   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getAboutData/2")
            .then(response => {
               const data = response.data.data;
               setHomadata(data);
               setValue('metatitle', data.metatitle);
               setValue('metadescription', data.metadescription);
               setValue('metatags', data.metatags);
               setValue('metaimage', data.metaimage);
               setValue('headertitle', data.headertitle);
               setValue('headerdescription', data.headerdescription);
               setValue('section1title', data.section1title);
               setValue('section1buttonlabel', data.section1buttonlabel);
               setValue('section1image', data.section1image);
               setValue('section1yearsofexperience', data.section1yearsofexperience);
               setValue('section1description', data.section1description);
               setValue('section2description', data.section2description);
               setValue(`section2title`,data.section2title)
               setValue(`section1buttonlink`,data.section1buttonlink)

               setMetaImage('http://localhost:8000/uploads/'+data.metaimage);
               setsection1image('http://localhost:8000/uploads/'+data.section1image);
               setBottomSectionImage('http://localhost:8000/uploads/'+data.bottomsectionimage);

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
         section1imageFile == null ? "" : data.section1image = section1imageFile;
         bottomsectionimageFile == null ? "" : data.bottomsectionimage = bottomsectionimageFile;


         // formData.append('metaimage', metaimageFile);
         // formData.append('section1image', section1imageFile);
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

         await axios.post("http://localhost:8000/api/addAboutData", formData, config).then((response) => {
            setError("");
            setUpdate(!update);
            setLoading(false);
         }).catch(error => {
            setError(error.message);
            setLoading(false);
         }).finally(() => {

            metaimageFile == null ? "" : setMetaImageFile(null);
            section1imageFile == null ? "" : setsection1imageFile(null);
            bottomsectionimageFile == null ? "" : setBottomSectionImageFile(null);


         })


      } catch (error) {
         setError(error.message);
         setLoading(false);
      }
   }

   return (
      <div className="w-full">
         <h1 className='text-gray-800 text-2xl font-semibold text-start p-3'>About Section</h1>
         <div className='p-5'>
            <form className='content-center' onSubmit={handleSubmit(create)}>
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
                     <label htmlFor="headerdescription" className="block text-lg font-medium leading-6 text-gray-900">Header Description</label>

                     <div className='flex flex-row flex-wrap justify-center mt-2 w-3/4'>
                        <RTE label="Headerdescription :" name="headerdescription" control={control} defaultValue={getValues("headerdescription")} />
                     </div>

                  </div>
               </div>

               <div className="flex flex-col flex-wrap justify-center mt-2">
                  <div className='p-2 mt-2'>
                     <label htmlFor="section1title" className="block text-lg font-medium leading-6 text-gray-900">Section 1 Title</label>
                     <div className="mt-2">
                        <input
                           id="section1title"
                           name="section1title"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section1title', { required: 'section1title is required' })}
                        />
                        {errors.section1title && <p className="text-red-500 text-sm">{errors.section1title.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="section1buttonlabel" className="block text-lg font-medium leading-6 text-gray-900">Section 1 Button Label</label>
                     <div className="mt-2">
                        <input
                           id="section1buttonlabel"
                           name="section1buttonlabel"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section1buttonlabel', { required: 'section1buttonlabel is required' })}
                        />
                        {errors.section1buttonlabel && <p className="text-red-500 text-sm">{errors.section1buttonlabel.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="section1image" className="block text-lg font-medium leading-6 text-gray-900">Section 1 Image</label>
                     <div className="mt-2">
                        <input
                           id="section1image"
                           name="section1image"
                           type="file"
                           autoComplete="text"
                           accept='image/*'

                           onChangeCapture={(e) => handleFileChange(e, setsection1imageFile , setsection1image)}
                           className="block file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section1image')}
                        />

                        {errors.section1image && <p className="text-red-500 text-sm">{errors.section1image.message}</p>}
                     </div>
                     {section1image && (
                        <div>
                           <label htmlFor="section1image" className="block text-sm font-medium leading-6 text-gray-900">Current Header Background Image</label>
                           <img src={`${section1image}`} alt="section1image" className="w-1/2 h-44" />
                        </div>
                     )}
                  </div>
               </div>





               <div className="flex flex-col flex-wrap justify-center mt-2 mb-2">

               <div className='p-2 mt-2'>
                     <label htmlFor="section1buttonlink" className="block text-sm font-medium leading-6 text-gray-900">Section 1 Button Link</label>
                     <div className="mt-2">
                        <input
                           id="section1buttonlink"
                           name="section1buttonlink"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section1buttonlink', { required: 'section1buttonlink is required' })}
                        />
                        {errors.section1buttonlink && <p className="text-red-500 text-sm">{errors.section1buttonlink.message}</p>}
                     </div>
                  </div>


                  <div className='p-2 mt-2'>
                     <label htmlFor="section1yearsofexperience" className="block text-sm font-medium leading-6 text-gray-900">Section 1 Years of Experience</label>
                     <div className="mt-2">
                        <input
                           id="section1yearsofexperience"
                           name="section1yearsofexperience"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section1yearsofexperience', { required: 'section1yearsofexperience is required' })}
                        />
                        {errors.section1yearsofexperience && <p className="text-red-500 text-sm">{errors.section1yearsofexperience.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="section1description" className="block text-lg font-medium leading-6 text-gray-900">Section 1 Description</label>
                     <div className='flex flex-row flex-wrap justify-center mt-2 w-3/4'>

                        <RTE label="" name="section1description" control={control} defaultValue={getValues("section1description")} />
                     </div>

                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="section2title" className="block text-lg font-medium leading-6 text-gray-900">Section 2 Title</label>
                     <div className="mt-2">
                        <input
                           id="section2title"
                           name="section2title"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('section2title', { required: 'section2title is required' })}
                        />
                        {errors.section2title && <p className="text-red-500 text-sm">{errors.section2title.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="section2description" className="block text-lg font-medium leading-6 text-gray-900">Section 2 Description</label>

                     <div className='flex flex-row flex-wrap justify-center mt-2 w-3/4'>
                        <RTE label="section2description :" name="section2description" control={control} defaultValue={getValues("section2description")} />
                     </div>

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