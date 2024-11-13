import React, { useState, useEffect } from 'react';
import { updateTask, deleteTask } from '../services/task';
import PrimaryButton from '../components/PrimaryButton';
import DefaultButton from '../components/defaultButton';
import Dialog from '../components/Dialog';
import { Edit } from 'lucide-react';
import DangerButton from '../components/DangerButton';
import ErrorAlert from '../components/ErrorAlert';

function TaskDetailDialog({ onSubmit, onClose, open, task }) {
  const [taskData, setTaskData] = useState();
  const [mode, setMode] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setTaskData({...task});
    setMode('detail');
  }, [task]);

  const priorityList = [
    { value: 'low', label: 'Low'},
    { value:'medium', label: 'Medium'},
    { value: 'high', label: 'High'},
  ];

  const statusList = [
    { value: 'pending', label: 'Pending'},
    { value: 'in_progress', label: 'In Progress'},
    { value: 'completed', label: 'Completed'},
  ]

  const handleUpdateTask = async () => {
    try {
      await updateTask(task.id, taskData);
    } catch (error) {
      setError(error.response.data.message);
    }
    
    onSubmit();
    onClose();
  };

  const onChangeEditMode = () => {
    setMode('edit');
  }

  const handleDeleteTask = async () => {
    await deleteTask(taskData.id);
    onSubmit();
    onClose();
  };

  return (
    <>
      <ErrorAlert open={error !== undefined} onClose={() => setError(undefined)}>{ error }</ErrorAlert>
      <Dialog open={open}>
        {
          taskData &&
          <div className='space-y-2'>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between'>
                <label>Title</label>
                {
                  mode === "detail" && ( <Edit width={18} className='cursor-pointer' onClick={onChangeEditMode}/> )
                }
              </div>
              <input
                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                type="text"
                placeholder="Task title"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                disabled={mode === 'detail'}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Description</label>
              <textarea
                className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                placeholder="Task description"
                onChange={(e) => setTaskData({...taskData, description: e.target.value })}
                disabled={mode === 'detail'}
                value={taskData.description ? taskData.description : ""}
              >
                
              </textarea>
            </div>
            <div className='flex flex-col gap-1 mb-3'>
              <label>Priority</label>
              <select 
                disabled={mode === 'detail'}
                className='bg-transparent border border-input rounded-md px-2 py-1 appearance-none bg-no-repeat focus-visible:ring-1 focus-visible:outline-none'
                style={{
                  backgroundPosition: '100%',
                  backgroundSize: '15px',
                  backgroundPositionX: '95%',
                  backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIdJREFUWIXtlDEOgCAQBP2ERP//FO2wksLnjIUUxBgDHtC4U9Hc7lzBDYMQQogHgBXwgKuQ5YANWEqGNi6CRSKWh5jlSwZHYI+DBzB/KL9nTNaAbAlzuUWiWvkXierlJRLNynMkmpe/SXQrTyTSvx1ub/PhypVIt+6z+YOE4zrXVU62EEL8lxNVtGxIXj4UwwAAAABJRU5ErkJggg==)`
                }}
                onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                value={taskData.priority}
              >
                {
                  priorityList.map((priority) => (
                    <option 
                      key={priority.label}
                      value={priority.value}
                    >
                      {priority.label}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col gap-1 mb-3'>
                <label>Status</label>
              <select 
                disabled={mode === 'detail'}
                className='bg-transparent border border-input rounded-md px-2 py-1 appearance-none bg-no-repeat focus-visible:ring-1 focus-visible:outline-none'
                style={{
                  backgroundPosition: '100%',
                  backgroundSize: '15px',
                  backgroundPositionX: '95%',
                  backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIdJREFUWIXtlDEOgCAQBP2ERP//FO2wksLnjIUUxBgDHtC4U9Hc7lzBDYMQQogHgBXwgKuQ5YANWEqGNi6CRSKWh5jlSwZHYI+DBzB/KL9nTNaAbAlzuUWiWvkXierlJRLNynMkmpe/SXQrTyTSvx1ub/PhypVIt+6z+YOE4zrXVU62EEL8lxNVtGxIXj4UwwAAAABJRU5ErkJggg==)`
                }}
                onChange={(e) => setTaskData({...taskData, status: e.target.value})}
                value={taskData.status}
              >
                {
                  statusList.map((taskStatus) => (
                    <option 
                      key={taskStatus.label}
                      value={taskStatus.value}
                    >
                      {taskStatus.label}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='text-right space-x-2'>
              <DefaultButton onClick={onClose} text="Close"/>
              {
                mode === "edit" &&
                <PrimaryButton onClick={handleUpdateTask} text="Update"/> 
              }
              {
                mode === "detail" &&
                <DangerButton onClick={handleDeleteTask} text="Delete"/> 
              }
            </div>
          </div>
        }
      </Dialog>
    </>
  )
}

export default TaskDetailDialog