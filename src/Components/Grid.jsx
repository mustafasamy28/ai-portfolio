/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { trackButtonClick, trackLinkClick } from '../utils/analytics';

const BouncyCardsFeatures = ({ data }) => {
  return (
    <section className="w-full text-slate-800 ">
      <div className="grid grid-cols-12 gap-5">
        {data.map((item, index) => (
          <BounceCard
            key={item.id}
            className={`col-span-10 md:col-span-12 bg-black/20 ${
              (index + Math.floor(index / 2)) % 2 === 0
                ? 'xl:col-span-7'
                : 'xl:col-span-5 '
            }`}
            data={item}
          />
        ))}
      </div>
    </section>
  );
};

const BounceCard = ({ className, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, delay: 0.2 },
      }}
      whileHover={{
        scale: 0.95,
        transition: { duration: 0.4 },
      }}
      className={`group hover:shadow-shad2  relative space-y-4 text-white h-48 cursor-pointer overflow-hidden rounded-2xl backdrop-blur-[2px] bg-primary3/35  md:py-8 px-1.5 ${className}`}
    >
      <div className="mx-auto text-xl font-semibold text-center group-hover:md:text-2xl group-hover:text-xl md:text-2xl">
        <h1 className="pt-4 transition-all duration-500  group-hover:md:-translate-y-3 md:pt-0 ">
          {data.serviceName}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-3 w-full px-8">
          {data.tools.map((Tool, i) => (
            <Tool
              key={`${data.serviceName}-${i}`}
              className="text-2xl md:text-3xl flex-shrink-0"
            />
          ))}
        </div>
        {data.link && (
          <div className="self-start absolute bottom-2 left-6 opacity-0 group-hover:opacity-100   duration-700 transition-all w-max z-20 rotate-[1deg] ">
            {data.link.includes('github.com') ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 cursor-pointer text-white text-sm md:text-base font-semibold bg-gradient-to-r from-primary5 to-primary3 px-5 py-1.5 mt-4 rounded-full border border-white  hover:border-gray-800 hover:from-primary3 hover:to-primary5 transition-colors duration-500"
                onClick={() => trackLinkClick('project_github_link', data.link)}
              >
                <FaGithub className="text-base font-bold md:text-xl mt-0.5" />
                Check it
              </a>
            ) : data.link.includes('linkedin.com') ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 cursor-pointer text-white text-sm md:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-1.5 mt-4 rounded-full border border-white  hover:border-gray-800 hover:from-blue-600 hover:to-blue-800 transition-colors duration-500"
                onClick={() =>
                  trackLinkClick('project_linkedin_link', data.link)
                }
              >
                <FaLinkedin className="text-base font-bold md:text-xl mt-0.5" />
                Check it
              </a>
            ) : (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 cursor-pointer text-white text-sm md:text-base font-semibold bg-gradient-to-r from-red-800 to-red-600 px-5 py-1.5 mt-4 rounded-full border border-white  hover:border-gray-800 hover:from-red-600 hover:to-red-800 transition-colors duration-500"
                onClick={() =>
                  trackLinkClick('project_youtube_link', data.link)
                }
              >
                <FaYoutube className=" text-base font-bold md:text-2xl mt-0" />
                Check it
              </a>
            )}
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${data.imgUrl})`,
          backgroundSize: '99% 99%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute bottom-0 z-10 left-4 right-4 top-16  md:top-24 translate-y-8 rounded-xl h-full p-4 transition-transform duration-[500ms] group-hover:md:-translate-y-14 group-hover:-translate-y-6 group-hover:rotate-[3deg] rotate-[-3deg]"
        onClick={() => trackButtonClick('project_card', data.projectName)}
      ></div>
    </motion.div>
  );
};

export default BouncyCardsFeatures;
