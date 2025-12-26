# Hyperengage Production Implementation Guide

## Overview
The `TestClient.tsx` contains synthetic data generation for testing. This guide shows what you actually need to implement in your SaaS webapp for production AI agent monitoring.

## Should These Events Go to Segment/Hyperengage?

**YES!** All these events and traits should be sent to your analytics platform (Segment, Hyperengage, etc.) because:

1. **Business Intelligence:** They provide insights into customer health, revenue, and engagement
2. **AI Agent Training:** Rich event data enables better pattern recognition and predictions
3. **Product Analytics:** Understanding user journeys and conversion funnels
4. **Revenue Optimization:** Tracking renewals, expansions, and churn prevention

The key difference is that some traits come from your webapp (events, basic user info) while others are computed by your backend (health scores, churn risk, segments).

## 1. AUTO-DETECTED TRAITS (SDK Handles These)
These require no coding - the Hyperengage SDK captures them automatically:

### Browser/Device Context
```javascript
// SDK automatically includes:
{
  user_agent: navigator.userAgent,
  viewport_width: window.innerWidth,
  viewport_height: window.innerHeight,
  screen_resolution: "1920x1080",
  timezone_offset: -480, // PST
  language: "en-US",
  platform: "MacIntel",
  connection_type: "4g"
}
```

### Session Context
```javascript
// SDK automatically includes:
{
  session_id: "session_1234567890_abc123",
  session_duration_seconds: 1800,
  page_load_time_ms: 1200
}
```

## What NOT to Send to Product Analytics

**❌ Computed Business Metrics** (Send these from CRM/Billing systems)
- `health_score`, `churn_risk`, `engagement_score`
- `customer_segment`, `expansion_opportunities`
- Revenue metrics, renewal dates, contract values

**❌ Cross-System Data** (Use dedicated integrations)
- Detailed billing history (use Stripe/HubSpot)
- CRM data (use Salesforce/HubSpot)
- Support ticket details (use Zendesk/Intercom)

**❌ Privacy-Sensitive Data**
- Full payment information
- Social security numbers
- Complete addresses (just country/region)

**Focus on Product Usage & User Behavior**

## 2. WEBAPP CONFIGURATION (You Need to Code This)

### Important: UTC Timestamp Requirement
**All track calls must include `utc_time` in properties:**
```javascript
hyperengage.track('event_name', {
  properties: {
    // ... your event properties
    utc_time: new Date().toISOString() // Required: becomes events._timestamp
  }
});
```
This timestamp should be generated at the time of the event and can be randomized in testing scenarios.

### Page View Tracking
**Where to implement:** Router component or page layout
```javascript
// Add to your router or page components
useEffect(() => {
  hyperengage.track('page_viewed', {
    properties: {
      page_path: window.location.pathname,
      page_title: document.title,
      page_name: 'Dashboard', // custom property
      referrer: document.referrer,
      utc_time: new Date().toISOString() // Required: ISO timestamp for events._timestamp
    }
  });
}, [location]);
```

### Button Click Tracking
**Where to implement:** Button components or click handlers
```javascript
const handleButtonClick = (e) => {
  hyperengage.track('button_clicked', {
    properties: {
      button_text: 'Save Changes',
      button_location: 'header',
      element_id: e.target.id,
      page_context: window.location.pathname,
      utc_time: new Date().toISOString() // Required: ISO timestamp for events._timestamp
    }
  });
  // Your existing click logic
};
```

### Form Tracking
**Where to implement:** Form components
```javascript
const handleFormSubmit = (formData) => {
  hyperengage.track('form_submitted', {
    form_name: 'user_profile',
    fields_completed: Object.keys(formData).length,
    time_spent_seconds: calculateFormTime()
  });
};
```

### Error Tracking
**Where to implement:** Error boundaries and try/catch blocks
```javascript
// Error boundary
componentDidCatch(error, errorInfo) {
  hyperengage.track('error_encountered', {
    error_type: 'javascript',
    error_message: error.message,
    error_location: window.location.pathname,
    recoverable: false
  });
}
```

## 3. BACKEND TRAITS (From Your API/Database)

