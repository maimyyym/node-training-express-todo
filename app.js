const mysql = require('mysql2');
const express = require('express');
const app = express();

app.set('view engine', 'ejs')  //このコードの意味を調べる

app.use(express.urlencoded({ extended: true })); //このコードの意味を調べる

// DB接続設定
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'user',
    password: 'password',
    database: 'todo'
});

connection.connect((err) => {
    if (err) {
        console.error('DB接続エラー' + err.stack); // stackの意味を調べる
        return;
    }
    console.log('DB接続' + connection.threadId) //threadIdの意味を調べる
});


// これはエンドポイント？
// 一覧取得
app.get('/',(req, res) => {
    const sql = 'SELECT * FROM tasks';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('DB接続エラー' + err.stack); 
            return;
        }
        res.render('index', { tasks: results });
    });
});

// タスク追加
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO tasks(title) VALUES (?)'
    const title = req.body.title
    connection.query(sql, title, (err, results) => {
        if (err) {
            console.error('DB接続エラー' + err.stack); 
            return;
        }
        res.redirect('/')
    })
});

// タスク更新
app.post('/update/:id', (req, res) => {
    const sql = 'UPDATE tasks SET title = ? WHERE id = ?'
    const id = Number(req.params.id);
    const update_task = [req.body.update_title, id];
    connection.query(sql, update_task, (err, results) => {
        if (err) {
            console.error('DB接続エラー' + err.stack); 
            return;
        }
        res.redirect('/')
    });
});

// 完了フラグ更新
app.post('/done/:id', (req, res) => {
    const sql = 'UPDATE tasks SET done = ? WHERE id = ?'
    const id = Number(req.params.id);
    const done_task = [req.body.done, id];
    connection.query(sql, done_task, (err, results) => {
        if (err) {
            console.error('DB接続エラー' + err.stack); 
            return;
        }
        res.redirect('/')
    });
});

// タスク削除
app.post('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?'
    const id = Number(req.params.id);
    connection.query(sql, id, (err,results) => {
        if (err) {
            console.error('DB接続エラー' + err.stack); 
            return;
        }
        res.redirect('/') 
    });
});

//ここの意味も調べる
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
