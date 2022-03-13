import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";

const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

const SignIn = () => (
  <main className="m-auto">
    <button className="p-2 m-8 shadow-xl border-solid border-2 border-slate-400 rounded-large bg-slate-600 text-white hover:bg-slate-500 hover:shadow-inner" onClick={signInWithGoogle}>
      Sign In With Google
    </button>
  </main>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  let content;

  if(user) {
    content = <Todos user={user} />
  } else {
    content = <SignIn />
  }

  return (
    <Layout>
      {content} 
    </Layout>
  )
};

export default App;
