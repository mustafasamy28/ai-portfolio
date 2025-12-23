import { stagger, useAnimate } from 'framer-motion';
import MyCV from '../assets/docs/MyCV.pdf';
import { motion } from 'framer-motion';
import { trackResumeDownloaded } from '../utils/analytics';

export default function Resume() {
  const [scope, animate] = useAnimate(true);

  const onButtonClick = () => {
    animate([
      ['.letter', { y: -33 }, { duration: 0.3, delay: stagger(0.1) }],
      ['.button', { scale: 0.8 }, { duration: 0.15, at: '<' }],
      ['.button', { scale: 1 }, { duration: 0.15 }],
      ['.letter', { y: 0 }, { duration: 0.0000001, at: 1 }],
    ]);
  };

  const handleClick = () => {
    trackResumeDownloaded();
    setTimeout(() => {
      window.open(MyCV, '_blank');
    }, 750);
  };

  return (
    <motion.div
      className="w-full md:-32"
      ref={scope}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
    >
      <a onClick={handleClick}>
        <button
          onClick={onButtonClick}
          className="button border-4 border-primary3 px-9 py-1 pt-2 font-semibold rounded-full text-white bg-primary5 transition-colors hover:border-primary4 hover:bg-primary2 hover:text-primary5"
        >
          <span className="sr-only">RESUME</span>
          <span className="overflow-hidden block text-xl h-[33px]" aria-hidden>
            {['R', 'E', 'S', 'U', 'M', 'E'].map((letter, index) => (
              <span
                data-letter={letter}
                className="letter inline-block relative h-[33px] after:absolute after:h-[33px] after:right-0 after:top-full after:content-[attr(data-letter)]"
                key={`${index}-${letter}`}
              >
                {letter}
              </span>
            ))}
          </span>
        </button>
      </a>
    </motion.div>
  );
}
