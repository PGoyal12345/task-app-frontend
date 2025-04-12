// external dependencies
import { useEffect, useState } from "react";

// internal dependencies
import { TaskCard } from "./TaskCard";
import { DIALOG_ACTIONS } from "../../constant";
import { CreateAndUpdateTask } from "../common/CreateAndUpdateTask";
import { ConfirmPopUp } from "../common/ConfirmPopUp";

export const TaskList = ({ taskList, getTaskList }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [task, setTask] = useState({});

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  const deleteTask = async (task) => {
    setTask(task);
    setIsDeletePopUpOpen(true);
  };

  const openEditPopUp = (task) => {
    setIsPopUpOpen(true);
    setTask(task);
  };

  const closeDialog = () => {
    setIsPopUpOpen(false);
    setIsDeletePopUpOpen(false);
  };

  return (
    <div className="task-parent">
      {taskList.length ? (
        taskList.map((task) => {
          return (
            <TaskCard
              task={task}
              deleteTask={deleteTask}
              openEditPopUp={openEditPopUp}
              key={task.id}
            />
          );
        })
      ) : (
        <h1 className="no-task-found">No task found</h1>
      )}
        
      {isPopUpOpen && (
        <CreateAndUpdateTask
          openDialog={isPopUpOpen}
          closeDialog={closeDialog}
          getTaskList={getTaskList}
          action={DIALOG_ACTIONS.UPDATE}
          dialogHeading="Update your task"
          taskDetails={task}
        />
      )}

      {isDeletePopUpOpen && (
        <ConfirmPopUp
          openDialog={isDeletePopUpOpen}
          closeDialog={closeDialog}
          dialogHeading="Delete task"
          dialogDescription="Are you sure you want to delete this task?"
          action={DIALOG_ACTIONS.DELETE}
          task={task}
          getTaskList={getTaskList}
        />
      )}
    </div>
  );
};
