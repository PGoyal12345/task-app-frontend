// external dependencies
import { useState } from "react";
import Button from "@mui/material/Button";

// internal dependencies
import { CreateAndUpdateTask } from "../common/CreateAndUpdateTask";
import { DIALOG_ACTIONS } from "../../constant";

export const TaskHeader = ({ getTaskList }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateTask = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="create-dialog-header">
      <div></div>
      <h1>Task List</h1>
      <Button
        variant="contained"
        className="create-task-button"
        onClick={handleCreateTask}
      >
        Add Task +
      </Button>
      {openDialog && (
        <CreateAndUpdateTask
          openDialog={openDialog}
          closeDialog={closeDialog}
          getTaskList={getTaskList}
          action={DIALOG_ACTIONS.CREATE}
          dialogHeading="Create your task"
        />
      )}
    </div>
  );
};
