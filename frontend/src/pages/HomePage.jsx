import { useUserContext } from "../contexts/UserContext";

export default function HomePage() {
  const { userId } = useUserContext();

  return (
    <>
      {userId ? (
        <>
          <h1 className="text-white">Loggato. UserId : {userId}</h1>
        </>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}
