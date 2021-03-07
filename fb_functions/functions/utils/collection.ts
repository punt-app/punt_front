import * as admin from 'firebase-admin'
const db = admin.firestore();

export function collection(name: string) {
  return db.collection(name)
}
