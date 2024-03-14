const express = require("express");
const uuid = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.json());

//Armazenar os clientes
const clientes = [
  { id: 1, nome: "Davi Felipe", cpf: "341.473.190-84" },
  { id: 2, nome: "Rafael Bohland", cpf: "557.045.430-65" },
];

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço https://localhost:${PORT}`);
});
