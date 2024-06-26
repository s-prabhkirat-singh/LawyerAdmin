import { set, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios';
import RTE from '../../components/rte';



export default function Faq_QuestionAnswer() {

   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm({

   });


   // this will stop to delete the  cards when no more empty cards present
   const [cardcount, setcardcount] = useState(0)



   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [update, setUpdate] = useState(false)
   const [card, setcardata] = useState([])







   // we will check about the if someone changed the file if yes then it will be updated and we will update the data.metaimagefile

   const [iconfile, seticonfile] = useState(null)



   const fetchdata = async () => {
      setLoading(true)
      try {
         await axios.get("http://localhost:8000/api/getQuestions")
            .then(response => {

               const data = response.data.data;
               console.log(data)
               setcardata(data);
               setcardcount(data.length)

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




   const create = async (data) => {
      setLoading(true)
      console.log("create", data)
   }


   const addcards = () => {

      // const data = 

      setcardata([...card, {
         id: "",
         question: "",
         answer: "",

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

      const data = getValues()

      console.log("data values", data)


      const question = data[`question-${index}`]
      const answer = data[`answer-${index}`]


      console.log("clicked", question)
      console.log("clicked", answer)






      if (question && answer) {




         const data = {

            id: id,
            question: question,
            answer: answer,

         }


         setLoading(true)
         try {
            console.log("data values", data)





            await axios.post("http://localhost:8000/api/updateQuesData", data).then((response) => {
               setError("");
               setUpdate(!update);
               setLoading(false);
            }).catch(error => {
               setError(error.message);
               setLoading(false);
            }).finally(() => {

               iconfile == null ? "" : seticonfile(null);

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



         await axios.delete(`http://localhost:8000/api/deleteQuestion/${id}`).then((response) => {
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

         const question = data[`question-${index}`]
         const answer = data[`answer-${index}`]


         console.log("clicked", question)
         console.log("clicked", answer)



         const form = {


            question: question,
            answer: answer,

         }







         const config = {
            headers: {
               'content-type': 'multipart/form-data',
            },
         };


         await axios.post("http://localhost:8000/api/addQuestion", form).then((response) => {
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
         <h1 className='text-gray-800 text-2xl font-semibold text-start p-3'>Faq Question Answer</h1>
         <div className='p-5'>


            {
               card.map((data, i) => (
                  <form className='content-center' onSubmit={handleSubmit(create)}>

                     <div className="flex flex-col p-2 m-2 mt-2 flex-wrap justify-center border border-gray-50 shadow-md rounded-sm">



                        <div className='p-2 mt-2'>
                           <h1>{i + 1}</h1>
                        </div>

                        <div className='p-2 mt-2'>
                           <label htmlFor="question" className="block text-lg font-medium leading-6 text-gray-900">Question</label>
                           <div className="mt-2">
                              <input
                                 id="question"
                                 name="question"
                                 type="text"
                                 autoComplete="text"
                                 required
                                 defaultValue={data.question}
                                 className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`question-${i}`, { required: 'question is required' })}
                              />
                              {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
                           </div>
                        </div>

                        <div className='p-2 mt-2'>
                           <label htmlFor="answer" className="block text-lg font-medium leading-6 text-gray-900">Answer</label>
                           <div className="mt-2">
                              <input
                                 id="answer"
                                 name="answer"
                                 type="text"
                                 autoComplete="text"
                                 required
                                 defaultValue={data.answer}
                                 className="block w-3/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 {...register(`answer-${i}`, { required: 'text is required' })}
                              />
                              {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
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