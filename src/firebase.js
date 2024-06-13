import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

// Create a file src/firebase.config.js and write export default {your configs} inside it.
import firebaseconfig from '@/firebase.config'

export const firebaseApp = initializeApp(firebaseconfig)

const db = getFirestore(firebaseApp)

export const menuRef = collection(db, 'menu')
export const annoucementRef = collection(db, 'annoucement')
export const usersRef = collection(db, 'users')
export const ordersRef = collection(db, 'orders')