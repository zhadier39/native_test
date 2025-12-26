import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import HyperengageContext from './context/HyperengageClient.ts';

/*
 * PRODUCTION IMPLEMENTATION GUIDE
 * ==============================
 *
 * This file contains synthetic data generation for testing, but here's what
 * you actually need to implement in your SaaS webapp:
 *
 * 1. AUTO-DETECTED TRAITS (Browser/JavaScript)
 *    - viewport_width/height, user_agent, device_type, browser_name, os_primary
 *    - timezone_offset, screen_resolution, connection_type
 *    - session_duration, page_load_time
 *
 * 2. WEBAPP CONFIGURATION (Your code needs this)
 *    - page_viewed events with custom properties
 *    - button_clicked with element selectors
 *    - form_submitted/abandoned tracking
 *    - error_encountered with error context
 *    - feature_adopted when users first use features
 *
 * 3. BACKEND TRAITS (From your API/database)
 *    - subscription_status, plan_tier, mrr, health_score
 *    - user roles, department, account_id
 *    - last_login_at, total_sessions, features_used_count
 *
 * 4. COMPUTED METRICS (Need processing pipeline)
 *    - engagement_score, churn_risk, user_segment
 *    - onboarding_completion_rate, feature_adoption_rate
 *    - time_to_first_value, expansion_opportunities
 */

