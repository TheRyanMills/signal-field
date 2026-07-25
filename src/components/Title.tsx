import { useState, useRef, useEffect } from "react";

interface TitleProps {
    text: string;
}

function Title({ text }: TitleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isFading, setIsFading] = useState(false);
    const prevTextRef = useRef(text);

    useEffect(() => {
        // Control fading
        if (prevTextRef.current === text) {
            return;
        }
 
        setIsFading(true);

        window.setTimeout(() => {
            setDisplayText(text);
            setIsFading(false);
            prevTextRef.current = text;
        }, 300); 
    }, [text]);


    return (
        <h1 id="title" className={`title ${isFading && 'fade-out'}`}>
            {displayText}
        </h1>
    );
}

export default Title;