import { useState, useEffect } from 'react';

interface TypewriterTextProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
    className = '',
    style = {}
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = texts[currentTextIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (currentText.length < currentFullText.length) {
                    setCurrentText(currentFullText.slice(0, currentText.length + 1));
                } else {
                    // Finished typing, pause then start deleting
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className={className} style={style}>
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};