const TestClient = () => {
  const hyperengageClient: any = useContext(HyperengageContext);

  if (!hyperengageClient) {
    throw new Error('HyperengageClient is not provided');
  };
  // Local state and helpers for bulk synthetic data generation
  const [users, setUsers] = useState<any[]>([]);
  const [generatedCompanyNames] = useState<Set<string>>(new Set());

  // Company name generation components
  const companyPrefixes = [
    'Apex', 'Peak', 'Prime', 'Elite', 'Ultra', 'Mega', 'Neo', 'Meta', 'Omni', 'Alpha',
    'Beta', 'Gamma', 'Delta', 'Sigma', 'Quantum', 'Hyper', 'Super', 'Turbo', 'Pro', 'Max',
    'Core', 'True', 'Pure', 'Smart', 'Rapid', 'Swift', 'Bright', 'Clear', 'Bold', 'Edge',
    'Cyber', 'Digi', 'Auto', 'Micro', 'Macro', 'Nano', 'Giga', 'Terra', 'Peta', 'Zeta',
    'Flex', 'Agile', 'Lean', 'Solid', 'Fluid', 'Dynamic', 'Static', 'Kinetic', 'Elastic', 'Robust',
    'Vertex', 'Zenith', 'Summit', 'Pinnacle', 'Crest', 'Crown', 'Royal', 'Noble', 'Grand', 'Majestic',
    'Fusion', 'Synthesis', 'Unity', 'Harmony', 'Balance', 'Symmetry', 'Parallel', 'Vertical', 'Horizon', 'Zenith',
    'Crystal', 'Diamond', 'Platinum', 'Golden', 'Silver', 'Bronze', 'Copper', 'Steel', 'Iron', 'Titan',
    'Arctic', 'Solar', 'Lunar', 'Stellar', 'Cosmic', 'Galactic', 'Universal', 'Infinite', 'Eternal', 'Immortal',
    'Phoenix', 'Dragon', 'Eagle', 'Falcon', 'Hawk', 'Raven', 'Wolf', 'Lion', 'Tiger', 'Panther'
  ];

  const companyRoots = [
    'Tech', 'Soft', 'Wave', 'Flow', 'Stream', 'Bridge', 'Link', 'Path', 'Gate', 'Port',
    'Net', 'Web', 'Grid', 'Cloud', 'Storm', 'Fire', 'Spark', 'Flash', 'Bolt', 'Pulse',
    'Force', 'Power', 'Energy', 'Drive', 'Move', 'Shift', 'Turn', 'Spin', 'Loop', 'Cycle',
    'Vision', 'Focus', 'Lens', 'View', 'Scope', 'Range', 'Scale', 'Level', 'Grade', 'Rank',
    'Mind', 'Brain', 'Think', 'Logic', 'Reason', 'Sense', 'Feel', 'Touch', 'Reach', 'Grasp',
    'Data', 'Info', 'Knowledge', 'Wisdom', 'Intelligence', 'Learn', 'Discover', 'Explore', 'Research', 'Study',
    'Build', 'Create', 'Make', 'Craft', 'Design', 'Engineer', 'Architect', 'Construct', 'Develop', 'Form',
    'Connect', 'Unite', 'Join', 'Merge', 'Blend', 'Fuse', 'Combine', 'Integrate', 'Sync', 'Align',
    'Solve', 'Fix', 'Repair', 'Heal', 'Restore', 'Renew', 'Refresh', 'Revive', 'Recover', 'Rebuild',
    'Launch', 'Start', 'Begin', 'Initiate', 'Trigger', 'Activate', 'Execute', 'Deploy', 'Release', 'Deliver',
    'Track', 'Monitor', 'Watch', 'Observe', 'Analyze', 'Measure', 'Assess', 'Evaluate', 'Review', 'Audit',
    'Shield', 'Guard', 'Protect', 'Secure', 'Defend', 'Safe', 'Lock', 'Vault', 'Fortress', 'Barrier',
    'Speed', 'Fast', 'Quick', 'Rapid', 'Swift', 'Instant', 'Express', 'Rush', 'Dash', 'Sprint',
    'Growth', 'Scale', 'Expand', 'Extend', 'Stretch', 'Reach', 'Rise', 'Climb', 'Ascend', 'Elevate',
    'Market', 'Trade', 'Commerce', 'Business', 'Enterprise', 'Venture', 'Capital', 'Finance', 'Revenue', 'Profit'
  ];

  const companySuffixes = [
    'Labs', 'Works', 'Systems', 'Solutions', 'Dynamics', 'Analytics', 'Insights', 'Intelligence',
    'Innovations', 'Technologies', 'Enterprises', 'Industries', 'Corporation', 'Group', 'Holdings',
    'Partners', 'Associates', 'Collective', 'Network', 'Alliance', 'Foundation', 'Institute',
    'Studio', 'Workshop', 'Factory', 'Forge', 'Engine', 'Machine', 'Platform', 'Framework',
    'Digital', 'Computing', 'Software', 'Hardware', 'Firmware', 'Middleware', 'Applications', 'Services',
    'Consulting', 'Advisory', 'Guidance', 'Expertise', 'Specialists', 'Professionals', 'Experts', 'Masters',
    'Automation', 'Robotics', 'AI', 'ML', 'Data Science', 'Cloud Computing', 'Edge Computing', 'Quantum',
    'Security', 'Cybersecurity', 'Encryption', 'Protection', 'Privacy', 'Safety', 'Trust', 'Reliability',
    'Integration', 'Connectivity', 'Networking', 'Communications', 'Telecommunications', 'Broadcasting', 'Media',
    'Research', 'Development', 'Innovation', 'Discovery', 'Exploration', 'Investigation', 'Experimentation',
    'Manufacturing', 'Production', 'Assembly', 'Construction', 'Engineering', 'Architecture', 'Design',
    'Marketing', 'Advertising', 'Promotion', 'Branding', 'Strategy', 'Planning', 'Management', 'Operations',
    'Finance', 'Banking', 'Investment', 'Capital', 'Funding', 'Ventures', 'Assets', 'Resources',
    'Health', 'Medical', 'Healthcare', 'Wellness', 'Fitness', 'Nutrition', 'Therapy', 'Treatment',
    'Education', 'Training', 'Learning', 'Teaching', 'Instruction', 'Coaching', 'Mentoring', 'Guidance',
    'Entertainment', 'Gaming', 'Sports', 'Recreation', 'Leisure', 'Events', 'Experiences', 'Adventures'
  ];

  const standAloneNames = [
    'Zenith', 'Nexus', 'Vortex', 'Prism', 'Axiom', 'Cosmos', 'Orbit', 'Phoenix', 'Titan', 'Atlas',
    'Stellar', 'Lunar', 'Solar', 'Comet', 'Nova', 'Galaxy', 'Nebula', 'Quasar', 'Pulsar', 'Meteor',
    'Crystal', 'Diamond', 'Platinum', 'Silver', 'Golden', 'Crimson', 'Azure', 'Emerald', 'Amber', 'Onyx',
    'Matrix', 'Vector', 'Scalar', 'Binary', 'Hex', 'Code', 'Cipher', 'Token', 'Key', 'Lock',
    'Vertex', 'Apex', 'Summit', 'Pinnacle', 'Crest', 'Peak', 'Crown', 'Throne', 'Empire', 'Kingdom',
    'Infinity', 'Eternity', 'Forever', 'Always', 'Never', 'Beyond', 'Above', 'Below', 'Within', 'Without',
    'Thunder', 'Lightning', 'Storm', 'Tempest', 'Hurricane', 'Tornado', 'Cyclone', 'Typhoon', 'Blizzard', 'Avalanche',
    'Ocean', 'River', 'Lake', 'Mountain', 'Valley', 'Desert', 'Forest', 'Jungle', 'Prairie', 'Tundra',
    'Falcon', 'Eagle', 'Hawk', 'Raven', 'Owl', 'Wolf', 'Lion', 'Tiger', 'Panther', 'Jaguar',
    'Spectrum', 'Prism', 'Rainbow', 'Aurora', 'Eclipse', 'Solstice', 'Equinox', 'Meridian', 'Horizon', 'Twilight',
    'Genesis', 'Alpha', 'Omega', 'Delta', 'Sigma', 'Theta', 'Lambda', 'Gamma', 'Beta', 'Zeta',
    'Harmony', 'Symphony', 'Melody', 'Rhythm', 'Beat', 'Tempo', 'Cadence', 'Resonance', 'Echo', 'Reverb',
    'Fortress', 'Castle', 'Citadel', 'Stronghold', 'Bastion', 'Sanctuary', 'Haven', 'Refuge', 'Shelter', 'Harbor',
    'Velocity', 'Momentum', 'Acceleration', 'Trajectory', 'Orbit', 'Spiral', 'Helix', 'Vortex', 'Whirlpool', 'Cyclone',
    'Catalyst', 'Ignition', 'Fusion', 'Fission', 'Reaction', 'Transform', 'Metamorphosis', 'Evolution', 'Revolution', 'Innovation'
  ];

  type Account = {
    id: string;
    name: string;
    domain: string;
    traits: Record<string, any>;
  };
  type User = {
    name: string;
    id: string;
    account_id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    title: string;
    avatar_url: string;
    traits: Record<string, any>;
  };

  const industries = [
    'SaaS', 'FinTech', 'E-commerce', 'HealthTech', 'EdTech', 'MarTech', 'Cybersecurity', 'Gaming', 'AI/ML', 'Data Platform'
  ];
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'India', 'Pakistan', 'Australia', 'Brazil', 'Singapore', 'Netherlands'
  ];
  const planTiers = ['free', 'starter', 'growth', 'scale', 'enterprise'];
  const subscriptionStatuses = ['trialing', 'active', 'past_due', 'cancelled'];
  const departments = ['CS', 'Sales', 'Marketing', 'Product', 'Engineering', 'Ops'];
  const roles = ['Admin', 'Manager', 'IC', 'Executive'];
  const titles = ['CSM', 'AE', 'Solutions Engineer', 'Head of CS', 'VP Sales', 'Product Manager', 'Data Analyst'];

  const eventCatalog = useMemo(
    () => [
      // CORE PRODUCT EVENTS (What SaaS products typically send to Segment)

      // User Lifecycle & Authentication
      'user_signed_up', 'user_logged_in', 'user_logged_out', 'password_reset_requested',

      // Page Views & Navigation
      'page_viewed', 'navigation_clicked', 'tab_switched', 'deep_link_opened',

      // Feature Usage & Interactions
      'feature_viewed', 'feature_used', 'button_clicked', 'form_started', 'form_submitted', 'form_abandoned',
      'search_performed', 'filter_applied', 'sort_applied', 'export_requested',

      // Product-Specific Actions (Signals, Playbooks, etc.)
      'signal_created', 'signal_viewed', 'signal_acknowledged', 'signal_resolved',
      'playbook_created', 'playbook_run', 'playbook_step_completed',
      'task_created', 'task_completed', 'task_assigned',

      // Integrations & API
      'integration_connected', 'integration_error', 'integration_sync_started', 'integration_sync_completed',
      'api_call_made', 'api_rate_limit_hit', 'webhook_created', 'webhook_fired',

      // Onboarding & Education
      'onboarding_started', 'onboarding_step_completed', 'onboarding_completed',
      'tutorial_viewed', 'help_article_viewed', 'tooltip_viewed',

      // Settings & Configuration
      'settings_updated', 'notification_preference_changed', 'profile_updated',

      // Errors & Issues
      'error_encountered', 'validation_error', 'permission_denied', 'page_load_error',

      // Communication & Collaboration
      'email_sent', 'email_opened', 'email_clicked', 'notification_sent',
      'comment_added', 'file_uploaded', 'team_member_invited',

      // Account & Billing (Basic - detailed billing from Stripe/other systems)
      'account_created', 'billing_info_updated', 'plan_viewed',

      // Sessions & Engagement
      'session_started', 'session_ended', 'idle_warning_shown',

      // Support & Feedback
      'support_ticket_created', 'feedback_submitted', 'bug_report_sent',

      // Content & Assets
      'report_generated', 'dashboard_created', 'dashboard_shared', 'view_created', 'view_saved'
    ],
    []
  );

  const eventWeights: Record<string, number> = useMemo(() => ({
    // HIGH FREQUENCY - Core user interactions
    page_viewed: 12,
    button_clicked: 10,
    navigation_clicked: 8,
    tab_switched: 6,
    user_logged_in: 4,
    session_started: 4,
    session_ended: 4,

    // MEDIUM FREQUENCY - Feature usage
    feature_viewed: 5,
    feature_used: 4,
    search_performed: 4,
    filter_applied: 3,
    form_submitted: 3,
    form_started: 2,
    signal_viewed: 3,
    task_created: 2,
    task_completed: 2,

    // MEDIUM FREQUENCY - Product workflows
    signal_created: 2,
    signal_acknowledged: 1.5,
    signal_resolved: 1.5,
    playbook_created: 1,
    playbook_run: 1.5,
    playbook_step_completed: 2,
    integration_connected: 1,
    export_requested: 1.5,

    // LOWER FREQUENCY - Setup and configuration
    onboarding_started: 0.8,
    onboarding_step_completed: 1.2,
    onboarding_completed: 0.6,
    settings_updated: 1,
    notification_preference_changed: 0.8,
    profile_updated: 0.8,
    tutorial_viewed: 1.5,
    help_article_viewed: 1,
    tooltip_viewed: 2,

    // LOWER FREQUENCY - Communication
    email_sent: 2,
    email_opened: 1.5,
    email_clicked: 1,
    notification_sent: 1.5,
    comment_added: 1.5,
    team_member_invited: 0.8,

    // LOWER FREQUENCY - Errors and issues
    error_encountered: 1,
    validation_error: 1.5,
    permission_denied: 0.5,
    page_load_error: 0.3,

    // LOWER FREQUENCY - Advanced features
    api_call_made: 2,
    api_rate_limit_hit: 0.2,
    webhook_created: 0.5,
    webhook_fired: 1,
    integration_error: 0.3,
    integration_sync_started: 0.8,
    integration_sync_completed: 0.8,

    // LOW FREQUENCY - Account and support
    user_signed_up: 0.5,
    account_created: 0.3,
    billing_info_updated: 0.4,
    plan_viewed: 0.6,
    support_ticket_created: 0.8,
    feedback_submitted: 0.6,
    bug_report_sent: 0.4,
    report_generated: 1,
    dashboard_created: 0.8,
    dashboard_shared: 0.6,
    view_created: 1,
    view_saved: 1.5,
    password_reset_requested: 0.3,
    user_logged_out: 3,
    form_abandoned: 1.5,
    sort_applied: 2,
    file_uploaded: 1,
    idle_warning_shown: 0.5,
    deep_link_opened: 0.8
  }), []);

  const pickWeighted = (items: string[], weights: Record<string, number>) => {
    const norm = items.map((name) => Math.max(0.0001, weights[name] ?? 1));
    const total = norm.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= norm[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  };

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const randomDateInPast6Months = () => {
    const now = Date.now();
    const sixMonthsMs = 180 * 24 * 60 * 60 * 1000; // 6 months ≈ 180 days
    const offset = Math.floor(Math.random() * sixMonthsMs);
    return new Date(now - offset);
  };

  // Generate random ISO timestamp from 3 months ago to 1 month in the future
  const randomUTCTime = () => {
    const now = Date.now();
    const threeMonthsAgo = now - (90 * 24 * 60 * 60 * 1000); // 90 days ago
    const oneMonthFuture = now + (30 * 24 * 60 * 60 * 1000);  // 30 days future
    const timeRange = oneMonthFuture - threeMonthsAgo;
    const randomTime = threeMonthsAgo + Math.random() * timeRange;
    return new Date(randomTime).toISOString();
  };

  // Generate timestamps with different recency patterns for more realistic data
  const randomDateWithRecencyBias = () => {
    const now = Date.now();
    const sixMonthsMs = 180 * 24 * 60 * 60 * 1000;
    
    // Create a bias toward more recent events (exponential decay)
    const bias = Math.random();
    let timeWeight;
    
    if (bias < 0.4) {
      // 40% of events in last 30 days
      timeWeight = Math.random() * 0.17; // 30/180 ≈ 0.17
    } else if (bias < 0.7) {
      // 30% of events in last 90 days
      timeWeight = Math.random() * 0.5; // 90/180 = 0.5
    } else {
      // 30% of events distributed across full 6 months
      timeWeight = Math.random();
    }
    
    const offset = Math.floor(timeWeight * sixMonthsMs);
    return new Date(now - offset);
  };

  const generateUniqueCompanyName = (): string => {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      let name = '';
      const nameType = Math.random();

      if (nameType < 0.3) {
        // Standalone names (30%)
        name = pick(standAloneNames);
      } else if (nameType < 0.6) {
        // Prefix + Root (30%)
        name = `${pick(companyPrefixes)}${pick(companyRoots)}`;
      } else if (nameType < 0.8) {
        // Root + Suffix (20%)
        name = `${pick(companyRoots)} ${pick(companySuffixes)}`;
      } else {
        // Prefix + Root + Suffix (20%)
        name = `${pick(companyPrefixes)}${pick(companyRoots)} ${pick(companySuffixes)}`;
      }

      // Check if name is unique
      if (!generatedCompanyNames.has(name)) {
        generatedCompanyNames.add(name);
        return name;
      }

      attempts++;
    }

    // Fallback if all combinations are exhausted (very unlikely)
    const fallback = `${pick(companyPrefixes)}${pick(companyRoots)} ${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    generatedCompanyNames.add(fallback);
    return fallback;
  };

  const makeAccount = (idx: number): Account => {
    const name = generateUniqueCompanyName();
    const domain = `${slugify(name)}.com`;
    const mrr = Math.round(randomFloat(200, 200000));
    const emp = randInt(5, 5000);
    const plan = pick(planTiers);
    const status = pick(subscriptionStatuses);
    const country = pick(countries);
    const createdAt = randomDateInPast6Months();
    const id = `ACC-${idx.toString().padStart(5, '0')}`;

    // Realistic account traits that a SaaS product would send to Segment
    // No computed metrics - those come from CRM/billing systems or data warehouse
    const integrationsCount = randInt(0, 5); // More realistic
    const usersCount = randInt(1, 25); // More realistic for SMB/SaaS

    return {
      id,
      name,
      domain,
      traits: {
        // Basic company info
        name,
        website: `https://www.${domain}`,
        domain,
        subscription_status: status,
        plan_tier: plan,
        mrr,
        currency: 'USD',
        industry: pick(industries),

        // Company size (useful for segmentation)
        employee_count: emp,

        // Geographic
        location_country: country,

        // Account creation
        signup_date: createdAt.toISOString(),
        signup_source: pick(['direct', 'referral', 'advertisement', 'search', 'social']),

        // Usage metrics (what the product can observe)
        total_users: usersCount,
        integrations_connected: integrationsCount,
        features_used: randInt(1, 8), // Features they've actually accessed

        // Account lifecycle
        account_type: pick(['trial', 'free', 'paid']),
        last_login_date: randomDateWithRecencyBias().toISOString(),

        // Support interaction (what the product knows)
        support_tickets_created: randInt(0, 5),

        // Communication preferences
        email_marketing_opt_in: Math.random() < 0.6,
        product_updates_opt_in: Math.random() < 0.8,

        // Technical context
        primary_integration: integrationsCount > 0 ?
          pick(['Salesforce', 'HubSpot', 'Slack', 'Zapier']) : null,
      },
    };
  };

  const randomName = () => {
    const first = [
      // Popular names from various cultures and backgrounds
      'Ava', 'Liam', 'Noah', 'Emma', 'Olivia', 'Sophia', 'Mia', 'Lucas', 'Ethan', 'Amelia', 'Isabella', 'James', 'Benjamin', 'Elijah',
      'Charlotte', 'Alexander', 'Michael', 'Abigail', 'Emily', 'Harper', 'Evelyn', 'Sebastian', 'Jack', 'Aiden', 'Ella', 'Scarlett',
      'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian',
      'Addison', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe', 'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey',
      'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Everly', 'Anna', 'Caroline', 'Nova', 'Genesis', 'Emilia',
      'Kennedy', 'Samantha', 'Maya', 'Willow', 'Kinsley', 'Naomi', 'Aaliyah', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella',
      'Alice', 'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna', 'Valentina', 'Isla',
      'Eliana', 'Quinn', 'Nevaeh', 'Ivy', 'Sadie', 'Piper', 'Lydia', 'Alexa', 'Josephine', 'Emery', 'Julia', 'Delilah',
      'Arianna', 'Vivian', 'Kaylee', 'Sophie', 'Brielle', 'Madeline', 'Peyton', 'Rylee', 'Clara', 'Hadley', 'Melanie', 'Mackenzie',
      'Reagan', 'Adalynn', 'Liliana', 'Aubree', 'Jade', 'Katherine', 'Isabelle', 'Natalia', 'Raelynn', 'Maria', 'Athena', 'Ximena',
      // Male names
      'William', 'Oliver', 'Wyatt', 'Henry', 'Owen', 'Gabriel', 'Matthew', 'Carter', 'Daniel', 'Jayden', 'Luke', 'Mason',
      'Eli', 'Jonathan', 'David', 'Andrew', 'Brayden', 'Joshua', 'Christopher', 'Anthony', 'Samuel', 'Joseph', 'John', 'Nathan',
      'Lincoln', 'Julian', 'Robert', 'Thomas', 'Aaron', 'Charles', 'Caleb', 'Ryan', 'Adrian', 'Jordan', 'Cameron', 'Jack',
      'Hunter', 'Landon', 'Adrian', 'Wyatt', 'Arthur', 'Kaden', 'Carson', 'Jaxon', 'Jason', 'Ashton', 'Xavier', 'Jose',
      'Jace', 'Jameson', 'Leonardo', 'Axel', 'Everett', 'Kayden', 'Miles', 'Sawyer', 'Jason', 'Declan', 'Weston', 'Micah',
      'Ayden', 'Wesley', 'Luka', 'Vincent', 'Damian', 'Zachary', 'Silas', 'Gavin', 'Chase', 'Kai', 'Emmanuel', 'Nathaniel',
      'Grayson', 'Seamus', 'Sterling', 'Cole', 'Enzo', 'Rowan', 'Adam', 'Ryder', 'Kingston', 'Mateo', 'Bentley', 'Ivan'
    ];

    const last = [
      // Diverse surnames from various ethnic backgrounds
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez',
      'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
      'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott',
      'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
      'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
      'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
      'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James',
      'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long',
      'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson',
      'Barnes', 'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham',
      'Reynolds', 'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson', 'Ellis', 'Tran',
      'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens', 'Harrison', 'Fernandez', 'Mcdonald',
      'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen', 'Freeman', 'Webb', 'Tucker', 'Guzman', 'Burns',
      'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter', 'Gordon', 'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon',
      'Munoz', 'Hunt', 'Hicks', 'Holmes', 'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar',
      'Fox', 'Warren', 'Mills', 'Meyer', 'Rice', 'Robertson', 'Clarkson', 'Fields', 'Klein', 'Webster', 'Swan', 'Bridges'
    ];

    return { first: pick(first), last: pick(last) };
  };

  const makeUser = (account: Account, idx: number): User => {
    const nm = randomName();
    const first = nm.first;
    const last = nm.last;
    const full = `${first} ${last}`;
    const title = pick(titles);
    const role = pick(roles);
    const dept = pick(departments);
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@${account.domain}`;
    const id = `USR-${account.id.split('-')[1]}-${idx.toString().padStart(4, '0')}`;
    const tz = pick([
      'UTC', 'PST', 'EST', 'CST', 'MST', 'CET', 'GMT', 'IST', 'JST', 'AEST', 'AEDT',
      'BST', 'CAT', 'EAT', 'WAT', 'AST', 'NST', 'HST', 'AKST', 'PDT', 'MDT', 'CDT', 'EDT'
    ]);
    const avatar_url = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(full)}`;
    const createdAt = randomDateInPast6Months();

    // Realistic user traits that a SaaS product would send to Segment
    // Focus on what the product can observe directly
    const lastActivity = randomDateWithRecencyBias();
    const deviceType = pick(['desktop', 'laptop', 'tablet', 'mobile']);
    const browser = pick(['Chrome', 'Firefox', 'Safari', 'Edge']);
    const os = pick(['Windows', 'macOS', 'Linux', 'iOS', 'Android']);

    return {
      id,
      account_id: account.id,
      email,
      first_name: first,
      last_name: last,
      full_name: full,
      name: full,
      title,
      avatar_url,
      traits: {
        // Basic user profile
        first_name: first,
        last_name: last,
        name: full,
        email,
        title,
        department: dept,

        // Account relationship
        account_id: account.id,
        account_role: pick(['admin', 'member', 'viewer']),

        // User lifecycle
        signup_date: createdAt.toISOString(),
        last_seen_at: lastActivity.toISOString(),
        email_verified: Math.random() < 0.95,

        // User preferences (what they set in the app)
        timezone: tz,
        preferred_language: pick(['en', 'es', 'fr', 'de']),
        theme_preference: pick(['light', 'dark', 'auto']),
        notifications_enabled: Math.random() < 0.7,

        // Device context (observed)
        device_primary: deviceType,
        browser_primary: browser,
        os_primary: os,

        // Feature usage (observed by product)
        features_used: randInt(1, 8),
        onboarding_completed: Math.random() < 0.8,
        tutorial_viewed: Math.random() < 0.6,

        // Support interaction (observed)
        support_tickets_created: randInt(0, 3),
        feedback_submitted: Math.random() < 0.3,

        // Authentication status
        mfa_enabled: Math.random() < 0.4,
        last_password_change: new Date(lastActivity.getTime() - randInt(30, 180) * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  };

  const makeEventPayload = (event: string, account: Account, user?: User) => {
    // Include top-level timestamp if backend accepts it; otherwise keep in properties.created_at
    const ts = randomDateWithRecencyBias();
    const baseProps: Record<string, any> = {
      account_id: account.id,
      account_name: account.name,
      plan_tier: account.traits.plan_tier,
      subscription_status: account.traits.subscription_status,
      created_at: ts.toISOString(),
    };
    if (user) {
      baseProps.user_id = user.id;
      baseProps.user_email = user.email;
      baseProps.user_title = user.title;
      baseProps.department = user.traits.department;
    }

    // Enrich based on event - realistic SaaS product analytics
    if (event === 'page_viewed') {
      Object.assign(baseProps, {
        page_path: pick(['/', '/dashboard', '/accounts', '/users', '/signals', '/playbooks', '/settings', '/integrations']),
        page_title: pick(['Dashboard', 'Accounts', 'Users', 'Signals', 'Playbooks', 'Settings', 'Integrations']),
        referrer: pick(['direct', 'email', 'search', 'referral']),
        load_time_ms: randInt(200, 3000), // Realistic load times
      });
    } else if (event === 'button_clicked') {
      Object.assign(baseProps, {
        button_text: pick(['Save', 'Create', 'Delete', 'Edit', 'Export', 'Send', 'Update', 'Cancel']),
        button_location: pick(['header', 'sidebar', 'main_content', 'modal', 'toolbar']),
        element_id: `btn-${randInt(1000, 9999)}`,
      });
    } else if (event === 'form_submitted' || event === 'form_started' || event === 'form_abandoned') {
      Object.assign(baseProps, {
        form_name: pick(['account_create', 'user_invite', 'signal_config', 'integration_setup', 'settings_update']),
        form_type: pick(['modal', 'page', 'sidebar']),
        ...(event === 'form_submitted' && { fields_completed: randInt(3, 12) }),
        ...(event === 'form_abandoned' && { abandonment_step: randInt(1, 5) }),
      });
    } else if (event === 'search_performed') {
      Object.assign(baseProps, {
        search_term: pick(['error', 'integration', 'signal', 'account', 'user', 'playbook']),
        search_type: pick(['global', 'accounts', 'users', 'signals', 'playbooks']),
        results_count: randInt(0, 50), // More realistic result counts
        search_source: pick(['header_search', 'page_search']),
      });
    } else if (event === 'filter_applied' || event === 'sort_applied') {
      Object.assign(baseProps, {
        filter_type: pick(['date', 'status', 'type', 'owner', 'priority']),
        filter_value: pick(['active', 'inactive', 'pending', 'completed', 'high', 'medium', 'low']),
        context: pick(['accounts', 'users', 'signals', 'tasks', 'playbooks']),
      });
    } else if (event === 'feature_viewed' || event === 'feature_used') {
      Object.assign(baseProps, {
        feature_name: pick(['signals', 'playbooks', 'integrations', 'reports', 'settings']),
        feature_category: pick(['core', 'advanced', 'integrations', 'analytics']),
        time_spent_seconds: event === 'feature_used' ? randInt(30, 600) : undefined,
      });
    } else if (event.startsWith('signal_')) {
      Object.assign(baseProps, {
        signal_id: `SIG-${randInt(10000, 99999)}`,
        signal_type: pick(['usage_drop', 'milestone', 'error', 'engagement']),
        severity: pick(['low', 'medium', 'high']),
      });
    } else if (event.startsWith('playbook_') || event === 'playbook_step_completed') {
      Object.assign(baseProps, {
        playbook_id: `PL-${randInt(1000, 9999)}`,
        playbook_name: pick(['Onboarding', 'Expansion', 'Retention', 'Adoption']),
        step_number: randInt(1, 10),
        total_steps: randInt(5, 15),
      });
    } else if (event.startsWith('integration_')) {
      Object.assign(baseProps, {
        integration_name: pick(['Salesforce', 'HubSpot', 'Slack', 'Zapier', 'API']),
        integration_type: pick(['crm', 'communication', 'automation', 'api']),
        ...(event === 'integration_sync_completed' && { records_processed: randInt(10, 1000) }),
      });
    } else if (event === 'error_encountered' || event === 'validation_error' || event === 'page_load_error') {
      Object.assign(baseProps, {
        error_type: pick(['validation', 'network', 'permission', 'timeout', 'server']),
        error_code: pick(['400', '401', '403', '404', '429', '500']),
        error_location: pick(['dashboard', 'settings', 'integration', 'account_details']),
        user_action: pick(['form_submit', 'page_load', 'api_call', 'file_upload']),
      });
    } else if (event === 'task_created' || event === 'task_completed' || event === 'task_assigned') {
      Object.assign(baseProps, {
        task_id: `TASK-${randInt(10000, 99999)}`,
        task_type: pick(['follow_up', 'onboarding', 'review', 'escalation']),
        priority: pick(['low', 'medium', 'high']),
        assignee_id: `USR-${randInt(1000, 9999)}`,
      });
    } else if (event === 'onboarding_started' || event === 'onboarding_step_completed' || event === 'onboarding_completed') {
      Object.assign(baseProps, {
        onboarding_type: pick(['new_user', 'new_account', 'feature_specific']),
        step_name: pick(['create_account', 'invite_users', 'setup_integration', 'create_signal']),
        step_number: randInt(1, 7),
        total_steps: 7,
        completion_percentage: event === 'onboarding_completed' ? 100 : randInt(10, 90),
      });
    } else if (event === 'tutorial_viewed' || event === 'help_article_viewed' || event === 'tooltip_viewed') {
      Object.assign(baseProps, {
        content_type: event.split('_')[0], // tutorial, help, tooltip
        content_id: `${event.split('_')[0]}-${randInt(1000, 9999)}`,
        content_title: pick(['Getting Started', 'Creating Signals', 'Using Playbooks', 'Setting up Integrations']),
        time_spent_seconds: randInt(10, 300),
      });
    } else if (event === 'settings_updated' || event === 'notification_preference_changed' || event === 'profile_updated') {
      Object.assign(baseProps, {
        setting_category: pick(['profile', 'notifications', 'security', 'integrations', 'billing']),
        setting_name: pick(['email_notifications', 'timezone', 'language', 'avatar', 'password']),
        previous_value: pick(['enabled', 'disabled', 'old_value']),
        new_value: pick(['enabled', 'disabled', 'new_value']),
      });
    } else if (event === 'email_sent' || event === 'email_opened' || event === 'email_clicked') {
      Object.assign(baseProps, {
        email_type: pick(['welcome', 'notification', 'alert', 'report', 'invite']),
        email_template: pick(['onboarding_welcome', 'weekly_report', 'alert_notification', 'user_invite']),
        recipient_count: randInt(1, 10),
        ...(event === 'email_clicked' && { link_clicked: pick(['dashboard_link', 'settings_link', 'help_link']) }),
      });
    } else if (event === 'notification_sent' || event === 'comment_added' || event === 'team_member_invited') {
      Object.assign(baseProps, {
        notification_type: pick(['mention', 'assignment', 'update', 'reminder']),
        channel: pick(['in_app', 'email', 'slack']),
        recipient_id: `USR-${randInt(1000, 9999)}`,
      });
    } else if (event === 'api_call_made' || event === 'api_rate_limit_hit') {
      Object.assign(baseProps, {
        endpoint: pick(['/api/signals', '/api/users', '/api/accounts', '/api/events']),
        method: pick(['GET', 'POST', 'PUT', 'DELETE']),
        response_time_ms: randInt(50, 5000),
        response_status: event === 'api_rate_limit_hit' ? 429 : pick([200, 201, 400, 401, 404, 500]),
      });
    } else if (event === 'webhook_created' || event === 'webhook_fired') {
      Object.assign(baseProps, {
        webhook_id: `WH-${randInt(1000, 9999)}`,
        webhook_url: `https://customer-app.com/webhooks/${randInt(1000, 9999)}`,
        event_type: pick(['signal_created', 'user_joined', 'task_completed']),
        delivery_status: event === 'webhook_fired' ? pick(['success', 'failed']) : undefined,
      });
    } else if (event === 'report_generated' || event === 'export_requested') {
      Object.assign(baseProps, {
        report_type: pick(['user_activity', 'signal_performance', 'integration_status']),
        format: pick(['csv', 'pdf', 'json']),
        date_range: pick(['7d', '30d', '90d']),
        filters_applied: randInt(0, 3),
      });
    } else if (event === 'dashboard_created' || event === 'dashboard_shared' || event === 'view_created' || event === 'view_saved') {
      Object.assign(baseProps, {
        object_type: event.split('_')[0], // dashboard or view
        object_id: `${event.split('_')[0].toUpperCase()}-${randInt(1000, 9999)}`,
        object_name: pick(['Sales Performance', 'User Engagement', 'Signal Overview', 'Integration Status']),
        visibility: pick(['private', 'team', 'public']),
      });
    } else if (event === 'support_ticket_created' || event === 'feedback_submitted' || event === 'bug_report_sent') {
      Object.assign(baseProps, {
        ticket_type: pick(['bug', 'feature_request', 'account_issue', 'technical_support']),
        priority: pick(['low', 'medium', 'high']),
        category: pick(['dashboard', 'integrations', 'signals', 'playbooks', 'settings']),
        description_length: randInt(10, 500),
      });
    } else if (event === 'file_uploaded' || event === 'deep_link_opened') {
      Object.assign(baseProps, {
        file_type: event === 'file_uploaded' ? pick(['csv', 'xlsx', 'pdf', 'image']) : undefined,
        file_size_kb: event === 'file_uploaded' ? randInt(10, 5000) : undefined,
        source: event === 'deep_link_opened' ? pick(['email', 'slack', 'external_link']) : undefined,
      });
    } else if (event === 'navigation_clicked' || event === 'tab_switched') {
      Object.assign(baseProps, {
        navigation_type: event.split('_')[0], // navigation or tab
        from_section: pick(['dashboard', 'accounts', 'signals', 'settings', 'integrations']),
        to_section: pick(['dashboard', 'accounts', 'signals', 'settings', 'integrations']),
        navigation_method: pick(['menu_click', 'breadcrumb', 'direct_link', 'tab_click']),
      });
    } else if (event === 'user_signed_up' || event === 'account_created') {
      Object.assign(baseProps, {
        signup_method: pick(['email', 'google', 'microsoft', 'invitation']),
        account_type: pick(['free', 'trial', 'paid']),
        referral_source: pick(['direct', 'search', 'social', 'advertisement']),
        user_type: pick(['admin', 'member', 'viewer']),
      });
    } else if (event === 'billing_info_updated' || event === 'plan_viewed') {
      Object.assign(baseProps, {
        billing_action: event.split('_')[0], // billing or plan
        current_plan: pick(['free', 'starter', 'growth', 'enterprise']),
        viewed_plan: event === 'plan_viewed' ? pick(['starter', 'growth', 'enterprise']) : undefined,
        billing_context: pick(['upgrade', 'downgrade', 'renewal', 'cancellation']),
      });
    } else if (event === 'password_reset_requested' || event === 'user_logged_out') {
      Object.assign(baseProps, {
        logout_reason: event === 'user_logged_out' ? pick(['manual', 'timeout', 'security']) : undefined,
        reset_method: event === 'password_reset_requested' ? pick(['email', 'sms']) : undefined,
        session_duration: event === 'user_logged_out' ? randInt(300, 28800) : undefined, // 5 min to 8 hours
      });
    } else if (event === 'idle_warning_shown') {
      Object.assign(baseProps, {
        idle_threshold_minutes: 30,
        warning_type: pick(['toast', 'modal', 'banner']),
        auto_logout_seconds: 300,
        user_response: pick(['dismissed', 'stayed_active', 'logged_out']),
      });
    }

    return {
      timestamp: ts.toISOString(),
      properties: {
        ...baseProps,
        timestamp: ts.toISOString(), // Include timestamp in both main body and properties
        utc_time: randomUTCTime(), // Random ISO timestamp from 3 months ago to 1 month future
      },
    };
  };

  const maybeEmitSequence = async (ev: string, account: Account, user?: User) => {
    // Probabilistic follow-ups to create realistic chains
    if (ev === 'email_sent') {
      if (Math.random() < 0.7) { try { hyperengageClient.track('email_opened', makeEventPayload('email_opened', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
      if (Math.random() < 0.4) { try { hyperengageClient.track('email_clicked', makeEventPayload('email_clicked', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
      if (Math.random() < 0.05) { try { hyperengageClient.track('email_bounced', makeEventPayload('email_bounced', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
    } else if (ev === 'signal_created') {
      if (Math.random() < 0.8) { try { hyperengageClient.track('signal_acknowledged', makeEventPayload('signal_acknowledged', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
      if (Math.random() < 0.6) { try { hyperengageClient.track('signal_resolved', makeEventPayload('signal_resolved', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
    } else if (ev === 'integration_sync_started') {
      const done = Math.random() < 0.85 ? 'integration_sync_completed' : 'integration_sync_failed';
      try { hyperengageClient.track(done, makeEventPayload(done, account, user)); eventsSent++; } catch { } await yieldIfNeeded();
    } else if (ev === 'webhook_failed') {
      if (Math.random() < 0.6) { try { hyperengageClient.track('webhook_retried', makeEventPayload('webhook_retried', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
    } else if (ev === 'session_started') {
      const beats = randInt(1, 5);
      for (let i = 0; i < beats; i++) { try { hyperengageClient.track('session_heartbeat', makeEventPayload('session_heartbeat', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
      try { hyperengageClient.track('session_ended', makeEventPayload('session_ended', account, user)); eventsSent++; } catch { } await yieldIfNeeded();
      if (Math.random() < 0.7) { try { hyperengageClient.track('user_logged_out', makeEventPayload('user_logged_out', account, user)); eventsSent++; } catch { } await yieldIfNeeded(); }
    } else if (ev === 'billing_invoice_generated') {
      const paid = Math.random() < 0.9;
      try { hyperengageClient.track(paid ? 'billing_invoice_paid' : 'billing_payment_failed', makeEventPayload(paid ? 'billing_invoice_paid' : 'billing_payment_failed', account)); eventsSent++; } catch { } await yieldIfNeeded();
    }
  };

  const accountIdentify = () => {
    const companyName = generateUniqueCompanyName();
    const accountId = `ACC-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    hyperengageClient.identify_account({
      account_id: accountId,
      traits: {
        name: companyName,
        date_added: new Date().toISOString(),
        testblablabla: "test",
        email: `contact@${slugify(companyName)}.com`,
        domain: `${slugify(companyName)}.com`,
      },
    });
  };


  const userIdentify = () => {
    if (!users.length) return;
    const user = users[Math.floor(Math.random() * users.length)];
    hyperengageClient.identify_user({
      user_id: user.id,
      traits: {
        ...user.traits,
        name: user.name,
        email: user.email,
        date_added: new Date().toISOString(),
      },
    });
  };

  // Bulk generation controls
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const cancelRef = useRef<boolean>(false);

  const idle = () => new Promise<void>((resolve) => {
    const w: any = typeof window !== 'undefined' ? window : {};
    if (w && typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => resolve(), { timeout: 50 });
    } else {
      setTimeout(() => resolve(), 0);
    }
  });
  const YIELD_EVERY = 400; // cooperative yield cadence
  let opCounter = 0;
  let eventsSent = 0;
  const yieldIfNeeded = async () => {
    opCounter++;
    if (opCounter % YIELD_EVERY === 0) {
      await idle();
    }
  };

  const generateDataset = async (opts?: { accounts?: number; usersPerAccount?: number; avgEventsPerUser?: number }) => {
    const totalAccounts = opts?.accounts ?? 1000;
    const usersPerAccount = opts?.usersPerAccount ?? 10; // 1000 * 10 = 10,000 users
    const avgEventsPerUser = opts?.avgEventsPerUser ?? 12;

    setIsGenerating(true);
    cancelRef.current = false;
    setProgress(`Starting generation for ${totalAccounts} accounts...`);
    opCounter = 0;
    eventsSent = 0;

    let generatedUsers: User[] = [];
    let generatedAccounts: Account[] = [];

    for (let a = 0; a < totalAccounts; a++) {
      if (cancelRef.current) break;
      const account = makeAccount(a);
      generatedAccounts.push(account);

      // Identify account first
      try { hyperengageClient.identify_account({ account_id: account.id, traits: account.traits }); } catch { }
      await yieldIfNeeded();

      // A couple of account-level events to anchor timeline
      for (const ev of ['account_created', 'account_onboarded', 'dashboard_viewed']) {
        const payload = makeEventPayload(ev, account);
        try { hyperengageClient.track(ev, payload); eventsSent++; } catch { }
        await yieldIfNeeded();
      }

      // Occasional account-level scenarios
      if (Math.random() < 0.2) { try { hyperengageClient.track('trial_started', makeEventPayload('trial_started', account)); eventsSent++; } catch { } }
      if (Math.random() < 0.1) { try { hyperengageClient.track('integration_sync_started', makeEventPayload('integration_sync_started', account)); eventsSent++; } catch { } }
      if (Math.random() < 0.05) { try { hyperengageClient.track('billing_invoice_generated', makeEventPayload('billing_invoice_generated', account)); eventsSent++; } catch { } }

      // Users for this account
      const localUsers: User[] = [];
      for (let u = 0; u < usersPerAccount; u++) {
        const user = makeUser(account, u);
        localUsers.push(user);
        try { hyperengageClient.identify_user({ user_id: user.id, traits: user.traits }); } catch { }
        await yieldIfNeeded();

        // User-level lifecycle events
        for (const ev of ['user_invited', 'user_activated', 'user_logged_in']) {
          const payload = makeEventPayload(ev, account, user);
          try { hyperengageClient.track(ev, payload); eventsSent++; } catch { }
          await yieldIfNeeded();
        }
        // Start a session sometimes
        if (Math.random() < 0.6) {
          const ev = 'session_started';
          try { hyperengageClient.track(ev, makeEventPayload(ev, account, user)); eventsSent++; } catch { }
          await yieldIfNeeded();
          await maybeEmitSequence(ev, account, user);
        }
      }

      // Simulate additional events per user
      for (const user of localUsers) {
        if (cancelRef.current) break;
        const extra = Math.max(1, Math.round(randomFloat(avgEventsPerUser * 0.5, avgEventsPerUser * 1.5)));
        for (let i = 0; i < extra; i++) {
          if (cancelRef.current) break;
          const ev = pickWeighted(eventCatalog, eventWeights);
          const payload = makeEventPayload(ev, account, user);
          try { hyperengageClient.track(ev, payload); eventsSent++; } catch { }
          await yieldIfNeeded();
          await maybeEmitSequence(ev, account, user);
        }
      }

      generatedUsers = generatedUsers.concat(localUsers);

      if (a % 5 === 0) {
        setProgress(`Accounts: ${a + 1}/${totalAccounts}, Users: ${generatedUsers.length}, Events: ${eventsSent}`);
        await idle(); // yield to keep UI responsive
      }
    }

    setUsers((prev) => prev.length ? prev : generatedUsers);
    setAccounts((prev) => prev.length ? prev : generatedAccounts);
    setProgress(cancelRef.current ? 'Generation cancelled.' : 'Generation complete.');
    setIsGenerating(false);
  };

  // CSV Export Functions
  const [accounts, setAccounts] = useState<Account[]>([]);

  const downloadCSV = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportAccountsCSV = () => {
    if (!accounts.length) {
      alert('No accounts available. Please generate dataset first.');
      return;
    }

    // HubSpot Company Properties
    const headers = [
      'Company ID',
      'Company Name', 
      'Company Domain Name',
      'Website URL',
      'Industry',
      'Number of Employees',
      'Annual Revenue',
      'Country/Region',
      'Create Date',
      'Subscription Status',
      'Plan Tier',
      'Currency'
    ];

    const csvRows = [headers.join(',')];

    accounts.forEach(account => {
      const row = [
        `"${account.id}"`,
        `"${account.name}"`,
        `"${account.domain}"`,
        `"${account.traits.website}"`,
        `"${account.traits.industry}"`,
        `"${account.traits.employee_count}"`,
        `"${account.traits.mrr}"`,
        `"${account.traits.location_country}"`,
        `"${account.traits.signup_date}"`,
        `"${account.traits.subscription_status}"`,
        `"${account.traits.plan_tier}"`,
        `"${account.traits.currency}"`
      ];
      csvRows.push(row.join(','));
    });

    downloadCSV(csvRows.join('\n'), `companies-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportUsersCSV = () => {
    if (!users.length) {
      alert('No users available. Please generate dataset first.');
      return;
    }

    // HubSpot Contact Properties  
    const headers = [
      'Contact ID',
      'Email',
      'First Name',
      'Last Name',
      'Full Name',
      'Job Title',
      'Department',
      'Role',
      'Company ID',
      'Company Name',
      'Company Domain',
      'Timezone',
      'Create Date',
      'Last Seen',
      'Is Admin',
      'Avatar URL'
    ];

    const csvRows = [headers.join(',')];

    users.forEach(user => {
      // Find the associated account for company info
      const account = accounts.find(acc => acc.id === user.account_id);
      
      const row = [
        `"${user.id}"`,
        `"${user.email}"`,
        `"${user.first_name}"`,
        `"${user.last_name}"`,
        `"${user.full_name}"`,
        `"${user.title}"`,
        `"${user.traits.department || ''}"`,
        `"${user.traits.role || ''}"`,
        `"${user.account_id}"`,
        `"${account?.name || ''}"`,
        `"${account?.domain || ''}"`,
        `"${user.traits.timezone || ''}"`,
        `"${new Date().toISOString()}"`,
        `"${user.traits.last_seen_at || ''}"`,
        `"${user.traits.is_admin || false}"`,
        `"${user.avatar_url}"`
      ];
      csvRows.push(row.join(','));
    });

    downloadCSV(csvRows.join('\n'), `contacts-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportCombinedCSV = () => {
    if (!users.length || !accounts.length) {
      alert('No data available. Please generate dataset first.');
      return;
    }

    // Combined format for easy HubSpot import with company association
    const headers = [
      'Contact Email',
      'First Name',
      'Last Name',
      'Job Title',
      'Department',
      'Company Name',
      'Company Domain',
      'Company ID',
      'Company Website',
      'Company Industry',
      'Company Employee Count',
      'Company Annual Revenue',
      'Company Country',
      'Company Plan Tier',
      'Company Subscription Status'
    ];

    const csvRows = [headers.join(',')];

    users.forEach(user => {
      const account = accounts.find(acc => acc.id === user.account_id);
      if (account) {
        const row = [
          `"${user.email}"`,
          `"${user.first_name}"`,
          `"${user.last_name}"`,
          `"${user.title}"`,
          `"${user.traits.department || ''}"`,
          `"${account.name}"`,
          `"${account.domain}"`,
          `"${account.id}"`,
          `"${account.traits.website}"`,
          `"${account.traits.industry}"`,
          `"${account.traits.employee_count}"`,
          `"${account.traits.mrr}"`,
          `"${account.traits.location_country}"`,
          `"${account.traits.plan_tier}"`,
          `"${account.traits.subscription_status}"`
        ];
        csvRows.push(row.join(','));
      }
    });

    downloadCSV(csvRows.join('\n'), `contacts-with-companies-${new Date().toISOString().split('T')[0]}.csv`);
  };

  // No external fetch; users are generated locally during dataset generation
  useEffect(() => {
    setUsers([]);
    setAccounts([]);
  }, []);

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type='button' onClick={accountIdentify}>Identify Account</button>
        <button type='button' onClick={userIdentify}>Identify User</button>
        <button type='button' onClick={() => {
          hyperengageClient.track("rest_created", { timestamp: new Date().toISOString(), properties: { app: "Test-1", logic: "Test-2", trial: true, test: 1, test2: "test", utc_time: randomUTCTime() } })
        }}>Track Event</button>
        <button type='button' onClick={() => {
          hyperengageClient.reset();
        }}>Reset cookies and user data
        </button>
        <div style={{ marginTop: 16 }}>
          <button
            type='button'
            disabled={isGenerating}
            onClick={() => generateDataset({ accounts: 20, usersPerAccount: 5, avgEventsPerUser: 8 })}
          >
            Generate test dataset (20 companies / 100 users)
          </button>
          <button
            type='button'
            style={{ marginLeft: 8 }}
            disabled={!isGenerating}
            onClick={() => { cancelRef.current = true; }}
          >
            Cancel generation
          </button>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            {progress}
          </div>
        </div>
        
        {/* CSV Export Section */}
        <div style={{ marginTop: 24, borderTop: '1px solid #444', paddingTop: 16 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>Export Data for HubSpot</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <button
              type='button'
              onClick={exportAccountsCSV}
              disabled={!accounts.length}
              style={{ 
                padding: '8px 16px',
                backgroundColor: accounts.length ? '#4CAF50' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: accounts.length ? 'pointer' : 'not-allowed',
                width: '250px'
              }}
            >
              Export Companies CSV ({accounts.length} companies)
            </button>
            
            <button
              type='button'
              onClick={exportUsersCSV}
              disabled={!users.length}
              style={{ 
                padding: '8px 16px',
                backgroundColor: users.length ? '#2196F3' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: users.length ? 'pointer' : 'not-allowed',
                width: '250px'
              }}
            >
              Export Contacts CSV ({users.length} contacts)
            </button>
            
            <button
              type='button'
              onClick={exportCombinedCSV}
              disabled={!users.length || !accounts.length}
              style={{ 
                padding: '8px 16px',
                backgroundColor: (users.length && accounts.length) ? '#FF9800' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (users.length && accounts.length) ? 'pointer' : 'not-allowed',
                width: '250px'
              }}
            >
              Export Combined CSV (Recommended)
            </button>
          </div>
          
          <div style={{ marginTop: 12, fontSize: 11, opacity: 0.7, maxWidth: 400, textAlign: 'center' }}>
            <strong>Combined CSV</strong> includes contacts with company data - perfect for HubSpot import where email and company ID are your sync keys.
          </div>
        </div>
      </header>
    </div>
  );
}

export default TestClient;
