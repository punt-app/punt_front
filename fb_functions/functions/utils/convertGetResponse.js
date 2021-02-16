const convertGetResponse = res => {
  const convertedRes = []
  res.forEach(doc => {
    convertedRes.push({
      id: doc.id,
      data: doc.data()
    })
  })
  return convertedRes
}

module.exports = convertGetResponse