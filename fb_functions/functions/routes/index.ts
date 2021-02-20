import fs from 'fs'
import express from 'express'
const indexRouter = express.Router()

fs.readdir('./routes', (err: any, files: any) => {
  if (err !== null) {
    console.error(err)
  }

  // ディレクトリ構造から router 名を取得
  files.filter((file: string): boolean => file !== 'index.ts')
    .map((file: string): string => file.split('\.')[0])
    .forEach((name: string): void => {
      indexRouter.use(`/${name}`, require(`./${name}`))
      console.log(`Route "${name}" has set.`)
    })
})


export default indexRouter
// module.exports = indexRouter
