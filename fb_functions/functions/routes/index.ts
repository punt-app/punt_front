export {}

const express = require("express");
const router = express.Router()

const fs = require('fs');

fs.readdir('./routes', (err: any, files: any) => {
  if (err !== null) {
    console.error(err)
  }

  // ディレクトリ構造から router 名を取得
  files.filter((file: string): boolean => file !== 'index.js')
    .map((file: string): string => file.split('\.')[0])
    .forEach((name: string): void => {
      router.use(`/${name}`, require(`./${name}`))
      console.log(`Route "${name}" has set.`)
    })
})

module.exports = router
