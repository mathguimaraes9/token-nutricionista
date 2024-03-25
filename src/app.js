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

const tokens = [];

// Criar um novo token de um certo cliente
app.post("/api/token", (req, res) => {
  const { clienteId } = req.body;

  // Verificação se o cliente existe
  const cliente = clientes.find((c) => c.id === clienteId);
  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }

  const token = uuid.v4();

  tokens.push({ token, clienteId });

  return res.json({ token });
});

// Rota para verificar um token e obter os dados do cliente
app.post("/api/verify", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token é obrigatório." });
  }

  const foundToken = tokens.find((t) => t.token === token);

  if (!foundToken) {
    return res.status(404).json({ error: "Token inválido." });
  }

  // Encontra o cliente correspondente ao token
  const cliente = clientes.find((c) => c.id === foundToken.clienteId);

  if (!cliente) {
    return res
      .status(404)
      .json({ error: "Cliente não encontrado para o token fornecido." });
  }

  return res.json({ cliente });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});
