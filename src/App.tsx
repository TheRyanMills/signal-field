import { useEffect, useState } from 'react'
import { renderParticleSimulation } from './util/particleSimulation';
import { defaultConfig, loadingConfig } from './util/simulationConfig';
import Title from './components/Title';
import PromptInput from './components/PromptInput';

interface Status {
  message: string;
  isError: boolean;
}

function App() {
  const [title, setTitle] = useState('Welcome to Signal Field');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    renderParticleSimulation(defaultConfig);
  }, []);

  const showStatus =
    (message: string, secondsToDisplay = 3, isError = true) => {
      setStatus({ message, isError });
      window.setTimeout(() => setStatus(null), secondsToDisplay * 1000);
    };

  const submitPrompt =
    async (userPrompt: string): Promise<boolean> => {
      const trimmed = userPrompt.trim();
      if (!trimmed) {
        showStatus('Write your prompt below.');
        return false;
      }

      setIsLoading(true);
      setTitle("Loading...")
      renderParticleSimulation(loadingConfig);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsLoading(false);
      setTitle("Welcome to Signal Field")
      renderParticleSimulation(defaultConfig);

      return true;
    };

  return (
    <>
      <Title text={title} />
      <div
        id="status-message"
        className={status ? 'visible' : ''}
        style={{ color: status?.isError ? '#ff6b6b' : '#9be89b' }}
      >
        {status?.message}
      </div>
      <PromptInput isLoading={isLoading} onSubmit={submitPrompt} />
    </>
  );
}

export default App
