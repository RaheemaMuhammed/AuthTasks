import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { axiosInstance } from '../Axios/instanse';
import { AuthContext } from '../Context/AuthContext';
const OTPLogin = () => {
    const [verify,setVerify]=useState(false)
    const navigate=useNavigate()
    const {updateUser}=useContext(AuthContext)
    const onSubmit = async () =>{
        if(!verify){
            try{
                const response= await axiosInstance.post('authentication/send_otp/',{email:values.email}, {
                    headers :{
                        "Content-type" :"application/json"
                    }
                })
                if (response?.data.status == 200){
                    toast.success(response?.data.message)
                    setVerify(true)
                   
                  } else if (response?.data.status === 401) {
                        toast.error(response?.data.message)
                      } else if (response?.data.status === 400) {
                        toast.error(response?.data.message)
                      } else {
                        toast.error('something went wrong')
                      }
                  }catch (error) {
                console.log(error)
          
              }
        }else{
            try{
                const response= await axiosInstance.post('authentication/verify_otp/',values, {
                    headers :{
                        "Content-type" :"application/json"
                    }
                })
                console.log(response);
                if (response?.data.status == 200){
                    toast.success(response?.data.message)
                    // localStorage.setItem('user',JSON.stringify(response?.data?.username))
                  // updateUser(response?.data?.username)
                  updateUser({username:response?.data?.username,email:response?.data?.email})

                    navigate('/dashboard')
                   
                  }else if (response?.data.status === 401) {
                        toast.error(response?.data.message)
                      } else if (response?.data.status === 400) {
                        toast.error(response?.data.message)
                      } else {
                        toast.error('something went wrong')
                      }
                  }catch (error) {
                console.log(error)
          
              }

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
                    
                    otp:""
                },
                onSubmit,
             })
      
  
      
  return (
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-primary rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign In to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}  encType="multipart/form-data">
              <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-shiny ">Your email</label>
                        <input type="email"
                         name="email"
                        id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                         className="bg-gray-50 border border-gray-300 text-shiny sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                         placeholder="Enter your Email" />
                    
                    </div> 
                   {verify && <div>
                     <label htmlFor="otp" className="block mb-2 text-sm font-medium text-shiny ">OTP</label>
                     <input type="otp"
                      name="otp"
                       id="otp"
                 value={values.otp}
                 onChange={handleChange}
                 onBlur={handleBlur}
                        placeholder="Enter your otp"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                
                 </div> }
                     
                 <div className="flex items-center justify-between">
                          <div className=" text-base font-medium hover:underline decoration-btnColor cursor-pointer">
                            <p  className="text-btnColor " >
                                <Link to={'/'} >Login with password</Link>
                    
                                </p>
                          </div>
                    
                  </div>
                  <button 
                    type="submit" 
                    className="w-full text-white bg-btnColor hover:bg-newTeal hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Login
                    </button>
          
                    <p className="text-sm font-light  ">
                      Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                  </p>
                   
                </form>
              
          </div>
      </div>
  </div>
</section>  )
}

export default OTPLogin