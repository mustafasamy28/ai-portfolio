import { SiDailydotdev } from 'react-icons/si';
import { GrHost } from 'react-icons/gr';
import { TbJumpRope } from 'react-icons/tb';
import { FiDatabase } from 'react-icons/fi';
import { FaCloudsmith } from 'react-icons/fa';
import { SiJfrogpipelines } from "react-icons/si";
import { GrVirtualMachine } from "react-icons/gr";

import { motion } from 'framer-motion';

const services = [
  {
    id: 6,
    serviceName: 'Agent Systems & RAG',
    description:
      'I design and deploy intelligent AI agent systems and Retrieval-Augmented Generation (RAG) architectures that transform how businesses interact with data and knowledge. By leveraging multi-agent workflows, vector databases, and LLM orchestration, I create autonomous systems that automate complex tasks, enhance decision-making, and provide intelligent, context-aware solutions tailored to your business needs.',
    icone: <SiJfrogpipelines />,
  },
  {
    id: 7,
    serviceName: 'Machine Learning',
    description:
      'I develop and deploy machine learning models that drive intelligent decision-making and automation. From data preprocessing to model training and optimization, I utilize state-of-the-art algorithms and tools to deliver solutions that enhance performance and provide a competitive edge.',
    icone: <GrVirtualMachine />,
  },
  {
    id: 1,
    serviceName: 'Web Development',
    description:
      'Transforming ideas into engaging digital experiences. From intuitive interfaces to robust functionalities, each project is designed to captivate and align with your business goals.',
    icone: <SiDailydotdev />,
  },
  {
    id: 5,
    serviceName: 'Cloud Solutions',
    description:
      'Specializing in AWS, I leverage its services like EC2, RDS, Lambda, and S3 to build secure, and cost-effective cloud solutions. With deep knowledge of AWS tools, I ensure efficient, reliable, and secure cloud environments.',
    icone: <FaCloudsmith />,
  },
  {
    id: 2,
    serviceName: 'Hosting',
    description:
      'Specializing in reliable hosting solutions for static websites and dynamic web applications. Ensure your online presence is secure, scalable, and always accessible with tailored hosting expertise.',
    icone: <GrHost />,
  },
  {
    id: 3,
    serviceName: 'Problem Solving ',
    description:
      'Proficient in tackling algorithmic challenges with a strategic approach. Leveraging in-depth knowledge to analyze, design, and implement effective solutions that optimize efficiency and performance in software development.',
    icone: <TbJumpRope />,
  },
  {
    id: 4,
    serviceName: 'Database Management',
    description:
      'I specialize in managing databases and designing scalable systems that prioritize security and performance. My focus is on handling complex data setups to ensure businesses operate efficiently and effectively.',
    icone: <FiDatabase />,
  },

];
export default function ServiceCompo() {
  const elemts = services.map(service => {
    return (
      <motion.div
        key={service.id}
        className="relative backdrop-blur-[3px] group w-full flex justify-center flex-col ring-1 ring-current  space-y-2 p-8 rounded-2xl  shadow-shad transition-shadow duration-500 hover:shadow-primary1  hover:ring-primary4 hover:ring-2 text-white md:w-4/5"
        initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="font-bold text-xl group-hover:translate-x-2 transition-all duration-500 ease-out">
          {service.serviceName}
        </div>
        <div className="text-sm md:w-11/12 text-purple-100 group-hover:translate-x-2 transition-all duration-500 ease-out">
          {service.description}
        </div>
        <div className="absolute  top-3 right-5 text-xl text-primary1 shadow-shad group-hover:shadow-primary3">
          {service.icone}{' '}
        </div>
      </motion.div>
    );
  });
  return <div className="flex flex-col space-y-11  h-full"> {elemts}</div>;
}