### User Traits (From Your Product Database)
```javascript
// Send what your SaaS product knows about users
hyperengage.identify_user({
  user_id: user.id,
  traits: {
    // Basic user profile
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    title: user.jobTitle,
    department: user.department,

    // Account relationship
    account_id: user.accountId,
    account_role: user.accountRole, // admin, member, viewer

    // User lifecycle
    signup_date: user.signupDate,
    last_seen_at: user.lastSeenAt,
    email_verified: user.emailVerified,

    // User preferences (set in your app)
    timezone: user.timezone,
    preferred_language: user.language,
    theme_preference: user.theme,
    notifications_enabled: user.notificationsEnabled,

    // Device context (observed)
    device_primary: user.primaryDevice,
    browser_primary: user.primaryBrowser,
    os_primary: user.primaryOS,

    // Feature usage (observed by your product)
    features_used: user.featuresAccessedCount,
    onboarding_completed: user.onboardingCompleted,
    tutorial_viewed: user.hasViewedTutorial,

    // Support interaction (observed)
    support_tickets_created: user.supportTicketsCreated,
    feedback_submitted: user.hasSubmittedFeedback,

    // Authentication status
    mfa_enabled: user.mfaEnabled,
    last_password_change: user.lastPasswordChange
  }
});

// NOTE: DO NOT send computed metrics like:
// - user_engagement_score, user_segment (compute in data warehouse)
// - total_sessions, avg_session_duration (track via events)
// - login_streak, weekly_active_days (compute downstream)
```

### Account Traits (From Your Product Database)
```javascript
// Send ONLY what your SaaS product can observe directly
hyperengage.identify_account({
  account_id: account.id,
  traits: {
    // Basic company info
    name: account.companyName,
    domain: account.domain,
    industry: account.industry,

    // Company size (for segmentation)
    employee_count: account.employeeCount,
    location_country: account.country,

    // Account creation
    signup_date: account.signupDate,
    signup_source: account.signupSource,

    // Current subscription (link to billing system)
    subscription_status: account.subscriptionStatus,
    plan_tier: account.planTier,

    // Usage metrics (what your product observes)
    total_users: account.totalUsers,
    integrations_connected: account.integrationsConnectedCount,
    features_used: account.featuresAccessedCount,

    // Account lifecycle
    account_type: account.accountType, // trial, free, paid
    last_login_date: account.lastUserLoginDate,

    // Support interaction (what your product knows)
    support_tickets_created: account.supportTicketsCount,

    // Communication preferences
    email_marketing_opt_in: account.emailMarketingOptIn,
    product_updates_opt_in: account.productUpdatesOptIn
  }
});

// NOTE: DO NOT send computed metrics like:
// - health_score, churn_risk, engagement_score (compute in data warehouse)
// - renewal_date, contract_value (send from billing system)
// - customer_segment (compute downstream or use CRM data)
```

## 4. COMPUTED METRICS (Need Processing Pipeline)

### Engagement Scoring Algorithm
```javascript
// Backend service - runs daily/weekly
function calculateUserEngagement(user) {
  const weights = {
    sessions_per_week: 0.3,
    features_used: 0.25,
    time_spent: 0.2,
    login_streak: 0.15,
    support_tickets: -0.1 // negative weight
  };

  // Calculate score 0-100
  return Math.min(100, Math.max(0, calculateWeightedScore(user, weights)));
}
```

### Churn Risk Prediction
```javascript
// ML model or rule-based system
function calculateChurnRisk(account) {
  if (account.healthScore < 40) return 'high';
  if (account.healthScore < 70) return 'medium';
  if (account.lastActivity > 30) return 'medium'; // days since activity
  return 'low';
}
```

## 5. EVENT IMPLEMENTATION PRIORITIES

### High Priority (Implement First)
1. **Page Views** - User journey tracking
2. **User/Account Identification** - Foundation for all analytics
3. **Button Clicks** - UI interaction patterns
4. **Form Submissions** - Conversion tracking
5. **Errors** - UX problem detection

### Medium Priority
1. **Feature Adoption** - Product usage insights
2. **Search Tracking** - Information discovery
3. **Session Management** - Engagement patterns
4. **Tutorial/Onboarding** - User progression

