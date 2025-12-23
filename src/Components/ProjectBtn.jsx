import { motion } from 'framer-motion';
import ProjectsImg from '../assets/projects.png';
import LetsConn from './LetsConnect';
import { Link } from 'react-router-dom';
import { trackLinkClick } from '../utils/analytics';

export default function ProjectBtn() {
  return (
    <Link
      to={'/projects'}
      onClick={() => trackLinkClick('Projects Button', '/projects')}
    >
      <motion.div
        className="w-full  flex lg:justify-center  "
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
      >
        <div className=" backdrop-blur-[3px] relative group border-2 border-dashed w-40 h-40 md:mr-12  p-3 rounded-full flex justify-center items-center cursor-pointer">
          <LetsConn />
          <motion.img
            className="w-96"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              ease: 'linear',
              repeat: Infinity,
            }}
            src={ProjectsImg}
          />
        </div>
      </motion.div>
    </Link>
  );
}
