import { useUserContext } from "../contexts/UserContext";
import TaskList from "../components/TaskList";

export default function HomePage() {
  const { userId } = useUserContext();

  return (
    <>
      {userId !== 0 ? (
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
