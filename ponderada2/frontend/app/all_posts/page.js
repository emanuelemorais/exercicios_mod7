'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function Home() {

  
  const [data, setData] = useState([]);
  const { authToken } = useAuth();

  const handleNewPost = () => {
    router.push("/new_post");
  }

  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const headers = new Headers();
        headers.append('Authorization', authToken);

        const res = await fetch('http://localhost:3001/post/all/', {
          headers: headers,
        });

        if (res.ok) {
          const jsonData = await res.json();
          console.log(jsonData);
          setData(jsonData);

        } else {
          console.error('Error fetching data:', res.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchUserData();
  }, []);

 
  return (
  <div>
    <div>
      {data.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
    <button onClick={handleNewPost} >Botão</button>
    <div>
      
    </div>
  </div>  
  )
}
