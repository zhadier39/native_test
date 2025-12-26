/*
 * PRODUCTION HYPERENGAGE INTEGRATION
 * =================================
 *
 * This file shows what you actually need to implement in your SaaS webapp.
 * The TestClient.tsx contains synthetic data - this is the real implementation.
 */

import { Hyperengage } from '@hyperengage/sdk-js';

// Initialize (add to your app's entry point)
export const hyperengage = new Hyperengage({
  writeKey: process.env.REACT_APP_HYPERENGAGE_WRITE_KEY,
  debug: process.env.NODE_ENV === 'development'
});

// 1. AUTO-DETECTED TRAITS (No coding needed - SDK handles these)
export const getBrowserTraits = () => ({
  user_agent: navigator.userAgent,
  viewport_width: window.innerWidth,
  viewport_height: window.innerHeight,
  screen_resolution: `${screen.width}x${screen.height}`,
  timezone_offset: new Date().getTimezoneOffset(),
  language: navigator.language,
  platform: navigator.platform,
  connection_type: navigator.connection?.effectiveType || 'unknown',
  device_memory: navigator.deviceMemory || 'unknown'
});

// 2. USER IDENTIFICATION (Implement in auth flow)
export const identifyUser = (user, account = null) => {
  hyperengage.identify_user({
    user_id: user.id,
    traits: {
      // Basic user info
      first_name: user.firstName,
      last_name: user.lastName,
      full_name: user.fullName,
      email: user.email,
      title: user.title,
      department: user.department,
      role: user.role,

      // Account association
      account_id: user.accountId,

      // Status flags
      email_verified: user.emailVerified,
      mfa_enabled: user.mfaEnabled,
      is_admin: user.isAdmin,

      // Preferences
      timezone: user.timezone,
      preferred_language: user.language,
      theme_preference: user.theme,
      notifications_enabled: user.notificationsEnabled,

      // Behavioral (from your backend)
      last_login_at: user.lastLoginAt,
      total_sessions: user.totalSessions,
      onboarding_completed: user.onboardingCompleted,
      user_segment: user.segment // computed by your backend
    }
  });

  // Identify account if provided
  if (account) {
    identifyAccount(account);
  }
};

// 3. ACCOUNT IDENTIFICATION (Implement when loading account data)
export const identifyAccount = (account) => {
  hyperengage.identify_account({
    account_id: account.id,
    traits: {
      name: account.name,
      domain: account.domain,
      website: account.website,
      industry: account.industry,

      // Subscription data (from your billing system)
      subscription_status: account.subscriptionStatus,
      plan_tier: account.planTier,
      mrr: account.monthlyRecurringRevenue,
      currency: account.currency,

      // Account health (computed metrics)
      health_score: account.healthScore,
      churn_risk: account.churnRisk,
      engagement_score: account.engagementScore,

      // Demographics
      employee_count: account.employeeCount,
      location_country: account.country,
      customer_segment: account.segment,

      // Business metrics
      total_users: account.totalUsers,
      active_users_30d: account.activeUsers30d,
      features_adopted: account.featuresAdopted,
      integrations_connected: account.integrationsConnected,

      // Contract details
      signup_date: account.signupDate,
      renewal_date: account.renewalDate,
      contract_value: account.contractValue,
      payment_method: account.paymentMethod,
      billing_cycle: account.billingCycle
    }
  });
};

