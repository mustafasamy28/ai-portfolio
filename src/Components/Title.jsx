/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const Title = () => {
  const WORDS = ['AI ENGINEER.', 'DATA SCIENTIST.', 'LLM SPECIALIST.'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [timeoutActive, setTimeoutActive] = useState(false);

  const typeSpeed = 100;
  const deleteSpeed = 200;
  const displayDelay = 1000; 

  const getRandomChar = () => {
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ALPHA[Math.floor(Math.random() * ALPHA.length)];
  };

  const getRandomChars = length => {
    return Array.from({ length }, () => getRandomChar()).join('');
  };

  useEffect(() => {
    const handleType = () => {
      const currentWord = WORDS[currentWordIndex];
      const currentLength = typedText.length;

      if (isDeleting) {
        if (currentLength > 0) {
          setTypedText(currentWord.substring(0, currentLength - 1));
          setDisplayText(currentWord.substring(0, currentLength - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex(prevIndex => (prevIndex + 1) % WORDS.length);
        }
      } else {
        if (currentLength < currentWord.length) {
          setTypedText(currentWord.substring(0, currentLength + 1));
          const randomChars = getRandomChars(
            currentWord.length - currentLength - 1,
          );
          setDisplayText(
            currentWord.substring(0, currentLength + 1) + randomChars,
          );
        } else {
          if (!timeoutActive) {
            setTimeoutActive(true);
            setTimeout(() => {
              setIsDeleting(true);
              setTimeoutActive(false);
            }, displayDelay);
          }
        }
      }
    };

    if (!timeoutActive) {
      const timeoutId = setTimeout(
        handleType,
        isDeleting ? deleteSpeed : typeSpeed,
      );
      return () => clearTimeout(timeoutId);
    }
  }, [
    typedText,
    isDeleting,
    currentWordIndex,
    timeoutActive,
    WORDS,
    getRandomChars,
  ]);

  useEffect(() => {
    const cursorBlink = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <div className="w-full text-start pt-12 ">
      <h1>
        <span className="text-me  lg:text-5xl xl:text-6xl font-customFont text-primary1 font-semibold transition-all duration-500 backdrop-blur-[3px]">
          {displayText}
          <span className="text-red-600 inline-flex overflow-hidden ">
            {blink ? '|' : '\u00A0'}
          </span>
        </span>
      </h1>
      <h2 className="lg:text-5xl xl:text-6xl text-me uppercase font-semibold tracking-wide mt-2 text-purple-100 transition-all duration-500 backdrop-blur-[3px]">
        hey, it&apos;s
        <span className="font-semibold text-primary1 tracking-normal ml-2">
          MOSTAFA SAMY
        </span>
      </h2>
    </div>
  );
};

export default Title;
