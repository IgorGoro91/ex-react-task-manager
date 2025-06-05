import {memo} from "react";



const TaskRow =  memo( ({task}) => {

    const statusClassName = task.status.replace ("", "").toLowerCase();


    

    return (
        <tr>
            <td>{task.title}</td>
            <td className={statusClassName}>{task.status}</td>

            {/* {new Date (task.createdAt).toLocaleDateString() ti permette di aplicare la data giusta  */}
            <td>{new Date (task.createdAt).toLocaleDateString()}</td> 
        </tr>
    )

})

export default TaskRow;