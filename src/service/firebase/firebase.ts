// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const app = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: 'AIzaSyC_F-CE9cmOYA0RRq_zokD4D4Nj7P3dsvk',
      authDomain: 'chatgpt-c41fe.firebaseapp.com',
      projectId: 'chatgpt-c41fe',
      storageBucket: 'chatgpt-c41fe.appspot.com',
      messagingSenderId: '585771640601',
      appId: '1:585771640601:web:44d9b9775cf4457a100788',
      measurementId: 'G-BFZBQ79DYX'
    });
const db = getFirestore(app);

export { db };
