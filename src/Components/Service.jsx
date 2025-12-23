import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiHyperskill } from 'react-icons/si';
import ServiceCompo from './ServiceCompo';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
    },
  },
};

export default function Service() {
  useEffect(() => {
    trackPageView('Services', '/services');
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="cursor-custom relative pt-20 flex flex-col space-y-14 mt-16 md:mt-24 items-center md:w-3/5  pl-10 pr-5 md:pl-0 w-full h-full md:h-full md:pt-0 md:pb-16 pb-12"
      >
        <div className="self-start -mt-9 md:mt-0 flex justify-start ">
          <SecName secName="service">
            <SiHyperskill />
          </SecName>
        </div>

        <motion.div
          className="text-white self-start text-4xl w-80 md:w-full md:text-5xl uppercase backdrop-blur-[3px] font-semibold "
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          My <span className="inline-block text-primary1">Specialities</span>
        </motion.div>
        <ServiceCompo />
      </div>
    </AnimatePresence>
  );
}
