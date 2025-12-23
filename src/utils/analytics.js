/**
 * Google Analytics Event Tracking
 * Sends custom events to Google Tag Manager / Google Analytics
 */

export const trackEvent = (eventName, eventData = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

// Page View Events
export const trackPageView = (pageName, pagePath) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_path: pagePath,
    timestamp: new Date().toISOString(),
  });
};

// Button Click Events
export const trackButtonClick = (buttonName, category) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_category: category,
    timestamp: new Date().toISOString(),
  });
};

// Experience Events
export const trackExperienceExpanded = (companyName, position) => {
  trackEvent('experience_expanded', {
    company: companyName,
    position: position,
    timestamp: new Date().toISOString(),
  });
};

export const trackCertificateViewed = (companyName, certificateName) => {
  trackEvent('certificate_viewed', {
    company: companyName,
    certificate: certificateName,
    timestamp: new Date().toISOString(),
  });
};

// ChatBot Events
export const trackChatBotOpened = () => {
  trackEvent('chatbot_opened', {
    timestamp: new Date().toISOString(),
  });
};

export const trackChatBotClosed = () => {
  trackEvent('chatbot_closed', {
    timestamp: new Date().toISOString(),
  });
};

export const trackChatBotMessage = (messageType, messageLength) => {
  trackEvent('chatbot_message_sent', {
    message_type: messageType, // 'text' or 'voice'
    message_length: messageLength,
    timestamp: new Date().toISOString(),
  });
};

// Resume Download Events
export const trackResumeDownloaded = () => {
  trackEvent('resume_downloaded', {
    timestamp: new Date().toISOString(),
  });
};

// Social Media Events
export const trackSocialMediaClick = platform => {
  trackEvent('social_media_click', {
    platform: platform,
    timestamp: new Date().toISOString(),
  });
};

// Form Submission Events
export const trackFormSubmitted = formType => {
  trackEvent('form_submitted', {
    form_type: formType,
    timestamp: new Date().toISOString(),
  });
};

// Scroll Events
export const trackScrollToSection = sectionName => {
  trackEvent('scroll_to_section', {
    section: sectionName,
    timestamp: new Date().toISOString(),
  });
};

// Link Click Events
export const trackLinkClick = (linkName, linkDestination) => {
  trackEvent('link_click', {
    link_name: linkName,
    link_destination: linkDestination,
    timestamp: new Date().toISOString(),
  });
};

// Additional engagement tracking
export const trackComponentView = componentName => {
  trackEvent('component_view', {
    component: componentName,
    timestamp: new Date().toISOString(),
  });
};

export const trackErrorEvent = (errorMessage, errorSource) => {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_source: errorSource,
    timestamp: new Date().toISOString(),
  });
};

export const trackScrollDepth = scrollPercentage => {
  trackEvent('scroll_depth', {
    scroll_percentage: scrollPercentage,
    timestamp: new Date().toISOString(),
  });
};

export const trackTimeOnPage = (pageName, timeSpent) => {
  trackEvent('time_on_page', {
    page_name: pageName,
    time_spent_seconds: timeSpent,
    timestamp: new Date().toISOString(),
  });
};

export const trackExternalLink = (linkUrl, linkText) => {
  trackEvent('external_link_click', {
    link_url: linkUrl,
    link_text: linkText,
    timestamp: new Date().toISOString(),
  });
};

export const trackResourceDownload = (resourceType, resourceName) => {
  trackEvent('resource_download', {
    resource_type: resourceType,
    resource_name: resourceName,
    timestamp: new Date().toISOString(),
  });
};

export const trackInputInteraction = (inputType, inputName) => {
  trackEvent('input_interaction', {
    input_type: inputType,
    input_name: inputName,
    timestamp: new Date().toISOString(),
  });
};
