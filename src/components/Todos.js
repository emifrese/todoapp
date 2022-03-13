import { Fragment, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Modal from "./UI/Modal";

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState("");

  const signOut = () => auth.signOut();

  console.log(props.user)

  const addTodo = async (data, context) => {
    const todosRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/todos`
    );
    const todosSnapshot = await getDocs(todosRef);
    //quede aca
    const todos = todosSnapshot.docs.map((snapshot) => snapshot.data());
    const exists = todos.some((todo) => todo.text === data.text);

    if (!exists) {
      await addDoc(todosRef, data);
      //  await todosRef.add(data);
    }
  };

  useEffect(() => {
    return onSnapshot(
      collection(firestore, `users/${auth.currentUser.uid}/todos`),
      (snapshot) => {
        let todosArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (todosArray.length > 1) {
          let todosSorted = todosArray.sort((a, b) =>
            a.createdAt.seconds > b.createdAt.seconds
              ? 1
              : b.createdAt.seconds > a.createdAt.seconds
              ? -1
              : 0
          );
          setTodos(todosSorted);
        } else {
          setTodos(todosArray);
        }
        // setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  }, []);

  const onSubmitTodo = (e) => {
    e.preventDefault();

    setTodo("");
    addTodo({
      text: todo,
      complete: false,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <Fragment>
      {/* <header className="m-auto w-full text-center max-h-4 z-[10]">
        <button
          className="p-2 m-8 shadow-xl border-solid border-2 border-slate-400 rounded-large bg-slate-600 text-white hover:bg-slate-500 hover:shadow-inner"
          onClick={signOut}
        >
          Sign Out
        </button>
      </header> */}
      <main className="w-full">
        <p className="w-screen text-center my-2 text-2xl text-slate-400 underline">Welcome back! {props.user.displayName}</p>
        <form onSubmit={onSubmitTodo} className='md:text-xl px-2 text-center'>
          <input
            className="bg-transparent focus:outline-none my-20 w-[300px] md:w-[600px]"
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button className="p-2 mx-2 shadow-xl border-solid border-2 border-slate-400 rounded-large bg-slate-600 text-white hover:bg-slate-500 hover:shadow-inner" type="submit">Add</button>
        </form>
        <Modal>
        {todos &&
          todos.map((todo) => {
            return (
               <Todo key={todo.id} {...todo} />
            );
          })}
          </Modal>
      </main>
      <footer>
      <button
          className="p-2 m-8 shadow-xl border-solid border-2 border-slate-400 rounded-large bg-slate-600 text-white hover:bg-slate-500 hover:shadow-inner"
          onClick={signOut}
        >
          Sign Out
        </button>
      </footer>
    </Fragment>
  );
};

const Todo = ({ id, complete, text, createdAt }) => {
  const onCompleteTodo = (id, complete) =>
    setDoc(
      doc(firestore, `users/${auth.currentUser.uid}/todos/${id}`),
      { complete: !complete },
      { merge: true }
    );
  const onDeleteTodo = (id) =>
    deleteDoc(doc(firestore, `users/${auth.currentUser.uid}/todos/${id}`));
  return (
    <div key={id} className='flex justify-between py-2'>
      <button
        className={`p-2 text-xl  ${!complete ? " " : "line-through"}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button className="text-2xl border-solid border-2 border-slate-100 rounded-circle px-4" onClick={() => onDeleteTodo(id)}>X</button>
    </div>
  );
};

export default Todos;
