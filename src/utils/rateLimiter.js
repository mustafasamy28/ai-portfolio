/**
 * Session-based rate limiter using localStorage
 * Tracks message count per day and resets automatically
 */

const RATE_LIMIT_KEY = 'chatbot_rate_limit';
const MAX_MESSAGES_PER_DAY = 5;

/**
 * Gets today's date as a string (YYYY-MM-DD)
 * @returns {string} - Today's date string
 */
function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Gets the current rate limit data from localStorage
 * @returns {Object} - { count: number, date: string }
 */
function getRateLimitData() {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        count: data.count || 0,
        date: data.date || getTodayString(),
      };
    }
  } catch (error) {
    console.error('Error reading rate limit data:', error);
  }
  
  return {
    count: 0,
    date: getTodayString(),
  };
}

/**
 * Saves rate limit data to localStorage
 * @param {Object} data - { count: number, date: string }
 */
function saveRateLimitData(data) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving rate limit data:', error);
  }
}

/**
 * Checks if the user has exceeded the rate limit
 * @returns {Object} - { allowed: boolean, remaining: number }
 */
export function checkRateLimit() {
  const today = getTodayString();
  const data = getRateLimitData();

  // Reset if it's a new day
  if (data.date !== today) {
    const newData = {
      count: 0,
      date: today,
    };
    saveRateLimitData(newData);
    return {
      allowed: true,
      remaining: MAX_MESSAGES_PER_DAY,
    };
  }

  // Check if limit exceeded
  if (data.count >= MAX_MESSAGES_PER_DAY) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    remaining: MAX_MESSAGES_PER_DAY - data.count,
  };
}

/**
 * Increments the message count
 * @returns {Object} - { allowed: boolean, remaining: number }
 */
export function incrementRateLimit() {
  const today = getTodayString();
  const data = getRateLimitData();

  // Reset if it's a new day
  if (data.date !== today) {
    const newData = {
      count: 1,
      date: today,
    };
    saveRateLimitData(newData);
    return {
      allowed: true,
      remaining: MAX_MESSAGES_PER_DAY - 1,
    };
  }

  // Increment count
  const newCount = data.count + 1;
  const newData = {
    count: newCount,
    date: today,
  };
  saveRateLimitData(newData);

  // Check if limit exceeded after increment
  if (newCount >= MAX_MESSAGES_PER_DAY) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    remaining: MAX_MESSAGES_PER_DAY - newCount,
  };
}

/**
 * Resets the rate limit counter (useful for testing or manual reset)
 */
export function resetRateLimit() {
  const newData = {
    count: 0,
    date: getTodayString(),
  };
  saveRateLimitData(newData);
}

/**
 * Gets the current rate limit status without modifying it
 * @returns {Object} - { count: number, remaining: number, date: string }
 */
export function getRateLimitStatus() {
  const today = getTodayString();
  const data = getRateLimitData();

  // Reset if it's a new day
  if (data.date !== today) {
    return {
      count: 0,
      remaining: MAX_MESSAGES_PER_DAY,
      date: today,
    };
  }

  return {
    count: data.count,
    remaining: Math.max(0, MAX_MESSAGES_PER_DAY - data.count),
    date: data.date,
  };
}
