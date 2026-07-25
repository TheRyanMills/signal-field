import { useEffect, useState } from 'react'
import { renderParticleSimulation } from './util/particleSimulation';
import { defaultConfig, loadingConfig } from './util/simulationConfig';
import Title from './components/Title';
import PromptInput from './components/PromptInput';
import { type ApiResponse, API_ENDPOINT, API_TOKEN, SYSTEM_PROMPT } from './util/paste-api-info-here';
import type SimulationConfig from './util/simulationConfig';

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

      try {
        const data = await fetchApiResponse(trimmed);
        const properties = extractPointCloudProps(data);

        renderParticleSimulation(properties);
        setTitle(properties.title);
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Oops! Something went wrong. Try again.';
        showStatus(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

  const fetchApiResponse =
    async (userPrompt: string): Promise<ApiResponse> => {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    };

  const extractPointCloudProps =
    (data: ApiResponse): SimulationConfig => {
      if (data.errors.length !== 0) {
        showStatus(`Model returned with errors: ${data.errors}`);
      }

      const content = data.result.choices[0].message.content;
      console.log('Message: ' + content);

      try {
        return JSON.parse(content);
      } catch {
        throw new Error('Request returned invalid json.');
      }
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
