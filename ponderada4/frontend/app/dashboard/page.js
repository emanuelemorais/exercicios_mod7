'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { parse } from 'postcss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip
);

const Dashboard = () => {

    const [gravidade, setGravidade] = useState([]);
    const [acidente, setAcidente] = useState([]);
    const [ocorrencia, setOcorrencia] = useState([]);

    const [previsaoOcorrencia, setPrevisaoOcorrencia] = useState(0);
    const [previsaoAcidente, setPrevisaoAcidente] = useState(0);
    const [previsaoSentido, setPrevisaoSentido] = useState(0);

    const [respostaPrevisao, setRespostaPrevisao] = useState('');

    const router = useRouter();
    
    const handleGraph = async () => {
      
        if (Cookies.get('token') == ''){
          router.push('/');
        }
        try {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/dados', {
              headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
              }
            }
             );

            console.log(response)

            if (!response.data){
              return
            }

            let lista_ocorrencia = []
            response.data.map((item) => { lista_ocorrencia.push(item.tipo_ocorrencia_quant) });
            setOcorrencia(lista_ocorrencia);

            let lista_acidente = []
            response.data.map((item) => { lista_acidente.push(item.tipo_acidente_quant) });
            setAcidente(lista_acidente);

            let lista_gravidade = []
            response.data.map((item) => { lista_gravidade.push(item.gravidade) });
            setGravidade(lista_gravidade);
            
            return response

        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
        }
      };

    const handlePredict = async () => {
      try {
          const response = await axios.post('http://127.0.0.1:8000/dashboard/prediction', {
            "tipo_acidente_quant": previsaoAcidente,
            "tipo_ocorrencia_quant": previsaoOcorrencia,
            "sentido_quant": previsaoSentido
          }
            );
          console.log(response.data.gravidade)

          if (response.data.gravidade == 0){
            setRespostaPrevisao("Grave")
          }
          if (response.data.gravidade == 1){
            setRespostaPrevisao("Leve")
          }
          if (response.data.gravidade == 2){
            setRespostaPrevisao("Moderado")
          }   
          if (response.data.gravidade == 3){
            setRespostaPrevisao("Significativo")
          }
          return response

      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

      const graph_ocorrencia = {
        labels: ['Com vítimas', 'Sem vítimas', 'Danos materias'],
        datasets: [
          {
            label: 'Quantidade de ocorrências',
            data: [(ocorrencia.filter((item) => item === 0)).length, (ocorrencia.filter((item) => item === 2)).length, (ocorrencia.filter((item) => item === 1)).length],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const graph_acidente = {
        labels: ['Abalroamento', 'Atropelamento', 'Capotamento', 'Choques com objetos', 'Colisão', 'Engavetamento', 'Outros', 'Queda', 'Saida de pista', 'Tombamento'],
        datasets: [
          {
            label: 'Quantidade de acidentes',
            data: [(acidente.filter((item) => item === 0)).length, (acidente.filter((item) => item === 1)).length, (acidente.filter((item) => item === 2)).length, (acidente.filter((item) => item === 3)).length, (acidente.filter((item) => item === 4)).length, (acidente.filter((item) => item === 5)).length, (acidente.filter((item) => item === 6)).length, (acidente.filter((item) => item === 7)).length, (acidente.filter((item) => item === 8)).length, (acidente.filter((item) => item === 9)).length],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const graph_gravidade = {
        labels: ['Grave', 'Leve', 'Moderado', 'Significativo'],
        datasets: [
          {
            label: 'Previsões realizadas',
            data: [(gravidade.filter((item) => item === 0)).length, (gravidade.filter((item) => item === 1)).length, (gravidade.filter((item) => item === 2)).length, (gravidade.filter((item) => item === 3)).length],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      useEffect(() => {
        handleGraph()
      }, [respostaPrevisao]); 


    return (
        <div className="bg-gray-100 h-screen">
            <div className='flex bg-blue-950 py-4 px-8'>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
            <h1 className='m-8 text-2xl font-bold'>Nova previsão</h1>
            <div className='flex m-8'>
              <div>
                  <select className='h-8 px-4 rounded-md hover:cursor-pointer text-lg mr-8' value={previsaoOcorrencia} onChange={(e) => setPrevisaoOcorrencia(e.target.value)}>
                    <option value="0">Com vítimas</option>
                    <option value="2">Sem vítimas</option>
                    <option value="1">Danos materiais</option>
                  </select>
              </div>
              <div>
                  <select className='h-8 px-4 rounded-md hover:cursor-pointer text-lg mr-8' value={previsaoAcidente} onChange={(e) => setPrevisaoAcidente(e.target.value)}>
                    <option value="0">Abalroamento</option>
                    <option value="1">Atropelamento</option>
                    <option value="2">Capotamento</option>
                    <option value="3">Choques com objetos</option>
                    <option value="4">Colisão</option>
                    <option value="5">Engavetamento</option>
                    <option value="7" >Queda</option>
                    <option value="8" >Saida de pista</option>
                    <option value="9" >Tombamento</option>
                    <option value="6">Outros</option>
                  </select>
              </div>
              <div>
                <select className='h-8 px-4 rounded-md hover:cursor-pointer text-lg mr-8' value={previsaoSentido} onChange={(e) => setPrevisaoSentido(e.target.value)}>
                  <option value='4' >Norte</option>
                  <option value='6' >Sul</option>
                  <option value='3' >Leste</option>
                  <option value='5' >Oeste</option>
                  <option value='1' >Crescente</option>
                  <option value='2' >Decrescente</option>
                  <option value='0' >Ambos</option>
                </select>
              </div>

              <button onClick={handlePredict} className='bg-blue-950 text-white font-bold px-12 rounded-md hover:scale-95 duration-300 ease-in-out'>Previsão</button>
            </div>
            <p className='text-lg mx-8'>Resultado da previsão: {respostaPrevisao}</p>

            <h1 className='m-8 text-2xl font-bold'>Graficos</h1>
            <div className='flex m-8 gap-24'>
              <div style={{ width: '500px', height: '400px' }} className='flex items-center flex-col'>
                <p>Ocorrencias registradas nas previsões realizadas</p>
                <Bar data={graph_ocorrencia} />
              </div>
              <div style={{ width: '600px', height: '500px' }} className='flex items-center flex-col'>
                <p>Acidentes registrados nas previsões realizadas</p>
                <Bar data={graph_acidente} />
              </div>
              <div style={{ width: '500px', height: '400px' }} className='flex items-center flex-col'>
                <p>Previsões realizadas</p>
                <Bar data={graph_gravidade} />
              </div>
            </div>
            
        </div>
    );
};

export default Dashboard;
