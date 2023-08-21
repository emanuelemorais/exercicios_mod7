// controllers/userController.js
const prisma = require('../database/prismaClient');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {

    const { email, user, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Cria um novo usuário no banco de dados usando o Prisma 
    const newUser = await prisma.user.create({
      data: {
        email,
        user,
        hashedPassword
      },
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};


module.exports = {
  createUser,
};
