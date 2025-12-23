import SecName from './SecName';
import { motion } from 'framer-motion';
import { SiPaloaltonetworks } from 'react-icons/si';
import { AnimatePresence } from 'framer-motion';
import Transition from './Transition';
import { useState, useEffect } from 'react';
import experiencesData from '../data/experiences.json';
import CertifXAI from '../assets/docs/Certif-XAI.pdf';
import {
  trackExperienceExpanded,
  trackCertificateViewed,
  trackPageView,
} from '../utils/analytics';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaTools,
  FaCertificate,
} from 'react-icons/fa';

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

const experienceCardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Experiences() {
  const [expandedExperience, setExpandedExperience] = useState(null);

  useEffect(() => {
    trackPageView('Experiences', '/experiences');
  }, []);

  // Map certification filenames to imported PDFs
  const certificationMap = {
    'Certif-XAI.pdf': CertifXAI,
    // Add more certifications here as you get them
    // 'Other-Cert.pdf': OtherCert,
  };

  const toggleExpanded = id => {
    const experience = experiencesData.experiences.find(exp => exp.id === id);
    setExpandedExperience(expandedExperience === id ? null : id);

    // Track experience expanded event
    if (expandedExperience !== id && experience) {
      trackExperienceExpanded(experience.company, experience.position);
    }
  };

  const handleCertificateClick = certificationFile => {
    if (certificationFile && certificationMap[certificationFile]) {
      // Track certificate viewed event
      const experience = experiencesData.experiences.find(
        exp => exp.certification === certificationFile,
      );
      if (experience) {
        trackCertificateViewed(experience.company, certificationFile);
      }

      window.open(certificationMap[certificationFile], '_blank');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Transition key={1} />
      <div
        key={2}
        className="relative flex flex-col items-center w-full h-full pt-6 sm:pt-12 mt-8 sm:mt-16 mb-10 px-2 sm:px-4 md:ml-20 cursor-custom md:mb-20 space-y-6 sm:space-y-8 md:space-y-14 md:w-3/5 md:pr-28 md:h-full md:mt-0 md:pt-24"
      >
        <SecName secName="Experiences">
          <SiPaloaltonetworks />
        </SecName>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start self-start justify-center space-y-3 w-full"
        >
          <div className="text-white self-start text-3xl sm:text-4xl w-full md:text-5xl uppercase backdrop-blur-[3px] font-semibold">
            My Professional
            <span className="text-primary3"> Journey</span>
          </div>
        </motion.div>

        {/* Experiences Section */}
        <div className="w-full max-w-6xl mx-auto space-y-12 px-4 sm:px-0">
          {experiencesData.experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial="hidden"
              animate="show"
              variants={experienceCardVariants}
              transition={{ delay: index * 0.3 }}
              className="relative group"
            >
              {/* Timeline Connector */}
              {index !== experiencesData.experiences.length - 1 && (
                <div className="absolute left-4 sm:left-8 top-full w-0.5 h-8 sm:h-12 bg-gradient-to-b from-primary3/60 to-transparent z-10"></div>
              )}

              {/* Main Card Container */}
              <div className="relative overflow-hidden">
                {/* Premium Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-transparent rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary5/15 via-transparent to-primary3/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary4/5 via-transparent to-primary2/5 rounded-3xl opacity-60 group-hover:opacity-80 transition-all duration-700"></div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary3/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary2/60 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary4/50 rounded-full animate-pulse delay-500"></div>
                </div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-800/30 to-gray-900/50 backdrop-blur-3xl border border-white/15 rounded-3xl overflow-hidden group-hover:border-primary3/60 group-hover:shadow-2xl group-hover:shadow-primary3/20 transition-all duration-700 transform ">
                  {/* Card Header with Visual Accent */}
                  <div className="relative p-4 sm:p-6 md:p-8 pb-4 sm:pb-6">
                    {/* Enhanced Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary3 to-transparent"></div>

                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-4 sm:left-8 top-6 sm:top-10 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-primary2 to-primary4 rounded-full shadow-xl border-2 sm:border-4 border-gray-900/60 group-hover:scale-125 group-hover:shadow-primary3/60 group-hover:border-primary3/40 transition-all duration-500">
                      <div className="absolute inset-0.5 sm:inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </div>

                    {/* Header Content */}
                    <div className="ml-8 sm:ml-12 space-y-4 sm:space-y-6">
                      {/* Title Section */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-primary2 transition-colors duration-500">
                          {experience.position}
                        </h3>
                        <p className="text-base sm:text-lg text-gray-300 font-medium">
                          Leading innovation in AI and automation
                        </p>

                        {/* Company & Type Badges */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0 mt-3 sm:mt-4">
                          <div className="relative group/company flex items-center">
                            <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-2xl border border-primary4/40 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl hover:shadow-primary3/30 hover:border-primary3/60 hover:scale-105 hover:bg-gradient-to-r hover:from-gray-700/90 hover:to-gray-600/90 transition-all duration-300">
                              {experience.company}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary3/30 to-primary2/30 rounded-xl opacity-0 group-hover/company:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                          </div>

                          <div className="bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase shadow-xl hover:shadow-primary3/50 hover:scale-105 hover:bg-gradient-to-r hover:from-primary2 hover:via-primary1 hover:to-primary2 transition-all duration-300 flex items-center justify-center">
                            <span className="relative z-10">
                              {experience.jobType}
                            </span>
                            <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/10 hover:border-primary4/30 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 transition-all duration-300 group/meta">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-primary3/30 to-primary4/30 rounded-xl group-hover/meta:scale-110 transition-transform duration-300">
                            <FaCalendarAlt className="text-primary3 text-base sm:text-lg" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-white font-semibold text-sm sm:text-base">
                              {experience.duration}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              ({experience.durationShort})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/10 hover:border-primary4/30 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 transition-all duration-300 group/meta">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-primary3/30 to-primary4/30 rounded-xl group-hover/meta:scale-110 transition-transform duration-300">
                            <FaMapMarkerAlt className="text-primary3 text-base sm:text-lg" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm leading-relaxed">
                              {experience.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                    <div className="ml-8 sm:ml-12">
                      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-7 border border-white/10 hover:border-primary4/20 hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-gray-900/60 transition-all duration-300 shadow-lg">
                        <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium relative z-10">
                          {experience.description}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary4/5 to-primary3/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Section */}
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                    <div className="ml-8 sm:ml-12">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary3/20 to-primary4/20 rounded-xl">
                          <FaTools className="text-primary3 text-lg sm:text-xl" />
                        </div>
                        <h4 className="text-white font-bold text-lg sm:text-xl">
                          Technologies & Tools
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {experience.tools.map((tool, toolIndex) => (
                          <motion.span
                            key={toolIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: toolIndex * 0.1,
                              duration: 0.4,
                            }}
                            className="relative group/tech"
                          >
                            <div className="bg-gradient-to-r from-primary5/30 to-primary4/30 backdrop-blur-sm text-primary1 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold border border-primary4/40 hover:border-primary2/60 hover:scale-110 hover:bg-gradient-to-r hover:from-primary4/40 hover:to-primary3/40 transition-all duration-300 cursor-default shadow-lg">
                              {tool}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary3/20 to-primary2/20 rounded-2xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                    <div className="ml-8 sm:ml-12 flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
                      {/* View Achievements Button */}
                      <motion.button
                        onClick={() => toggleExpanded(experience.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group/btn overflow-hidden rounded-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary3 via-primary2 to-primary1 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary1/20 to-primary3/20 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative bg-gradient-to-r from-primary3 to-primary1 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl group-hover/btn:shadow-primary3/30 transition-all duration-300 flex items-center gap-3 sm:gap-4">
                          <motion.div
                            animate={{
                              rotate:
                                expandedExperience === experience.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="p-1 sm:p-1.5 bg-white/15 rounded-lg backdrop-blur-sm"
                          >
                            <FaChevronDown className="text-sm sm:text-base" />
                          </motion.div>
                          <span className="tracking-wide text-sm sm:text-base">
                            {expandedExperience === experience.id
                              ? 'Hide Achievements'
                              : 'View Achievements'}
                          </span>
                        </div>
                      </motion.button>

                      {/* View Certificate Button */}
                      {experience.certification && (
                        <motion.button
                          onClick={() =>
                            handleCertificateClick(experience.certification)
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative group/cert overflow-hidden rounded-2xl"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary4 via-primary5 to-primary3 rounded-2xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary3/20 to-primary4/20 rounded-2xl opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500"></div>

                          <div className="relative bg-gradient-to-r from-primary4 to-primary3 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl group-hover/cert:shadow-primary4/30 transition-all duration-300 flex items-center gap-3 sm:gap-4">
                            <div className="p-1 sm:p-1.5 bg-white/15 rounded-lg backdrop-blur-sm">
                              <FaCertificate className="text-sm sm:text-base" />
                            </div>
                            <span className="tracking-wide text-sm sm:text-base whitespace-nowrap">
                              View Certificate
                            </span>
                          </div>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Expandable Achievements Section */}
                  <AnimatePresence>
                    {expandedExperience === experience.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mx-4 sm:mx-6 md:mx-8 mb-6 sm:mb-8">
                          <div className="ml-8 sm:ml-12">
                            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl">
                              <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-primary3 to-primary1 rounded-full shadow-lg"></div>
                                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                                  Key Achievements
                                </h4>
                              </div>

                              <div className="space-y-6 sm:space-y-8">
                                {experience.responsibilities.map(
                                  (responsibility, respIndex) => (
                                    <motion.div
                                      key={respIndex}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: respIndex * 0.1,
                                        duration: 0.5,
                                      }}
                                      className="group/achievement flex items-start gap-4 sm:gap-6"
                                    >
                                      <div className="flex-shrink-0 hidden sm:block">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary3 to-primary1 rounded-xl flex items-center justify-center shadow-xl group-hover/achievement:shadow-2xl group-hover/achievement:shadow-primary3/30 transition-all duration-300">
                                          <span className="text-white text-sm sm:text-base md:text-lg font-bold">
                                            {respIndex + 1}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-4 sm:p-5 md:p-7 rounded-xl border border-white/10 group-hover/achievement:border-primary4/20 group-hover/achievement:bg-gradient-to-br group-hover/achievement:from-gray-800/60 group-hover/achievement:to-gray-900/60 transition-all duration-300 shadow-lg">
                                          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                                            {responsibility}
                                          </p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary3/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
