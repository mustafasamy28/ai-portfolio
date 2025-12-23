/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { SiMinutemailer } from 'react-icons/si';

const ExampleWrapper = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className="bg-gradient-to-br from-primary1 to-primary5 text-white p-6 rounded-lg w-full max-w-lg shadow-shad shadow-primary4 cursor-custom relative overflow-hidden"
          >
            <SiMinutemailer className="text-white/10 rotate-12 text-[250px]  absolute z-0 -top-14 -left-24" />
            <div className="relative z-10 ">
              <div className="bg-white  w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <SiMinutemailer className="text-primary5" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Thank you for your interest
              </h3>
              <p className="text-center mb-0  text-purple-200">
                Your message has been sent successfully.
              </p>
              <p className="text-center mb-6  text-purple-200">
                Please check your inbox.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white text-xl hover:opacity-80 hover:shadow-shad shadow-primary3 transition-opacity text-primary2 font-bold w-full py-1.5 rounded cursor-pointer"
              >
                QUIT
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExampleWrapper;
