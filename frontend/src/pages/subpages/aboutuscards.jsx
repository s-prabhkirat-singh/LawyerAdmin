import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';


export default function AboutUsCards() {

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({
      defaultValues: {
         headerdescription: "",
         section1description: ""
      }
   });


   const [count , setcount] = useState(1)

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [card,setcardata] = useState([{}])

   // setting the url to show the image
  
   const [icon, seticon] = useState("")
   

   // we will check about the if someone changed the file if yes then it will be updated and we will update the data.metaimagefile
   
   const [iconfile, seticonfile] = useState(null)

   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getAboutData/2")
            .then(response => {
               const data = response.data.data;
               console.log(data)
               /*setHomadata(data);
               setValue('metatitle', data.metatitle);
               setValue('metadescription', data.metadescription);
               setValue('metatags', data.metatags);
               setValue('metaimage', data.metaimage);
               setValue('headertitle', data.headertitle);
               setValue('headerdescription', data.headerdescription);
               setValue('section1title', data.section1title);
               setValue('section1buttonlabel', data.section1buttonlabel);
               setValue('icon', data.icon);
               setValue('section1yearsofexperience', data.section1yearsofexperience);
               setValue('section1description', data.section1description);
               setValue('section2description', data.section2description);
               setValue(`section2title`,data.section2title)
               setValue(`section1buttonlink`,data.section1buttonlink)
               setValue('headerbgimage',data.headerbgimage)

               // setting the url to show the image
               seticon('http://localhost:8000/uploads/'+data.icon);*/
               
             

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
         section1imageFile == null ? "" : data.icon = section1imageFile;
         headerbgimageFile == null ? "" : data.headerbgimage = headerbgimageFile;


         // formData.append('metaimage', metaimageFile);
         // formData.append('icon', section1imageFile);
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
            headerbgimageFile == null ? "" : setheaderbgimageFile(null);


         })


      } catch (error) {
         setError(error.message);
         setLoading(false);
      }
   }


   const addcards = ()=>{
      setcardata([...card,{}])
   }


   /* n => n+1 is will create new value does not update the value */
   /* where as card.pop() will update the value  against the feature of hooks of immutability*/
   const deletecardscount = ()=>{

      setcardata([...card].slice(0,card.length-1))
   }



   const updatecard = async (data) => {}
   const deletecard = async (data) => {}


   return (
      <div className="w-full">
         <h1 className='text-gray-800 text-2xl font-semibold text-start p-3'>About Us Section Cards</h1>
         <div className='p-5'>
            <form className='content-center' onSubmit={handleSubmit(create)}>

              {
                   card.map((data, i) => (

                     <div className="flex flex-col p-2 m-2 mt-2 flex-wrap justify-center border border-gray-50 shadow-md rounded-sm">
                 

                  <div className='p-2 mt-2'>
                     <label htmlFor="count" className="block text-lg font-medium leading-6 text-gray-900">Count</label>
                     <div className="mt-2">
                        <input
                           id="count"
                           name="count"
                           type="number"
                           autoComplete="number"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('count', { required: 'count is required' })}
                        />
                        {errors.count && <p className="text-red-500 text-sm">{errors.count.message}</p>}
                     </div>
                  </div>

                  <div className='p-2 mt-2'>
                     <label htmlFor="text" className="block text-lg font-medium leading-6 text-gray-900">Text</label>
                     <div className="mt-2">
                        <input
                           id="text"
                           name="text"
                           type="text"
                           autoComplete="text"
                           required
                           className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('text', { required: 'text is required' })}
                        />
                        {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
                     </div>
                  </div>


                  <div className='p-2 mt-2'>
                     <label htmlFor="icon" className="block text-lg font-medium leading-6 text-gray-900">Icon</label>
                     <div className="mt-2">
                        <input
                           id="icon"
                           name="icon"
                           type="file"
                           autoComplete="text"
                           accept='image/*'

                           onChangeCapture={(e) => handleFileChange(e, setsection1imageFile , setsection1image)}
                           className="block file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('icon')}
                        />

                        {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}
                     </div>
                     {icon && (
                        <div>
                           <label htmlFor="icon" className="block text-sm font-medium leading-6 text-gray-900">Current Section 1 Image</label>
                           <img src={`${icon}`} alt="icon" className="w-1/2 h-44" />
                        </div>
                     )}
                  </div>


<div className="flex flex-row  flex-wrap justify-start mt-2 ">
<button
                     type="button"
                     className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     disabled={loading}  onClick={updatecard}
                  >
                     {loading ? 'Loading...' : 'Update Card'}
                  </button>


                  <button
                     type="button"
                     className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     disabled={loading}  onClick={deletecard}
                  >
                     {loading ? 'Loading...' : 'Delete Card'}
                  </button>
</div>
                  



               </div>
                   )

                     
                   )
              }
               

               
               
            </form>


            <div className="flex flex-row  flex-wrap justify-center mt-2 ">
                  <button
                     type="button"
                     className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     disabled={loading}  onClick={addcards}
                  >
                     {loading ? 'Loading...' : '+ Add More Cards'}
                  </button>

                  <button
                     type="button"
                     className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     disabled={loading}  onClick={deletecardscount}
                  >
                     {loading ? 'Loading...' : '- Delete Cards'}
                  </button>
               </div>

               {error && (
                  <div className="flex flex-row flex-wrap justify-center mt-2">
                     <p className="text-red-500 text-sm">{error}</p>
                  </div>
               )}

         </div>
      </div>
   );
}