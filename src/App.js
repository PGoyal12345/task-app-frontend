import { TaskList } from "./components/task/TaskList";
import { TaskHeader } from "./components/task/TaskHeader";
import "./App.css";
import { useCallback, useState } from "react";
import { ajaxRequest } from "./utils";
import { METHODS } from "./constant";

function App() {

  const [taskList, setTaskList] = useState([]);

  const getTaskList = useCallback(async () => {
    try {
      const data = await ajaxRequest(`tasks`, METHODS.GET, null);
      if (data) {
        setTaskList(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, []);

  return (
    <div className="App">
      <TaskHeader getTaskList={getTaskList} />
      <TaskList taskList={taskList} getTaskList={getTaskList} />
    </div>
  );
}

export default App;
