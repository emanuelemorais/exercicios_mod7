'use client'
import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Home() {

  const [data, setData] = useState([]);

  const { authToken } = useAuth();
  console.log("teste");
  console.log(authToken); //por que isso está vindo vazio?

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

  console.log(authToken);

  return <div>
    {data.map(post => (
      <p key={post.id}>{post.title}</p>
    ))}
  </div>
}