// 4. PAGE VIEW TRACKING (Add to your router/page components)
export const trackPageView = (pageName, properties = {}) => {
  const startTime = performance.now();

  // Track when page becomes visible
  const handleVisibilityChange = () => {
    if (document.hidden) {
      const loadTime = performance.now() - startTime;
      hyperengage.track('page_viewed', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_name: pageName,
        referrer: document.referrer,
        load_time_ms: Math.round(loadTime),
        ...getBrowserTraits(),
        ...properties
      });
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Cleanup
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

// 5. UI INTERACTION TRACKING (Add to your components)
export const trackButtonClick = (buttonName, element, properties = {}) => {
  hyperengage.track('button_clicked', {
    button_text: buttonName,
    button_location: element?.dataset?.location || 'unknown',
    element_id: element?.id || 'unknown',
    css_selector: getCssSelector(element),
    page_context: window.location.pathname,
    ...properties
  });
};

export const trackFormSubmission = (formName, formData, success = true) => {
  const eventType = success ? 'form_submitted' : 'form_abandoned';

  hyperengage.track(eventType, {
    form_name: formName,
    fields_completed: Object.keys(formData).length,
    time_spent_seconds: Math.round((Date.now() - (window.formStartTime || Date.now())) / 1000),
    form_type: 'modal', // or 'page', 'sidebar', etc.
    ...(success ? {} : { abandonment_step: getCurrentStep(formName) })
  });
};

// 6. ERROR TRACKING (Add to your error boundaries)
export const trackError = (error, context = {}) => {
  hyperengage.track('error_encountered', {
    error_type: error.type || 'javascript',
    error_code: error.code || 'UNKNOWN_ERROR',
    error_message: error.message,
    error_location: window.location.pathname,
    recoverable: !error.fatal,
    user_agent: navigator.userAgent,
    url: window.location.href,
    ...context
  });
};

// 7. FEATURE ADOPTION TRACKING (Add when users first use features)
export const trackFeatureAdoption = (featureName, context = {}) => {
  // Check if user has already adopted this feature (store in localStorage/sessionStorage)
  const adoptedFeatures = JSON.parse(localStorage.getItem('hyperengage_adopted_features') || '[]');

  if (!adoptedFeatures.includes(featureName)) {
    hyperengage.track('feature_adopted', {
      feature_key: featureName,
      adoption_context: context,
      time_since_signup: calculateTimeSinceSignup()
    });

    adoptedFeatures.push(featureName);
    localStorage.setItem('hyperengage_adopted_features', JSON.stringify(adoptedFeatures));
  }
};

// 8. SEARCH TRACKING (Add to your search components)
export const trackSearch = (query, resultsCount, filters = {}) => {
  hyperengage.track('search_performed', {
    search_term: query,
    results_count: resultsCount,
    search_type: 'global',
    search_filters: Object.keys(filters),
    search_source: 'header_search'
  });
};

// 9. SESSION MANAGEMENT (Add to your auth/app initialization)
let sessionStartTime = null;
let heartbeatInterval = null;

export const startSession = () => {
  sessionStartTime = Date.now();

  hyperengage.track('session_started', {
    session_id: generateSessionId(),
    ...getBrowserTraits()
  });

  // Start heartbeat
  heartbeatInterval = setInterval(() => {
    hyperengage.track('session_heartbeat', {
      session_duration_seconds: Math.round((Date.now() - sessionStartTime) / 1000)
    });
  }, 30000); // every 30 seconds
};

export const endSession = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
  }

  if (sessionStartTime) {
    const duration = Math.round((Date.now() - sessionStartTime) / 1000);
    hyperengage.track('session_ended', {
      session_duration_seconds: duration
    });

    hyperengage.track('user_logged_out');
  }
};

// 10. TUTORIAL/ONBOARDING TRACKING (Add to your onboarding flow)
export const trackTutorialProgress = (tutorialName, step, completed = false) => {
  const eventType = completed ? 'tutorial_completed' : 'tutorial_started';

  hyperengage.track(eventType, {
    tutorial_name: tutorialName,
    tutorial_step: step,
    time_spent_seconds: calculateTimeSpentOnTutorial(tutorialName)
  });

  if (completed) {
    trackOnboardingStep(tutorialName, step);
  }
};

export const trackOnboardingStep = (stepName, stepNumber) => {
  hyperengage.track('onboarding_step_completed', {
    step_name: stepName,
    step_number: stepNumber,
    completion_rate: calculateOnboardingProgress()
  });
};

// UTILITY FUNCTIONS
const getCssSelector = (element) => {
  if (!element) return '';
  if (element.id) return `#${element.id}`;
  if (element.className) return `.${element.className.split(' ').join('.')}`;
  return element.tagName.toLowerCase();
};

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const calculateTimeSinceSignup = () => {
  // Implement based on your user signup date
  return 0; // placeholder
};

const getCurrentStep = (formName) => {
  // Implement based on your form step tracking
  return 1; // placeholder
};

const calculateTimeSpentOnTutorial = (tutorialName) => {
  // Implement based on your tutorial timing
  return 300; // placeholder
};

const calculateOnboardingProgress = () => {
  // Implement based on your onboarding completion tracking
  return 75; // placeholder
};

// REACT HOOKS FOR EASY INTEGRATION
export const useHyperengage = () => {
  const hyperengage = useContext(HyperengageContext);

  return {
    identifyUser,
    identifyAccount,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackError,
    trackFeatureAdoption,
    trackSearch,
    startSession,
    endSession,
    trackTutorialProgress
  };
};

export default hyperengage;
