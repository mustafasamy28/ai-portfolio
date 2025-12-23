import SecName from './SecName';
import { motion } from 'framer-motion';
import { GrProjects } from 'react-icons/gr';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import Grid from './Grid';
import TextType from './TextType';
import { useEffect } from 'react';
import { FaHtml5, FaReact, FaPython } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiFlask } from 'react-icons/si';
import { SiFastapi } from 'react-icons/si';
import { SiShadcnui } from 'react-icons/si';
import { SiStreamlit } from 'react-icons/si';
import { FaDocker } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { FaAws } from 'react-icons/fa6';
import { SiApachekafka } from 'react-icons/si';
import { SiApachehive } from 'react-icons/si';
import { SiApachehadoop } from 'react-icons/si';
import { DiRedis } from 'react-icons/di';
import { SiMongodb } from 'react-icons/si';
import { SiScikitlearn } from 'react-icons/si';
import { SiLangchain } from 'react-icons/si';
import { SiSpringboot } from 'react-icons/si';
import { SiSpringsecurity } from 'react-icons/si';
import { DiSpark } from 'react-icons/di';
import { IoMdAnalytics } from 'react-icons/io';
import { DiJenkins } from 'react-icons/di';
import { SiTerraform } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa6';
import { RiNextjsFill } from 'react-icons/ri';
import { FaDigitalOcean } from 'react-icons/fa6';
import { SiAnsible } from 'react-icons/si';
import { SiJest } from 'react-icons/si';
import { SiPytest } from 'react-icons/si';
import { BiLogoGmail } from 'react-icons/bi';
import { SiGooglecloud } from 'react-icons/si';
import { SiPostgresql } from 'react-icons/si';
import { SiDatabricks } from 'react-icons/si';
import { SiApachespark } from 'react-icons/si';
import { SiSnowflake } from 'react-icons/si';
import { SiKaggle } from 'react-icons/si';
import { SiDelta } from 'react-icons/si';

import Ccompo from './SVGs/Ccompo';
import Scoop from './SVGs/Sqoop';
import CrewAI2 from './SVGs/CrewAI2';
import MemoAI from './SVGs/Mem0ai';
import AgentOps from './SVGs/AgentOps';
import Qdrant from './SVGs/Qdrant.jsx';
import LlamaIndex from './SVGs/LlamaIndex2.jsx';
import Unsloth from './SVGs/Unsloth';
import PowerBIIcon from './SVGs/PowerBIIcon';

import GitHubAnalyserImg from '../assets/GitHubAnalyser.png';
import PortFolioImg from '../assets/PortFolio.png';
import MedicalOffice from '../assets/MedicalOffice.png';
import JumiaPipelineImg from '../assets/JumiaPipeline.png';
import SpotifyPipelineImg from '../assets/SpotifyPipeline.png';
import YoutubeVideoDownloaderImg from '../assets/YoutubeVideoDownloader.png';
import WeatherAppImg from '../assets/WeatherApp.png';
import HotelLandingPageImg from '../assets/HotelLandingPage.png';
import PurshaseApp from '../assets/PurshaseApp.jfif';
import CreditCardPipline from '../assets/CreditCardPipline.png';
import Sqooparchi from '../assets/sqooparchi.png';
import DarijaUI from '../assets/DarijaUI.png';
import ShardedDB from '../assets/ShardedDB.png';
import ChatBot from '../assets/ChatBotArchi.png';
import PortfolioChatBotArchi from '../assets/PortfolioChatBotArchi.png';
import Hociematy from '../assets/Hociematy.png';
import AnnotationPlatform from '../assets/AnnotationPlatform.png';
import TelecomPipeline from '../assets/TelecomPipeline.png';
import AIPodcastGenerator from '../assets/AIPodcastGenerator.png';
import FullStackDevOpsPipeline from '../assets/FullStackDevOpsPipeline.png';
import GCPToPowerBIEcommercePipeline from '../assets/GCPToPowerBIEcommercePipeline.png';
import projectsData from '../data/projects.json';
import { trackButtonClick, trackPageView } from '../utils/analytics';

const staggerContainer = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.5,
    },
  },
};

