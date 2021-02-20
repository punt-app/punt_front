import * as admin from 'firebase-admin'

export function getServerTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp()
}
