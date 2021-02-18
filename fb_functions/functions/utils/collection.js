const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore();

const collection = name => {
  return db.collection(name)
}

module.exports = collection