### Low Priority (Advanced)
1. **Experiment Tracking** - A/B test results
2. **Performance Metrics** - Technical monitoring
3. **Collaboration Events** - Team usage patterns

## 6. IMPLEMENTATION CHECKLIST

### Week 1: Foundation
- [ ] Initialize Hyperengage SDK
- [ ] Implement user identification
- [ ] Implement account identification
- [ ] Add page view tracking

### Week 2: Core Interactions
- [ ] Button click tracking
- [ ] Form submission tracking
- [ ] Error tracking
- [ ] Basic feature adoption

### Week 3: Advanced Features
- [ ] Search tracking
- [ ] Session management
- [ ] Tutorial/onboarding tracking
- [ ] Backend trait computation

### Week 4: Optimization
- [ ] Performance monitoring
- [ ] A/B testing integration
- [ ] Advanced user segmentation

## 7. TESTING YOUR IMPLEMENTATION

Use the enhanced `TestClient.tsx` to validate your implementation:

1. **Compare Events:** Ensure your real events match the synthetic ones
2. **Validate Traits:** Check that user/account traits are populated correctly
3. **Test Edge Cases:** Verify error handling and edge cases
4. **Monitor Performance:** Ensure tracking doesn't impact app performance

## 8. SPECIFIC BUSINESS METRICS EXPLANATION

### Goal Achievement Events
**What it tracks:** Business milestones reached by customers
```javascript
// Example goals to track:
hyperengage.track('goal_achieved', {
  goal_type: 'user_activation',          // First active user
  goal_name: 'First Signal Created',     // Specific milestone name
  goal_value: 1,                         // Quantitative value
  time_to_achieve_seconds: 86400         // Time from signup
});
```

**Common SaaS Goals:**
- First user invited to account
- First integration connected
- First playbook created
- First automated workflow
- Revenue milestones ($10k, $50k, $100k MRR)
- User adoption targets (10 active users, 50% feature adoption)

### Churn Risk Calculation
**How it's calculated:** Rule-based scoring from health metrics
```javascript
function calculateChurnRisk(account) {
  const healthScore = account.health_score; // 0-100

  if (healthScore < 40) return 'high';
  if (healthScore < 70) return 'medium';
  return 'low';
}

// Advanced version could include:
function calculateChurnRisk(account) {
  let riskScore = 0;

  // Usage decline
  if (account.active_users_30d < account.total_users * 0.3) riskScore += 30;

  // Support tickets increasing
  if (account.support_tickets_30d > 10) riskScore += 20;

  // Low engagement
  if (account.engagement_score < 30) riskScore += 25;

  // Recent failed payments
  if (account.subscription_status === 'past_due') riskScore += 25;

  return riskScore > 60 ? 'high' : riskScore > 30 ? 'medium' : 'low';
}
```

### Renewal Events
**When to send:**
```javascript
// 30 days before renewal
hyperengage.track('renewal_due', {
  account_id: account.id,
  renewal_date: account.renewal_date,
  current_plan: account.plan_tier,
  contract_value: account.contract_value,
  days_until_renewal: 30
});

// When renewal closes
hyperengage.track('renewal_closed_won', {
  account_id: account.id,
  renewed_plan: 'growth',           // Same or upgraded
  renewal_amount: 50000,            // New MRR
  contract_term_months: 12,         // New term length
  expansion_amount: 10000           // If upgraded
});

hyperengage.track('renewal_closed_lost', {
  account_id: account.id,
  churn_reason: 'budget_constraints', // competitive, product_fit, etc.
  last_active_at: account.last_activity_at,
  final_mrr: account.mrr
});
```

## 9. AI AGENT CONFIGURATION

Once implemented, configure your AI agent to monitor:

### Real-time Alerts
- Error rate spikes
- Form abandonment increases
- Feature usage drops
- Churn risk changes to 'high'
- Goal achievement milestones

### Predictive Insights
- User engagement trends
- Feature adoption likelihood
- Support ticket prediction
- Revenue expansion opportunities
- Renewal success probability

### Automated Actions
- Personalized onboarding based on user segment
- Proactive support outreach for high churn risk accounts
- Feature recommendations based on usage patterns
- Renewal reminders and expansion suggestions
- Goal celebration and next milestone suggestions
