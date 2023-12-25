import React, { useState,useEffect } from 'react'
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import { axiosInstance } from '../Axios/instanse';
const Dashboard = () => {
  const [viewTask,setViewTask] =useState(false)
  const [addModal, setAddModal] = useState(false);
  const [refresh,setRefresh]=useState(false)
  const [schedules,setSchedules]=useState([])

  // to get all schedules
  useEffect(() => {
    const getAllSchedules=async()=>{
        try {
            const response =await axiosInstance.get('api/schedule/',
            {
              headers :{
                "Content-type" :"application/json"
            }
            })
            console.log(response);
          setSchedules(response?.data?.payload)
            
          } catch (error) {
            
            
          }
    }
    getAllSchedules()

  
}, [])

// show time in calender in 12 hr 
function get12HourFormat(time) {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? 'PM' : 'AM';
  const formattedHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
  return `${formattedHour}:${minute} ${period}`;
}

// map our data accoring to calender need 
  function getScheduleList(date) {
    const filteredSchedules = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.scheduled_date);
      return (
        scheduleDate.getDate() === date.getDate() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getFullYear() === date.getFullYear()
      );
    });

    return filteredSchedules.map((schedule) => ({
      time: get12HourFormat(schedule.scheduled_time),
      title: schedule.task,
      completed:schedule.task_completed
    }));
  }
  // Calender single cell rendering function
  function renderCell(date) {
    const list = getScheduleList(date);

    if (list.length) {
      const moreCount = list.length > 2 ? list.length - 2 : 0;

      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index} className={`${item.completed ? 'bg-green-200' : 'bg-red-200'} rounded-md my-1 p-2` }>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {list.slice(0, 2).map((item, index) => (
            <li key={index} className={`${item.completed ? 'bg-green-200' : 'bg-red-200'} rounded-md my-1` }>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

 


  return (<>
  <div>
    <div className='flex justify-between'>

    
    <p className='cursor-pointer font-semibold text-btnColor text-lg my-2 mx-1 lg:mx-5 ' onClick={()=>{setViewTask(!viewTask);setRefresh(!refresh)}}>{viewTask?'View Calender' : 'View Tasks'}</p>
    {viewTask&& <>
    <p className='cursor-pointer font-semibold bg-btnColor text-white p-1 rounded-md shadow-sm text-lg mx-3 my-2 ' onClick={()=>setAddModal(!addModal)}>Add Task</p>
    </>}
    </div>
    {addModal && <AddTaskModal refresh={refresh} setRefresh={setRefresh} addModal={addModal} setaddModal={setAddModal}/>}
    {viewTask ? <TaskList refresh={refresh} setRefresh={setRefresh} addModal={addModal} setaddModal={setAddModal} /> :<Calendar  renderCell={renderCell} bordered/> }
    

  </div>
  
  
  </>
    
  )
}

export default Dashboard