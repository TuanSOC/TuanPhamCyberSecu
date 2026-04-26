export const profile = {
  name: "Pham Minh Tuan",
  role: "Security Engineer Fresher",
  focus: "SOC/Blue Team",
  badge: "SOC Tier 1 Candidate",
  availability: "Open to SOC Tier 1 / Blue Team fresher roles",
  headline: "Blue Team mindset, log-driven detection.",
  lead:
    "I investigate security signals through logs, SIEM telemetry, WAF/firewall events, and system monitoring data. My goal is to help a SOC team reduce noise, triage faster, and document clear incident context.",
  location: "Tan Binh, Ho Chi Minh City",
  email: "tinyly90891@gmail.com",
  phone: "0981 052 217",
  phoneHref: "+84981052217",
  linkedin: "https://www.linkedin.com/in/tuan-pham-8abb3a335/",
  linkedinLabel: "tuan-pham-8abb3a335",
  github: "https://github.com/TuanSOC",
  resume: "/resume.html",
  portrait: "/assets/portrait.png",
};

export const navItems = [
  { id: "about", label: "About", icon: "User" },
  { id: "skills", label: "Skills", icon: "Cpu" },
  { id: "lab-stack", label: "Lab Stack", icon: "Shield" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "projects", label: "Projects", icon: "FolderGit2" },
  { id: "certs", label: "Certifications", icon: "Award" },
  { id: "contact", label: "Contact", icon: "Mail" },
];

export const heroTerminal = `$ whoami
SOC/Blue Team • Fresher

$ stack --list
- ELK / Graylog / Kibana
- Wazuh • pfSense • Barracuda WAF
- Wireshark • Nmap • Burp Suite

$ status
[ok] alert triage
[ok] log analysis
[ok] hardening mindset`;

export const heroChips = ["SIEM", "IR", "WAF", "Firewall"];

export const heroMetrics = [
  { label: "Security focus", value: "SOC / Blue Team" },
  { label: "Core workflow", value: "Log → triage → investigate → report" },
  { label: "Hands-on labs", value: "WAF, SIEM, ML detection, DB hardening" },
  { label: "Automation", value: "Python alerting + log parsing" },
];

export const recruiterHighlights = [
  {
    title: "What I bring",
    body: "A practical security mindset: monitor the signal, validate the evidence, then write down what happened in a way the next analyst can use.",
  },
  {
    title: "Where I fit",
    body: "SOC Tier 1, Blue Team operations, security monitoring, incident triage, firewall/WAF support, and entry-level security automation.",
  },
  {
    title: "How I work",
    body: "Calm under alerts, documentation-first, curious about root cause, and comfortable moving between Linux, SIEM dashboards, network tools, and scripts.",
  },
];

export const aboutCards = [
  {
    title: "Career Objective",
    body:
      "SOC/Blue Team candidate with hands-on experience in SIEM monitoring, alert triage, firewall/WAF configuration, and log-driven investigation. I am seeking a SOC Tier 1 role where I can reduce alert noise, document evidence clearly, and support incident response workflows.",
  },
  {
    title: "Education",
    body: "FPT University — Information Assurance (2021–2025)",
    items: [
      "Network Security, System Hardening",
      "Operating System Security, Web Security",
      "Digital Forensics, Database Security",
      "Vulnerability Assessment",
    ],
  },
];

export const skillGroups = [
  {
    title: "SIEM & Log",
    skills: ["ELK Stack", "Graylog", "Kibana", "Wazuh", "Acronis", "Regex", "Log Analysis", "Security Monitoring"],
  },
  {
    title: "Network & Security",
    skills: ["pfSense", "Barracuda", "Web Application Firewall (Barracuda)", "WAF config", "Port forwarding", "Protocols", "OWASP Top 10", "Vulnerability Assessment"],
  },
  {
    title: "Tools",
    skills: ["Wireshark", "Nmap", "Burp Suite", "Metasploit (basic)", "CisCat", "Lynis", "Linux (Kali/Ubuntu)", "Digital Forensics"],
  },
  {
    title: "Automation",
    skills: ["Python scripting", "SMTP/API automation", "Log parsing", "Alerting"],
  },
  {
    title: "System & Platform",
    skills: ["Docker", "Traefik (TLS/DNS)", "Proxmox", "Grafana", "Loki", "Zabbix", "Alloy"],
  },
  {
    title: "Soft Skills",
    skills: ["Incident analysis", "Problem solving", "Research & documentation"],
  },
];

