const express = require("express");
const { nextTick } = require("process");
const app = express();

//1. Crear un servidor con Express en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

//2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));

//3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
const usuarios = ["fran", "cristian", "daniel"];
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

/*4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado
en el servidor.*/
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const { usuario } = req.params;
  let check = false;
  usuarios.forEach((e) => {
    if (e == usuario) {
      check = true;
    }
  });
  check == true ? next() : res.sendFile(__dirname + "/assets/who.jpeg");
});
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

/*5.Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
número generado de forma aleatoria.*/
app.get("/abracadabra/conejo/:n",
  (req, res) => {
    const aleatorio = Math.floor(Math.random() * (5 - 1)) + 1;
    const numero = req.params.n;
    //console.log(numero)
    //console.log(aleatorio)
    numero == aleatorio
      ? res.sendFile(__dirname + "/assets/conejito.jpg")
      : res.sendFile(__dirname + "/assets/voldemort.jpg");
  });


app.get("/*",(req,res)=>{
    res.sendFile(__dirname + "/404.html")
})