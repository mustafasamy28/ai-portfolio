import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiHyperskill } from 'react-icons/si';
import SkillsPart from './SkillsPart';
import Certificats from './Certificats';
import { useState } from 'react';
import { trackButtonClick } from '../utils/analytics';

const Categories = ['Skills', 'Certificats'];

const staggerContainer = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.1,
      type: 'spring',
    },
  },
};

export default function Skills() {
  const [active, setActive] = useState('Skills');

  const Compo = () => {
    if (active === 'Skills') {
      return (
        <motion.div className="md:w-[90%] ">
          <SkillsPart />
        </motion.div>
      );
    } else if (active === 'Certificats') {
      return (
        <motion.div className="pb-7 md:pb-2 ">
          <Certificats />
        </motion.div>
      );
    } else {
      return <h1>Unknown Category</h1>;
    }
  };

  return (
    <div className="cursor-custom pt-8 self-start flex flex-col space-y-8 items-center md:w-full md:pl-0 w-full h-full ">
      <SecName secName="Skills & Certificats">
        <div className="flex items-center">
          <SiHyperskill />
        </div>
      </SecName>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className=" space-y-5 self-start flex justify-center  w-full flex-col items-start"
      >
        <div className="flex justify-start space-x-16">
          {Categories.map(category => (
            <motion.div
              key={category}
              variants={staggerItem}
              className={`relative text-2xl transition-colors cursor-pointer ${
                active === category ? 'font-bold text-red-700' : 'text-white'
              }`}
              onClick={() => {
                setActive(category);
                trackButtonClick('skills_category', category);
              }}
            >
              {category}
              <span
                className={`absolute  bottom-0 left-0 h-0 border-b-2 transition-all duration-500 ${
                  active === category
                    ? 'w-full border-red-600'
                    : 'w-1/2 border-white'
                }`}
              ></span>
            </motion.div>
          ))}
        </div>
        <Compo />
      </motion.div>
    </div>
  );
}