export const labStack = [
  {
    title: "SIEM & Detection",
    description: "Centralized alert review, event normalization, and investigation workflow practice.",
    tools: ["Wazuh", "ELK Stack", "Graylog", "Kibana", "Regex", "Alert triage"],
  },
  {
    title: "Network & WAF Lab",
    description: "Hands-on defensive testing with firewall rules, WAF policies, and vulnerable targets.",
    tools: ["pfSense", "Barracuda WAF", "DVWA", "Nmap", "Wireshark", "Burp Suite"],
  },
  {
    title: "Infrastructure Monitoring",
    description: "Production-like homelab services for metrics, logs, dashboards, and secure routing.",
    tools: ["Proxmox", "Docker", "Traefik", "Grafana", "Loki", "Zabbix", "Alloy"],
  },
  {
    title: "Automation & Response",
    description: "Small scripts that parse logs, send alerts, and turn repetitive tasks into repeatable workflows.",
    tools: ["Python", "SMTP", "REST API", "Log parsing", "Report writing"],
  },
];

export const experience = [
  {
    when: "Sep 2024 – Dec 2024",
    title: "South Wave Solution (SWS) — Intern (SOC & Security Research)",
    points: [
      "Triaged SIEM alerts and reviewed network activity using ELK, Graylog, and Kibana",
      "Configured Barracuda and pfSense lab firewalls to support secure monitoring scenarios",
      "Performed first-pass investigation and categorized alerts to identify potentially suspicious behavior",
      "Research vulnerability scanning tools: Lynis, CIS-CAT",
      "Deploy and configure a Zimbra mail server for testing and security evaluation",
    ],
  },
  {
    when: "Feb 2026 – Present",
    title: "Cosigma — Intern (System Administrator)",
    points: [
      "Implemented reverse proxy and secure routing with Traefik, TLS, and DNS-based service exposure",
      "Deployed and managed containerized services using Docker in production-like environments",
      "Authentication & access control using PAM (Teleport)",
      "Secure tunneling & reverse proxy with Pangolin",
      "Use Proxmox to build and manage virtualized infrastructure (VM provisioning & management)",
      "Build dashboards and alert rules with Grafana; integrate Alloy, Zabbix, and Loki for metrics/log collection",
      "Troubleshoot and optimize log/metric data pipelines for monitoring",
    ],
  },
];

