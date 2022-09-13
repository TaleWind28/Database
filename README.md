# Database
  Database creato per dnd.
  Per creare un database usare db.run(`CREATE TABLE nome db(proprietà dei dati)`), per proprietà dei dati si intendono le proprietà di una classe in js
  Per aggiungere personaggi usare db.run(sql,[array contenente informazioni del pg(nome,livello,classe,hp,mana)], (err) => {if (err) return console.error(err.message); console.log( "Personaggio Aggiunto")});
  Per aggiornare un personaggio usare db.run(upsql, [parametro che si vuole cambiare, parametro che il programma deve cercare per attuare il cambiamento]
  Per cancellare un personaggio usare db.run(dsql,parametro che il programma deve cercare per eliminare il personaggio)
