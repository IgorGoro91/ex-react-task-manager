import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}


export default function TaskList() {

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks:' , tasks);

    const [searchQuery, setSearchQuery] = useState('');

    const debounceSetSearchQuery = useCallback(
        debounce(setSearchQuery, 500),[])
        

    

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? '↑' : '↓';

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const filtredAndSortedTasks = useMemo(() => {
        return [...tasks]
        .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            let comparison;

            if(sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            }else if(sortBy === 'status') {
                const statusOprions = ["To Do", "Doing", "Done"];
                const indexA = statusOprions.indexOf(a.status);
                const indexB = statusOprions.indexOf(b.status);
                comparison = indexA - indexB;

            }else if(sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                comparison = dateA - dateB;

            }
            return comparison * sortOrder;
        })

       
          
       

    },[tasks, sortBy, sortOrder, searchQuery] )

    return(
        <div className="container">
            <h1>Lista della Task</h1>

            <input 
            type="text"
             placeholder="Cerca Task"
             
             onChange={(e) => debounceSetSearchQuery(e.target.value)}
             />

            <table>
                <thead>
                     <tr>
                       <th onClick={() => handleSort('title')}>
                         Nome {sortBy === "title" && sortIcon}
                       </th>
    
                       <th onClick={() => handleSort('status')}>
                        Status {sortBy === "status" && sortIcon}
                       </th>
    
                       <th onClick={() => handleSort('createdAt')}>
                         Data di Creazione {sortBy === "createdAt" && sortIcon}
                       </th>
                     </tr>
                   </thead>

                <tbody>
                    {filtredAndSortedTasks.map(task => (
                        <TaskRow key={task.id} task={task}/>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}