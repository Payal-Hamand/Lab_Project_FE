// Firebase SDK

import { initializeApp }
from 'firebase/app'

import {
  getStorage
} from 'firebase/storage'

import {
  getAnalytics
} from 'firebase/analytics'

// Firebase Config

const firebaseConfig = {

  apiKey:
    "AIzaSyAjBrBM8OFkbR7DGJ-c2kd4wfoY4cEIRik",

  authDomain:
    "medilab-project-d2b0d.firebaseapp.com",

  projectId:
    "medilab-project-d2b0d",

  storageBucket:
"medilab-project-d2b0d.appspot.com",

  messagingSenderId:
    "277880195243",

  appId:
    "1:277880195243:web:633680173efd911fa78fee",

  measurementId:
    "G-L85BLK1DSE"

}

// Initialize Firebase

const app =
  initializeApp(firebaseConfig)

// Analytics

getAnalytics(app)

// Storage

const storage =
  getStorage(app)

export { storage }