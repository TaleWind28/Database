//Database Spell
const sqlite3 = require("sqlite3").verbose();
function errore(err){};
function errore1(err){console.log("connection successfull")};
function errore2(err){console.log("Personaggio Aggiunto")};
const spelldb = new sqlite3.Database(`./Spellist`,sqlite3.OPEN_READWRITE,errore1());
//spelldb.run(`CREATE TABLE spell(nome,livello,elemento,costo,effetto,danni)`);// crea il database
const spellsql = `INSERT INTO spell(nome,livello,elemento,costo,effetto,danni) VALUES(?,?,?,?,?,?)`;//crea una riga nel database scelto
const spellsqls = `SELECT * FROM spell`;//scorre tutto il database
const spellupsql = `UPDATE spell SET livello = ? WHERE livello = ?`;// aggiorna il valore del SET in base al valore del WHERE  
const spelldsql = `DELETE FROM spell WHERE nome = ?`//cancella dal database in base al valore del WHERE


function addspell(nome,livello,elemento,costo,effetto,danni){spelldb.run(spellsql, [nome,livello,elemento,costo,effetto,danni], errore2());}
function updatespell(pc,cond,p1,p2){spelldb.run(spellupsql, [p1,p2],errore());}
function delspell(p){spelldb.run(spelldsql,p, errore())}
/*
addspell("individuazione del magico",0,"tutti",1,"chiedere al master","nessuno")
addspell("individuazione del veleno",0,"tutti",1,"chiedere al master","nessuno")
addspell("lettura del magico",0,"tutti",1,"chiedere al master","nessuno")
addspell("aprire/chiudere",0,"tutti",1,"Si apre o chiude una porta,un forziere o un qualsiasi contenitore","nessuno")
addspell("mano magica",0,"tutti",2,"Puntando il dito verso un oggetto,si può sollevarlo e muoverlo a distanza a piacimento. Come azione di movimento, si può spostarlo fino a 4,5 metri in qualsiasi direzione","nessuno")
addspell("sigillo arcano",0,"tutti",1,"Questo incantesimo permette di scrivere la runa o il sigillo personale, purché non sia composto da più di 6 caratteri","nessuno")
*/
/*
addspell("allarme",1,"tutti",5,"chiedere al master","nessuno");
addspell("allarme invisibilità",1,"tutti",6,"chiedere al master","nessuno");
addspell("blocca porte",1,"tutti",5,"chiedere al master","nessuno");
addspell("interdizione del furto",1,"tutti",5,"chiedere al master","nessuno");
addspell("legame di pace",1,"tutti",5,"chiedere al master","nessuno");
addspell("linea nella sabbia",1,"tutti",7,"chiedere al master","nessuno");
addspell("scudo",1,"tutti",10,"chiedere al master","nessuno");
addspell("colpo accurato",1,"tutti",8,"chiedere al master","nessuno");
addspell("identificare",1,"tutti",7,"chiedere al master","nessuno");
addspell("vedere allineamento",1,"tutti",5,"chiedere al master","nessuno");
addspell("armatura magica",1,"tutti",10,"chiedere al master","nessuno");
addspell("bolla d'aria",1,"tutti",5,"chiedere al master","nessuno");
addspell("buchetta",1,"tutti",5,"chiedere al master","nessuno");
addspell("scudo di pietra",1,"tutti",10,"chiedere al master","nessuno");
addspell("dardo incantato",1,"tutti",6,"chiedere al master","nessuno");
addspell("disco fluttuante",1,"tutti",5,"chiedere al master","nessuno");
addspell("mani brucianti",1,"fuoco",6,"Ogni creatura nell’area delle fiamme subisce 1d4 danni da fuoco per livello dell’incantatore (massimo 5d4)","1d4*liv");
addspell("stretta folgorante",1,"elettricità",9,"Un attacco di contatto in mischia compiuto con successo infligge 1d6 danni da elettricità per livello dell'incantatore (massimo 5d6). Quando si scarica l'energia, si ottiene bonus +3 al Tiro per Colpire se l'avversario sta indossando un'armatura di metallo (o se sta trasportando un'arma di metallo).","1d6 * livello");
addspell("alterare venti",1,"tutti",5,"chiedere al master","nessuno");
addspell("caduta morbida",1,"tutti",5,"chiedere al master","nessuno");
*/

//mostra tutte le spell
spelldb.all(spellsqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
});


//Database Personaggi

const db = new sqlite3.Database(`./Database`,sqlite3.OPEN_READWRITE,errore1());
//db.run(`CREATE TABLE personaggi(nome,livello,classe,inventario,stat,hp,mana,spell,traits,skill,specials)`);// crea il database
const sql = `INSERT INTO personaggi (nome,livello,classe,inventario,stat,hp,mana,spell,traits,skill,specials) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;//crea una riga nel database scelto
const sqls = `SELECT * FROM personaggi`;//scorre tutto il database
const upsql = `UPDATE personaggi SET livello = ? WHERE livello = ?`;// aggiorna il valore del SET in base al valore del WHERE  
const dsql = `DELETE FROM personaggi WHERE nome = ?`//cancella dal database in base al valore del WHERE

function add(nome,livello,classe,pv,mana){db.run(sql, [nome, livello, classe, pv, mana], errore2());}
function update(pc,cond,p1,p2){db.run(upsql, [p1,p2],errore());}
function del(p){db.run(dsql,p, errore())}

//mostra tutti i personaggi
db.all(sqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
});

spelldb.close(errore());
db.close(errore());