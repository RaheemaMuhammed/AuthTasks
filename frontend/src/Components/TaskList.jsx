import React, { useState,useEffect } from 'react'
import { FaTrash,FaEdit } from 'react-icons/fa'
import { axiosInstance } from '../Axios/instanse'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'

const TaskList = ({refresh,setRefresh,showModal, setShowModal}) => {
    const [tasks,setTasks]=useState([])
    const [editModal,setEditModal]=useState(false)
    const [deleteModal,setDeleteModal]=useState(false)
    const [data,setData]=useState({})
    useEffect(() => {
        const getAllTasks=async()=>{
            try {
                const response =await axiosInstance.get('api/tasks/',
                {
                  headers :{
                    "Content-type" :"application/json"
                }
                })
                console.log(response);
              setTasks(response?.data?.payload)
                
              } catch (error) {
                
              }
        }
        getAllTasks()

      
    }, [refresh])
    
  return (<>
        {tasks?.length===0?<p className='border-newCoral shadow-lg shadow-primary rounded-lg border-2 p-5 text-center '>No Tasks to show!!!</p>:
   <div className=' border-newCoral shadow-lg shadow-primary rounded-lg border-2 lg:mx-4 grid grid-cols-2 lg:grid-cols-4 mt-2 gap-1 lg:gap-2 p-3'>
        {editModal&&<EditTaskModal  refresh={refresh} setRefresh={setRefresh} editModal={editModal} setEditModal={setEditModal} data={data}/>}
        {deleteModal && <DeleteTaskModal  refresh={refresh} setRefresh={setRefresh} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/>}
         
          { tasks?.map((item,indx)=>{
            console.log(item);
            return(
    <div key={indx} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex justify-between'>
    
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
            <div className=''>
                <FaTrash size={22} style={{color:'brown',cursor:'pointer'}} onClick={()=>setDeleteModal(!deleteModal)}/>
                <FaEdit size={22} style={{color:'brown',marginTop:'7px',cursor:'pointer'}} onClick={()=>{setEditModal(!editModal);setData(item)}}/>
                </div>
        </div>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-btnColor rounded-lg   focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            schedule
            
        </p>
    </div>
            )
          })}
    

   



      </div>
        }
  </>
   
  )
}

export default TaskList