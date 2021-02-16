const express = require("express");
const router = express.Router()

const fs = require('fs');

fs.readdir('./routes', (err, files) => {
  if (err !== null) {
    console.error(err)
  }

  // ディレクトリ構造から router 名を取得
  files.filter(file => file !== 'index.js')
    .map(file => file.split('\.')[0])
    .forEach(name => {
      router.use(`/${name}`, require(`./${name}`))
      console.log(`Route "${name}" has set.`)
    })
})

module.exports = router
