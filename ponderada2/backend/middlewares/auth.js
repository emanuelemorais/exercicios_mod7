const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto');

    // Verificar se o token foi gerado pela sua aplicação (use sua própria lógica de verificação)
    if (!decodedToken) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.userId = decodedToken.loginId; // Passar o ID do login para o próximo middleware
    next();
    
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authenticateToken;
