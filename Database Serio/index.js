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
/*
spelldb.all(spellsqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);
    });
});
*/
//classe skill che contiene le skill di base dei pg
class Skill{
    constructor(acrobatics,appraise,bluff,climb,craft,diplomacy,disable_device,disguise,escape_artist,fly,handle_animal,heal,intimidate,knowledge,linguistics,perception,perform,profession,ride,sense_motive,sleight_of_hand,spellcraft,stealth,survival,swim,use_magic_device){
        this.acrobatics = acrobatics;
        this.appraise = appraise;
        this.bluff = bluff;
        this.climb = climb;
        this.craft = craft;
        this.diplomacy = diplomacy;
        this.disable_device = disable_device;
        this.disguise = disguise;
        this.escape_artist = escape_artist;
        this.fly = fly;
        this.handle_animal  =handle_animal;
        this.heal = heal;
        this.intimidate = intimidate;
        this.knowledge = knowledge;
        this.linguistics = linguistics;
        this.perception = perception;
        this.perform = perform;
        this.profession = profession;
        this.ride = ride;
        this.sense_motive = sense_motive;
        this.sleight_of_hand = sleight_of_hand;
        this.spellcraft = spellcraft;
        this.stealth = stealth;
        this.survival = survival;
        this.swim = swim;
        this.use_magic_device = use_magic_device;
    }
}

class Statistica{
    constructor(val){
        this.val = val;
        this.mod = (val-10)/2;
    }
}
class Stat{
    constructor(forza,carisma,costituzione,intelligenza,saggezza,destrezza,bab){
        this.str = {val:forza.val,mod:forza.mod};
        this.car = {val:carisma.val,mod:carisma.mod};
        this.cost = {val:costituzione.val,mod:costituzione.mod};
        this.int = {val:intelligenza.val,mod:intelligenza.mod};
        this.wis = {val:saggezza.val,mod:saggezza.mod};
        this.dex = {val:destrezza.val,mod:destrezza.mod};
        this.ca = 10+this.dex.mod;
        this.bab = bab;
        this.cmb = this.bab+this.str.mod;
        this.cmd = this.bab+10+this.str.mod+this.dex.mod;
        this.reflex = this.cost.mod;
        this.will = this.wis.mod;
        this.fortitude = this.str.mod;
    }
}

//classe inventario che definisce l'inventario del player 
class Inventario{
    constructor(oggetti){
        this.oggetti = oggetti;
    }

    add(item){
        this.oggetti[item] = item;
        return console.log(item.nome,"aggiunto");
    }

    remove(item){
        delete this.oggetti[item];
        return console.log(item.nome,"rimosso");
    }
}

//classe item che identifica un oggetto da poter aggiungere nell'inventario
class Item{
    constructor(bonus,descrizione){
        this.bonus = bonus;
        this.descrizione = descrizione;
    }
}

//classe vita che identifica la vita del player
class Vita{
    constructor(max){
        this.max = max;
        this.current = max;
    }
}

//classe Magia che identifica il mana del player
class Magia{
    constructor(max){
        this.max = max;
        this.current = max;
    }
}

rfor = new Statistica(14);
rcost = new Statistica(16);
rwis = new Statistica(16);
rint = new Statistica(16);
rdex = new Statistica(16);
rchar = new Statistica(22);

rstat = new Stat(rfor,rchar,rcost,rint,rwis,rdex,3);

//Database Personaggi
const db = new sqlite3.Database(`./Database`,sqlite3.OPEN_READWRITE,errore1());
//db.run(`CREATE TABLE personaggi(nome,razza,classe,livello,inventario,stat,skill,sig,spell,hp,mana,traits)`);// crea il database
const sql = `INSERT INTO personaggi (nome,razza,classe,livello,inventario,stat,skill,sig,spell,hp,mana,traits) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;//crea una riga nel database scelto
const sqls = `SELECT * FROM personaggi`;//scorre tutto il database
const upsql = `UPDATE personaggi SET livello = ? WHERE livello = ?`;// aggiorna il valore del SET in base al valore del WHERE  
const dsql = `DELETE FROM personaggi WHERE razza = ?`//cancella dal database in base al valore del WHERE

function add(nome,razza,classe,livello,inventario,stat,skill,sig,spell,hp,mana,traits){db.run(sql, [nome,razza,classe,livello,inventario,stat,skill,sig,spell,hp,mana,traits], errore2());}
function update(p1,p2){db.run(upsql, [p1,p2],errore());}
function del(p){db.run(dsql,p, errore())}
//add("red","umano","tamer",6,{},rstat,{},{},{},53,77,"osservato dalla dea dei draghi")
//mostra tutti i personaggi
db.all(sqls,[],(err,rows)=>{
    if (err) return console.errorr(err.message);
    rows.forEach(element => {
        console.log(element);// è possibile usare questo for per vedere le singole proprietà dei personaggi in tabella
    });
});

console.log(rstat.rfor)
console.log("stat")
spelldb.close(errore());
db.close(errore());