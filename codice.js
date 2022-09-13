const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(`./Database`,sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);

    console.log("connection successfull");
});

//db.run(`CREATE TABLE personaggi(nome,livello,classe,pv,mana)`);
const sql = `INSERT INTO personaggi (nome, livello, classe, pv, mana) 
            VALUES(?,?,?,?,?)`;

const sqls = `SELECT * FROM personaggi`;
//db.run(sql, ["red", "6", "tamer", "58", "72"], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});
//db.run(sql, ["viridi", "6", "mago", "58", "72"], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});
//db.run(sql, ["aranel", "6", "magus", "70", "60"], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});

db.all(sqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
 });

db.close((err) => {if (err) return console.error(err.message);});