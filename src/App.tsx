import { useState } from 'react'
import { renderParticleSimulation } from './particleSimulation';
import {defaultConfig} from './simulationConfig';
import './App.css'

function App() {
  renderParticleSimulation(defaultConfig);
  return null;
}

export default App
