const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function login(req, res) {
  const { user, password } = req.body;
    
  try {
    const login = await prisma.user.findUnique({
      where: {
        user: user,
      },
    });
       
    if (!login) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, login.hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ loginId : login.id }, 'secreto', { expiresIn: '1h' });
    const loginId = login.id;

    return res.json({ token, loginId });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = { login };
