import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOsne6sxCNVs9MqPzN1ojrGDZRtCFMzEY",
  authDomain: "my-rss-feed-c0c06.firebaseapp.com",
  databaseURL: "https://my-rss-feed-c0c06-default-rtdb.firebaseio.com",
  projectId: "my-rss-feed-c0c06",
  storageBucket: "my-rss-feed-c0c06.firebasestorage.app",
  messagingSenderId: "514252954657",
  appId: "1:514252954657:web:a912d96f50efed1a719760"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

