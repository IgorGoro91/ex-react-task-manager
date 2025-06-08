import { useState, useRef } from 'react';
import Modal from './Modal';


export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [ editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();

    const changeEditTask = (key, event ) => {
        setEditedTask(prev => ({
            ...prev,
            [key]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedTask);
    }


    const { title, description, status } = editedTask;

    return(
        <Modal
        title="Modifica Task"
        content={
            <form ref={editFormRef} onSubmit={handleSubmit} > 
               <label>
                    Nome Task:
                    <input
                    type='text'
                    value={title}
                    onChange={(e) => changeEditTask('title', e)}
                    />
               </label> 

               <label>
                    Descrizione Task:
                    <textarea
                    value={description}
                    onChange={(e) => changeEditTask('description', e)}
                    />


               </label>

               <label>
                Stato:
                <select
                value={status}
                onChange={(e) => changeEditTask('status', e)}
                >
                   {["To Do", "Doing", "Done"].map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                ))}
                </select>
               
               </label>


             </form>

            
        }
        confirmText='Salva Modifiche'
        show={show}
        onClose={onClose}
        onConfirm={() => editFormRef.current.requestSubmit() }
        />
    )
    
}