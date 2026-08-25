import React from 'react';
import { Helmet } from 'react-helmet';
import { KageApp } from './kage/KageApp';

function App() {
  return (
    <>
      <Helmet>
        <title>KAGE 影 — A Five-Chapter Night Walk Through Kyoto</title>
        <meta
          name="description"
          content="A single-page, cinematic WebGL experience: a five-chapter night walk through a fictional Kyoto mountain temple."
        />
        <meta property="og:title" content="KAGE 影 — Cinematic WebGL Kyoto Night Walk" />
        <meta
          property="og:description"
          content="An editorial art book moving through a live 3D world of lanterns, rain mist, and vermilion moon."
        />
      </Helmet>
      
      <KageApp />
    </>
  );
}

export default App;