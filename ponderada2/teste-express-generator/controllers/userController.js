// controllers/userController.js
const prisma = require('../database/prismaClient');

const createUser = async (req, res) => {
  try {

    const { email, user, password } = req.body;

    // Cria um novo usuário no banco de dados usando o Prisma 
    const newUser = await prisma.user.create({
      data: {
        email,
        user,
        password
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
