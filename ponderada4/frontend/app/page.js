'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';


const Home = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const fetchLogin = async () => {
        try {
            if (email === '' || password === '') {
                alert('Preencha todos os campos');
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/users/login',
            {
                email: email,
                password: password
            }
            );

            if(response.status === 200){
                Cookies.set('token', response.data);
                console.log(response)
                router.push('/dashboard');
                return
            }

        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
          alert("Credenciais inválidas")
        }
      };


    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-1/4 h-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">Login</h1>
                <div className="my-4">
                    <p className="mt-4 mb-1">Email</p>
                    <input type='text' placeholder="Email" className="border rounded-md p-2 h-8 w-full" onChange={(e)=>setEmail(e.target.value)}/>

                    <p className="mt-4 mb-1">Senha</p>
                    <input type='password' placeholder="Senha" className="border rounded-md p-2 h-8 w-full" onChange={(e) => setPassword(e.target.value)}/>

                    <button 
                    onClick={fetchLogin}
                    className="w-full h-10 bg-blue-950 hover:scale-95 text-white font-bold rounded-md duration-300 ease-in-out mt-6">Entrar</button>
                </div>
                
            </div>
        </div>
    );
};

export default Home;
