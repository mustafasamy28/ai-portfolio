import { useState } from 'react';
import { IoIosArrowDropup } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { trackScrollToSection } from '../utils/analytics';

const ScrollButton = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', latest => {
    if (parseInt(latest) > 20) setIsScrolled(true);
    else setIsScrolled(false);
  });

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackScrollToSection('top');
          }}
          className={
            'fixed cursor-pointer  md:bottom-28 bottom-24 right-5  md:right-6 bg-transparent backdrop-blur-xl text-6xl shadow-shad text-primary3 rounded-full z-20 hover:text-primary4'
          }
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.7 }}
        >
          <IoIosArrowDropup />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;
