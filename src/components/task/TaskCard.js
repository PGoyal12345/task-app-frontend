// external dependencies
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

// internal dependencies
import { getFormattedDate } from "../../utils";

export const TaskCard = ({ task, deleteTask, openEditPopUp }) => {

  return (
    <div key={task.id} className="task-card">
      <span className="moving-top">
      <IconButton
          aria-label="close"
          onClick={() => openEditPopUp(task)}
          className="box-shadow"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={() => deleteTask(task)}
          className="box-shadow"
        >
          <DeleteIcon />
        </IconButton>
      </span>
      <h2 className="task-heading">{task.taskHeading}</h2>
      <hr></hr>
      <p className="task-details">{task.task}</p>
      <div className="task-created-at-updated-at">
        <span className="task-created-at">
          Created at: {getFormattedDate(task.createdAt)}
        </span>
        <br />
        <span className="task-updated-at">
          Updated at: {getFormattedDate(task.updatedAt)}
        </span>
      </div>
    </div>
  );
};
