import { useState, type KeyboardEvent } from 'react';

interface QueryInputProps {
    isLoading: boolean;
    onSubmit: (query: string) => Promise<boolean>;
}

function PromptInput({ isLoading, onSubmit }: QueryInputProps) {
    const [value, setValue] = useState('');

    const handleSubmit = async () => {
        const succeeded = await onSubmit(value);
        if (succeeded) {
            setValue('');
        }
    };

    const handleKeyDown =
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                void handleSubmit();
            }
        };

    return (
        <div id="floating-bar">
            <input
                id="query-input"
                type="text"
                placeholder="Describe your scene..."
                autoComplete="off"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            <button
                id="submit-button"
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isLoading}
            >
                {isLoading ? '...' : 'Submit'}
            </button>
        </div>
    );
}

export default PromptInput;