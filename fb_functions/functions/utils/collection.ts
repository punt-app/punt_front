import * as admin from 'firebase-admin'
admin.initializeApp()
const db = admin.firestore();

export function collection(name: string) {
  return db.collection(name)
}
