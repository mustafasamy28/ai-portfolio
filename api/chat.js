/**
 * Vercel Serverless Function: Text Chat Endpoint
 * Handles chatbot requests with OpenAI GPT-4o-mini
 * Rule-based system has been commented out - all requests go directly to OpenAI
 */

// Rule-based system commented out - all requests now go to OpenAI GPT-4o-mini
// Embedded responses data (deprecated - kept for reference)
/*
const responsesData = {
  topics: {
    projects: {
      keywords: [
        'project',
        'projects',
        'portfolio',
        'work',
        'build',
        'built',
        'developed',
        'created',
        'ai trading',
        'trading system',
        'rag',
        'faq assistant',
        'house price',
        'prediction',
        'machine learning',
        'what have you built',
        'what did you create',
        'show me your work',
        'tell me about your projects',
      ],
      responses: [
        "I've worked on several exciting projects! My main ones include:\n\n**AI Trading System** - An autonomous multi-agent trading platform with 4 AI traders using different investment strategies (value, macro, systematic, crypto). They manage $10K portfolios and execute 100+ trades daily with full audit trails.\n\n**Intelligent FAQ Assistant with RAG** - A production RAG system that handles 5,000+ queries daily with 92% accuracy. It reduced customer support costs by $250K annually and achieved 4.7/5 user satisfaction.\n\n**House Price Prediction System** - An ML pipeline achieving 92% prediction accuracy with $15K average error on $300K+ properties, processing valuations in under 2 seconds.\n\nWould you like details on any specific project?",
        "I specialize in building production-ready AI and ML systems. My standout projects include:\n\n• **AI Trading System** - Multi-agent platform with autonomous traders\n• **RAG FAQ Assistant** - Enterprise-grade knowledge system handling 5K+ daily queries\n• **House Price Prediction** - ML model with 92% accuracy for real estate valuation\n\nEach project demonstrates end-to-end development from data to deployment. Which project interests you most?",
        "I've built several production AI systems:\n\n**AI Trading System**: Autonomous multi-agent trading with 4 AI traders managing portfolios\n**RAG FAQ Assistant**: Enterprise support system with 92% accuracy, handling 5K+ queries/day\n**House Price Prediction**: ML model with 92% accuracy for property valuation\n\nAll projects are production-ready with full MLOps pipelines. Want to know more about any of them?",
      ],
    },
    skills: {
      keywords: [
        'skill',
        'skills',
        'technology',
        'technologies',
        'tech stack',
        'what can you do',
        'what do you know',
        'expertise',
        'proficient',
        'python',
        'pytorch',
        'tensorflow',
        'llm',
        'llms',
        'langchain',
        'rag',
        'machine learning',
        'ai',
        'data science',
        'programming',
        'languages',
        'frameworks',
        'tools',
      ],
      responses: [
        "I'm an AI Engineer specializing in LLMs, agentic workflows, and applied machine learning. Here's my tech stack:\n\n**Programming Languages**: Python, SQL, JavaScript, TypeScript, C++, Java\n\n**AI/ML & LLMs**: PyTorch, TensorFlow, Scikit-learn, XGBoost, Hugging Face Transformers, OpenAI API, LangChain, RAG, Prompt Engineering, Multi-Agent Systems\n\n**Frontend**: React, Next.js, Tailwind CSS, Framer Motion, Streamlit, Gradio\n\n**Databases**: PostgreSQL, MongoDB, Redis, SQLite, Pinecone, FAISS, ChromaDB\n\n**Cloud & MLOps**: AWS, GCP, Azure, Vercel, Docker, MLflow, Git, CI/CD\n\n**Backend**: FastAPI, REST APIs, Model Deployment & Monitoring\n\nI build scalable AI systems covering the full lifecycle from data to deployment!",
        "My expertise spans the full AI/ML stack:\n\n**Core Skills**:\n• LLMs & Agentic Systems (LangChain, RAG, Multi-Agent Workflows)\n• Deep Learning (PyTorch, TensorFlow)\n• Traditional ML (Scikit-learn, XGBoost)\n• MLOps (Docker, MLflow, CI/CD)\n\n**Languages**: Python (primary), SQL, JavaScript, TypeScript\n\n**Infrastructure**: AWS, GCP, Azure, Docker, FastAPI\n\nI focus on production-ready solutions, not just demos. What would you like to know more about?",
        "I specialize in building production AI systems. My main skills:\n\n**AI/ML**: PyTorch, LLMs, RAG, LangChain, Multi-Agent Systems, Transformers\n**Languages**: Python, SQL, JavaScript, TypeScript\n**MLOps**: Docker, MLflow, CI/CD, Cloud (AWS/GCP/Azure)\n**Backend**: FastAPI, REST APIs\n**Frontend**: React, Streamlit, Gradio\n\nI build end-to-end solutions from data to deployment. Which area interests you?",
      ],
    },
    experience: {
      keywords: [
        'experience',
        'work',
        'job',
        'career',
        'background',
        'employment',
        'worked',
        'worked at',
        'where have you worked',
        'what companies',
        'employment history',
        'professional',
        'freelance',
        'mobica',
        'invisible',
        'meridian',
        'mostaql',
      ],
      responses: [
        "I'm currently working as an **AI Engineer & LLM Specialist** (Freelance & Contract, 2025-Present), helping startups and businesses deploy production-ready AI solutions.\n\nI'm also an **AI Trainer & LLM Evaluator** at Meridian Marketplace (Invisible) since Oct 2025, improving LLM quality and reliability.\n\nPreviously, I was an **AI Engineer & Instructor at Mobica** (2024-2025), where I built production AI systems and mentored 50+ engineers.\n\nI've been a **Data Scientist** (Freelance, 2023-Present) delivering custom ML solutions across industries.\n\nBefore AI, I worked in Public Relations & Innovation (2019-2022), which helped me bridge business and technology effectively.",
        "My experience spans AI engineering, data science, and education:\n\n**Current Roles**:\n• AI Engineer & LLM Specialist (Freelance, 2025-Present)\n• AI Trainer & LLM Evaluator at Meridian Marketplace (2025-Present)\n\n**Previous**:\n• AI Engineer & Instructor at Mobica (2024-2025) - Built production AI systems, mentored 50+ engineers\n• Data Scientist (Freelance, 2023-Present) - Custom ML solutions\n\nI focus on production-ready AI systems that solve real business problems. Want details on any role?",
        "I've been building AI systems professionally since 2023:\n\n**Current**: AI Engineer (Freelance) + LLM Evaluator at Meridian Marketplace\n**2024-2025**: AI Engineer & Instructor at Mobica - mentored 50+ engineers\n**2023-Present**: Data Scientist (Freelance) - custom ML solutions\n\nI specialize in production-ready AI, not experimental code. All my work focuses on real business value. What would you like to know?",
      ],
    },
    contact: {
      keywords: [
        'contact',
        'email',
        'reach',
        'reach out',
        'get in touch',
        'how to contact',
        'linkedin',
        'github',
        'social',
        'social media',
        'connect',
        'hire',
        'collaborate',
        'work together',
        'available',
        'freelance',
        'contract',
      ],
      responses: [
        "I'd love to connect! Here's how to reach me:\n\n**Email**: mustafasamy28@gmail.com\n\n**LinkedIn**: https://www.linkedin.com/in/mostafa-samy-9b95711a7/\n\n**GitHub**: https://github.com/mustafasamy28\n\nI'm available for freelance AI/ML projects, consulting, and collaborations. Feel free to reach out if you have an interesting project or just want to chat about AI!",
        "You can reach me at:\n\n📧 **Email**: mustafasamy28@gmail.com\n🔗 **LinkedIn**: https://www.linkedin.com/in/mostafa-samy-9b95711a7/\n💻 **GitHub**: https://github.com/mustafasamy28\n\nI'm open to freelance work, consulting, and interesting AI/ML projects. Don't hesitate to get in touch!",
        "Here's how to contact me:\n\n• **Email**: mustafasamy28@gmail.com\n• **LinkedIn**: https://www.linkedin.com/in/mostafa-samy-9b95711a7/\n• **GitHub**: https://github.com/mustafasamy28\n\nI'm available for AI/ML projects, consulting, and collaborations. Let's connect!",
      ],
    },
    general: {
      keywords: [
        'hello',
        'hi',
        'hey',
        'greetings',
        'who are you',
        'what do you do',
        'tell me about yourself',
        'introduce',
        'introduction',
        'about',
        'bio',
        'background',
        'what is your name',
        'who is mostafa',
        'help',
        'what can you help with',
        'capabilities',
      ],
      responses: [
        "Hi! I'm Mostafa Samy's AI assistant. I can help you learn about his work as an AI Engineer and Data Scientist.\n\nI can tell you about:\n• His projects (AI Trading System, RAG FAQ Assistant, House Price Prediction)\n• His skills and technologies\n• His professional experience\n• How to contact him\n\nWhat would you like to know?",
        "Hello! I'm here to help you learn about Mostafa Samy - an AI Engineer specializing in LLMs, agentic workflows, and production ML systems.\n\nI can answer questions about his projects, skills, experience, and how to get in touch. Feel free to ask anything!",
        "Hey there! I'm Mostafa's portfolio assistant. Mostafa is an AI Engineer & Data Scientist based in Cairo, Egypt, building production-ready AI solutions.\n\nAsk me about his projects, skills, experience, or contact info. How can I help?",
      ],
    },
  },
  fallback:
    "I don't have a specific answer for that, but I can help you learn about Mostafa's projects, skills, experience, or contact information. What would you like to know?",
};
*/

