/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io';
import { LuSendHorizontal } from 'react-icons/lu';
import { HiMicrophone, HiStop } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { RiVoiceprintFill } from 'react-icons/ri';
import { FaPlay, FaPause } from 'react-icons/fa';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { FiExternalLink } from 'react-icons/fi';

import {
  BsThreeDotsVertical,
  BsDownload,
  BsFullscreen,
  BsFullscreenExit,
} from 'react-icons/bs';

import API from '../API';
import TextWithLinks from './TextWithLinks';
import MarkdownRenderer from './MarkdownRenderer';
import OrbChatButton from './OrbChatButton';
import OrbHeader from './OrbHeader';
import {
  trackChatBotOpened,
  trackChatBotClosed,
  trackChatBotMessage,
} from '../utils/analytics';
import {
  checkRateLimit,
  incrementRateLimit,
  getRateLimitStatus,
} from '../utils/rateLimiter';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mediaRecorderRef = useRef(null);

  // Audio playback states
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const audioRefs = useRef({});

  // Rate limiting state
  const [remainingMessages, setRemainingMessages] = useState(5);

  const chatRequest = async () => {
    if (!input.trim() || isSending) return;

    // Check rate limit before sending
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setMessages(prev => [
        ...prev,
        {
          text: "You've reached your daily limit of 5 messages. Please come back tomorrow! 😊",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      return;
    }

    const currentInput = input;
    setInput('');
    setIsSending(true);

    // Track chat message sent
    trackChatBotMessage('text', currentInput.length);

    if (!hasStartedChat) {
      setHasStartedChat(true);
      setMessages([]);
    }

    setMessages(prev => [
      ...prev,
      {
        text: currentInput,
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSending: true,
      },
    ]);

    // Get current message count for API
    const rateLimitStatus = getRateLimitStatus();
    const messageCount = rateLimitStatus.count;

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 120000),
      );

      const response = await Promise.race([
        API.post('/api/chat', {
          question: currentInput,
          sessionId: 'session-' + Date.now(), // Simple session ID
          messageCount: messageCount,
        }),
        timeoutPromise,
      ]);

      // Increment rate limit counter
      const newRateLimit = incrementRateLimit();
      setRemainingMessages(newRateLimit.remaining);

      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastMessageIndex = updatedMessages.length - 1;
        if (updatedMessages[lastMessageIndex].isSending) {
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            isSending: false,
          };
        }
        return [
          ...updatedMessages,
          {
            text: response.data.response,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            source: response.data.source, // 'rule-based' or 'openai'
          },
        ];
      });
    } catch (error) {
      console.error('Error fetching ', error);

      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastMessageIndex = updatedMessages.length - 1;
        if (updatedMessages[lastMessageIndex].isSending) {
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            isSending: false,
          };
        }

        let errorMessage = 'Oops! Something went wrong. Please try again later.';

        // Handle specific error cases
        if (error.response) {
          if (error.response.status === 429) {
            errorMessage =
              error.response.data?.message ||
              "You've reached your daily limit of 5 messages. Please come back tomorrow! 😊";
            setRemainingMessages(0);
          } else if (error.response.status === 400) {
            errorMessage =
              error.response.data?.error ||
              'Invalid request. Please try again.';
          } else if (error.response.status >= 500) {
            errorMessage =
              'AI service temporarily unavailable. Please try again later.';
          }
        } else if (error.message === 'Request timed out') {
          errorMessage = 'Sorry, the request timed out. Please try again!';
        } else if (error.message === 'Network Error') {
          errorMessage =
            'Connection error. Please check your internet and try again.';
        }

        return [
          ...updatedMessages,
          {
            text: errorMessage,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendVoiceMessage = async audioBlob => {
    // Check rate limit before sending
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setMessages(prev => [
        ...prev,
        {
          text: "You've reached your daily limit of 5 messages. Please come back tomorrow! 😊",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'audio.wav');

    // Get current message count for API
    const rateLimitStatus = getRateLimitStatus();
    formData.append('sessionId', 'session-' + Date.now());
    formData.append('messageCount', rateLimitStatus.count.toString());

    // Create URL for audio playback
    const audioUrl = URL.createObjectURL(audioBlob);
    const messageId = Date.now().toString();

    try {
      setIsSending(true);

      // If this is the first message, initialize the chat
      if (!hasStartedChat) {
        setHasStartedChat(true);
        setMessages([]);
      }

      setMessages(prev => [
        ...prev,
        {
          id: messageId,
          text: 'Voice Message',
          isBot: false,
          isVoice: true,
          audioUrl: audioUrl,
          duration: 0, // Will be updated when audio loads
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 120000),
      );

      const response = await Promise.race([
        API.post('/api/voice-chat', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        timeoutPromise,
      ]);

      // Increment rate limit counter
      const newRateLimit = incrementRateLimit();
      setRemainingMessages(newRateLimit.remaining);

      setMessages(prev => [
        ...prev,
        {
          text: response.data.response,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          transcription: response.data.transcription, // Include transcription if available
          source: response.data.source, // 'rule-based' or 'openai'
        },
      ]);
    } catch (error) {
      console.error('Error sending voice message:', error);

      let errorMessage = 'Sorry, there was an error processing your voice message.';

      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 429) {
          errorMessage =
            error.response.data?.message ||
            "You've reached your daily limit of 5 messages. Please come back tomorrow! 😊";
          setRemainingMessages(0);
        } else if (error.response.status === 400) {
          errorMessage =
            error.response.data?.message ||
            'Could not understand the audio. Please try again.';
        } else if (error.response.status >= 500) {
          errorMessage =
            'AI service temporarily unavailable. Please try again later.';
        }
      } else if (error.message === 'Request timed out') {
        errorMessage = 'Sorry, the voice request timed out. Please try again!';
      } else if (error.message === 'Network Error') {
        errorMessage =
          'Connection error. Please check your internet and try again.';
      }

      setMessages(prev => [
        ...prev,
        {
          text: errorMessage,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100,
        },
      });

      // Check for supported MIME types
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        mimeType = 'audio/ogg;codecs=opus';
      }

      const recorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000,
      });

      const audioChunks = [];

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        console.log('Audio blob created:', {
          size: audioBlob.size,
          type: audioBlob.type,
          chunks: audioChunks.length,
        });
        sendVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      recorder.start(100); // Collect data every 100ms
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isSending]);

  // Initialize remaining messages count on mount
  useEffect(() => {
    const status = getRateLimitStatus();
    setRemainingMessages(status.remaining);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const delayTimer = setTimeout(() => {
        setShowTooltip(true);
        const timer = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);

        return () => clearTimeout(timer);
      }, 1000); // 1 second delay before showing tooltip

      return () => clearTimeout(delayTimer);
    } else {
      // Ensure tooltip is hidden when chat is open
      setShowTooltip(false);
      setIsHovering(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (showSettings && !event.target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
      if (showCapabilities && !event.target.closest('.capabilities-window')) {
        setShowCapabilities(false);
      }
    };

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        if (showCapabilities) {
          setShowCapabilities(false);
        }
        if (showSettings) {
          setShowSettings(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSettings, showCapabilities]);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else if (!isSending) {
        // Send message with Enter
        e.preventDefault();
        chatRequest();
      }
    }
  };

  const downloadTranscript = () => {
    const transcript = messages
      .map(msg => {
        const sender = msg.isBot ? 'ChatBot Assistant' : 'You';
        const timestamp = msg.timestamp || new Date().toLocaleTimeString();
        return `[${timestamp}] ${sender}: ${msg.text}`;
      })
      .join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-transcript-${
      new Date().toISOString().split('T')[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // VoiceMessage Component
  const VoiceMessage = ({ message, isBot }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef(null);
    const messageId = message.id || `voice-${Date.now()}`;

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleLoadedMetadata = () => {
        const audioDuration = audio.duration;
        if (isFinite(audioDuration) && audioDuration > 0) {
          setDuration(audioDuration);
        } else {
          setDuration(0);
        }
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        const currentAudioTime = audio.currentTime;
        if (isFinite(currentAudioTime) && currentAudioTime >= 0) {
          setCurrentTime(currentAudioTime);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setCurrentPlayingId(null);
      };

      const handleError = () => {
        setDuration(0);
        setCurrentTime(0);
        setIsLoading(false);
        setIsPlaying(false);
        console.error('Audio loading error for message:', messageId);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }, [message.audioUrl, messageId]);

    const togglePlayPause = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setCurrentPlayingId(null);
      } else {
        // Pause any other playing audio
        if (currentPlayingId && currentPlayingId !== messageId) {
          const otherAudio = audioRefs.current[currentPlayingId];
          if (otherAudio) {
            otherAudio.pause();
          }
        }

        try {
          console.log('Attempting to play audio:', {
            src: audio.src,
            duration: audio.duration,
            readyState: audio.readyState,
          });

          await audio.play();
          setIsPlaying(true);
          setCurrentPlayingId(messageId);
          console.log('Audio started playing successfully');
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      }
    };

    const handleSeek = e => {
      const audio = audioRef.current;
      if (!audio) return;

      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickRatio = clickX / rect.width;
      const newTime = clickRatio * duration;

      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const formatTime = time => {
      if (isNaN(time) || !isFinite(time) || time < 0) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Store audio ref for global access
    useEffect(() => {
      if (audioRef.current) {
        audioRefs.current[messageId] = audioRef.current;
      }
      return () => {
        delete audioRefs.current[messageId];
      };
    }, [messageId]);

    return (
      <div className="flex items-center space-x-3 min-w-[200px]">
        <audio
          ref={audioRef}
          src={message.audioUrl}
          preload="metadata"
          controls={false}
        />

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isBot
              ? 'bg-primary1/20 hover:bg-primary1/30 text-primary1'
              : 'bg-white/20 hover:bg-white/30 text-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          ) : isPlaying ? (
            <FaPause className="w-4 h-4" />
          ) : (
            <FaPlay className="w-4 h-4 ml-0.5" />
          )}
        </motion.button>

        {/* Waveform/Progress Area */}
        <div className="flex-1 flex flex-col space-y-2">
          {/* Progress Bar */}
          <div className="relative h-2 group">
            <div
              className={`h-full rounded-full cursor-pointer ${
                isBot ? 'bg-gray-600' : 'bg-white/20'
              }`}
              onClick={handleSeek}
            >
              <motion.div
                className={`h-full rounded-full ${
                  isBot ? 'bg-primary1' : 'bg-white'
                }`}
                style={{ width: `${progress}%` }}
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Waveform Animation while playing */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center space-x-0.5">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full ${
                      isBot ? 'bg-primary1/30' : 'bg-white/30'
                    }`}
                    animate={{
                      height: [2, Math.random() * 8 + 4, 2],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Time Display */}
          <div
            className={`flex justify-between text-xs ${
              isBot ? 'text-gray-400' : 'text-white/70'
            }`}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  };

  const capabilities = [
    {
      text: "Provide details about Mostafa's experience, skills, and background",
    },
    {
      text: 'Share information about his projects and portfolio',
    },
    {
      text: 'Give access to his resume, certifications, and achievements',
    },
    {
      text: 'Provide professional contact info and social links',
    },
    {
      text: 'Answer questions about his AI/ML work and expertise',
    },
  ];

  return (
    <div className="fixed bottom-4 md:bottom-9 right-3 md:right-4 z-30 cursor-default">
      {!isOpen && (showTooltip || isHovering) && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{
            delay: showTooltip && !isHovering ? 0.55 : 0,
            duration: 1,
          }}
          className="absolute bottom-0.5 right-[5.5rem] bg-slate-400 text-black px-4  py-2 rounded-lg shadow-lg mb-2 whitespace-nowrap"
        >
          <div className="text-sm font-medium">Need help?</div>
          <div className="text-xs opacity-90">Chat with our AI assistant</div>
          <div className="absolute -rotate-90 top-[45%] -right-2.5 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-400"></div>
        </motion.div>
      )}

      {!isOpen ? (
        <motion.button
          onClick={() => {
            setShowCapabilities(false), setIsOpen(true);
            setShowTooltip(true);
            trackChatBotOpened();
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-center p-3">
            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 rounded-full">
                <OrbChatButton
                  size={12}
                  hoverIntensity={0.3}
                  rotateOnHover={true}
                  forceHoverState={isHovering}
                />
              </div>
              <div className="relative z-10 flex items-center justify-center w-12 h-12"></div>
            </div>
          </div>

          {/* Expanding text on hover like original design */}
          <motion.div
            className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pl-4 pr-16 whitespace-nowrap">
              <p className="text-sm font-semibold">Chat With Me</p>
            </div>
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.button>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            style={{ transformOrigin: 'bottom right' }}
            className={`backdrop-blur-[15px] bg-black/70 border border-primary4/60 rounded-2xl shadow-shad2 flex flex-col transform transition-all duration-500 ease-out ${
              isMaximized
                ? 'fixed bottom-4 right-4 z-40 overflow-hidden w-[75vw] h-[85vh]'
                : hasStartedChat
                ? 'w-[350px] h-[580px] md:w-[430px] md:h-[70vh] overflow-hidden'
                : 'w-[350px] h-auto md:w-[430px] md:h-[70vh] scale-95 hover:scale-100 overflow-hidden'
            }`}
          >
            <div className="bg-gradient-to-r from-primary1 via-primary2 to-primary3 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary1/95 via-primary2/95 to-primary3/95">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full p-1 backdrop-blur-sm border border-white/30 shadow-lg">
                    <OrbHeader
                      size={14}
                      hoverIntensity={0.3}
                      rotateOnHover={true}
                      forceHoverState={false}
                    />
                  </div>
                  <div>
                    <div className="text-white text-lg font-semibold font-customFont drop-shadow-sm">
                      AI Assistant 🤖
                    </div>
                    <div className="text-white/90 text-sm font-myFont">
                      {hasStartedChat
                        ? 'Online • Ready to help'
                        : 'What can I help you with?'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {hasStartedChat && (
                    /* Settings button with dropdown  */
                    <div className="relative settings-dropdown">
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/20 hover:scale-105"
                        title="Chat settings"
                      >
                        <BsThreeDotsVertical className="w-5 h-5" />
                      </button>

                      {/* Settings dropdown menu */}
                      <AnimatePresence>
                        {showSettings && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="fixed bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-primary4/50 py-2 min-w-[240px] overflow-hidden"
                            style={{
                              right: '1rem',
                              top: '6rem',
                              zIndex: 9999,
                            }}
                          >
                            {/* Chat capabilities */}
                            <button
                              onClick={() => {
                                setShowCapabilities(!showCapabilities);
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <IoMdInformationCircle className="w-6 h-6 text-primary1" />
                              <span className="text-sm font-medium font-myFont">
                                Chat capabilities
                              </span>
                            </button>

                            <div className="border-t border-primary4/30 my-1"></div>

                            {/* Download transcript */}
                            <button
                              onClick={() => {
                                downloadTranscript();
                                setShowSettings(false);
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white flex items-center space-x-3 transition-all duration-200"
                            >
                              <BsDownload className="w-4 h-4 text-primary3" />
                              <span className="text-sm font-medium font-myFont">
                                Download chat transcript
                              </span>
                            </button>

                            {/* Maximize window - Hidden on mobile */}
                            <button
                              onClick={() => {
                                toggleMaximize();
                                setShowSettings(false);
                              }}
                              className="hidden md:flex w-full px-4 py-3 text-left text-gray-200 hover:bg-primary1/20 hover:text-white items-center space-x-3 transition-all duration-200"
                            >
                              {isMaximized ? (
                                <BsFullscreenExit className="w-4 h-4 text-primary3" />
                              ) : (
                                <BsFullscreen className="w-4 h-4 text-primary3" />
                              )}
                              <span className="text-sm font-medium font-myFont">
                                {isMaximized
                                  ? 'Exit fullscreen'
                                  : 'Maximize window'}
                              </span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <motion.button
                    onClick={() => {
                      trackChatBotClosed();
                      setIsOpen(false);
                      setIsMaximized(false);
                      setShowTooltip(false);
                      setIsHovering(false);
                    }}
                    className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    title="Close chat"
                  >
                    <IoMdClose className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Quick topic pills - only show if chat hasn't started */}
              {!hasStartedChat && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative mt-3 flex flex-wrap gap-2"
                >
                  {['portfolio', 'projects', 'skills', 'contact'].map(
                    (topic, index) => (
                      <motion.button
                        key={topic}
                        onClick={() => setInput(`Tell me about your ${topic}`)}
                        className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/20 hover:bg-primary1/30 text-white text-[11px] md:text-xs rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary1/50 font-myFont"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      >
                        {topic}
                      </motion.button>
                    ),
                  )}
                </motion.div>
              )}
            </div>

            {/* Messages area - show with smooth transition */}
            <AnimatePresence mode="wait">
              {hasStartedChat ? (
                <motion.div
                  key="messages-area"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar"
                >
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className={`flex ${
                          message.isBot ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-lg transition-all duration-300 ${
                            message.isBot
                              ? 'bg-gray-900/90 backdrop-blur-sm border border-primary4/40 text-gray-100'
                              : 'bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white shadow-shad'
                          }`}
                        >
                          {message.isVoice ? (
                            message.audioUrl ? (
                              <VoiceMessage
                                message={message}
                                isBot={message.isBot}
                              />
                            ) : (
                              <div className="flex items-start space-x-3">
                                <RiVoiceprintFill className="w-5 h-5 flex-shrink-0 animate-pulse" />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {message.text}
                                  </span>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs opacity-75">
                                      {message.timestamp}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          ) : message.isBot ? (
                            <div>
                              <MarkdownRenderer content={message.text} />
                              {message.timestamp && (
                                <div className="text-xs text-gray-500 mt-2">
                                  {message.timestamp}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-start space-x-3">
                              <div className="flex flex-col">
                                <div>
                                  <TextWithLinks text={message.text} />
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-xs opacity-90">
                                    {message.timestamp}
                                  </span>
                                  {message.isSending && (
                                    <span className="text-xs animate-pulse">
                                      Sending...
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome-area"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex-1 flex items-center justify-center p-4 md:p-6"
                >
                  <div className="text-center space-y-3">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg md:text-xl font-bold text-primary1 mb-2 md:mb-4 font-customFont"
                    >
                      Welcome to AI Assistant
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-gray-300 text-xs md:text-sm leading-relaxed font-myFont px-2"
                    >
                      I&apos;m here to help you learn about Mostafa Samy&apos;s
                      work as an AI Engineer and Data Scientist. Ask about his
                      projects, skills, experience, or contact information. Type a message or
                      use one of the topic buttons above to get started!
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input area - always show */}
            <div className="bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-md p-3 md:p-4 border-t border-primary4/30">
              {/* Quick capabilities pills - only show if chat hasn't started */}
              {showCapabilities && !hasStartedChat && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-primary4/40 overflow-hidden relative capabilities-window"
                >
                  {/* Close button */}
                  <motion.button
                    onClick={() => setShowCapabilities(false)}
                    className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Close capabilities"
                  >
                    <IoMdClose className="w-4 h-4" />
                  </motion.button>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary1 to-primary2 rounded-full flex items-center justify-center">
                      <IoMdInformationCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary1 font-semibold font-customFont">
                      What I can help with:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 font-myFont">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary1 rounded-full"></span>
                      <span>Portfolio overview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary2 rounded-full"></span>
                      <span>Project details</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary3 rounded-full"></span>
                      <span>Skills & experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary1 rounded-full"></span>
                      <span>Contact information</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Capabilities panel for existing chats */}
              {showCapabilities && hasStartedChat && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-primary4/40 overflow-hidden relative capabilities-window"
                >
                  {/* Close button */}
                  <motion.button
                    onClick={() => setShowCapabilities(false)}
                    className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Close capabilities"
                  >
                    <IoMdClose className="w-4 h-4" />
                  </motion.button>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary1 to-primary2 rounded-full flex items-center justify-center">
                      <IoMdInformationCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-primary1 font-semibold font-customFont">
                      Chat capabilities:
                    </span>
                  </div>
                  <div className="space-y-2">
                    {capabilities.map((capability, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 text-xs text-gray-300 font-myFont"
                      >
                        <VscActivateBreakpoints className="w-4 h-4 flex-shrink-0 text-primary2 mt-0.5" />
                        <span>{capability.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer with additional info */}
                  <motion.div
                    className="mt-3 pt-3 border-t border-primary4/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-myFont">
                        Want to know more?
                      </span>
                      <a
                        href="https://github.com/mustafasamy28"
                        target="_blank"
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-primary1 to-primary2 hover:from-primary2 hover:to-primary3 text-white text-xs rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary1/25"
                      >
                        <span>View Repo</span>
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              <div className="flex space-x-3 justify-between items-center pr-12 md:pr-14">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      hasStartedChat
                        ? 'Type your message...'
                        : "Ask me anything about Mostafa's work..."
                    }
                    disabled={isSending}
                    rows={1}
                    className="w-full bg-gray-800/60 text-gray-100 placeholder-gray-400 placeholder:text-xs md:placeholder:text-sm placeholder:mt-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent disabled:opacity-50 resize-none overflow-hidden border border-primary4/50 backdrop-blur-sm transition-all duration-300 hover:border-primary1/60 pt-2.5 md:pt-3 pb-2 pl-2 pr-10 md:pr-12 text-sm md:text-base"
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                  />

                  {/* Send button inside input */}
                  <motion.button
                    onClick={chatRequest}
                    disabled={!input.trim() || isSending}
                    className="absolute right-2 top-[0.30rem] bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white p-1.5 md:p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-shad shadow-lg group"
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <LuSendHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isSending}
                    className={`absolute p-1.5 md:p-2 -right-10 md:-right-12 top-[0.4rem] rounded-full transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group ${
                      isRecording
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'
                        : 'bg-gradient-to-r from-primary1 via-primary2 to-primary3 text-white hover:shadow-shad shadow-lg'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      isRecording
                        ? {
                            boxShadow: [
                              '0 0 0 0 rgba(239, 68, 68, 0.4)',
                              '0 0 0 10px rgba(239, 68, 68, 0)',
                              '0 0 0 0 rgba(239, 68, 68, 0.4)',
                            ],
                          }
                        : {}
                    }
                    transition={{
                      boxShadow: { duration: 1.5, repeat: Infinity },
                    }}
                  >
                    {isRecording ? (
                      <HiStop className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <HiMicrophone className="w-4 h-4 md:w-5 md:h-5" />
                    )}

                    {isRecording && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-300"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Professional footer */}
              <div className="mt-4 md:mt-6 text-[10px] md:text-xs text-gray-400 text-center font-myFont">
                Press Enter to send • Shift + Enter for new line
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
