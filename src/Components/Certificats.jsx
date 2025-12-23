/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const dataCerifs = [
  {
    id: 1,
    nameCertif: 'AI Engineer MLOps Track: Deploy Gen AI & Agentic AI at Scale',
    link: 'https://drive.google.com/file/d/1mCJqTzFR2P_G5l2-3lc71GzeF2bZAba9/view?usp=sharing',
    date: '2025',
    provider: 'Udemy',
  },
  {
    id: 2,
    nameCertif: 'AI Engineer Agentic Track: The Complete Agent & MCP Course',
    link: 'https://drive.google.com/file/d/1b-k9EZEZVQdnf-zy5NGRpUPjNgFOsj5w/view?usp=sharing',
    date: '2025',
    provider: 'Udemy',
  },
  {
    id: 3,
    nameCertif: 'LLM Engineering: Master AI, Large Language Models & Agents',
    link: 'https://drive.google.com/file/d/1ihxUkPeTecqW_P-drjkM23bhJCvx7cWI/view?usp=drive_link',
    date: '2025',
    provider: 'Udemy',
  },
  {
    id: 4,
    nameCertif: '2025 Fine Tuning LLM with Hugging Face Transformers for NLP',
    link: 'https://drive.google.com/file/d/1qU5aUFsmRkfaPQo-jcpFXwTMsYSKonnp/view?usp=sharing',
    date: '2025',
    provider: 'Udemy',
  },
  {
    id: 5,
    nameCertif: 'NLP - Natural Language Processing with Python',
    link: 'https://drive.google.com/file/d/192YaQZkTFi3rm5VrT77RiUH4R1cbyyw7/view',
    date: '2024',
    provider: 'Online Course',
  },
  {
    id: 6,
    nameCertif: 'AI Programming With Python Nanodegree',
    link: 'https://drive.google.com/file/d/1BcHIHxnNodywVfpJK-KEzS_VAhdBVW1O/view',
    date: '2022',
    provider: 'Udacity',
  },
  {
    id: 7,
    nameCertif: 'Coding Competition',
    link: 'https://drive.google.com/file/d/1okYHshurPLuInv82beBW7IfKwe1Ic24q/view',
    date: '2022',
    provider: 'ICPC',
  },
  {
    id: 8,
    nameCertif: 'AI Session Lead',
    link: 'https://drive.google.com/file/d/1JuYyqS_sqWM83pgt--8kAMcMw1tIK29P/view',
    date: '2022',
    provider: 'Professional',
  },
  {
    id: 9,
    nameCertif: 'SQL for Data Science',
    link: 'https://drive.google.com/file/d/1AN_JldZaGAckDWKHr99A_4ovdAT-SmuW/view',
    date: '2021',
    provider: 'US Davis',
  },
  {
    id: 10,
    nameCertif: 'Data Visualization and Dashboards with Excel and Cognos',
    link: 'https://drive.google.com/file/d/1SlxIluikndV6-phf5ZPQ1MAwm0082pSR/view',
    date: '2021',
    provider: 'IBM',
  },
  {
    id: 11,
    nameCertif: 'Excel Basics for Data Analysis',
    link: 'https://drive.google.com/file/d/1eZPGlyOwg1J9davxBPXu2W7giFAHLfUw/view',
    date: '2021',
    provider: 'IBM',
  },
];

const Certificate = ({ nameCertif, link, date, provider }) => (
  <motion.div
    className="flex flex-col md:space-y-2 w-full text-purple-100"
    initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.7, delay: 0.1 }}
  >
    <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center space-y-1 lg:space-x-1 mb-3 lg:mb-0 text-purple-100">
      <div className="font-semibold text-base md:text-lg mr-1 w-[87%] md:w-auto">
        {nameCertif}:
      </div>
      {provider.length < 25 ? (
        <div className="flex md:justify-center items-center font-normal text-sm md:text-base  ">
          <div className="mb-0.5 text-purple-50">
            {provider} - {date}
          </div>
          <a
            title="Check it"
            className="inline-block text-primary3 ml-3 mb-0.5 text-xl transition-colors duration-300 hover:text-primary5"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      ) : (
        <div className="flex md:justify-center items-center font-normal text-[0.82rem] md:text-base ">
          <div className="mb-0.5 text-purple-50">
            {provider} - {date}
          </div>
          <a
            title="Check it"
            className="inline-block text-primary3 ml-3 mb-0.5 text-xl transition-colors duration-300 hover:text-primary5"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      )}
    </div>
  </motion.div>
);

export default function SkillsPart() {
  return (
    <div className="space-y-3">
      {dataCerifs.map(elem => (
        <Certificate
          key={elem.id}
          nameCertif={elem.nameCertif}
          link={elem.link}
          date={elem.date}
          provider={elem.provider}
        />
      ))}
    </div>
  );
}