// Embedded keyword matching logic (deprecated - kept for reference)
/*
function normalizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ');
}

function matchKeyword(normalizedInput, keyword) {
  const normalizedKeyword = normalizeInput(keyword);

  if (normalizedInput === normalizedKeyword) {
    return 1.0;
  }

  if (
    normalizedInput.includes(normalizedKeyword) ||
    normalizedKeyword.includes(normalizedInput)
  ) {
    return 0.8;
  }

  const inputWords = normalizedInput.split(' ');
  const keywordWords = normalizedKeyword.split(' ');

  for (const kw of keywordWords) {
    if (inputWords.includes(kw)) {
      return 0.7;
    }
  }

  return 0;
}

function matchKeywordResponse(userInput, responsesData) {
  if (!userInput || !responsesData || !responsesData.topics) {
    return null;
  }

  const normalizedInput = normalizeInput(userInput);

  if (normalizedInput.length === 0) {
    return null;
  }

  let bestMatch = null;
  let bestConfidence = 0;
  const confidenceThreshold = 0.3;

  for (const [topicName, topicData] of Object.entries(responsesData.topics)) {
    if (!topicData.keywords || !topicData.responses) {
      continue;
    }

    for (const keyword of topicData.keywords) {
      const confidence = matchKeyword(normalizedInput, keyword);

      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        const randomResponse =
          topicData.responses[
            Math.floor(Math.random() * topicData.responses.length)
          ];
        bestMatch = {
          response: randomResponse,
          confidence: confidence,
          topic: topicName,
        };
      }
    }
  }

  if (bestMatch && bestConfidence >= confidenceThreshold) {
    return bestMatch;
  }

  return null;
}
*/

