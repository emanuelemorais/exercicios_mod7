'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function allPosts() {

  const [data, setData] = useState([]);
  const { authToken, isUserAuthenticated } = useAuth();

  // useEffect(() => {
  //   console.log(isUserAuthenticated())
  //   isUserAuthenticated() ? console.log("ok") : router.push("/");
  // }, []);

  const handleNewPost = () => {
    if (authToken){
      router.push("/new_post");
    }
  }

  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const headers = new Headers();
        headers.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoxLCJpYXQiOjE2OTMxNjk2MjQsImV4cCI6MTY5MzE3MzIyNH0.WggoXuU4jJnZqFwYS8Ng-3EISwf_YU4-1wfOO6Ym7E8');
        console.log(authToken);

        const res = await fetch('http://localhost:3001/post/all/', {
          headers: headers,
        });

        if (res.ok) {
          const jsonData = await res.json();
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
    <div className='flex items-center justify-between w-screen h-16 shadow-2xl'>
      <div className='mx-12'>
        <p className='font-bold text-xl text-gray-700'>  MyNotes! </p>
      </div>
      <div>
        <button 
        className=' bg-gray-700 text-white text-4xl rounded-lg w-12 mx-12 transition duration-200 ease-in-out hover:scale-105'
        onClick={handleNewPost}>
          +</button>
      </div>
    </div>
    <div className='grid grid-cols-4'>
    {data.map(post => (
        <div className='bg-gray-300 m-4 p-4 rounded-md' key={post.id}>
          <p className='font-bold my-2'>{post.title}</p>
          <p className='text-sm'>{post.content}</p>
        </div>
      ))}
    </div>
    
    <div>
      
    </div>
  </div>  
  )
}
