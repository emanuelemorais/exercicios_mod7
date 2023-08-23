'use client'
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function Home() {
  const { authToken, login } = useAuth();
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        router.push("/posts");

      } else {
        console.error('Erro no login');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };
  console.log(authToken);

  return (
    <main>
      
      <h1>Página de Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome de Usuário</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  )
}
