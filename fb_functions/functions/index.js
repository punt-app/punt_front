const functions = require("firebase-functions");
const express = require("express");
const app = express();
const path = require('path');

// 設定ファイルの呼び出し
const configs = require('./config/index')

// CORS 設定
const cors = require('cors')
app.use(cors(configs.cors))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));

// router の呼び出し
const indexRouter = require('./routes/index.js')
app.use('/', indexRouter);

// 出力
exports.api = functions.region('asia-northeast1').https.onRequest(app);