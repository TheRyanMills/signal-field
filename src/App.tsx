import { useState } from 'react'
import { renderParticleSimulation } from './util/particleSimulation';
import {defaultConfig} from './util/simulationConfig';

function App() {
  renderParticleSimulation(defaultConfig);
  return null;
}

export default App