// Enhanced system prompt for OpenAI GPT-4o-mini with comprehensive personal details
const SYSTEM_PROMPT = `You are Mostafa Samy's portfolio assistant. Answer questions about him naturally and conversationally.

**Basic Info:**
- Age: 26
- Location: Cairo, Egypt
- Languages: Arabic (native), English (professional)

**Professional Focus:**
- AI Engineer specializing in LLMs, AI Agents, RAG, model fine-tuning
- Background in applied AI projects, chatbot development, production systems
- Strong interest in Machine Learning, LLMs, Data Engineering, BI

**Projects:**
- AI Trading System: Multi-agent autonomous trading platform with 4 AI traders
- RAG FAQ Assistant: Production system handling 5K+ queries/day with 92% accuracy
- House Price Prediction: ML pipeline with 92% prediction accuracy

**Skills:**
Python, PyTorch, LLMs, RAG, MLOps, Hugging Face, LangChain, FastAPI, Docker, React, Data Engineering, BI

**Experience:**
- AI Engineer & LLM Specialist (Freelance, 2025-Present)
- AI Trainer at Meridian Marketplace (2025-Present)
- AI Engineer & Instructor at Mobica (2024-2025)
- Data Scientist (Freelance, 2023-Present)

**Hobbies & Interests:**
- Working with AI and language models (even for fun)
- Building chatbots, exploring data engineering and BI concepts
- Reading about real-world AI applications, tech trends
- System design and business ideas mixing tech with real markets
- Meaningful conversations and professional self-improvement
- Going to the gym, lifting weights, staying physically active
- Listening to music during workouts, using gym time to reset
- Reading, watching tech-adjacent content
- Coffee enthusiast

**Personality & Values:**
- Constant learner, curious by nature
- Allergic to vague requirements
- Prefers clear goals, hates vague plans
- Enjoys simple routines
- Believes consistency beats motivation
- Values clarity, responsibility
- Believes in deeply understanding the problem before touching the solution
- Enjoys turning complex AI concepts into simple explanations
- Strongly dislikes vague prompts
- Believes prompt engineering is a real superpower
- Believes good prompts can save lives (or at least deadlines)

**Contact:**
Email: mustafasamy28@gmail.com
LinkedIn: https://www.linkedin.com/in/mostafa-samy-9b95711a7/
GitHub: https://github.com/mustafasamy28

**Response Style:**
- Keep responses under 150 words
- Be professional, friendly, and conversational
- Show personality when appropriate
- Reference hobbies/interests naturally when relevant
- Be authentic to Mostafa's voice and values`;

