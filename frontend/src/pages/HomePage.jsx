import { useUserContext } from "../contexts/UserContext";
import { useGeneralContext } from "../contexts/GeneralContext";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

export default function HomePage() {
  const { userId } = useUserContext();
  const { userTasks, status } = useGeneralContext();
  const { tasks } = userTasks;
  const { loading } = status;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <BootstrapSpinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <>
      {userId !== 0 ? (
        <>
          <h1 className="text-white">Loggato. UserId : {userId}</h1>
          <div className="container border p-4 text-white">
            <h5>Your tasks</h5>
            {tasks.map((task, index) => (
              <div key={index}>
                <h6>{task.title}</h6>
                <p>{task.content}</p>
                {task.date && (
                  <p>For : {new Date(task.date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}
