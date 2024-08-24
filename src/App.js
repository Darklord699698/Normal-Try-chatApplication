import React from 'react';
import './App.css';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCldXtnYGKse4-57XaQc4aEtbRNJJzo3rE",
  authDomain: "superchat-4b465.firebaseapp.com",
  projectId: "superchat-4b465",
  storageBucket: "superchat-4b465.appspot.com",
  messagingSenderId: "528202705595",
  appId: "1:528202705595:web:22f7fdac0596c90e40579e",
  measurementId: "G-3CMF760LQ2"
})

const auth=firebase.auth();
const firestore=firebase.firestore();

function App() {
  const [user]=useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
    
      </header>
      <section>
        {user? <ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}
function SignIn(){

  const signInWithGoogle=()=>{
    const provider=new  firebase.auth.GoogleAuthProvider();
    auth.signInWithGoogle(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
function SignOut(){

  return auth.currentUser &&(

    <button onClick={()=>auth.SignOut()}>Sign Out</button>
  )
}
function ChatRoom(){
  const messageRef=firestore.collection('messages');
  const query=messageRef.orderBy('createdAt').limit(25);
  const [messages]=useCollectionData(query,{idField:'id'});
  return(
    <>
    <div>
      {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg} />)}
    </div>
    <form>
      
    </form>
    </>
  )
}
function ChatMessage(props){
  const {text,uid,photoURL}=props.message;
  const messageClass=uid===auth.currentUser.uid ? 'sent':'received';
  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}
export default App;