const MAX_MESSAGES_PER_DAY = 5;

/**
 * Call OpenAI API to generate response
 */
async function callOpenAI(question) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question },
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `OpenAI API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return (
    data.choices[0]?.message?.content ||
    'I apologize, but I could not generate a response.'
  );
}

/**
 * Main handler for /api/chat endpoint
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    // 1. Validate input
    const { question, sessionId, messageCount } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        error: 'Invalid input. Question is required and must be a non-empty string.',
      });
    }

    // 2. Check rate limit
    const currentMessageCount =
      typeof messageCount === 'number' ? messageCount : 0;
    if (currentMessageCount >= MAX_MESSAGES_PER_DAY) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message:
          "You've reached your daily limit of 5 messages. Please come back tomorrow! 😊",
        remaining: 0,
      });
    }

    // 3. Process all requests with OpenAI GPT-4o-mini
    // Rule-based system commented out - all requests go directly to OpenAI
    // const keywordMatch = matchKeywordResponse(question.trim(), responsesData);
    // if (keywordMatch && keywordMatch.confidence >= 0.3) {
    //   const remaining = MAX_MESSAGES_PER_DAY - currentMessageCount - 1;
    //   return res.status(200).json({
    //     response: keywordMatch.response,
    //     source: 'rule-based',
    //     remaining: Math.max(0, remaining),
    //     confidence: keywordMatch.confidence,
    //   });
    // }

    try {
      const aiResponse = await callOpenAI(question.trim());
      const remaining = MAX_MESSAGES_PER_DAY - currentMessageCount - 1;

      return res.status(200).json({
        response: aiResponse,
        source: 'openai',
        remaining: Math.max(0, remaining),
      });
    } catch (openaiError) {
      // Handle OpenAI API errors gracefully
      console.error('OpenAI API error:', openaiError);

      // If OpenAI fails, return simple error message
      const remaining = MAX_MESSAGES_PER_DAY - currentMessageCount - 1;
      return res.status(200).json({
        response:
          'I apologize, but I encountered an error processing your request. Please try again later.',
        source: 'error',
        remaining: Math.max(0, remaining),
        error: 'OpenAI service temporarily unavailable',
      });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
