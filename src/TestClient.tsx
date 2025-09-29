import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import HyperengageContext from './context/HyperengageClient.ts';

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
      // Account lifecycle
      'account_created', 'account_onboarded', 'account_tag_added', 'account_tag_removed', 'owner_changed',
      // Subscription & billing
      'trial_started', 'trial_extended', 'trial_converted', 'subscription_upgraded', 'subscription_downgraded', 'renewal_due', 'renewal_closed_won', 'renewal_closed_lost',
      'billing_invoice_generated', 'billing_invoice_paid', 'billing_payment_failed',
      // Integrations
      'integration_connected', 'integration_error', 'integration_mapping_updated',
      'integration_sync_started', 'integration_sync_completed', 'integration_sync_failed',
      // Workspace & settings
      'workspace_member_invited', 'workspace_member_joined', 'permission_changed', 'role_assigned', 'workspace_setting_updated',
      // Product objects
      'success_plan_created', 'success_plan_updated', 'segment_created', 'segment_rule_updated', 'view_created', 'view_filter_updated',
      'dashboard_viewed', 'dashboard_widget_added',
      // Signals
      'signal_created', 'signal_acknowledged', 'signal_resolved',
      // Playbooks, tasks, meetings
      'playbook_created', 'playbook_run', 'cs_playbook_step_assigned', 'cs_playbook_step_completed', 'task_created', 'task_completed',
      'meeting_scheduled', 'meeting_held',
      // User lifecycle & sessions
      'user_invited', 'user_activated', 'user_logged_in', 'session_started', 'session_heartbeat', 'session_ended', 'user_logged_out',
      // Emails & comms
      'email_sent', 'email_opened', 'email_clicked', 'email_bounced', 'slack_notification_sent', 'slack_notification_clicked',
      // Feature + usage
      'feature_adopted', 'feature_dropoff', 'usage_metric_reported',
      // NPS & surveys
      'nps_survey_sent', 'nps_response_received', 'nps_detractor_alert_created',
      // API, security, data
      'api_rate_limit_exceeded', 'api_key_rotated', 'security_login_failed', 'security_mfa_challenge',
      'data_export_requested', 'data_export_completed', 'gdpr_request_received', 'gdpr_request_completed',
      // Webhooks
      'webhook_delivered', 'webhook_failed', 'webhook_retried', 'webhook_enabled', 'webhook_disabled'
    ],
    []
  );

  const eventWeights: Record<string, number> = useMemo(() => ({
    // High frequency
    user_logged_in: 6,
    session_started: 6,
    session_heartbeat: 10,
    session_ended: 6,
    dashboard_viewed: 4,
    feature_adopted: 4,
    usage_metric_reported: 5,
    task_created: 3,
    task_completed: 3,
    email_sent: 4,
    email_opened: 5,
    email_clicked: 3,
    meeting_scheduled: 1,
    meeting_held: 1,
    // Medium
    signal_created: 3,
    signal_acknowledged: 2,
    signal_resolved: 2,
    playbook_run: 2,
    success_plan_created: 1,
    segment_created: 1,
    view_created: 1,
    // Low/edge
    api_rate_limit_exceeded: 0.3,
    integration_sync_started: 0.8,
    integration_sync_completed: 0.8,
    integration_sync_failed: 0.2,
    billing_invoice_generated: 0.4,
    billing_invoice_paid: 0.4,
    billing_payment_failed: 0.1,
    renewal_due: 0.2,
    renewal_closed_won: 0.2,
    renewal_closed_lost: 0.05,
    nps_survey_sent: 0.3,
    nps_response_received: 0.3,
    webhook_failed: 0.2,
    webhook_retried: 0.2,
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
    return {
      id,
      name,
      domain,
      traits: {
        name,
        website: `https://www.${domain}`,
        domain,
        subscription_status: status,
        plan_tier: plan,
        mrr,
        currency: 'USD',
        industry: pick(industries),
        employee_count: emp,
        location_country: country,
        signup_date: createdAt.toISOString(),
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
        first_name: first,
        last_name: last,
        full_name: full,
        name: full,
        email,
        title,
        role,
        department: dept,
        timezone: tz,
        avatar_url,
        account_id: account.id,
        last_seen_at: createdAt.toISOString(),
        is_admin: Math.random() < 0.1,
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

    // Enrich based on event
    if (event === 'email_sent' || event === 'email_opened' || event === 'email_clicked' || event === 'email_bounced') {
      Object.assign(baseProps, {
        campaign_id: `CMP-${randInt(1000, 9999)}`,
        template: pick(['onboarding_welcome', 'health_check', 'qbr_invite', 'renewal_reminder']),
        subject: pick([
          'Welcome to Hyperengage',
          'Let’s set up your signals',
          'Your QBR is coming up',
          'Renewal reminder',
        ]),
        bounce_reason: event === 'email_bounced' ? pick(['mailbox_full', 'invalid_address', 'blocked']) : undefined,
      });
    } else if (event.startsWith('signal_')) {
      Object.assign(baseProps, {
        signal_id: `SIG-${randInt(10000, 99999)}`,
        signal_type: pick(['usage_drop', 'vip_login', 'integration_error', 'milestone_reached']),
        severity: pick(['low', 'medium', 'high']),
      });
    } else if (event === 'integration_connected' || event === 'integration_error') {
      Object.assign(baseProps, {
        integration_name: pick(['Salesforce', 'HubSpot', 'Snowflake', 'BigQuery', 'Segment', 'Zendesk']),
      });
    } else if (event === 'integration_sync_started' || event === 'integration_sync_completed' || event === 'integration_sync_failed') {
      Object.assign(baseProps, {
        integration_name: pick(['Salesforce', 'HubSpot', 'Snowflake', 'BigQuery', 'Segment', 'Zendesk']),
        sync_id: `SYNC-${randInt(10000, 99999)}`,
        records_processed: event === 'integration_sync_completed' ? randInt(100, 100000) : undefined,
        error: event === 'integration_sync_failed' ? pick(['timeout', 'invalid_auth', 'rate_limited']) : undefined,
      });
    } else if (event === 'meeting_scheduled' || event === 'meeting_held') {
      Object.assign(baseProps, {
        meeting_type: pick(['qbr', 'kickoff', 'renewal', 'escalation']),
        duration_minutes: randInt(15, 90),
      });
    } else if (event === 'feature_adopted') {
      Object.assign(baseProps, {
        feature_key: pick(['signals', 'playbooks', 'views', 'segments', 'webhooks', 'nps']),
      });
    } else if (event === 'health_score_calculated') {
      Object.assign(baseProps, {
        health_score: Math.round(randomFloat(20, 100)),
      });
    } else if (event === 'cs_owner_assigned' || event === 'ae_owner_assigned') {
      Object.assign(baseProps, {
        owner_id: `OWN-${randInt(1000, 9999)}`,
        owner_name: pick(['Alex Kim', 'Riya Patel', 'Sam Lee', 'Chris Diaz', 'Taylor Chen']),
      });
    } else if (event === 'owner_changed') {
      Object.assign(baseProps, {
        previous_owner_id: `OWN-${randInt(1000, 9999)}`,
        new_owner_id: `OWN-${randInt(1000, 9999)}`,
      });
    } else if (event.startsWith('subscription_') || event.startsWith('trial_') || event.startsWith('renewal_')) {
      Object.assign(baseProps, {
        previous_plan: pick(planTiers),
        new_plan: pick(planTiers),
        contract_term_months: pick([12, 24, 36]),
        renewal_amount: Math.round(randomFloat(1000, 200000)),
      });
    } else if (event.startsWith('billing_')) {
      Object.assign(baseProps, {
        invoice_id: `INV-${randInt(100000, 999999)}`,
        amount_due: Math.round(randomFloat(100, 20000)),
        currency: 'USD',
      });
    } else if (event === 'usage_metric_reported') {
      Object.assign(baseProps, {
        metric: pick(['active_users', 'signals_created_count', 'playbooks_run_count', 'api_calls']),
        value: randInt(1, 1000),
        period: pick(['daily', 'weekly', 'monthly']),
      });
    } else if (event.startsWith('segment_')) {
      Object.assign(baseProps, {
        segment_id: `SEG-${randInt(1000, 9999)}`,
        rule_count: randInt(1, 10),
      });
    } else if (event.startsWith('view_')) {
      Object.assign(baseProps, {
        view_id: `VIEW-${randInt(1000, 9999)}`,
        filter_count: randInt(0, 5),
      });
    } else if (event.startsWith('dashboard_')) {
      Object.assign(baseProps, {
        dashboard_id: `DB-${randInt(1000, 9999)}`,
        widget: pick(['signals', 'accounts', 'nps', 'adoption', 'revenue']),
      });
    } else if (event.startsWith('playbook_') || event.startsWith('cs_playbook_step_')) {
      Object.assign(baseProps, {
        playbook_id: `PL-${randInt(1000, 9999)}`,
        step_id: event.startsWith('cs_playbook_step_') ? `PLS-${randInt(1000, 9999)}` : undefined,
      });
    } else if (event.startsWith('api_')) {
      Object.assign(baseProps, {
        endpoint: pick(['/v1/signals', '/v1/events', '/v1/accounts', '/v1/users']),
        http_status: pick([200, 201, 400, 401, 403, 429, 500]),
      });
    } else if (event.startsWith('security_')) {
      Object.assign(baseProps, {
        ip: `${randInt(10, 250)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(0, 255)}`,
        user_agent: pick(['Chrome', 'Safari', 'Firefox', 'Edge']),
      });
    } else if (event.startsWith('data_export_') || event.startsWith('gdpr_')) {
      Object.assign(baseProps, {
        export_id: `EXP-${randInt(10000, 99999)}`,
        object_type: pick(['events', 'accounts', 'users']),
      });
    } else if (event.startsWith('webhook_')) {
      Object.assign(baseProps, {
        webhook_id: `WH-${randInt(1000, 9999)}`,
        attempted: event === 'webhook_retried' ? randInt(1, 5) : undefined,
        status: pick([200, 400, 401, 404, 429, 500]),
      });
    } else if (event.startsWith('account_tag_')) {
      Object.assign(baseProps, {
        tag: pick(['Enterprise', 'At-risk', 'VIP', 'PLG', 'High-touch']),
      });
    }

    return {
      timestamp: ts.toISOString(),
      properties: {
        ...baseProps,
        timestamp: ts.toISOString(), // Include timestamp in both main body and properties
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

    for (let a = 0; a < totalAccounts; a++) {
      if (cancelRef.current) break;
      const account = makeAccount(a);

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
    setProgress(cancelRef.current ? 'Generation cancelled.' : 'Generation complete.');
    setIsGenerating(false);
  };

  // No external fetch; users are generated locally during dataset generation
  useEffect(() => {
    setUsers([]);
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
          hyperengageClient.track("rest_created", { timestamp: new Date().toISOString(), properties: { app: "Test-1", logic: "Test-2", trial: true, test: 1, test2: "test" } })
        }}>Track Event</button>
        <button type='button' onClick={() => {
          hyperengageClient.reset();
        }}>Reset cookies and user data
        </button>
        <div style={{ marginTop: 16 }}>
          <button
            type='button'
            disabled={isGenerating}
            onClick={() => generateDataset({ accounts: 1000, usersPerAccount: 10, avgEventsPerUser: 12 })}
          >
            Generate realistic dataset (1000 acc / 10k users)
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
      </header>
    </div>
  );
}

export default TestClient;
