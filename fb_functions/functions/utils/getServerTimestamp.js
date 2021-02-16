const admin = require('firebase-admin')

const getServerTimestamp = () => {
  return admin.firestore.FieldValue.serverTimestamp()
}

module.exports = getServerTimestamp