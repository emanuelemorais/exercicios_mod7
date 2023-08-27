'use client'
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function newUser() {

    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();

  const handleSubmitNewUser = async (e) => {
    e.preventDefault();

    try{

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      if (user != '' && email != '' && password != ''){

      const res = await fetch('http://localhost:3001/users/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, user, password })
      }); 

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        router.push("/");

      } else {
        console.error('Erro no post');
      }}

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
  <div>

    <div className='grid place-content-center h-screen	'>
    <div className='bg-gray-300 rounded-lg px-16 py-16'>
    <h1 className='flex justify-center font-bold text-xl py-4'>Criar nova conta</h1>
      <form onSubmit={handleSubmitNewUser}>
        <div className='flex flex-col py-2'>
            <label>Email</label>
            <input
              className='rounded text-sm h-8 p-1.5 my-1.5 focus:outline-none'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col py-2'>
            <label>User</label>
            <input
              className='rounded text-sm h-8 p-1.5 my-1.5 focus:outline-none'
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className='flex flex-col py-2'>
            <label>Password</label>
            <input
              className='rounded text-sm h-8 p-1.5 my-1.5 focus:outline-none'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
          className='bg-gray-800	w-56 h-8 rounded-lg text-white font-bold transition duration-200 ease-in-out hover:scale-105 my-2'
          type="submit">Enviar</button>
        </form>
      
    </div>
    </div>
  </div>  
  )
}
