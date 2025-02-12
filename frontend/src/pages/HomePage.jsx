import { useUserContext } from "../contexts/UserContext";
import TaskList from "./Tasks/TaskList";

export default function HomePage() {
  const { userId } = useUserContext();

  return (
    <>
      {userId ? (
        <>
          <h1 className="text-white">Loggato. UserId : {userId}</h1>
          <TaskList />
        </>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}
