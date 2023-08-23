'use client'
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function Home() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { authToken } = useAuth();
  

  const router = useRouter();

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
        console.log(data);
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

    <div>
    <form onSubmit={handleSubmitPost}>
        <div>
          <label>Titulo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Conteúdo</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      
    </div>
  </div>  
  )
}
