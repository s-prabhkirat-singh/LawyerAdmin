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

   const [loading, setloading] = useState(false)

   const [error, seterror] = useState("")

   const [update, setupdate] = useState(false)

   const [homedata, sethomedata] = useState()

   const [metaimage, setMetaImage] = useState("")




   const fetchdata = async () => {
      setloading(true)
      try {

         await axios.get("https://6t7m9ptx-8000.inc1.devtunnels.ms/api/getHomeData/1", {

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
               setMetaImage(response.data.data.metaimage)



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

   }, [update])





   const create = async (data) => {


      setloading(true)
      data.id = 1
      console.log(data);

      try {

         await axios.post("https://6t7m9ptx-8000.inc1.devtunnels.ms/api/addHomeData", data).then((response) => {

            console.log(response)
            //sethomedata(response.data.data)



            seterror("")
            console.log("response ", response)
            setupdate(!update)
            setloading(false)


            /*setValue('metatitle', response.data.data.metatitle);
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
            setValue('bottomsectionimage', response.data.data.bottomsectionimage);*/




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
                           autoComplete="text"
                           accept='image/*'
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('metaimage', { required: 'metaimage is required' })}
                        />
                        {errors.metaimage && <p className="text-red-500 text-sm">{errors.metaimage.message}</p>}
                     </div>

                     {


                        metaimage ? (<div>

                           <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Headerbgimage</label>
                           <img src={`http://localhost:8000/uploads/${metaimage}`} alt="headerbgimage" className="w-20 h-20" />

                        </div>) : null
                     }
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





               </div>

               <div className='p-2'>

                  <RTE label="Headerdescription :" name="headerdescription" control={control} defaultValue={getValues("headerdescription")} />
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
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('headerbgimage')}
                        />




                        {errors.headerbgimage && <p className="text-red-500 text-sm">{errors.headerbgimage.message}</p>}
                     </div>

                     {


                        metaimage ? (<div>

                           <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Headerbgimage</label>
                           <img src={`http://localhost:8000/uploads/${headerbgimage}`} alt="headerbgimage" className="w-20 h-20" />

                        </div>) : null
                     }
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
                     <label htmlFor="bottomsectionimage" className="block text-sm font-medium leading-6 text-gray-900">Bottomsectionimage</label>


                     <div className="mt-2">
                        <input
                           id="bottomsectionimage"
                           name="bottomsectionimage"
                           type="file"
                           autoComplete="text"
                           accept='image/*'
                           required
                           className="block w-56 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           {...register('bottomsectionimage', { required: 'bottomsectionimage is required' })}
                        />
                        {errors.bottomsectionimage && <p className="text-red-500 text-sm">{errors.bottomsectionimage.message}</p>}
                     </div>

                     {


                        metaimage ? (<div>

                           <label htmlFor="headerbgimage" className="block text-sm font-medium leading-6 text-gray-900">Headerbgimage</label>
                           <img src={metaimage} alt="headerbgimage" className="w-20 h-20" />

                        </div>) : null
                     }
                  </div>



               </div>



               <div className='flex flex-row flex-wrap justify-center mt-2 w-2/3'>

                  <RTE label="Bottomsectiondescription :" name="bottomsectiondescription" control={control} defaultValue={getValues("bottomsectiondescription")} />
               </div>





               <div className="flex flex-row flex-wrap w-full justify-center ">
                  <button type="submit" className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>
               </div>
            </form>


         </div>


      </div>
   )
}