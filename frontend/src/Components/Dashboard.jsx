import React, { useState } from 'react'
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';

const Dashboard = () => {
  const [viewTask,setViewTask] =useState(false)
  const [addModal, setAddModal] = useState(false);
  const [refresh,setRefresh]=useState(false)

  return (<>
  <div>
    <div className='flex justify-between'>

    
    <p className='cursor-pointer font-semibold text-btnColor text-lg my-2 mx-1 lg:mx-5 ' onClick={()=>setViewTask(!viewTask)}>{viewTask?'View Calender' : 'View Tasks'}</p>
    {viewTask&& <>
    <p className='cursor-pointer font-semibold bg-btnColor text-white p-1 rounded-md shadow-sm text-lg mx-3 my-2 ' onClick={()=>setAddModal(!addModal)}>Add Task</p>
    </>}
    </div>
    {addModal && <AddTaskModal refresh={refresh} setRefresh={setRefresh} addModal={addModal} setaddModal={setAddModal}/>}
    {viewTask ? <TaskList refresh={refresh} setRefresh={setRefresh} addModal={addModal} setaddModal={setAddModal} /> :<Calendar bordered/> }
    

  </div>
  
  
  </>
    
  )
}

export default Dashboard