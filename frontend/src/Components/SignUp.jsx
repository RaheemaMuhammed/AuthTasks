import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { axiosInstance } from '../Axios/instanse';
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate=useNavigate()
    
    const onSubmit=async ()=>{
        const form = new FormData()
        form.append('email',values.email)
        form.append('username',values.username)
        form.append('password',values.password)

        try {
            const response= await axiosInstance
            .post('authentication/register/',form,
            {
                headers :{
                    "Content-type" :"application/json"
                }
            })
         
            if(response?.data.status===201){
                toast.success('Successfully registered.Please Login')
                navigate('/')


            }else{
                toast.error('Something went wrong')
               
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const {
        values ,
         errors,
         touched,
         handleBlur,
         handleChange,
         handleSubmit} = useFormik({
            initialValues:{
                email:"",
                username:"",
                password:""
            },
            
            onSubmit,
         })
  return (
    <section className="  h-screen ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full shadow-inner shadow-shiny bg-primary rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight text-center text-shiny tracking-tight md:text-2xl ">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}  encType="multipart/form-data">
                
                <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-shiny ">Your username</label>
                        <input 
                        type="username" 
                        name="username" 
                        id="username" 
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Your Username" 
                        />
       
               
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-shiny ">Your email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Your Email" 
                       />

                 
                    </div>
                   
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-shiny ">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Enter Your Password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " 
                        />
                       
                 
                    </div>
  
                   <button 
                    type="submit" 
                    className="w-full text-white bg-btnColor hover:bg-newTeal hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Create an account
                    </button>
                    
                    
                    <p className="text-sm font-light text-shiny ">
                        Already have an account? <Link to={'/'} className="font-medium text-primary-600 hover:underline ">Login here</Link>
                        
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default SignUp