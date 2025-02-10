import { useGlobalContext } from "../contexts/GlobalContext";

export default function HomePage() {
  const { userId } = useGlobalContext();

  return (
    <>
      {userId !== 0 ? (
        <h1 className="text-white">Loggato. UserId : {userId} </h1>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}
