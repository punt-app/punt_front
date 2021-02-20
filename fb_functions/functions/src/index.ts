import * as functions from 'firebase-functions'
import path from 'path'
import express from 'express'
const app = express();

// 環境変数の呼び出し
require('./env')

// 設定ファイルの呼び出し
import configs from '../config/index'

// CORS 設定
import cors from 'cors'
app.use(cors(configs.cors))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));

// router の呼び出し
import indexRouter from '../routes/index'
app.use('/', indexRouter);

// 出力
exports.api = functions.region('asia-northeast1').https.onRequest(app);