const projectTypeConfig = {
  ai: {
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent Solutions',
    color: 'text-green-400',
  },
  data: {
    title: 'Data Engineering',
    subtitle: 'Pipeline & Analytics',
    color: 'text-blue-400',
  },
  dev: {
    title: 'Web Development',
    subtitle: 'Frontend & Backend',
    color: 'text-purple-400',
  },
  DevOps: {
    title: 'DevOps & Infrastructure',
    subtitle: 'CI/CD & Cloud Solutions',
    color: 'text-orange-400',
  },
};

export default function Projects() {
  useEffect(() => {
    trackPageView('Projects', '/projects');
  }, []);

  // Tool mapping from string names to actual components
  const toolMapping = {
    CrewAI2,
    SiFastapi,
    MemoAI,
    AgentOps,
    Qdrant,
    SiLangchain,
    SiStreamlit,
    SiMongodb,
    FaDocker,
    LlamaIndex,
    SiMysql,
    SiScikitlearn,
    FaAws,
    FaReact,
    SiApachekafka,
    DiRedis,
    Scoop,
    SiApachehadoop,
    SiApachehive,
    FaPython,
    BiLogoPostgresql,
    FaHtml5,
    IoLogoCss3,
    IoLogoJavascript,
    SiFlask,
    TbBrandFramerMotion,
    RiTailwindCssFill,
    SiShadcnui,
    Ccompo,
    SiSpringboot,
    SiSpringsecurity,
    DiSpark,
    IoMdAnalytics,
    Unsloth,
    DiJenkins,
    SiTerraform,
    FaGithub,
    RiNextjsFill,
    FaDigitalOcean,
    SiAnsible,
    SiJest,
    SiPytest,
    BiLogoGmail,
    PowerBIIcon,
    SiGooglecloud,
    SiPostgresql,
    SiDatabricks,
    SiApachespark,
    SiSnowflake,
    SiKaggle,
    SiDelta,
  };

  // Image mapping from string names to actual imports
  const imageMapping = {
    PortfolioChatBotArchi,
    ChatBot,
    Hociematy,
    DarijaUI,
    CreditCardPipline,
    ShardedDB,
    Sqooparchi,
    GitHubAnalyserImg,
    JumiaPipelineImg,
    SpotifyPipelineImg,
    MedicalOffice,
    YoutubeVideoDownloaderImg,
    PortFolioImg,
    HotelLandingPageImg,
    WeatherAppImg,
    PurshaseApp,
    AnnotationPlatform,
    TelecomPipeline,
    AIPodcastGenerator,
    FullStackDevOpsPipeline,
    GCPToPowerBIEcommercePipeline,
  };

  // Transform the JSON data to use actual components and images
  const data = projectsData.projects.map(project => ({
    ...project,
    tools: project.tools.map(toolName => toolMapping[toolName]).filter(Boolean),
    imgUrl: imageMapping[project.imgUrl],
  }));

  const groupedProjects = data.reduce((acc, project) => {
    const type = project.project_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(project);
    return acc;
  }, {});

  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="relative flex flex-col items-center w-full h-full pt-12 mt-16 mb-10 ml-20 cursor-custom md:mb-20 space-y-14 md:w-3/5 md:pr-28 md:h-full md:mt-0 md:pt-24"
      >
        <SecName secName="Projects">
          <GrProjects />
        </SecName>
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start self-start justify-center space-y-3"
        >
          <div className="text-white self-start text-4xl w-80 md:w-full md:text-5xl uppercase backdrop-blur-[3px] font-semibold">
            Take a look at
            <span className="text-primary3"> My Work</span>
          </div>
        </motion.div>

        {/* Render sections by project type */}
        <div className="w-full space-y-16">
          {Object.entries(groupedProjects).map(([type, projects], index) => {
            const config = projectTypeConfig[type];
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full space-y-6"
                onClick={() => trackButtonClick('project_category', type)}
              >
                {/* Section Header */}
                <div className="flex flex-col space-y-2">
                  <TextType
                    text={[config.title]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className={`text-3xl md:text-4xl font-medium ${config.color} uppercase tracking-wide`}
                    startOnVisible={true}
                    loop={false}
                  />
                  <motion.p
                    className="text-gray-300 text-lg md:text-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {config.subtitle}
                  </motion.p>
                  <div
                    className={`h-1 w-24 ${config.color.replace(
                      'text-',
                      'bg-',
                    )} rounded-full`}
                  ></div>
                </div>

                {/* Projects Grid for this section */}
                <Grid data={projects} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatePresence>
  );
}
