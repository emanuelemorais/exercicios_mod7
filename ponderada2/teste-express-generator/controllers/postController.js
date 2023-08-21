const prisma = require('../database/prismaClient');

const newPost = async (req, res) => {
  try {

    const { title, content, authorId } = req.body;

    // Cria um novo usuário no banco de dados usando o Prisma 
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId
      },
    });

    return res.status(201).json(newPost);

  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};

const getPostById = async (req, res) => {
    try {
        var authorId =  parseInt(req.userId);
        const posts = await prisma.post.findMany({
            where: {
              authorId: authorId
            }
          });
      
        return res.status(201).json(posts);

        } catch (error) {
          console.error('Erro ao obter post:', error);
          throw error;
        }
};

module.exports = {
    newPost,
    getPostById
};
