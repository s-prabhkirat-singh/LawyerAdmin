import { set, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';



export default function Testimonials() {

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({

   });


   // this will stop to delete the  cards when no more empty cards present
   const [cardcount, setcardcount] = useState(0)



   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [card, setcardata] = useState([])

   const [imageurl, setimageurl] = useState([])
   // setting the url to show the image




   // we will check about the if someone changed the file if yes then it will be updated and we will update the data.metaimagefile

   const [iconfile, seticonfile] = useState(null)

   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getTestimonialList")
            .then(response => {
               const data = response.data.data;
               console.log(data)
               setcardata(data);
               setcardcount(data.length)

               const urls = data.map(item => `http://localhost:8000/uploads/${item.image}`);
               setimageurl(urls);


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


   card.map((data, i) => {


      console.log("data", imageurl[i])
   })


   useEffect(() => {
      fetchdata()
   }, [update])

   const handleFileChange = (event, index) => {

      console.log(event)
      console.log(event.target.files[0])
      console.log(event.target.files[0].name)

      const file = event.target.files[0];
      if (file) {

         const newImageUrls = [...imageurl];

         // Update the specific index with the new imageUrl
         const imageUrl = URL.createObjectURL(file);
         newImageUrls[index] = imageUrl;

         console.log("newImageUrls", newImageUrls)

         // Set the state with the updated array
         setimageurl(newImageUrls);
      }


   }


   const create = async (data) => {
      setLoading(true)

      console.log("create", data)
   }


   const addcards = () => {


      setcardata([...card, {
         id: "",
         name: "",
         position: "",
         image: null,
         review_text: ""
      }])
      console.log("clicked", card)
   }


   /* n => n+1 is will create new value does not update the value */
   /* where as card.pop() will update the value  against the feature of hooks of immutability*/
   const deletecardscount = () => {




      if (card.length > cardcount) {
         setcardata([...card].slice(0, card.length - 1))
      }

   }



   const updatecard = async (index, id) => {

      var data = getValues()

      console.log("data values", data)

      const name = data[`name-${index}`]
      const position = data[`position-${index}`]
      const image = data[`image-${index}`][0]

      const review_text = data[`review_text-${index}`]

      console.log("clicked", name);
      console.log("clicked", position)
      console.log("clicked", review_text)






      if (name && position && review_text) {
         if (image) {



            data = {
               id: id,
               name: name,
               position: position,
               image: image,
               review_text: review_text

            }
         }
         else {

            data = {
               id: id,

               name: name,
               position: position,

               review_text: review_text

            }
         }

         setLoading(true)
         try {
            console.log("data values", data)
            const formData = new FormData();




            for (const [key, value] of Object.entries(data)) {

               console.log(key)
               formData.append(key, value);
            }


            console.log("formdata", formData.data)



            const config = {
               headers: {
                  'content-type': 'multipart/form-data',
               },
            };

            await axios.post("http://localhost:8000/api/updateTestimonial", formData, config).then((response) => {
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
      } else {
         alert("Please fill all the fields")
      }
   }


   const deletecard = async (id) => {


      try {


         await axios.post(`http://localhost:8000/api/deleteTestimonial/${id}`).then((response) => {
            setError("");
            setUpdate(!update);
            console.log(response.data.msg)
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


   const addata = async (index) => {


      try {
         const data = getValues()

         console.log("data values", data)

         const name = data[`name-${index}`]
         const position = data[`position-${index}`]
         const image = data[`image-${index}`][0]
         const review_text = data[`review_text-${index}`]

         console.log("clicked", name);
         console.log("clicked", position)
         console.log("clicked", review_text)

         //console.log("clicked", icon2)


         const form = {

            name: name,
            position: position,
            image: image,
            review_text: review_text

         }

         const formData = new FormData();

         for (const [key, value] of Object.entries(form)) {

            console.log(key)
            formData.append(key, value);
         }


         console.log("formdata", formData.data)



         const config = {
            headers: {
               'content-type': 'multipart/form-data',
            },
         };


         await axios.post("http://localhost:8000/api/addTestimonial", formData, config).then((response) => {
            setError("");
            setUpdate(!update);
            setLoading(false);
            console.log(response.data.msg)
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
         <h1 className='text-gray-800 text-2xl font-semibold text-start p-3'>Testimonials</h1>
         <div className='p-5'>


            {
               card.map((data, i) => (
                  <form className='content-center' onSubmit={handleSubmit(create)}>

                     <div className="flex flex-col p-2 m-2 mt-2 flex-wrap justify-center border border-gray-50 shadow-md rounded-sm">



                        <div className='p-2 mt-2'>
                           <h1>{i + 1}</h1>
                        </div>

                        <div className='p-2 mt-2'>
                           <label htmlFor="name" className="block text-lg font-medium leading-6 text-gray-900">Name</label>
                           <div className="mt-2">
                              <input
                                 id="name"
                                 name="name"
                                 type="text"
                                 autoComplete="text"
                                 required
                                 defaultValue={data.name}
                                 className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`name-${i}`, { required: 'name is required' })}
                              />
                              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                           </div>
                        </div>

                        <div className='p-2 mt-2'>
                           <label htmlFor="position" className="block text-lg font-medium leading-6 text-gray-900">Position</label>
                           <div className="mt-2">
                              <input
                                 id="position"
                                 name="position"
                                 type="text"
                                 autoComplete="text"
                                 required
                                 defaultValue={data.position}
                                 className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`position-${i}`, { required: 'text is required' })}
                              />
                              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
                           </div>
                        </div>

                        <div className='p-2 mt-2'>
                           <label htmlFor="review_text" className="block text-lg font-medium leading-6 text-gray-900">Review Text</label>
                           <div className="mt-2">
                              <input
                                 id="review_text"
                                 name="review_text"
                                 type="text"
                                 autoComplete="text"
                                 required
                                 defaultValue={data.review_text}
                                 className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`review_text-${i}`, { required: 'text is required' })}
                              />
                              {errors.review_text && <p className="text-red-500 text-sm">{errors.review_text.message}</p>}
                           </div>
                        </div>


                        <div className='p-2 mt-2'>
                           <label htmlFor="icon" className="block text-lg font-medium leading-6 text-gray-900">Image</label>
                           <div className="mt-2">
                              <input
                                 id="image"
                                 name="image"
                                 type="file"
                                 autoComplete="text"
                                 accept='image/*'

                                 onChangeCapture={(e) => handleFileChange(e, i)}
                                 className="block file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-3 file:px-4 w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`image-${i}`)}
                              />

                              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                           </div>

                           <div>
                              <label htmlFor="icon" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                              <img src={imageurl[i]} alt="icon" className="w-auto h-28" />
                           </div>

                        </div>

                        {
                           data.id === "" ? (

                              <>
                                 <div className="flex flex-row  flex-wrap justify-start mt-2 ">


                                    <button
                                       type="button"
                                       className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       disabled={loading} onClick={() => addata(i)}
                                    >
                                       {loading ? 'Loading...' : 'Add Card Data'}
                                    </button>


                                 </div>

                              </>
                           ) : (

                              <>

                                 <div className="flex flex-row  flex-wrap justify-start mt-2 ">


                                    <button
                                       type="button"
                                       className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       disabled={loading} onClick={() => updatecard(i, data.id)}
                                    >
                                       {loading ? 'Loading...' : 'Update Card'}
                                    </button>


                                    <button
                                       type="submit"
                                       className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       disabled={loading} onClick={() => deletecard(data.id)}
                                    >
                                       {loading ? 'Loading...' : 'Delete Card'}
                                    </button>

                                 </div>
                              </>


                           )
                        }

                     </div>
                  </form>
               )
               )
            }







            <div className="flex flex-row  flex-wrap justify-center mt-2 ">
               <button
                  type="button"
                  className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loading} onClick={addcards}
               >
                  {loading ? 'Loading...' : '+ Add More Cards'}
               </button>

               <button
                  type="button"
                  className="w-56 rounded-md bg-indigo-600 py-2 m-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loading} onClick={deletecardscount}
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