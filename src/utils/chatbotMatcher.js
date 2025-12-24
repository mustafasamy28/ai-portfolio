/**
 * Keyword matching utility for rule-based chatbot responses
 * 
 * DEPRECATED: This file is no longer used. The chatbot now uses OpenAI GPT-4o-mini exclusively.
 * Kept for reference only - rule-based system has been commented out in api/chat.js and api/voice-chat.js
 * 
 * Returns the best matching response from the rule-based data, or null if no match found
 */

/**
 * Normalizes input text for matching
 * @param {string} text - Input text to normalize
 * @returns {string} - Normalized text
 */
function normalizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Simple Levenshtein distance calculation for fuzzy matching
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Distance between strings
 */
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculates similarity score between two strings (0-1)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score (0-1)
 */
function calculateSimilarity(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

/**
 * Checks if input matches a keyword pattern
 * @param {string} normalizedInput - Normalized user input
 * @param {string} keyword - Keyword to match against
 * @returns {number} - Confidence score (0-1)
 */
function matchKeyword(normalizedInput, keyword) {
  const normalizedKeyword = normalizeInput(keyword);

  // Exact match
  if (normalizedInput === normalizedKeyword) {
    return 1.0;
  }

  // Contains match (keyword appears in input)
  if (normalizedInput.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedInput)) {
    return 0.8;
  }

  // Word-level match (keyword appears as a word in input)
  const inputWords = normalizedInput.split(' ');
  const keywordWords = normalizedKeyword.split(' ');
  
  for (const kw of keywordWords) {
    if (inputWords.includes(kw)) {
      return 0.7;
    }
  }

  // Fuzzy match for typos
  const similarity = calculateSimilarity(normalizedInput, normalizedKeyword);
  if (similarity > 0.6) {
    return similarity * 0.6; // Lower weight for fuzzy matches
  }

  return 0;
}

/**
 * Finds the best matching response from rule-based data
 * @param {string} userInput - User's input text
 * @param {Object} responsesData - Rule-based responses data structure
 * @returns {Object|null} - { response: string, confidence: number, topic: string } or null
 */
export function matchKeywordResponse(userInput, responsesData) {
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

  // Check each topic
  for (const [topicName, topicData] of Object.entries(responsesData.topics)) {
    if (!topicData.keywords || !topicData.responses) {
      continue;
    }

    // Check each keyword in this topic
    for (const keyword of topicData.keywords) {
      const confidence = matchKeyword(normalizedInput, keyword);
      
      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        // Select a random response from this topic's responses
        const randomResponse = topicData.responses[
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

  // Return match only if confidence exceeds threshold
  if (bestMatch && bestConfidence >= confidenceThreshold) {
    return bestMatch;
  }

  return null;
}

/**
 * Gets a fallback response when no match is found
 * @param {Object} responsesData - Rule-based responses data structure
 * @returns {string} - Fallback response text
 */
export function getFallbackResponse(responsesData) {
  return responsesData?.fallback || "I don't have a specific answer for that. How can I help you?";
}
