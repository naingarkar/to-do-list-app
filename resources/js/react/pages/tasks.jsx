import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/task';
import CreateTaskDialog from './createTaskDialog';
import TaskDetailDialog from './taskDetailDialog';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [openTaskDetailModal, setOpenTaskDetailModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data.data);
    };

    const initiateNewTask = () => {
      openCreateModal();
    }

    const openCreateModal = () => {
      setOpenCreateTaskModal(true);
    }

    const closeCreateModal = () => {
      setOpenCreateTaskModal(false);
    }

    const openDetailModal = () => {
      setOpenTaskDetailModal(true);
    }

    const closeDetailModal = () => {
      setOpenTaskDetailModal(false);
    }

    const showTaskDetail = (task) => {
      setSelectedTask(task);
      openDetailModal();
    }

    return (
        <div className='p-3'>
          
          <CreateTaskDialog onSubmit={fetchTasks} onClose={closeCreateModal} open={openCreateTaskModal}/>
          {
            selectedTask && (
              <TaskDetailDialog onSubmit={fetchTasks} onClose={closeDetailModal} open={openTaskDetailModal} task={selectedTask}/>
            )
          }
          <div className='flex justify-end'>
            <button 
              className='bg-black text-white px-5 py-1 hover:bg-stone-700 rounded-lg mb-2'
              onClick={initiateNewTask}
            >
              + Add New Task
            </button>
          </div>
          <div className='grid md:grid-cols-3 gap-1'>
            <div className='bg-black rounded-lg text-white py-3 px-2'>
              <h2 className='px-3'>To Do</h2>
                <div className='my-3 space-y-1 max-h-72 overflow-scroll no-scrollbar'>
                {
                  tasks.filter((item) => item.status === 'pending').map((task) => (
                    <div 
                      key={task.id}
                      className='bg-slate-800 text-slate-300 p-3 rounded-lg cursor-pointer'
                      onClick={() => showTaskDetail(task)}
                    >
                      <h2>{task.title}</h2>
                      {/* <p>{task.description}</p> */}
                      {/* <button onClick={() => handleUpdateTask(task.id, { status: 'completed' })}>
                          Mark as Completed
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                    </div>
                  ))
                }
                </div>
              
            </div>
            <div className='bg-black rounded-lg text-white py-3 px-2'>
              <h2 className='px-3'>In Progress</h2>
                <div className='my-3 space-y-1 max-h-72 overflow-scroll no-scrollbar'>
                {
                  tasks.filter((item) => item.status === 'in_progress').map((task) => (
                    <div 
                      key={task.id}
                      className='bg-slate-800 text-slate-300 p-3 rounded-lg cursor-pointer'
                      onClick={() => showTaskDetail(task)}
                    >
                      <h2>{task.title}</h2>
                      {/* <p>{task.description}</p> */}
                      {/* <button onClick={() => handleUpdateTask(task.id, { status: 'completed' })}>
                          Mark as Completed
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                    </div>
                  ))
                }
                </div>
              
            </div>
            <div className='bg-black rounded-lg text-white py-3 px-2'>
              <h2 className='px-3'>Completed</h2>
                <div className='my-3 space-y-1 max-h-72 overflow-scroll no-scrollbar'>
                {
                  tasks.filter((item) => item.status === 'completed').map((task) => (
                    <div 
                      key={task.id}
                      className='bg-slate-800 text-slate-300 p-3 rounded-lg cursor-pointer'
                      onClick={() => showTaskDetail(task)}
                    >
                      <h2>{task.title}</h2>
                      {/* <p>{task.description}</p> */}
                      {/* <button onClick={() => handleUpdateTask(task.id, { status: 'completed' })}>
                          Mark as Completed
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                    </div>
                  ))
                }
                </div>
              
            </div>
          </div>
        </div>
    );
}

export default TaskList;