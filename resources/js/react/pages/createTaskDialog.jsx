import React, { useState } from 'react';
import { createTask } from '../services/task';
import PrimaryButton from '../components/PrimaryButton';
import DefaultButton from '../components/defaultButton';
import Dialog from '../components/Dialog';
import ErrorAlert from '../components/ErrorAlert';

function CreateTaskDialog({ onSubmit, onClose, open }) {
  const defaultTask = {
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
  };
  const [newTask, setNewTask] = useState(defaultTask);
  const [error, setError] = useState();

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

  const handleCreateTask = async () => {
    
    try {
      await createTask(newTask);
    } catch (error) {
      setError(error.response.data.message);
    }

    setNewTask(defaultTask);
    onSubmit();
    onClose();
    
  };
  
  return (
    <>
      <ErrorAlert open={error !== undefined} onClose={() => setError(undefined)}>{ error }</ErrorAlert>
      <Dialog open={open}>
        <div className='space-y-2'>
          <div className='flex flex-col gap-1'>
              <label>Title</label>
            <input
              className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>Description</label>
            <textarea
              className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-1 mb-3'>
            <label>Priority</label>
            <select 
                className='bg-transparent border border-input rounded-md px-2 py-1 appearance-none bg-no-repeat focus-visible:ring-1 focus-visible:outline-none'
                style={{
                  backgroundPosition: '100%',
                  backgroundSize: '15px',
                  backgroundPositionX: '95%',
                  backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIdJREFUWIXtlDEOgCAQBP2ERP//FO2wksLnjIUUxBgDHtC4U9Hc7lzBDYMQQogHgBXwgKuQ5YANWEqGNi6CRSKWh5jlSwZHYI+DBzB/KL9nTNaAbAlzuUWiWvkXierlJRLNynMkmpe/SXQrTyTSvx1ub/PhypVIt+6z+YOE4zrXVU62EEL8lxNVtGxIXj4UwwAAAABJRU5ErkJggg==)`
                }}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
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
              className='bg-transparent border border-input rounded-md px-2 py-1 appearance-none bg-no-repeat focus-visible:ring-1 focus-visible:outline-none'
              style={{
                backgroundPosition: '100%',
                backgroundSize: '15px',
                backgroundPositionX: '95%',
                backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIdJREFUWIXtlDEOgCAQBP2ERP//FO2wksLnjIUUxBgDHtC4U9Hc7lzBDYMQQogHgBXwgKuQ5YANWEqGNi6CRSKWh5jlSwZHYI+DBzB/KL9nTNaAbAlzuUWiWvkXierlJRLNynMkmpe/SXQrTyTSvx1ub/PhypVIt+6z+YOE4zrXVU62EEL8lxNVtGxIXj4UwwAAAABJRU5ErkJggg==)`
              }}
              defaultValue={newTask.status}
              onChange={(e) => setNewTask({...newTask, status: e.target.value})}
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
            <DefaultButton onClick={onClose} text="Cancel"/>
            <PrimaryButton onClick={handleCreateTask} text={"Add"}/>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default CreateTaskDialog