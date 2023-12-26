import React from 'react'
import { axiosInstance } from '../Axios/instanse'
import { useFormik } from 'formik'
import { AuthContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'
const DeleteTaskModal = ({refresh,setRefresh,deleteModal, setDeleteModal,id}) => {
    
    
    const handleSubmit= async()=>{

        
       
       
        try {
            const response= await axiosInstance
            .delete('api/tasks/',
            {     
                params:{
                    id:id
                }
            })
            if(response?.data.status===200){
                setRefresh(!refresh)
                toast.success('Successfully Deleted task')
                setDeleteModal(false)


            }else{
                toast.error('Something went wrong')
               
            }
        } catch (error) {
            toast.error(error)
        }
    
}
   
  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200  rounded-t">
            <h3 className="text-3xl font-semibold text-center">
             Delete Task
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setDeleteModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-4 flex-auto">
    
  <p className='mt-0 mb-3'>Are you sure you want to delte?</p>
    
    <div className='flex'>
    <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setDeleteModal(false)}
            >
              Close
            </button>
   
    <button 
    type="button" 
    onClick={handleSubmit}
    className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Delete</button>
        </div> 

   
          </div>
          
         
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default DeleteTaskModal