import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Task = (props) => {
    return (
        <div className='flex justify-between items-center gap-2 mb-1 w-full'>
            <div className='flex gap-4 w-[80%]'>
                <input name={props.id} onClick={props.taskComplete} type="checkbox" checked={props.isCompleted} onChange={() => {}} />
                <div className={`${props.isCompleted?"line-through":""} overflow-scroll max-md:text-xs`}>{props.todo}</div>
            </div>
            <div className='flex gap-3'>
                <button onClick={()=>{props.edit(props.id)}} className='rounded-xl bg-black hover:bg-gray-900 px-3 py-2 text-xs font-bold max-md:py-1'><FaEdit/></button>
                <button onClick={()=>{props.delete(props.id)}} className='rounded-xl bg-black hover:bg-gray-900 px-3 py-2 text-xs font-bold'><MdDelete /></button>
            </div>
        </div>
    )
}

export default Task