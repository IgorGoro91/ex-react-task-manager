import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";


export default function TaskList() {

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks:' , tasks);

    return(
        <div className="container">
            <h1>Lista della Task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>data di Creazione</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task}/>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}