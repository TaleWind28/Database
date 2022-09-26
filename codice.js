const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(`./Database`,sqlite3.OPEN_READWRITE,errore1());

//db.run(`CREATE TABLE personaggi(nome,livello,classe,pv,mana)`); //crea il database
const sql = `INSERT INTO personaggi (nome, livello, classe, pv, mana) VALUES(?,?,?,?,?)`;//crea una riga nel database scelto
const sqls = `SELECT * FROM personaggi`;//scorre tutto il database
const upsql = `UPDATE personaggi SET livello = ? WHERE livello = ?`;// aggiorna il valore del SET in base al valore del WHERE  
const dsql = `DELETE FROM personaggi WHERE nome = ?`//cancella dal database in base al valore del WHERE

function errore(err){if (err) return console.error(err.message);};
function errore1(err){if (err) return console.error(err.message);console.log("connection successfull")};
function errore2(err){if (err) return console.error(err.message);console.log("Personaggio Aggiunto")};

function add(nome,livello,classe,pv,mana){db.run(sql, [nome, livello, classe, pv, mana], errore2());}
function update(pc,cond,p1,p2){db.run(upsql, [p1,p2],errore());}
function del(p){db.run(dsql,p, errore())}

db.all(sqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
 });


db.close(errore());