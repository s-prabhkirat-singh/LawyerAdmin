export default function SignIn() {
   return (
      <div class="mx-auto my-10 max-w-md rounded-xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8">
         <div class="mb-16 flex justify-between">
            <span class="font-bold"><span class="inline-block h-3 w-3 bg-blue-600"></span> Calvin</span>
            <span class="">Have account? <a href="#" class="font-medium text-blue-600 hover:underline">Log in</a></span>
         </div>
         <p class="mb-5 text-3xl font-medium">Manage your produce business us!</p>
         <p class="mb-6 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa corrupti praesentium?</p>
         <div class="mb-6">
            <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
               <input type="email" id="email" class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
            </div>
            <div class="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
               <input type="password" id="password" class="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
            </div>
         </div>
         <button class="mb-6 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700">Get Started</button>
         <p class="">By signing up you are agreeing to our <a href="#" class="whitespace-nowrap font-medium text-gray-900 hover:underline">Terms and Conditions</a></p>
      </div>

   )
}