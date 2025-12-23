/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
export default function Paragraphe({ partie }) {
  if (partie == 0)
    return (
      <motion.div
        className="text-start self-start w-[75%] font-customFont text-1xl text-purple-100 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        Building intelligent solutions that transform ideas into reality.
      </motion.div>
    );
  else if (partie == 1)
    return (
      <motion.div
        className="text-start w-5/6 font-customFont text-sm md:text-base text-purple-100  backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        AI Engineer specializing in LLMs, agentic workflows, and applied machine learning.
        Experienced with transformers, RAG systems, multi-agent architectures, and MLOps pipelines.
        I build scalable AI systems using Python, PyTorch, Hugging Face, Docker, MLflow, and cloud platforms—covering the full lifecycle from data and modeling to deployment and monitoring.
      </motion.div>
    );
  else
    return (
      <motion.div
        className="text-start md:text-left font-customFont text-1xl backdrop-blur-[3px] "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <p>
          AI Engineer / Data Scientist building production-ready AI solutions that solve real problems.
        </p>
      </motion.div>
    );
}
