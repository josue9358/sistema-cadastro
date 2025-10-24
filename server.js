const express = require('express');
const cors = require('cors');
const db = require('./database'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.post('/usuarios', (req, res) => {
  const { nome, telefone, email } = req.body;

  if (!nome || !telefone || !email) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  const query = 'INSERT INTO users (nome, telefone, email) VALUES (?, ?, ?)';
  db.run(query, [nome, telefone, email], function (err) {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err.message);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      userId: this.lastID
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
