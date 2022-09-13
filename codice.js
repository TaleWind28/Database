const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(`./Database`,sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);

    console.log("connection successfull");
});

//db.run(`CREATE TABLE personaggi(nome,livello,classe,pv,mana)`); crea il database
const sql = `INSERT INTO personaggi (nome, livello, classe, pv, mana) VALUES(?,?,?,?,?)`;//crea una riga nel database scelto
const sqls = `SELECT * FROM personaggi`;//scorre tutto il database e lo logga
const upsql = `UPDATE personaggi SET livello = ? WHERE livello = ?`;// aggiorna il valore del SET in base al valore del WHERE  
const dsql = `DELETE FROM personaggi WHERE pv = ?`//cancella dal database in base al valore del WHERE

//db.run(sql, ["rosso", 6, "tamer", 58, 72], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});
//db.run(sql, ["viridi", "6", "mago", 54, 72], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});
//db.run(sql, ["aranel", "6", "magus", 70, 60], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});


/*//update
db.run(upsql, [6,"6"],function (err){
    if (err) return console.error(err.message);
});
*/
/*//delete
db.run(dsql,"70", function (err){
    if (err) return console.errorr(err)
})
*/
db.all(sqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
 });


db.close((err) => {if (err) return console.error(err.message);});