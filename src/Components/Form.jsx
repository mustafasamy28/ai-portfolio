/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import FloatingNotif from './FloatingNotif';
import { BiCommentError } from 'react-icons/bi';

import { PiWarningCircleFill } from 'react-icons/pi';
import { FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { trackFormSubmitted } from '../utils/analytics';

const NOTIFICATION_TTL = 5000;
const PUBLIC_kEY = '6LenvhQqAAAAAPlAG2EoXWetFNLXhIn-jwjf3_gp';

const Form = () => {
  const form = useRef();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userSubject, setUserSubject] = useState('');
  const [userText, setUserText] = useState('');
  const [errors, setErrors] = useState({
    username: false,
    email: '',
    subject: false,
    message: false,
  });
  const [userSub, setUserSub] = useState(false);
  const [capVal, setCapVal] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [send, setSend] = useState('Send Message!');
  const [errorNotif, setErrorNotif] = useState(false);

  const [focus, setFocus] = useState({
    username: false,
    email: false,
    subject: false,
    message: false,
  });

  const Notification = ({ children }) => {
    useEffect(() => {
      const timeoutRef = setTimeout(() => {
        setUserSub(false);
      }, NOTIFICATION_TTL);

      return () => clearTimeout(timeoutRef);
    }, []);

    return (
      <motion.div
        initial={{ x: 80 }}
        animate={{ x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{
          duration: 0.9,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 40,
        }}
        className={`px-2 py-3 fixed top-3 right-2 z-50 flex space-x-2 items-start rounded text-sm shadow-lg text-white  pointer-events-auto ${
          !errorNotif ? 'bg-primary3' : 'bg-red-500'
        }`}
      >
        {children}
      </motion.div>
    );
  };

  const handleChange = (e, setter, field) => {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setter(value);

    if (field === 'email') {
      if (value.trim() === '') {
        setErrors({
          ...errors,
          [field]: 'Email is required',
        });
      } else if (!emailRegex.test(value)) {
        setErrors({
          ...errors,
          [field]: 'Invalid email address',
        });
      } else {
        setErrors({
          ...errors,
          [field]: '',
        });
      }
    } else {
      setErrors({
        ...errors,
        [field]: value.trim() === '',
      });
    }
  };

  const handleFocus = field => {
    setFocus({
      ...focus,
      [field]: true,
    });
  };

  const handleBlur = field => {
    setFocus({
      ...focus,
      [field]: false,
    });
  };

  const sub = e => {
    e.preventDefault();
    if (
      !errors.username &&
      errors.email === '' &&
      !errors.subject &&
      !errors.message &&
      userName.trim() !== '' &&
      userEmail.trim() !== '' &&
      userSubject.trim() !== '' &&
      userText.trim() !== '' &&
      capVal != null
    ) {
      setSend('Sending...');
      setTimeout(() => setSend('Send Message!'), 1000);
      emailjs
        .sendForm(
          String(import.meta.env.VITE_REACT_APP_SERVICE_ID),
          import.meta.env.VITE_REACT_APP_TEMPLATE_ID,
          form.current,
          {
            publicKey: import.meta.env.VITE_REACT_APP_PUBLIC_KEY,
          },
        )
        .then(
          () => {
            // console.log('SUCCESS!');
            trackFormSubmitted('contact_form');
            reset();
            setIsNotifOpen(true);
            setErrorNotif(false);
          },
          error => {
            setErrorNotif(true);
            console.log('FAILED...', error.text);
          },
        );
    } else {
      setUserSub(true);
    }
  };

  const reset = () => {
    setErrors({
      username: false,
      email: '',
      subject: false,
      message: false,
    });
    setUserName('');
    setUserEmail('');
    setUserSubject('');
    setUserText('');
    setCapVal(null);
    setUserSub(false);
  };

  return (
    <>
      {userSub && (
        <AnimatePresence>
          <Notification>
            <div className="inline-block text-xl">
              <PiWarningCircleFill />
            </div>

            <div>Please fill in all the required fields</div>
            <div>
              <button
                onClick={() => setUserSub(false)}
                className="ml-auto mt-0.5 transition-all duration-300  hover:text-gray-950 hover:scale-150 "
              >
                <FiX className="duration-500" />
              </button>
            </div>
          </Notification>
        </AnimatePresence>
      )}
      {errorNotif && (
        <AnimatePresence>
          <Notification>
            <div className="inline-block text-xl">
              <BiCommentError />
            </div>

            <div>Email not sent , please try later</div>
            <div>
              <button
                onClick={() => setErrorNotif(false)}
                className="ml-auto mt-0.5 transition-all duration-300  hover:text-gray-950 hover:scale-150 "
              >
                <FiX className="duration-500" />
              </button>
            </div>
          </Notification>
        </AnimatePresence>
      )}

      <form className="space-y-8 md:space-y-6 " onSubmit={sub} ref={form}>
        <motion.div
          className={`flex items-center justify-center space-x-10 text-white ${
            focus.username || focus.email ? 'backdrop-blur-[3px]' : ''
          }`}
          initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full">
            <input
              id="username"
              value={userName}
              onChange={e => handleChange(e, setUserName, 'username')}
              name="user_name"
              type="text"
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-primary2 transition-colors focus:outline-none peer bg-inherit w-full ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            <label
              htmlFor="username"
              className={`absolute left-0 cursor-text transition-all ${
                userName !== '' ? '-top-4 text-sm text-primary2 ' : 'top-1'
              } peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary2 `}
            >
              Name
            </label>
            {errors.username && (
              <p className="text-red-500 text-xs">* UserName is required</p>
            )}
          </div>

          <div className="relative w-full">
            <input
              id="email"
              value={userEmail}
              onChange={e => handleChange(e, setUserEmail, 'email')}
              name="user_email"
              type="text"
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-primary2  transition-colors focus:outline-none peer bg-inherit w-full ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            <label
              htmlFor="email"
              className={`absolute left-0 cursor-text transition-all ${
                userEmail !== '' ? '-top-4 text-sm text-primary2 ' : 'top-1'
              } peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary2 `}
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs"> * {errors.email}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className={`flex flex-col items-center justify-center text-white ${
            focus.subject ? 'backdrop-blur-[3px]' : ''
          }`}
          initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <input
            id="subject"
            value={userSubject}
            onChange={e => handleChange(e, setUserSubject, 'subject')}
            name="user_subject"
            type="text"
            onFocus={() => handleFocus('subject')}
            onBlur={() => handleBlur('subject')}
            className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-primary2  transition-colors focus:outline-none peer bg-inherit w-full ${
              errors.subject ? 'border-red-500' : ''
            }`}
          />
          <label
            htmlFor="subject"
            className={`absolute left-0 cursor-text transition-all ${
              userSubject !== '' ? '-top-4 text-sm text-primary2 ' : 'top-1'
            } peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary2 `}
          >
            Subject
          </label>
          {errors.subject && (
            <p className="self-start text-red-500 text-xs">
              * Subject is required
            </p>
          )}
        </motion.div>

        <motion.div
          className={`flex items-center justify-center flex-col text-white ${
            focus.message ? 'backdrop-blur-[3px]' : ''
          }`}
          initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <textarea
            id="message"
            name="message"
            rows={3}
            value={userText}
            onChange={e => handleChange(e, setUserText, 'message')}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-primary2  transition-colors focus:outline-none peer bg-inherit w-full ${
              errors.message ? 'border-red-500' : ''
            }`}
          ></textarea>
          <label
            htmlFor="message"
            className={`absolute left-0 cursor-text transition-all ${
              userText !== '' ? '-top-4 text-sm text-primary2 ' : 'top-1'
            } peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary2 `}
          >
            Message
          </label>
          {errors.message && (
            <div className="self-start text-red-500 text-xs">
              * Message is required
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <ReCAPTCHA
            sitekey={PUBLIC_kEY}
            onChange={capVal => setCapVal(capVal)}
            theme="dark"
          />
        </motion.div>
        <motion.div
          className="flex justify-start space-x-7 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.42, 0, 0.58, 1],
            delay: 0.3,
          }}
        >
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-primary1 to-primary2 hover:from-primary2 hover:to-primary3 text-white font-bold px-8 py-3 rounded-lg border-2 border-primary1 shadow-shad hover:shadow-primary3 hover:border-primary3 transition-all duration-300 hover:scale-105 active:scale-95 min-w-[140px]"
          >
            {send}
          </motion.button>
          <div className="max-w-32 hover:ring hover:ring-primary3 bg-primary2 font-bold  shadow-shad hover:shadow-primary3 rounded-lg items-center justify-center flex border-primary2 hover:bg-primary4 text-primary5 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
            <button type="reset" onClick={reset} className="px-7 py-2">
              Reset
            </button>
          </div>
        </motion.div>
      </form>
      <FloatingNotif isOpen={isNotifOpen} setIsOpen={setIsNotifOpen} />
    </>
  );
};

export default Form;
