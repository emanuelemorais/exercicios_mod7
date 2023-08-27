'use client'
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleNewUser = () => {
    router.push("/new_user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (user != '' && password != '') {
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
          router.push("/all_posts");

        } else {
          console.error('Erro no login');
          setErro("Usuário ou senha invalidos")
      }}
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  return ( 
    <main>
      
      <div className='grid place-content-center h-screen	'>
        <div className='bg-gray-300 rounded-lg px-16 py-16'>
        <h1 className='flex justify-center font-bold text-xl py-4'>Fazer Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label>Usuário</label>
            <input
              className='rounded text-sm h-8 p-1.5 my-1.5 focus:outline-none'
              type="text"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col py-2'>
            <label>Senha</label>
            <input
              className='rounded text-lg h-8 p-1.5 my-1.5 focus:outline-none'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center py-2'>
            <button type="submit" className='bg-gray-800	w-56 h-8 rounded-lg text-white font-bold transition duration-200 ease-in-out hover:scale-105 my-2'>Login</button>
          </div>
        </form>
        <div className='flex justify-center'>
        <p className='text-sm text-red-500'>{erro}</p>
        </div>
        <div className='flex justify-center pt-2'>
          <button className='underline' onClick={handleNewUser}>Cria nova conta</button>
        </div>
        </div>
      </div>


    </main>
  )
}
