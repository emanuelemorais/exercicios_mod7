const prisma = require('../database/prismaClient');

const newPost = async (req, res) => {
  try {

    const { title, content } = req.body;
    var authorId =  parseInt(req.userId);
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

const editPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const novosDados = req.body;
    const updatedUser = await prisma.post.update({
      where: { id },
      data : novosDados
    });

    return res.status(201).json(updatedUser);

  } catch (error) {
    console.error('Erro ao editar:', error);
    throw error;
  }
};

const deletePostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const deletedUser = await prisma.post.delete({
      where: { id }
    });

    return res.status(201).json(deletedUser);

  } catch (error) {
    console.error('Erro ao editar:', error);
    throw error;
  }
};

module.exports = {
    newPost,
    getPostById,
    editPostById,
    deletePostById
};