export const projects = [
  {
    id: "barracuda",
    title: "Barracuda WAF Security Lab",
    meta: "Feb 2025 – Apr 2025 • Individual Researcher",
    image: "/assets/project-waf.png",
    impact: ["Blocked simulated web attacks", "Built email alerting", "Practiced on-prem WAF tuning"],
    summary:
      "Deployed DVWA behind a Barracuda Web Application Firewall and tuned WAF rules to detect and block simulated attacks.",
    tags: ["Barracuda WAF", "DVWA", "DDoS", "XSS", "SMTP", "On-Prem"],
    details: [
      "Deployed DVWA (Damn Vulnerable Web App) behind Barracuda Web Application Firewall",
      "Simulated real-world attacks: DDoS, XSS, file upload bypass, and more",
      "Configured WAF rules to detect and block attacks",
      "Integrated an alert system to send real-time notifications via email using Python SMTP (port 587, 465)",
      "Developed automated Python scripts to send alerts via API and monitor suspicious activities",
      "Understood on-premise WAF setup, alert forwarding, and security policy tuning",
    ],
    caseStudy: {
      problem: "Practice how a SOC analyst validates web attack attempts behind a WAF instead of only trusting a block count.",
      environment: ["DVWA target", "Barracuda Web Application Firewall", "SMTP alerting", "On-prem style lab"],
      actions: [
        "Placed DVWA behind Barracuda WAF and tuned policies for simulated DDoS, XSS, and upload-bypass attempts",
        "Generated attack traffic, reviewed WAF events, and mapped alert context to attack type",
        "Built Python SMTP alerting so notable activity could be forwarded quickly",
      ],
      result: "Produced a repeatable lab flow for WAF policy tuning, alert verification, and evidence collection.",
      learned: "A useful alert needs context: request pattern, rule triggered, source behavior, and recommended next action.",
    },
  },
  {
    id: "ai-threat-detection",
    title: "AI-based Unsupervised Threat Detection",
    meta: "Jul 2025 – Sep 2025 • Research Developer (Capstone)",
    image: "/assets/project-ml.png",
    impact: ["Detected brute-force and SQLi patterns", "Used Wazuh + pfSense telemetry", "Built anomaly scoring workflow"],
    summary:
      "Detect Brute Force and SQL Injection (SQLi) using unsupervised ML, enriched by Wazuh and pfSense telemetry.",
    tags: ["Python", "Scikit-learn", "Isolation Forest", "Autoencoder", "Wazuh (SIEM)", "pfSense", "Flask"],
    source: "https://github.com/TuanSOC/ProJect-AI-Unsupervised",
    details: [
      "Designed and implemented a capstone project for detecting Brute-Force and SQL Injection (SQLi) attacks using unsupervised machine learning",
      "Targeted real-world network and web attack scenarios",
      "Integrated Wazuh as a centralized security management and log aggregation (SIEM) platform",
      "Extracted and engineered features from Wazuh alerts, authentication logs, HTTP request logs, and network traffic",
      "Applied Isolation Forest and Autoencoder models to identify anomalous behavior patterns without labeled attack data",
      "Developed a lightweight Flask-based API/dashboard to visualize detected anomalies and security alerts",
    ],
    caseStudy: {
      problem: "Explore how anomaly detection can identify brute-force and SQLi-like behavior when labeled attack data is limited.",
      environment: ["Wazuh SIEM", "pfSense telemetry", "Python", "Scikit-learn", "Isolation Forest", "Autoencoder"],
      actions: [
        "Collected and normalized authentication, HTTP, and network security events",
        "Engineered features from Wazuh alerts and firewall telemetry for unsupervised models",
        "Compared anomaly scores and reviewed suspicious patterns through a lightweight dashboard/API",
      ],
      result: "Built an end-to-end proof of concept for surfacing suspicious authentication and SQLi patterns.",
      learned: "ML detection is most useful when paired with analyst-readable context and clear false-positive review.",
    },
  },
  {
    id: "oracle-db-security",
    title: "Oracle SQL Database Security",
    meta: "Security Lab • On-Prem",
    image: "/assets/project-db.png",
    impact: ["Enforced least privilege", "Enabled auditing", "Tested SQL injection risk"],
    summary:
      "Hardened Oracle SQL access controls and auditing to reduce risk from SQL injection and unauthorized queries.",
    tags: ["Oracle SQL", "SQL Injection", "Least Privilege", "Auditing", "Hardening"],
    details: [
      "Implemented database-level security controls on Oracle SQL",
      "Configured user access management, roles, and privileges to enforce least-privilege principle",
      "Enabled auditing of user activities and DML/DQL events",
      "Tested for SQL injection vulnerabilities and applied best practices for hardening",
      "Simulated unauthorized access attempts and monitored logs for anomalies",
      "Compared with MySQL to understand cross-platform security configurations",
    ],
    caseStudy: {
      problem: "Reduce database risk from excessive privileges, weak auditing, and SQL injection testing scenarios.",
      environment: ["Oracle SQL", "Role-based access", "Auditing", "SQL injection test cases", "On-prem lab"],
      actions: [
        "Created role-based access controls and reviewed user privileges against least-privilege principles",
        "Enabled auditing for key user actions and query activity",
        "Tested SQL injection scenarios and documented hardening recommendations",
      ],
      result: "Improved database security posture through clearer access boundaries and audit visibility.",
      learned: "Database hardening is strongest when access design, query testing, and audit review are treated together.",
    },
  },
];

export const certifications = [
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy • 2023",
    image: "/assets/badge-ccna.png",
    verify: "https://www.credly.com/badges/8cb76dcc-7549-4039-a191-1c54d51c2650/public_url",
  },
  {
    title: "CyberOps Associate",
    issuer: "Cisco Networking Academy • 2023",
    image: "/assets/badge-cisco.png",
    verify: "https://www.credly.com/badges/45f0441c-1f0c-493d-a2dd-cc9a95777c8b/public_url",
  },
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy • 2025",
    image: "/assets/badge-ethical.png",
    verify: "https://www.credly.com/badges/45f0441c-1f0c-493d-a2dd-cc9a95777c8b/public_url",
  },
  {
    title: "ISC2 Systems Security Certified Practitioner (SSCP) Specialization",
    id: "ID: A569L1FT9TZH",
    issuer: "ISC2 • Mar 2025",
    image: "/assets/badge-isc2.png",
    verify: "https://www.coursera.org/account/accomplishments/specialization/A569L1FT9TZH",
  },
  {
    title: "Applied Cryptography Specialization",
    id: "ID: RT4PZTRQAUC3",
    issuer: "University of Colorado System • May 2024",
    image: "/assets/badge-crypto.png",
    verify: "https://www.coursera.org/account/accomplishments/specialization/RT4PZTRQAUC3",
  },
  {
    title: "Core Java Specialization",
    id: "ID: 89A5SN83TDYA",
    issuer: "LearnQuest • Oct 2025",
    image: "/assets/badge-java.png",
    verify: "https://www.coursera.org/account/accomplishments/specialization/89A5SN83TDYA",
  },
];
