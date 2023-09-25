'use client'

import Head from 'next/head';
import MyLineChart from '../components/Grafico';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Gráfico de Barras</title>
      </Head>

      <main>
        <h1>Meu Gráfico de Barras</h1>
        <MyLineChart />
      </main>
    </div>
  );
};

export default Home;
