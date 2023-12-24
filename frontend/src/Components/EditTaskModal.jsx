import React,{useContext} from 'react'
import { axiosInstance } from '../Axios/instanse'
import { useFormik } from 'formik'
import { AuthContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'
const EditTaskModal = ({refresh,setRefresh,editModal, setEditModal,data}) => {
    const {user}=useContext(AuthContext)
    
    
    const onSubmit= async()=>{

        const form =new FormData()
        
        form.append('title',values.title)
        form.append('description',values.description)
        form.append('completed',values.completed)
        // form.append('user',user.email)
        form.append('id',data._id)
       
       
        try {
            const response= await axiosInstance
            .patch('api/tasks/',form,
            {
                headers :{
                    "Content-type" :"application/json"
                }
            })
            console.log(response);
            if(response?.data.status===200){
                setRefresh(!refresh)
                toast.success('Successfully Edited task')
                setEditModal(false)


            }else{
                toast.error('Something went wrong')
               
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    
}
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues:{
           title:data.title,
           description:data.description,
           completed:false,

        },
        onSubmit,
    })
  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
             Add Task
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setEditModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
          <form className="space-y-4 md:space-y-6"   onSubmit={handleSubmit} encType="multipart/form-data">
    
    <div>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-black ">Enter Title</label>
        <input type="text" name="title"  
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur} id="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Title of the task" />
    </div>
    <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">Description</label>
        <textarea type="text" name="description" 
         id="description"
         value={values.description}
         onChange={handleChange}
         onBlur={handleBlur}
        placeholder="Description" className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
    </div>
    <div className='flex'>
    <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setEditModal(false)}
            >
              Close
            </button>
   
    <button 
    type="submit" 
    className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Edit</button>
        </div> 

    <div className="flex items-center justify-between">

    </div>
</form>
          </div>
          {/*footer*/}
         
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default EditTaskModal