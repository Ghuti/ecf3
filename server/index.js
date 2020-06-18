import express from 'express';
import mysql from 'mysql';
var router = express.Router();

//db user et password -> mieux de le mettre dans un .env
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "ecf3",
  password: "ecf3",
  database: "ecf3"
});

// test insersion bdd
/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO articles (nom, description, reference, quantite, marques_id, categories_id) VALUES ("tout casser2", "c'est tout casser donc ça fonctionne po2", "aze78aze10", 5, 0, 0)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});*/
let article;

function query (sql) {
  return new Promise((res, rej) => {
    con.query(sql, (error, result) => {
      if (error)
        rej(error)
      else
        res(result)
    })
  })
}

async function test() {
  const result = await query("SELECT * FROM articles ");
  //console.log(result)
  return comp(result);
}

function comp(result){
  if(Array.isArray(result) && result.length) {
    article = '';
    for(var i=0; i<result.length; i++){
      article = article + `<div><h2>${result[i].nom}</h2><p>${result[i].description}</p><p>il en reste ${result[i].quantite}</p></div>`
    }
  } else {
    article =  "<div class='mt-5'>Aucune info pour le moment revener plus tard</div>"
  }
  return article;
}

//routes
router.get('/', async (req, res) => {
  
  let articles = await test();
  res.render('index', {
    title: "list d'aticle",
    test: articles
  })
})

router.get('/form-add', (req, res) => {
  res.render('form-add', {
    title: 'ajoute article',
    optionQ: '<option>1</option><option>2</option>',
    optionM: '<option>blop</option><option>blup</option>',
    optionC: '<option>TV</option><option>Son</option>',
  })
})

router.get('/form-mod', (req, res) => {
  res.render('form-mod', {
    title: 'modifier article',
    
  })
})

router.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not Found',
  })
})

module.exports = router;