const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore();

const request = name => {
  return db.collection(name)
}

module.exports = request