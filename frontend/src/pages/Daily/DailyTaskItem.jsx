import DeleteDailyTaskButton from "./DeleteDailyTaskButton";
import UpdateDailyTaskButton from "./UpdateDailyTaskButton";

export default function DailyTaskItem({ taskData }) {
  return (
    <div className="border-light border-top border-bottom p-3 d-flex justify-content-between">
      <div className="row">
        <h6 className="pb-2 col">{taskData.title}</h6>
        <div>
          <p>{taskData.content}</p>
          {taskData.time && <p>{taskData.time}</p>}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <UpdateDailyTaskButton taskId={taskData.id} />
        <DeleteDailyTaskButton taskId={taskData.id} />
      </div>
    </div>
  );
}
