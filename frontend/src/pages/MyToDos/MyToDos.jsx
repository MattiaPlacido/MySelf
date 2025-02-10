import ToDoAddCategoryButton from "../../components/ToDoAddCategoryButton";
import ToDoAddButton from "../../components/ToDoAddButton";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const urlBackEnd = import.meta.env.API_URL;

const initialSimpleData = {
  title: "Titolo prova",
  content: "Contenuto prova",
  hasDeadLine: false,
  date: 0,
};
const initialStructuredData = {
  initialSimpleData: [],
};

export default function ToDoPage() {
  const [structuredToDos, setStructuredToDos] = useState([]);
  const [simpleToDos, setSimpleToDos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useGlobalContext();

  async function retrieveTodos(id) {
    try {
      const todoFetch = await fetch(`${urlBackEnd}/general/todos/${id}`, {
        method: "GET",
      });

      if (!todoFetch.ok) {
        throw new Error("Failed to retrieve todos. Please try again.");
      }

      const todoData = await todoFetch.json();

      const simpleTodosCopy = [];
      const structuredTodosCopy = [];

      todoData.forEach((todo) => {
        if (todo.category_id === 1) {
          simpleTodosCopy.push(todo);
        } else {
          structuredTodosCopy.push(todo);
        }
      });

      setSimpleToDos(simpleTodosCopy);
      setStructuredToDos(structuredTodosCopy);
    } catch (error) {
      console.error("Error occurred while retrieving todos:", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (userId === 0) {
      setSimpleToDos([]);
      setStructuredToDos([]);
      window.location.href = "/login";
    } else {
      retrieveTodos(userId);
    }
  }, [userId]);

  return (
    <>
      <div className="d-flex justify-content-around pt-5">
        <div className="d-flex flex-column justify-content-around text-white">
          <div className="container border p-4">
            <h5>ToDos strutturati</h5>
            {structuredToDos.map((todo, index) => (
              <div key={index}>
                <h6>{todo.title}</h6>
                <p>{todo.content}</p>
                {todo.date && (
                  <p>For : {new Date(todo.date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
          <div className="container border p-4">
            <h5>ToDos semplici</h5>
            {simpleToDos.map((todo, index) => (
              <div key={index}>
                <h6>{todo.title}</h6>
                <p>{todo.content}</p>
                {todo.date && (
                  <p>For : {new Date(todo.date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column gap-5">
          <ToDoAddButton />
          <ToDoAddCategoryButton />
        </div>
      </div>
    </>
  );
}
