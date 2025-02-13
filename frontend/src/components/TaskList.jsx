import { Spinner as BootstrapSpinner } from "react-bootstrap";

export default function TaskList({
  tasksData = [],
  Button,
  TaskItem,
  loading,
}) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <BootstrapSpinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div>
      <div className="border rounded pt-2 ">
        <div className="px-3 d-flex justify-content-between py-3 text-white">
          <h5>Your tasks</h5>
          {Button && <Button />}
        </div>
        {tasksData.map((task, index) => (
          <TaskItem taskData={task} key={index} />
        ))}
      </div>
    </div>
  );
}
