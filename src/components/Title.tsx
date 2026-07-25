interface TitleProps {
    text: string;
}

function Title({ text }: TitleProps) {
    return (
        <h1 id="title" className='title'>
            {text}
        </h1>
    );
}

export default Title;