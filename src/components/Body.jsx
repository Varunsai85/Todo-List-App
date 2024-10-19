import React, { useState, useRef, useEffect } from 'react'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid';


const Body = () => {
    const focRef = useRef()
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [finish, setFinish] = useState(false)

    const handleFinish = () => {
        setFinish(!finish)
    }

    useEffect(() => {
        let taskString = localStorage.getItem("tasks")
        if (taskString) {
            let tasks = JSON.parse(localStorage.getItem("tasks"))
            setTodos(tasks)
        }
    }, [])


    const handleEdit = (id) => {
        let t = todos.filter(item => {
            return item.id === id
        })
        setTodo(t[0].todo)
        handleDelete(id)
        savetoLS()
    }
    const savetoLS = () => {
        localStorage.setItem('tasks', JSON.stringify(todos))
    }

    const handleDelete = (id) => {
        let newTods = todos.filter(item => {
            return item.id !== id;
        })
        setTodos(newTods)
        savetoLS()
    }
    const handleSave = () => {
        if (todo.length != 0) {
            setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
            setTodo("")
            focRef.current.focus()
        }
        savetoLS()
    }
    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    const handleComplete = (e) => {
        let id = e.target.name
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos)
        savetoLS()
    }
    return (
        <main className='bckg w-[40%] mx-auto m-3 rounded-lg shadow-md shadow-black h-[90vh] p-4 overflow-scroll max-md:w-[95%]'>
            <div className="bckg sticky top-0">
                <h1 className='text-center font-extrabold text-3xl max-md:text-xl mb-2'>Manage your Tasks</h1>
                <h2 className='font-semibold max-md:text-xs'>Add a Task</h2>
                <div className="entry flex flex-col my-2 gap-3">
                    <input autoFocus ref={focRef} onChange={handleChange} value={todo} className='rounded-2xl text-black px-2 py-4 w-full max-md:py-3' type="text" />
                    <button onClick={handleSave} disabled={todo.length <= 0} className='rounded-2xl px-4 py-2 bg-black hover:bg-gray-900 text-sm font-bold disabled:bg-slate-300 disabled:text-black max-md:py-1 max-md:text-xs'>Save</button>
                </div>
                <div className='flex gap-2 items-center'>
                    <input className='max-md:size-3' onClick={handleFinish} type="radio" checked={finish} onChange={() => {}}/>
                    <div className='max-md:text-xs'>Show Finished Tasks</div>
                </div>
                <hr className='my-2 mb-5 w-5/6 mx-auto' />
            </div>
            {todos.length == 0 ? <div className='font-bold text-shadow w-full text-center'>No Tasks in Queue</div> :
                todos.map(item => {
                    return (finish || !item.isCompleted) && <Task key={item.id} id={item.id} todo={item.todo} taskComplete={handleComplete} isCompleted={item.isCompleted} edit={() => { handleEdit(item.id) }} delete={() => { handleDelete(item.id) }} />
                })
            }
        </main>
    )
}

export default Body
