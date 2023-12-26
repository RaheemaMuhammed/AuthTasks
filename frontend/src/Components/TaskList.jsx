import React, { useState,useEffect } from 'react'
import { FaTrash,FaEdit, FaClock, FaCalendar, FaCalendarTimes, FaCalendarAlt } from 'react-icons/fa'
import { axiosInstance } from '../Axios/instanse'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'
import { toast } from 'react-toastify'
import ScheduleModal from './ScheduleModal'
const TaskList = ({refresh,setRefresh,showModal, setShowModal}) => {
    const [tasks,setTasks]=useState([])
    const [editModal,setEditModal]=useState(false)
    const [deleteModal,setDeleteModal]=useState(false)
    const [scheduleModal,setScheduleModal]=useState(false)
    const [data,setData]=useState({})
    const [id,setId]=useState('')
    useEffect(() => {
        const getAllTasks=async()=>{
            try {
                const response =await axiosInstance.get('api/tasks/',
                {
                  headers :{
                    "Content-type" :"application/json"
                }
                })
              setTasks(response?.data?.payload)
                
              } catch (error) {
                
              }
        }
        getAllTasks()

      
    }, [refresh])
    const formatDate = (dateString) => {
        const options = {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      
    
  return (<>
        {tasks?.length===0?<p className='border-primary shadow-lg shadow-primary rounded-lg border-2 p-5 text-center '>No Tasks to show!!!</p>:
   <div className=' border-primary shadow-lg shadow-primary rounded-lg border-2 lg:mx-4 grid grid-cols-2 lg:grid-cols-4 mt-2 gap-1 lg:gap-2 p-3'>
        {editModal&&<EditTaskModal  refresh={refresh} setRefresh={setRefresh} editModal={editModal} setEditModal={setEditModal} data={data}/>}
        {deleteModal && <DeleteTaskModal  refresh={refresh} setRefresh={setRefresh} deleteModal={deleteModal} setDeleteModal={setDeleteModal} id={id}/>}
        {scheduleModal && <ScheduleModal  refresh={refresh} setRefresh={setRefresh} scheduleModal={scheduleModal} setScheduleModal={setScheduleModal} id={id}/>}
         
        
          { tasks?.map((item,indx)=>{
            const handleTaskStatus=async()=>{
                try {
                    const response= await axiosInstance
                    .patch('api/tasks/',{id:item._id,completed:!item?.completed},
                    {
                        headers :{
                            "Content-type" :"application/json"
                        }
                    })
                    console.log(response);
                    if(response?.data.status===200){
                        setRefresh(!refresh)
                       
                    }else{
                        toast.error('Something went wrong')
                       
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error)
                }
              }

            return(
    <div key={indx} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       
        <div className='flex justify-between'>
            <div className='flex'>

        <div className='mx-2 mt-2'>

                <label className="main"> 
                <input className='w-5 h-5 text-btnColor bg-newCoral border-primary rounded' type="checkbox"  
                checked={item?.completed}
                onChange={handleTaskStatus}

                /> 
                <span className="status"></span> 
                </label>
                </div>
        <div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
       
            <p className='text-gray-400'>{formatDate(item?.created_at)}</p>


</div>
            </div>


            <div className=''>
                <FaTrash size={22} style={{color:'brown',cursor:'pointer'}} onClick={()=>{setDeleteModal(!deleteModal);setId(item?._id)}}/>
                <FaEdit size={22} style={{color:'brown',marginTop:'7px',cursor:'pointer'}} onClick={()=>{item?.completed ? toast.error('Cannot edit completed task') :setEditModal(!editModal);setData(item)}}/>
                <FaCalendarAlt size={22} style={{color:'brown',marginTop:'7px',cursor:'pointer'}} onClick={()=>{setScheduleModal(!scheduleModal);setId(item?._id)}}/>
                </div>
        </div>
        
        
       
        </div>
            )
          })}
    

   



      </div>
        }
  </>
   
  )
}

export default TaskList