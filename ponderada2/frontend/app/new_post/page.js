'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function newPost() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { authToken, isUserAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    isUserAuthenticated() ? console.log("ok") : router.push("/");
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try{

      const headers = new Headers();
      headers.append('Authorization', authToken);
      headers.append('Content-Type', 'application/json');
      console.log(authToken);

      const res = await fetch('http://localhost:3001/post/new', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title, content })
      });

      if (res.ok) {
        const data = await res.json();
        router.push("/all_posts");

      } else {
        console.error('Erro no post');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
  <div>

    <div className='grid place-content-center h-screen'>
    <div className='bg-gray-300 rounded-lg px-16 py-16'>
    <h1 className='flex justify-center font-bold text-xl py-4'>Criar nova nota</h1>
    <form onSubmit={handleSubmitPost}>
        <div className='flex flex-col py-2 w-96'>
          <label className='font-bold'>Titulo</label>
          <input
            className='rounded text-sm h-8 p-1.5 my-1.5 focus:outline-none'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='font-bold'>Conteúdo</label>
          <textarea
            className='rounded text-sm h-64 p-1.5 my-1.5 focus:outline-none'
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
        className='bg-gray-800  w-full h-8 rounded-lg text-white font-bold transition duration-200 ease-in-out hover:scale-105 my-2'
         type="submit">Enviar</button>
      </form>
      
    </div>
    </div>
  </div>  
  )
}
