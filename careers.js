// Hyna Studio Careers Client Engine

function initApp() {
  // 1. Zod library initialization from CDN
  const { z } = window.Zod || { z: null };
  if (!z) {
    console.error("Zod was not loaded correctly from CDN.");
  }

  // 2. Global State Management
  let currentStep = 1;
  const totalSteps = 10;

  // Default structure for Application Data
  const defaultFormData = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    dob: "",
    profilePhoto: "", // Base64
    education: [
      { institution: "", degree: "", department: "", year: "", cgpa: "" }
    ],
    skills: {
      languages: [],
      frameworks: [],
      databases: [],
      devops: [],
      cyber: []
    },
    projects: [
      { name: "", description: "", techStack: "", githubUrl: "", liveUrl: "", duration: "", teamSize: "", images: [] }
    ],
    experience: [],
    certifications: [],
    socials: {
      githubUrl: "",
      linkedinUrl: "",
      portfolioUrl: "",
      leetcodeUrl: "",
      hackerrankUrl: "",
      tryhackmeUrl: ""
    },
    resumeFile: "", // Base64
    resumeName: "",
    resumeSize: "",
    teamPreference: "",
    whyJoin: "",
    contribution: "",
    hoursPerWeek: "",
    expectedStipend: ""
  };

  let formData = JSON.parse(JSON.stringify(defaultFormData));

  // Admin session check
  let isAdminAuthenticated = false;

  // Supabase Configuration
  // Put your real URL and Anon Key here to connect database.
  const SUPABASE_URL = "";
  const SUPABASE_ANON_KEY = "";

  let supabase = null;
  let isOfflineMode = true;

  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      isOfflineMode = false;
      console.log("Supabase Client initialized successfully.");
    } catch (e) {
      console.warn("Failed to initialize Supabase, running in offline mock mode:", e);
    }
  } else {
    console.log("No Supabase configuration detected. Running in Local Mock mode.");
  }

  // Initialize Mock database if needed
  if (!localStorage.getItem('Hyna Studio_applications') || JSON.parse(localStorage.getItem('Hyna Studio_applications')).length === 0) {
    const mockCandidates = [
      {
        id: "NEX-AI880C",
        full_name: "Sarah Connor",
        email: "sarah.connor@sky.net",
        phone: "+1 (555) 489-0102",
        location: "Los Angeles, CA",
        dob: "1995-11-12",
        profile_photo_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%236366f1'/><text x='50' y='58' font-family='sans-serif' font-weight='bold' font-size='32' fill='white' text-anchor='middle'>SC</text></svg>",
        skills: {
          languages: ["Python", "C++", "Julia"],
          frameworks: ["PyTorch", "Hugging Face", "NumPy", "JAX"],
          databases: ["PostgreSQL", "Pinecone"],
          devops: ["Docker", "AWS Lambda"],
          cyber: ["Adversarial Attack Defense", "Secure Inference"]
        },
        github_url: "https://github.com/sconnor",
        linkedin_url: "https://linkedin.com/in/sconnor",
        portfolio_url: "https://sconnor.dev",
        leetcode_url: "https://leetcode.com/sconnor",
        hackerrankUrl: "",
        tryhackmeUrl: "",
        resume_url: "data:text/plain;base64,TW9jayBSZXN1bWUgQ29udGVudCBmb3IgU2FyYWggQ29ubm9yIC0gQUkvTUwgRW5naW5lZXI=",
        resume_name: "Sarah_Connor_Resume.pdf",
        resume_size: "1.42 MB",
        team_preference: "AI/ML",
        why_join: "I want to lead the research cell and ensure that when autonomous intelligence platforms scale, they do so with maximum safety safeguards.",
        contribution: "I bring 4+ years of deep learning research, optimization models, and custom embedding index techniques for high-performance clusters.",
        hours_per_week: 40,
        expected_stipend: "$4,500 / mo",
        status: "Pending",
        created_at: "2026-06-11T14:30:00Z",
        education: [
          { institution: "UC Berkeley", degree: "Master of Science", department: "Robotics & Artificial Intelligence", year: 2018, cgpa: "3.92 / 4.0" }
        ],
        projects: [
          { name: "T-800 Neural Core", description: "Designed an edge-computing neural inference engine optimized for low-latency feedback control loops using PyTorch and WebGL visualizers.", techStack: "PyTorch, C++, CUDA", githubUrl: "https://github.com/sconnor/t800-core", liveUrl: "https://t800.sky.net/demo", duration: "6 Months", teamSize: 3, images: [] }
        ],
        experience: [
          { company: "Cyberdyne Systems", position: "AI Research Specialist", startDate: "2019-06-01", endDate: "2023-08-15", description: "Engineered distributed neural model tuning tools, boosting training convergence speeds by 35% on multi-GPU nodes." }
        ],
        certifications: [
          { name: "NVIDIA Deep Learning Professional", issuer: "NVIDIA Academy", date: "2020-04-12", pdfUrl: "data:text/plain;base64,TW9jayBOVklESUEgQ2VydGlmaWNhdGU=" }
        ]
      },
      {
        id: "NEX-CY304M",
        full_name: "Alex Mercer",
        email: "amercer@gentek.org",
        phone: "+1 (555) 304-9842",
        location: "New York, NY",
        dob: "1992-04-22",
        profile_photo_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2306b6d4'/><text x='50' y='58' font-family='sans-serif' font-weight='bold' font-size='32' fill='white' text-anchor='middle'>AM</text></svg>",
        skills: {
          languages: ["C", "Rust", "Go", "Python"],
          frameworks: ["Gin", "Scapy", "Tauri"],
          databases: ["SQLite", "Redis"],
          devops: ["Docker", "Kubernetes"],
          cyber: ["Reverse Engineering", "Kernel Audit", "Ghidra", "Wireshark", "OWASP Web Security"]
        },
        github_url: "https://github.com/mercer-a",
        linkedin_url: "https://linkedin.com/in/amercer",
        portfolio_url: "",
        leetcode_url: "",
        hackerrankUrl: "https://hackerrank.com/amercer",
        tryhackmeUrl: "https://tryhackme.com/p/mercer",
        resume_url: "data:text/plain;base64,TW9jayBSZXN1bWUgQ29udGVudCBmb3IgQWxleCBNZXJjZXIgLSBDeWJlcnNlY3VyaXR5IEF1ZGl0b3I=",
        resume_name: "Alex_Mercer_Security.pdf",
        resume_size: "2.10 MB",
        team_preference: "Cybersecurity",
        why_join: "Hyna Studio is building the core web tools of the future. I want to secure your nodes before threats target customer accounts.",
        contribution: "I bring automated penetration script libraries, static analyzer automation, and kernel-level trace auditing skills to secure code workflows.",
        hours_per_week: 35,
        expected_stipend: "Competitor Match",
        status: "Shortlisted",
        created_at: "2026-06-10T09:15:00Z",
        education: [
          { institution: "MIT", degree: "Bachelor of Science", department: "Computer Science & Security Engineering", year: 2014, cgpa: "3.85 / 4.0" }
        ],
        projects: [
          { name: "Aegis Kernel Guardian", description: "Developed a kernel hook driver monitoring system call tables to intercept buffer overflow attempts and secure local execution memory.", techStack: "C, Assembly, Rust", githubUrl: "https://github.com/mercer-a/guardian", liveUrl: "", duration: "1 Year", teamSize: 1, images: [] }
        ],
        experience: [
          { company: "Gentek Defense Corp", position: "Security Analyst", startDate: "2015-08-01", endDate: "2019-12-30", description: "Conducted white-box vulnerability assessments of network clusters, fixing over 45 high-severity exploit surfaces." }
        ],
        certifications: [
          { name: "OSCP - Offensive Security Certified Professional", issuer: "Offensive Security", date: "2017-10-18", pdfUrl: "data:text/plain;base64,TW9jayBPU0NQIENlcnRpZmljYXRl" }
        ]
      },
      {
        id: "NEX-FS972F",
        full_name: "Elena Fisher",
        email: "elena.fisher@unexplored.net",
        phone: "+1 (555) 902-1823",
        location: "London, UK",
        dob: "1997-08-30",
        profile_photo_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2310b981'/><text x='50' y='58' font-family='sans-serif' font-weight='bold' font-size='32' fill='white' text-anchor='middle'>EF</text></svg>",
        skills: {
          languages: ["TypeScript", "JavaScript", "Rust", "HTML/CSS"],
          frameworks: ["React", "Next.js", "Node.js", "Tailwind", "Actix-web"],
          databases: ["MongoDB", "Redis", "Supabase"],
          devops: ["GitHub Actions", "Docker", "Vercel"],
          cyber: ["OAuth 2.0 Integration", "CORS Configuration", "SQL Injection Safeguards"]
        },
        github_url: "https://github.com/efisher-explorer",
        linkedin_url: "https://linkedin.com/in/efisher",
        portfolio_url: "https://efisher.net",
        leetcode_url: "https://leetcode.com/efisher",
        hackerrankUrl: "",
        tryhackmeUrl: "",
        resume_url: "data:text/plain;base64,TW9jayBSZXN1bWUgQ29udGVudCBmb3IgRWxlbmEgRmlzaGVyIC0gRnVsbCBTdGFjayBEZXZlbG9wZXI=",
        resume_name: "Elena_Fisher_Developer.pdf",
        resume_size: "1.15 MB",
        team_preference: "Full Stack",
        why_join: "I love crafting beautiful, responsive user flows that feel incredibly snappy. Hyna Studio's premium visual language aligns perfectly with my design standards.",
        contribution: "Highly proficient in full-stack JavaScript/TypeScript. Experienced in deploying complex multi-view SPAs, custom graph tools, and real-time websockets.",
        hours_per_week: 40,
        expected_stipend: "$3,800 / mo",
        status: "Accepted",
        created_at: "2026-06-08T18:45:00Z",
        education: [
          { institution: "University College London", degree: "Bachelor of Science", department: "Software Engineering", year: 2019, cgpa: "3.80 / 4.0" }
        ],
        projects: [
          { name: "El Dorado Cluster Maps", description: "Created an interactive geospatial node viewer that renders coordinate points using WebGL and caches query responses locally with Redis.", techStack: "React, Leaflet, Node.js, Redis", githubUrl: "https://github.com/efisher/eldorado-maps", liveUrl: "https://maps.eldorado.dev", duration: "4 Months", teamSize: 2, images: [] }
        ],
        experience: [
          { company: "Explorer Media Press", position: "Full Stack Developer", startDate: "2020-03-10", endDate: "2024-05-01", description: "Managed content publishing interfaces, shifting page speeds by 50% using server-side rendering and asset prefetching." }
        ],
        certifications: [
          { name: "AWS Certified Developer - Associate", issuer: "Amazon Web Services", date: "2021-11-20", pdfUrl: "data:text/plain;base64,TW9jayBBV1MgQ2VydGlmaWNhdGU=" }
        ]
      }
    ];
    localStorage.setItem('Hyna Studio_applications', JSON.stringify(mockCandidates));
  }

  // Initialize Mock Project Requests database if needed
  if (!localStorage.getItem('Hyna Studio_project_requests') || JSON.parse(localStorage.getItem('Hyna Studio_project_requests')).length === 0) {
    const mockRequests = [
      {
        id: "REQ-ECOM98",
        client_name: "Bruce Wayne",
        company_name: "Wayne Enterprises",
        email: "bruce@wayne.corp",
        phone: "+1 (555) 912-0044",
        website_type: "E-commerce",
        goals: "Develop a secure internal portal to catalog hardware procurement and allow remote agent login with double encryption.",
        target_audience: "Internal logistics personnel and special agents.",
        tech_stack: ["React", "TailwindCSS", "PostgreSQL", "Supabase"],
        page_count: "5-10",
        color_scheme: "Gotham Stealth (deep dark gray, matte black, bat-gold accents)",
        design_style: "Futuristic",
        reference_urls: "https://wayneenterprises.com/portal",
        provide_content: true,
        integrations: ["Portfolio", "Database", "Auth"],
        additional_features: ["Contact", "Analytics"],
        delivery_date: "2026-09-30",
        budget_range: "$10,000+",
        attachments: "",
        status: "New",
        created_at: "2026-06-11T16:00:00Z"
      },
      {
        id: "REQ-SAAS10",
        client_name: "Tony Stark",
        company_name: "Stark Industries",
        email: "tony@stark.io",
        phone: "+1 (555) 300-4821",
        website_type: "SaaS",
        goals: "Create a WebGL real-time energy grid monitor displaying thermal outputs of arc reactors across regional grids.",
        target_audience: "Nuclear technicians and energy supervisors.",
        tech_stack: ["Next.js", "WebGL/Three.js", "Node.js", "Supabase"],
        page_count: "1-5",
        color_scheme: "Iron Core (Brushed silver, crimson red, holographic blue accents)",
        design_style: "Futuristic",
        reference_urls: "https://stark.io/reactor-status",
        provide_content: false,
        integrations: ["Database", "Auth"],
        additional_features: ["Chatbot", "Analytics"],
        delivery_date: "2026-08-15",
        budget_range: "$10,000+",
        attachments: "",
        status: "Under Review",
        created_at: "2026-06-10T11:20:00Z"
      }
    ];
    localStorage.setItem('Hyna Studio_project_requests', JSON.stringify(mockRequests));
  }
  let localRequests = JSON.parse(localStorage.getItem('Hyna Studio_project_requests') || '[]');

  // Step names dictionary
  const stepNames = {
    1: "Personal Details",
    2: "Education",
    3: "Skills",
    4: "Projects",
    5: "Experience",
    6: "Certifications",
    7: "Social Profiles",
    8: "Resume Upload",
    9: "Team Preference",
    10: "Final Questions"
  };

  // 3. Zod Validation Schemas
  const stepSchemas = {
    1: z.object({
      fullName: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(8, "Phone number must be at least 8 digits"),
      location: z.string().min(2, "Location must be city, country format"),
      dob: z.string().refine(val => {
        const date = Date.parse(val);
        return !isNaN(date) && new Date(date) < new Date();
      }, "Date of birth must be in the past"),
      profilePhoto: z.string().min(1, "Profile photo upload is required")
    }),
    2: z.object({
      education: z.array(z.object({
        institution: z.string().min(2, "Institution name is required"),
        degree: z.string().min(2, "Degree is required"),
        department: z.string().min(2, "Department is required"),
        year: z.coerce.number().min(1950, "Enter a valid graduation year").max(new Date().getFullYear() + 7),
        cgpa: z.string().min(1, "CGPA or percentage is required")
      })).min(1, "Add at least one education record")
    }),
    3: z.object({
      skills: z.object({
        languages: z.array(z.string()).min(1, "Add at least one programming language tag"),
        frameworks: z.array(z.string()),
        databases: z.array(z.string()),
        devops: z.array(z.string()),
        cyber: z.array(z.string())
      })
    }),
    4: z.object({
      projects: z.array(z.object({
        name: z.string().min(2, "Project name is required"),
        description: z.string().min(10, "Describe your project (min 10 characters)"),
        techStack: z.string().min(2, "Provide the technologies used"),
        githubUrl: z.string().url("Enter a valid URL (GitHub)").or(z.literal('')),
        liveUrl: z.string().url("Enter a valid URL (Live demo)").or(z.literal('')),
        duration: z.string().min(2, "Project duration is required"),
        teamSize: z.coerce.number().min(1, "Team size must be at least 1"),
        images: z.array(z.string()) // Base64 screenshot strings
      })).min(1, "Please list at least one showcase project")
    }),
    5: z.object({
      experience: z.array(z.object({
        company: z.string().min(2, "Company name is required"),
        position: z.string().min(2, "Position/Title is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().or(z.literal('')), // Can be empty if present
        description: z.string().min(10, "Describe your responsibilities (min 10 characters)")
      })) // Experience is optional
    }),
    6: z.object({
      certifications: z.array(z.object({
        name: z.string().min(2, "Certificate name is required"),
        issuer: z.string().min(2, "Issuing organization is required"),
        date: z.string().min(1, "Award date is required"),
        pdfUrl: z.string().min(1, "Please upload the certification PDF")
      })) // Certifications optional
    }),
    7: z.object({
      socials: z.object({
        githubUrl: z.string().url("Enter a valid GitHub link").or(z.literal('')),
        linkedinUrl: z.string().url("Enter a valid LinkedIn link").or(z.literal('')),
        portfolioUrl: z.string().url("Enter a valid Portfolio link").or(z.literal('')),
        leetcodeUrl: z.string().url("Enter a valid LeetCode link").or(z.literal('')),
        hackerrankUrl: z.string().url("Enter a valid HackerRank link").or(z.literal('')),
        tryhackmeUrl: z.string().url("Enter a valid TryHackMe link").or(z.literal(''))
      })
    }),
    8: z.object({
      resumeFile: z.string().min(1, "Resume file is required. Drag & Drop PDF/DOCX")
    }),
    9: z.object({
      teamPreference: z.string().min(1, "Please choose your preferred team track")
    }),
    10: z.object({
      whyJoin: z.string().min(20, "Tell us why you want to join (min 20 characters)"),
      contribution: z.string().min(20, "Tell us what you can contribute (min 20 characters)"),
      hoursPerWeek: z.coerce.number().min(5, "Available hours must be at least 5 hours").max(168),
      expectedStipend: z.string().min(2, "Please state your expectation")
    })
  };

  const projectRequestSchema = z.object({
    clientName: z.string().min(2, "Name must be at least 2 characters long"),
    companyName: z.string().min(2, "Company name is required"),
    clientEmail: z.string().email("Please enter a valid email address"),
    clientPhone: z.string().min(8, "Phone number must be at least 8 digits"),
    websiteType: z.string().min(1, "Website type is required"),
    projectGoals: z.string().min(15, "Describe your project goals (min 15 characters)"),
    targetAudience: z.string().min(10, "Describe your target audience (min 10 characters)"),
    prefTech: z.array(z.string()).min(1, "Select at least one preferred technology"),
    pageCount: z.string().min(1, "Page count selection is required"),
    colorScheme: z.string().min(3, "Color scheme preference is required"),
    designStyle: z.string().min(1, "Style selection is required"),
    referenceUrls: z.string().or(z.literal('')),
    provideContent: z.enum(["true", "false"]),
    reqIntegrations: z.array(z.string()),
    addFeatures: z.array(z.string()),
    deliveryDate: z.string().refine(val => {
      const date = Date.parse(val);
      return !isNaN(date) && new Date(date) > new Date();
    }, "Delivery date must be in the future"),
    budgetRange: z.string().min(1, "Select a budget range"),
    requestFiles: z.string().or(z.literal('')), // Base64
    requestConfirm: z.boolean().refine(val => val === true, "You must confirm accuracy of these details")
  });

  // 4. Dom Nodes Selection
  const sections = {
    landing: document.getElementById('landing-page'),
    form: document.getElementById('application-form-page'),
    projectRequest: document.getElementById('project-request-page'),
    success: document.getElementById('success-page'),
    adminLogin: document.getElementById('admin-login-page'),
    adminDashboard: document.getElementById('admin-dashboard-page')
  };

  const navLinks = {
    about: document.getElementById('link-about'),
    positions: document.getElementById('link-positions'),
    culture: document.getElementById('link-culture'),
    projects: document.getElementById('link-projects')
  };

  const navLogoBtn = document.getElementById('nav-logo-btn');
  const navbarRequestBtn = document.getElementById('navbar-request-btn');
  const navbarApplyBtn = document.getElementById('navbar-apply-btn');
  const navbarAdminBtn = document.getElementById('navbar-admin-btn');
  const heroJoinBtn = document.getElementById('hero-join-btn');

  // Form Step Controller Controls
  const stepText = document.getElementById('current-step-text');
  const stepNameText = document.getElementById('step-name-text');
  const progressFill = document.getElementById('progress-bar-fill');
  const progressDots = document.getElementById('progress-dots');
  const formPrevBtn = document.getElementById('form-prev-btn');
  const formNextBtn = document.getElementById('form-next-btn');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  // Dynamic row buttons
  const btnAddEducation = document.getElementById('btn-add-education');
  const btnAddProject = document.getElementById('btn-add-project');
  const btnAddExperience = document.getElementById('btn-add-experience');
  const btnAddCertification = document.getElementById('btn-add-certification');

  // Draft buttons & Toast
  const btnSaveDraft = document.getElementById('btn-save-draft');
  const btnClearDraft = document.getElementById('btn-clear-draft');
  const draftToast = document.getElementById('draft-toast');

  // Success views elements
  const successRefId = document.getElementById('success-ref-id');
  const successTrack = document.getElementById('success-track');
  const successEmail = document.getElementById('success-email');
  const successReturnBtn = document.getElementById('success-return-btn');

  // Admin views elements
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminPasswordInput = document.getElementById('adminPassword');
  const adminLoginError = document.getElementById('admin-login-error');
  const btnAdminLogout = document.getElementById('btn-admin-logout');

  const adminSearchInput = document.getElementById('admin-search-input');
  const adminFilterTrack = document.getElementById('admin-filter-track');
  const adminFilterStatus = document.getElementById('admin-filter-status');
  const adminFilterSkill = document.getElementById('admin-filter-skill');

  const candidatesTableBody = document.getElementById('candidates-table-body');
  const noCandidatesMsg = document.getElementById('no-candidates-msg');
  const candidateModal = document.getElementById('candidate-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalDetailsContainer = document.getElementById('modal-details-container');

  // Global Applications Array for Offline cache
  let localApplications = JSON.parse(localStorage.getItem('Hyna Studio_applications') || '[]');

  // ================= 5. ROUTING & NAV STATE CONTROLLERS =================
  function showSection(targetSection) {
    Object.values(sections).forEach(sec => {
      sec.classList.remove('active');
    });
    targetSection.classList.add('active');

    // Smooth reset scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Highlight Navbar Active item
    updateNavbarActive(targetSection);
  }

  function updateNavbarActive(sectionNode) {
    document.querySelectorAll('.nav-link-item').forEach(link => link.classList.remove('active'));
    if (sectionNode === sections.landing) {
      // Highlight based on visible section later or set default
      navLinks.about.classList.add('active');
    }
  }

  // Navbar link triggers (toggles page to landing page if on form/admin, then scroll)
  document.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');

      if (sections.landing.classList.contains('active')) {
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        showSection(sections.landing);
        setTimeout(() => {
          const element = document.querySelector(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }

      document.querySelectorAll('.nav-link-item').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  navLogoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(sections.landing);
  });

  navLogoBtn.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (isAdminAuthenticated) {
      showSection(sections.adminDashboard);
      loadAdminData();
    } else {
      showSection(sections.adminLogin);
    }
  });

  if (navbarRequestBtn) {
    navbarRequestBtn.addEventListener('click', () => {
      initiateProjectRequestFlow();
    });
  }

  function initiateProjectRequestFlow() {
    showSection(sections.projectRequest);
    setupProjectFormInteractions();
  }

  navbarApplyBtn.addEventListener('click', () => {
    initiateApplicationFlow();
  });

  if (heroJoinBtn) {
    heroJoinBtn.addEventListener('click', () => {
      const el = document.getElementById('positions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Handle clicking "Apply Now" directly from Position items
  document.querySelectorAll('.position-item').forEach(item => {
    const applyBtn = item.querySelector('.pos-apply-btn');
    const teamName = item.getAttribute('data-team');

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        initiateApplicationFlow(teamName);
      });
    }
  });

  navbarAdminBtn.addEventListener('click', () => {
    if (isAdminAuthenticated) {
      showSection(sections.adminDashboard);
      loadAdminData();
    } else {
      showSection(sections.adminLogin);
    }
  });

  btnAdminLogout.addEventListener('click', () => {
    isAdminAuthenticated = false;
    showSection(sections.landing);
    navbarAdminBtn.innerHTML = `<i data-lucide="shield-check"></i> Admin`;
    lucide.createIcons();
  });

  // Admin login credentials submission
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = adminPasswordInput.value;
    if (password === 'Hyna Studio123') {
      isAdminAuthenticated = true;
      adminPasswordInput.value = '';
      adminLoginError.textContent = '';
      navbarAdminBtn.innerHTML = `<i data-lucide="layout-dashboard"></i> Dashboard`;
      lucide.createIcons();
      showSection(sections.adminDashboard);
      loadAdminData();
    } else {
      adminLoginError.textContent = 'Invalid security passcode. Access denied.';
    }
  });

  // Initializing Application portal
  function initiateApplicationFlow(preselectedTrack = "") {
    showSection(sections.form);

    // Handle Draft loader
    const savedDraft = localStorage.getItem('Hyna Studio_careers_draft');
    if (savedDraft) {
      formData = JSON.parse(savedDraft);
      showToast("Restored your saved draft.");
    }

    if (preselectedTrack) {
      formData.teamPreference = preselectedTrack;
      // Preselect in Step 9
      const card = document.querySelector(`.team-card[data-preference="${preselectedTrack}"]`);
      if (card) {
        document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('teamPreference').value = preselectedTrack;
      }
    }

    // Sync initial step details
    currentStep = 1;
    syncStepView();
  }

  // ================= 6. MULTI-STEP CONTROLLER =================
  function initProgressDots() {
    progressDots.innerHTML = '';
    for (let i = 1; i <= totalSteps; i++) {
      const dot = document.createElement('div');
      dot.classList.add('progress-dot-node');
      if (i === 1) dot.classList.add('active');
      dot.id = `dot-step-${i}`;
      progressDots.appendChild(dot);
    }
  }

  function syncStepView() {
    // Hide all steps, activate current
    document.querySelectorAll('.form-step').forEach(stepNode => {
      stepNode.classList.remove('active');
    });
    const currentStepNode = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepNode) currentStepNode.classList.add('active');

    // Update headers text
    stepText.textContent = currentStep;
    stepNameText.textContent = stepNames[currentStep];

    // Update Progress bar width & dots state
    const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressWidth}%`;

    for (let i = 1; i <= totalSteps; i++) {
      const dot = document.getElementById(`dot-step-${i}`);
      if (dot) {
        dot.classList.remove('active', 'completed');
        if (i === currentStep) {
          dot.classList.add('active');
        } else if (i < currentStep) {
          dot.classList.add('completed');
        }
      }
    }

    // Toggle navigation buttons layout
    if (currentStep === 1) {
      formPrevBtn.style.visibility = 'hidden';
    } else {
      formPrevBtn.style.visibility = 'visible';
    }

    if (currentStep === totalSteps) {
      formNextBtn.classList.add('hidden');
      formSubmitBtn.classList.remove('hidden');
    } else {
      formNextBtn.classList.remove('hidden');
      formSubmitBtn.classList.add('hidden');
    }

    // Load custom dynamic inputs rendering per step
    if (currentStep === 2) {
      renderEducationRows();
    } else if (currentStep === 4) {
      renderProjectRows();
    } else if (currentStep === 5) {
      renderExperienceRows();
    } else if (currentStep === 6) {
      renderCertificationRows();
    } else if (currentStep === 8) {
      renderResumePreview();
    }

    // Bind current details
    bindDataToInputs();
  }

  formPrevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      syncStepView();
    }
  });

  formNextBtn.addEventListener('click', () => {
    // Read input values into our model
    saveCurrentStepData();

    // Trigger validation
    const isValid = validateStep(currentStep);
    if (isValid) {
      currentStep++;
      syncStepView();
      // Auto save draft to local on step transition
      saveDraftOffline(false);
    }
  });

  initProgressDots();

  // ================= 7. DATA BINDING & PERSISTENCE =================
  function bindDataToInputs() {
    // General text bindings for simple inputs
    const simpleInputs = ['fullName', 'email', 'phone', 'location', 'dob', 'githubUrl', 'linkedinUrl', 'portfolioUrl', 'leetcodeUrl', 'hackerrankUrl', 'tryhackmeUrl', 'whyJoin', 'contribution', 'hoursPerWeek', 'expectedStipend'];

    simpleInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        // Fetch value based on nesting
        if (id.endsWith('Url')) {
          el.value = formData.socials[id] || "";
        } else {
          el.value = formData[id] || "";
        }
      }
    });

    // Profile photo preview bindings
    const photoPreviewContainer = document.getElementById('photo-preview-container');
    if (formData.profilePhoto && photoPreviewContainer) {
      photoPreviewContainer.innerHTML = `<img src="${formData.profilePhoto}" alt="Avatar">`;
    } else if (photoPreviewContainer) {
      photoPreviewContainer.innerHTML = `
        <div class="photo-placeholder-icon">
          <i data-lucide="camera" class="size-large"></i>
        </div>
      `;
      lucide.createIcons();
    }

    // Tags rendering for skills
    ['languages', 'frameworks', 'databases', 'devops', 'cyber'].forEach(field => {
      renderSkillPills(field);
    });

    // Team selection preference active card check
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
      card.classList.remove('selected');
      if (card.getAttribute('data-preference') === formData.teamPreference) {
        card.classList.add('selected');
      }
    });
    const preferenceHidden = document.getElementById('teamPreference');
    if (preferenceHidden) {
      preferenceHidden.value = formData.teamPreference;
    }
  }

  function saveCurrentStepData() {
    // Step 1: Personal Details
    if (currentStep === 1) {
      formData.fullName = document.getElementById('fullName').value.trim();
      formData.email = document.getElementById('email').value.trim();
      formData.phone = document.getElementById('phone').value.trim();
      formData.location = document.getElementById('location').value.trim();
      formData.dob = document.getElementById('dob').value;
    }
    // Step 3: Skills
    // Real time tag elements are updated globally, nothing to load here.

    // Step 7: Social Profiles
    if (currentStep === 7) {
      formData.socials.githubUrl = document.getElementById('githubUrl').value.trim();
      formData.socials.linkedinUrl = document.getElementById('linkedinUrl').value.trim();
      formData.socials.portfolioUrl = document.getElementById('portfolioUrl').value.trim();
      formData.socials.leetcodeUrl = document.getElementById('leetcodeUrl').value.trim();
      formData.socials.hackerrankUrl = document.getElementById('hackerrankUrl').value.trim();
      formData.socials.tryhackmeUrl = document.getElementById('tryhackmeUrl').value.trim();
    }
    // Step 9: Team Preference is selected directly

    // Step 10: Final Questions
    if (currentStep === 10) {
      formData.whyJoin = document.getElementById('whyJoin').value.trim();
      formData.contribution = document.getElementById('contribution').value.trim();
      formData.hoursPerWeek = document.getElementById('hoursPerWeek').value;
      formData.expectedStipend = document.getElementById('expectedStipend').value.trim();
    }
  }

  // ================= 8. ZOD STEP VALIDATOR =================
  function validateStep(stepIndex) {
    clearErrors();

    // Compile values based on step requirements
    let payload = {};
    if (stepIndex === 1) {
      payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        dob: formData.dob,
        profilePhoto: formData.profilePhoto
      };
    } else if (stepIndex === 2) {
      payload = { education: formData.education };
    } else if (stepIndex === 3) {
      payload = { skills: formData.skills };
    } else if (stepIndex === 4) {
      payload = { projects: formData.projects };
    } else if (stepIndex === 5) {
      payload = { experience: formData.experience };
    } else if (stepIndex === 6) {
      payload = { certifications: formData.certifications };
    } else if (stepIndex === 7) {
      payload = { socials: formData.socials };
    } else if (stepIndex === 8) {
      payload = { resumeFile: formData.resumeFile };
    } else if (stepIndex === 9) {
      payload = { teamPreference: formData.teamPreference };
    } else if (stepIndex === 10) {
      payload = {
        whyJoin: formData.whyJoin,
        contribution: formData.contribution,
        hoursPerWeek: formData.hoursPerWeek,
        expectedStipend: formData.expectedStipend
      };
    }

    const schema = stepSchemas[stepIndex];
    if (!schema) return true;

    const validationResult = schema.safeParse(payload);
    if (!validationResult.success) {
      // Map Zod errors to field IDs
      validationResult.error.issues.forEach(issue => {
        const path = issue.path;
        let fieldName = path[0];

        // Handle nested arrays (e.g. education[0].institution) or tag lists
        if (path.length > 1) {
          if (fieldName === 'skills') {
            fieldName = path[1];
          } else if (['education', 'projects', 'experience', 'certifications'].includes(fieldName)) {
            // Field name is index/property combo
            const index = path[1];
            const subField = path[2];
            fieldName = `${fieldName}-${index}-${subField}`;
          } else if (fieldName === 'socials') {
            fieldName = path[1];
          }
        }

        showFieldError(fieldName, issue.message);
      });
      return false;
    }
    return true;
  }

  function showFieldError(fieldName, message) {
    const errorNode = document.querySelector(`.error-msg[data-for="${fieldName}"]`);
    if (errorNode) {
      errorNode.textContent = message;
    }
    // Also support custom dynamic arrays where we target parent error
    if (fieldName.includes('-')) {
      const baseField = fieldName.split('-')[0];
      const parentError = document.querySelector(`.error-msg[data-for="${baseField}"]`);
      if (parentError) {
        parentError.textContent = "Please resolve the marked errors in the records above.";
      }
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(node => {
      node.textContent = '';
    });
  }

  // ================= 9. DYNAMIC DRAFT MANAGEMENT =================
  function saveDraftOffline(showNotify = true) {
    saveCurrentStepData();
    localStorage.setItem('Hyna Studio_careers_draft', JSON.stringify(formData));
    if (showNotify) {
      showToast("Draft details saved to your local storage!");
    }
  }

  btnSaveDraft.addEventListener('click', () => {
    saveDraftOffline(true);
  });

  btnClearDraft.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your current application progress? This cannot be undone.")) {
    localStorage.removeItem('Hyna Studio_careers_draft');
      formData = JSON.parse(JSON.stringify(defaultFormData));
      currentStep = 1;
      syncStepView();
      clearErrors();
      showToast("Draft wiped. Starting fresh.");
    }
  });

  function showToast(message) {
    const toastMsgNode = draftToast.querySelector('.toast-message');
    if (toastMsgNode) toastMsgNode.textContent = message;
    draftToast.classList.remove('hidden');
    setTimeout(() => {
      draftToast.classList.add('hidden');
    }, 3000);
  }

  // ================= 10. DYNAMIC ROW CONSTRUCTORS =================

  // STEP 2: Education Dynamic List
  btnAddEducation.addEventListener('click', () => {
    formData.education.push({ institution: "", degree: "", department: "", year: "", cgpa: "" });
    renderEducationRows();
  });

  function renderEducationRows() {
    const listContainer = document.getElementById('education-records-list');
    listContainer.innerHTML = '';

    formData.education.forEach((edu, index) => {
      const rowCard = document.createElement('div');
      rowCard.classList.add('dynamic-row-card');

      rowCard.innerHTML = `
        <span class="row-index-badge"># ${index + 1}</span>
        ${formData.education.length > 1 ? `<button type="button" class="btn-circle-red btn-remove-row" data-index="${index}"><i data-lucide="trash-2"></i></button>` : ''}
        
        <div class="input-grid">
          <div class="input-group col-span-2">
            <label>Institution Name <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Stanford University" value="${edu.institution}" data-field="institution" data-index="${index}">
            <p class="error-msg" data-for="education-${index}-institution"></p>
          </div>
          <div class="input-group">
            <label>Degree <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Bachelor of Science" value="${edu.degree}" data-field="degree" data-index="${index}">
            <p class="error-msg" data-for="education-${index}-degree"></p>
          </div>
          <div class="input-group">
            <label>Department <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Computer Science" value="${edu.department}" data-field="department" data-index="${index}">
            <p class="error-msg" data-for="education-${index}-department"></p>
          </div>
          <div class="input-group">
            <label>Year of Graduation <span class="required">*</span></label>
            <input type="number" placeholder="2025" value="${edu.year || ''}" data-field="year" data-index="${index}">
            <p class="error-msg" data-for="education-${index}-year"></p>
          </div>
          <div class="input-group">
            <label>CGPA / Percentage <span class="required">*</span></label>
            <input type="text" placeholder="e.g. 3.8 / 4.0 or 92%" value="${edu.cgpa}" data-field="cgpa" data-index="${index}">
            <p class="error-msg" data-for="education-${index}-cgpa"></p>
          </div>
        </div>
      `;
      listContainer.appendChild(rowCard);
    });

    lucide.createIcons();
    attachDynamicRowListeners('education');
  }

  // STEP 4: Projects Dynamic List
  btnAddProject.addEventListener('click', () => {
    formData.projects.push({ name: "", description: "", techStack: "", githubUrl: "", liveUrl: "", duration: "", teamSize: "", images: [] });
    renderProjectRows();
  });

  function renderProjectRows() {
    const listContainer = document.getElementById('projects-records-list');
    listContainer.innerHTML = '';

    formData.projects.forEach((proj, index) => {
      const rowCard = document.createElement('div');
      rowCard.classList.add('dynamic-row-card');

      rowCard.innerHTML = `
        <span class="row-index-badge"># ${index + 1}</span>
        ${formData.projects.length > 1 ? `<button type="button" class="btn-circle-red btn-remove-row" data-index="${index}"><i data-lucide="trash-2"></i></button>` : ''}

        <div class="input-grid">
          <div class="input-group col-span-2">
            <label>Project Name <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Decentralized App Core" value="${proj.name}" data-field="name" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-name"></p>
          </div>
          <div class="input-group col-span-2">
            <label>Project Description <span class="required">*</span></label>
            <textarea placeholder="Outline what you built, architecture decisions, and challenges..." rows="3" data-field="description" data-index="${index}">${proj.description}</textarea>
            <p class="error-msg" data-for="projects-${index}-description"></p>
          </div>
          <div class="input-group col-span-2">
            <label>Tech Stack <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Rust, WebAssembly, React, PostgreSQL" value="${proj.techStack}" data-field="techStack" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-techStack"></p>
          </div>
          <div class="input-group">
            <label>GitHub Code Link</label>
            <input type="url" placeholder="https://github.com/..." value="${proj.githubUrl}" data-field="githubUrl" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-githubUrl"></p>
          </div>
          <div class="input-group">
            <label>Live Demo Link</label>
            <input type="url" placeholder="https://demo.dev" value="${proj.liveUrl}" data-field="liveUrl" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-liveUrl"></p>
          </div>
          <div class="input-group">
            <label>Duration <span class="required">*</span></label>
            <input type="text" placeholder="e.g. 3 Months" value="${proj.duration}" data-field="duration" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-duration"></p>
          </div>
          <div class="input-group">
            <label>Team Size <span class="required">*</span></label>
            <input type="number" placeholder="e.g. 4" value="${proj.teamSize || ''}" data-field="teamSize" data-index="${index}">
            <p class="error-msg" data-for="projects-${index}-teamSize"></p>
          </div>
          <div class="input-group col-span-2">
            <label>Upload Project Screenshot (Optional)</label>
            <div class="photo-upload-zone">
              <input type="file" accept="image/*" class="project-img-file" data-index="${index}">
              <div class="photo-preview-container project-img-preview" data-index="${index}">
                ${proj.images.length > 0 ? `<img src="${proj.images[0]}" alt="screenshot">` : '<i data-lucide="image"></i>'}
              </div>
              <div class="upload-instructions">
                <p class="upload-primary-text">Upload screenshot, or <span>browse</span></p>
                <p class="upload-sub-text">Supported: JPEG, PNG, WEBP</p>
              </div>
            </div>
          </div>
        </div>
      `;
      listContainer.appendChild(rowCard);
    });

    lucide.createIcons();
    attachDynamicRowListeners('projects');
  }

  // STEP 5: Experience Dynamic List
  btnAddExperience.addEventListener('click', () => {
    formData.experience.push({ company: "", position: "", startDate: "", endDate: "", description: "" });
    renderExperienceRows();
  });

  function renderExperienceRows() {
    const listContainer = document.getElementById('experience-records-list');
    listContainer.innerHTML = '';

    formData.experience.forEach((exp, index) => {
      const rowCard = document.createElement('div');
      rowCard.classList.add('dynamic-row-card');

      rowCard.innerHTML = `
        <span class="row-index-badge"># ${index + 1}</span>
        <button type="button" class="btn-circle-red btn-remove-row" data-index="${index}"><i data-lucide="trash-2"></i></button>

        <div class="input-grid">
          <div class="input-group">
            <label>Company / Organization <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Stripe" value="${exp.company}" data-field="company" data-index="${index}">
            <p class="error-msg" data-for="experience-${index}-company"></p>
          </div>
          <div class="input-group">
            <label>Position / Title <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Software Engineer Intern" value="${exp.position}" data-field="position" data-index="${index}">
            <p class="error-msg" data-for="experience-${index}-position"></p>
          </div>
          <div class="input-group">
            <label>Start Date <span class="required">*</span></label>
            <input type="date" value="${exp.startDate}" data-field="startDate" data-index="${index}">
            <p class="error-msg" data-for="experience-${index}-startDate"></p>
          </div>
          <div class="input-group">
            <label>End Date (Leave blank if present)</label>
            <input type="date" value="${exp.endDate}" data-field="endDate" data-index="${index}">
            <p class="error-msg" data-for="experience-${index}-endDate"></p>
          </div>
          <div class="input-group col-span-2">
            <label>Description <span class="required">*</span></label>
            <textarea placeholder="Describe your key milestones, achievements, and tech stack utilized..." rows="3" data-field="description" data-index="${index}">${exp.description}</textarea>
            <p class="error-msg" data-for="experience-${index}-description"></p>
          </div>
        </div>
      `;
      listContainer.appendChild(rowCard);
    });

    lucide.createIcons();
    attachDynamicRowListeners('experience');
  }

  // STEP 6: Certifications Dynamic List
  btnAddCertification.addEventListener('click', () => {
    formData.certifications.push({ name: "", issuer: "", date: "", pdfUrl: "" });
    renderCertificationRows();
  });

  function renderCertificationRows() {
    const listContainer = document.getElementById('certifications-records-list');
    listContainer.innerHTML = '';

    formData.certifications.forEach((cert, index) => {
      const rowCard = document.createElement('div');
      rowCard.classList.add('dynamic-row-card');

      rowCard.innerHTML = `
        <span class="row-index-badge"># ${index + 1}</span>
        <button type="button" class="btn-circle-red btn-remove-row" data-index="${index}"><i data-lucide="trash-2"></i></button>

        <div class="input-grid">
          <div class="input-group col-span-2">
            <label>Certificate Name <span class="required">*</span></label>
            <input type="text" placeholder="e.g. AWS Solutions Architect" value="${cert.name}" data-field="name" data-index="${index}">
            <p class="error-msg" data-for="certifications-${index}-name"></p>
          </div>
          <div class="input-group">
            <label>Issuer Organization <span class="required">*</span></label>
            <input type="text" placeholder="e.g. Amazon Web Services" value="${cert.issuer}" data-field="issuer" data-index="${index}">
            <p class="error-msg" data-for="certifications-${index}-issuer"></p>
          </div>
          <div class="input-group">
            <label>Date Certified <span class="required">*</span></label>
            <input type="date" value="${cert.date}" data-field="date" data-index="${index}">
            <p class="error-msg" data-for="certifications-${index}-date"></p>
          </div>
          <div class="input-group col-span-2">
            <label>Upload Certificate Copy (PDF format) <span class="required">*</span></label>
            <div class="photo-upload-zone">
              <input type="file" accept=".pdf" class="cert-pdf-file" data-index="${index}">
              <div class="photo-preview-container cert-pdf-preview" data-index="${index}">
                ${cert.pdfUrl ? '<i data-lucide="check-square" class="text-gradient-green"></i>' : '<i data-lucide="file-check"></i>'}
              </div>
              <div class="upload-instructions">
                <p class="upload-primary-text">Upload PDF copy, or <span>browse</span></p>
                <p class="upload-sub-text">Only PDF files accepted (Max 4MB)</p>
              </div>
            </div>
            <p class="error-msg" data-for="certifications-${index}-pdfUrl"></p>
          </div>
        </div>
      `;
      listContainer.appendChild(rowCard);
    });

    lucide.createIcons();
    attachDynamicRowListeners('certifications');
  }

  // Handle binding values of dynamic rows back to form state
  function attachDynamicRowListeners(category) {
    const records = document.getElementById(`${category}-records-list`);
    if (!records) return;

    // Attach row removal click listener
    records.querySelectorAll('.btn-remove-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        formData[category].splice(index, 1);
        if (category === 'education') renderEducationRows();
        else if (category === 'projects') renderProjectRows();
        else if (category === 'experience') renderExperienceRows();
        else if (category === 'certifications') renderCertificationRows();
      });
    });

    // Handle generic input changes
    records.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="url"], textarea').forEach(input => {
      input.addEventListener('input', () => {
        const index = parseInt(input.getAttribute('data-index'));
        const field = input.getAttribute('data-field');
        if (formData[category] && formData[category][index]) {
          formData[category][index][field] = input.value;
        }
      });
    });

    // Handle nested file selections (project screenshots & cert PDFs)
    if (category === 'projects') {
      records.querySelectorAll('.project-img-file').forEach(fileInput => {
        fileInput.addEventListener('change', (e) => {
          const index = parseInt(fileInput.getAttribute('data-index'));
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              formData.projects[index].images = [event.target.result];
              const preview = records.querySelector(`.project-img-preview[data-index="${index}"]`);
              if (preview) {
                preview.innerHTML = `<img src="${event.target.result}" alt="screenshot">`;
              }
            };
            reader.readAsDataURL(file);
          }
        });
      });
    }

    if (category === 'certifications') {
      records.querySelectorAll('.cert-pdf-file').forEach(fileInput => {
        fileInput.addEventListener('change', (e) => {
          const index = parseInt(fileInput.getAttribute('data-index'));
          const file = e.target.files[0];
          if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = (event) => {
              formData.certifications[index].pdfUrl = event.target.result; // DataURL representing PDF
              const preview = records.querySelector(`.cert-pdf-preview[data-index="${index}"]`);
              if (preview) {
                preview.innerHTML = `<i data-lucide="check-square" class="text-gradient-green"></i>`;
                lucide.createIcons();
              }
            };
            reader.readAsDataURL(file);
          } else {
            alert("Please select a valid PDF file.");
          }
        });
      });
    }
  }

  // ================= 11. FILE UPLOAD EVENT LISTENERS =================

  // Profile Photo Upload (Step 1)
  const photoDropZone = document.getElementById('photo-drop-zone');
  const profilePhotoInput = document.getElementById('profilePhoto');

  if (photoDropZone && profilePhotoInput) {
    photoDropZone.addEventListener('click', () => profilePhotoInput.click());

    photoDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      photoDropZone.style.borderColor = 'var(--primary)';
    });

    photoDropZone.addEventListener('dragleave', () => {
      photoDropZone.style.borderColor = 'var(--border-color)';
    });

    photoDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      photoDropZone.style.borderColor = 'var(--border-color)';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleProfilePhotoSelect(file);
      }
    });

    profilePhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleProfilePhotoSelect(file);
    });
  }

  function handleProfilePhotoSelect(file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.profilePhoto = e.target.result;
      const previewContainer = document.getElementById('photo-preview-container');
      if (previewContainer) {
        previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview avatar">`;
      }
      clearErrors();
    };
    reader.readAsDataURL(file);
  }

  // Resume Drag & Drop Upload (Step 8)
  const resumeDropZone = document.getElementById('resume-drop-zone');
  const resumeFileInput = document.getElementById('resumeFile');
  const resumePreviewPanel = document.getElementById('resume-preview-panel');
  const btnRemoveResume = document.getElementById('btn-remove-resume');

  if (resumeDropZone && resumeFileInput) {
    resumeDropZone.addEventListener('click', () => resumeFileInput.click());

    resumeDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      resumeDropZone.style.borderColor = 'var(--primary)';
    });

    resumeDropZone.addEventListener('dragleave', () => {
      resumeDropZone.style.borderColor = 'var(--border-color)';
    });

    resumeDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      resumeDropZone.style.borderColor = 'var(--border-color)';
      const file = e.dataTransfer.files[0];
      if (file) handleResumeFileSelect(file);
    });

    resumeFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleResumeFileSelect(file);
    });
  }

  function handleResumeFileSelect(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      alert("Only PDF and DOCX file types are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      formData.resumeFile = e.target.result; // Base64 dataURL
      formData.resumeName = file.name;
      formData.resumeSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      renderResumePreview();
      clearErrors();
    };
    reader.readAsDataURL(file);
  }

  function renderResumePreview() {
    if (formData.resumeFile) {
      resumeDropZone.classList.add('hidden');
      resumePreviewPanel.classList.remove('hidden');
      document.getElementById('preview-file-name').textContent = formData.resumeName;
      document.getElementById('preview-file-size').textContent = formData.resumeSize;
    } else {
      resumeDropZone.classList.remove('hidden');
      resumePreviewPanel.classList.add('hidden');
    }
  }

  if (btnRemoveResume) {
    btnRemoveResume.addEventListener('click', () => {
      formData.resumeFile = "";
      formData.resumeName = "";
      formData.resumeSize = "";
      renderResumePreview();
    });
  }

  // ================= 12. SKILLS TAG CONTROL INTERACTION =================
  document.querySelectorAll('.tag-input-container').forEach(container => {
    const rawInput = container.querySelector('.tag-raw-input');
    const field = container.getAttribute('data-field');

    if (rawInput) {
      rawInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = rawInput.value.trim().replace(/,/g, '');
          if (val && !formData.skills[field].includes(val)) {
            formData.skills[field].push(val);
            renderSkillPills(field);
            rawInput.value = '';
          }
        }
      });

      rawInput.addEventListener('blur', () => {
        const val = rawInput.value.trim().replace(/,/g, '');
        if (val && !formData.skills[field].includes(val)) {
          formData.skills[field].push(val);
          renderSkillPills(field);
          rawInput.value = '';
        }
      });
    }
  });

  function renderSkillPills(field) {
    const pillContainer = document.getElementById(`tags-${field}`);
    if (!pillContainer) return;

    pillContainer.innerHTML = '';
    const tagList = formData.skills[field] || [];

    tagList.forEach((tag, idx) => {
      const pill = document.createElement('span');
      pill.classList.add('tag-pill');
      pill.innerHTML = `
        ${tag}
        <i data-lucide="x" data-field="${field}" data-index="${idx}"></i>
      `;
      pillContainer.appendChild(pill);
    });

    lucide.createIcons();

    // Attach deletion handlers to X inside pills
    pillContainer.querySelectorAll('i').forEach(icon => {
      icon.addEventListener('click', () => {
        const tagField = icon.getAttribute('data-field');
        const index = parseInt(icon.getAttribute('data-index'));
        formData.skills[tagField].splice(index, 1);
        renderSkillPills(tagField);
      });
    });
  }

  // ================= 13. TEAM TRACK SELECTOR CARD HANDLER =================
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const pref = card.getAttribute('data-preference');
      document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      formData.teamPreference = pref;
      document.getElementById('teamPreference').value = pref;
      clearErrors();
    });
  });

  // ================= 14. SUBMIT APPLICATION FLOW =================
  const formElement = document.getElementById('career-application-form');
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    saveCurrentStepData();

    // Complete final validation run
    const isValid = validateStep(10);
    if (!isValid) return;

    // Compile payload
    const submissionId = "NEX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const createdDate = new Date().toISOString();

    const applicationPayload = {
      id: submissionId,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      dob: formData.dob,
      profile_photo_url: formData.profilePhoto,
      skills: formData.skills,
      github_url: formData.socials.githubUrl,
      linkedin_url: formData.socials.linkedinUrl,
      portfolio_url: formData.socials.portfolioUrl,
      leetcode_url: formData.socials.leetcodeUrl,
      hackerrank_url: formData.socials.hackerrankUrl,
      tryhackme_url: formData.socials.tryhackmeUrl,
      resume_url: formData.resumeFile,
      resume_name: formData.resumeName,
      resume_size: formData.resumeSize,
      team_preference: formData.teamPreference,
      why_join: formData.whyJoin,
      contribution: formData.contribution,
      hours_per_week: parseInt(formData.hoursPerWeek),
      expected_stipend: formData.expectedStipend,
      status: "Pending",
      created_at: createdDate,
      education: formData.education,
      projects: formData.projects,
      experience: formData.experience,
      certifications: formData.certifications
    };

    // Store application
    if (!isOfflineMode && supabase) {
      // Real database execution. We insert application, then details.
      try {
        // Step 1: Upload resume to Supabase Storage bucket and get URL if required,
        // (For the simplicity of frontend SPA, we can also insert the base64 URL directly, or do real upload)
        const { data: mainApp, error: appError } = await supabase
          .from('applications')
          .insert([{
            full_name: applicationPayload.full_name,
            email: applicationPayload.email,
            phone: applicationPayload.phone,
            location: applicationPayload.location,
            dob: applicationPayload.dob,
            profile_photo_url: applicationPayload.profile_photo_url,
            skills: applicationPayload.skills,
            github_url: applicationPayload.github_url,
            linkedin_url: applicationPayload.linkedin_url,
            portfolio_url: applicationPayload.portfolio_url,
            leetcode_url: applicationPayload.leetcode_url,
            hackerrank_url: applicationPayload.hackerrank_url,
            tryhackme_url: applicationPayload.tryhackme_url,
            resume_url: applicationPayload.resume_url,
            team_preference: applicationPayload.team_preference,
            why_join: applicationPayload.why_join,
            contribution: applicationPayload.contribution,
            hours_per_week: applicationPayload.hours_per_week,
            expected_stipend: applicationPayload.expected_stipend,
            status: "Pending"
          }])
          .select();

        if (appError) throw appError;
        const insertedId = mainApp[0].id;

        // Insert education records
        if (applicationPayload.education.length > 0) {
          const eduPayload = applicationPayload.education.map(edu => ({
            application_id: insertedId,
            institution: edu.institution,
            degree: edu.degree,
            department: edu.department,
            year: parseInt(edu.year),
            cgpa: edu.cgpa
          }));
          const { error: eduError } = await supabase.from('education').insert(eduPayload);
          if (eduError) throw eduError;
        }

        // Insert project records
        if (applicationPayload.projects.length > 0) {
          const projPayload = applicationPayload.projects.map(proj => ({
            application_id: insertedId,
            name: proj.name,
            description: proj.description,
            tech_stack: proj.techStack,
            github_url: proj.githubUrl,
            live_url: proj.liveUrl,
            duration: proj.duration,
            team_size: parseInt(proj.teamSize),
            image_urls: proj.images
          }));
          const { error: projError } = await supabase.from('projects').insert(projPayload);
          if (projError) throw projError;
        }

        // Insert experience records
        if (applicationPayload.experience.length > 0) {
          const expPayload = applicationPayload.experience.map(exp => ({
            application_id: insertedId,
            company: exp.company,
            position: exp.position,
            start_date: exp.startDate,
            end_date: exp.endDate || null,
            description: exp.description
          }));
          const { error: expError } = await supabase.from('experience').insert(expPayload);
          if (expError) throw expError;
        }

        // Insert certification records
        if (applicationPayload.certifications.length > 0) {
          const certPayload = applicationPayload.certifications.map(cert => ({
            application_id: insertedId,
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date,
            pdf_url: cert.pdfUrl
          }));
          const { error: certError } = await supabase.from('certifications').insert(certPayload);
          if (certError) throw certError;
        }

        console.log("Successfully logged submission in Supabase DB.");
      } catch (err) {
        console.error("Supabase Save Error, falling back to local storage schema:", err);
        saveLocalSubmission(applicationPayload);
      }
    } else {
      // Local Mock DB saves
      saveLocalSubmission(applicationPayload);
    }

    // Wiping the temporary draft
    localStorage.removeItem('Hyna Studio_careers_draft');
    formData = JSON.parse(JSON.stringify(defaultFormData));

    // Fill success details
    successRefId.textContent = submissionId;
    successTrack.textContent = applicationPayload.team_preference;
    successEmail.textContent = applicationPayload.email;

    // Render success state page
    showSection(sections.success);
  });

  function saveLocalSubmission(payload) {
    localApplications.push(payload);
    localStorage.setItem('Hyna Studio_applications', JSON.stringify(localApplications));
  }

  successReturnBtn.addEventListener('click', () => {
    showSection(sections.landing);
  });


  // ================= 15. ADMIN MANAGEMENT BOARD OPERATIONS =================
  async function loadAdminData() {
    let apps = [];

    if (!isOfflineMode && supabase) {
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            education (*),
            projects (*),
            experience (*),
            certifications (*)
          `);
        if (error) throw error;
        apps = data;
      } catch (err) {
        console.error("Failed fetching Supabase application listings, loading offline local instead:", err);
        apps = localApplications;
      }
    } else {
      apps = localApplications;
    }

    // Refresh analytics numbers
    calculateAdminAnalytics(apps);

    // Apply Filter listeners
    renderAdminTable(apps);

    // Bind real time input keyups
    const handleFilterChange = () => {
      const search = adminSearchInput.value.toLowerCase();
      const track = adminFilterTrack.value;
      const status = adminFilterStatus.value;
      const skill = adminFilterSkill.value.toLowerCase();

      const filtered = apps.filter(app => {
        const matchesSearch = app.full_name.toLowerCase().includes(search) ||
          app.email.toLowerCase().includes(search) ||
          (app.experience && app.experience.some(e => e.company.toLowerCase().includes(search)));

        const matchesTrack = track === "All" || app.team_preference === track;
        const matchesStatus = status === "All" || app.status === status;

        // Match skill keywords in any tag categories
        let matchesSkill = true;
        if (skill) {
          const appSkills = app.skills;
          const mergedSkills = [
            ...(appSkills.languages || []),
            ...(appSkills.frameworks || []),
            ...(appSkills.databases || []),
            ...(appSkills.devops || []),
            ...(appSkills.cyber || [])
          ].map(s => s.toLowerCase());

          matchesSkill = mergedSkills.some(s => s.includes(skill));
        }

        return matchesSearch && matchesTrack && matchesStatus && matchesSkill;
      });

      renderAdminTable(filtered);
    };

    adminSearchInput.oninput = handleFilterChange;
    adminFilterTrack.onchange = handleFilterChange;
    adminFilterStatus.onchange = handleFilterChange;
    adminFilterSkill.oninput = handleFilterChange;
  }

  function calculateAdminAnalytics(apps) {
    document.getElementById('stat-total').textContent = apps.length;

    const shortlistedCount = apps.filter(app => app.status === 'Shortlisted' || app.status === 'Interview').length;
    document.getElementById('stat-shortlisted').textContent = shortlistedCount;

    const acceptedCount = apps.filter(app => app.status === 'Accepted').length;
    document.getElementById('stat-accepted').textContent = acceptedCount;
  }

  function renderAdminTable(apps) {
    candidatesTableBody.innerHTML = '';

    if (apps.length === 0) {
      noCandidatesMsg.classList.remove('hidden');
      return;
    }
    noCandidatesMsg.classList.add('hidden');

    apps.forEach(app => {
      const tr = document.createElement('tr');

      const formattedDate = new Date(app.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Get primary languages preview
      const languages = app.skills.languages || [];
      const skillsPreview = languages.slice(0, 3).map(lang => `<span class="skill-mini-tag">${lang}</span>`).join('');

      // Experience calculation preview
      const expCount = app.experience ? app.experience.length : 0;
      const expText = expCount === 0 ? "Entry level" : `${expCount} role${expCount > 1 ? 's' : ''}`;

      tr.innerHTML = `
        <td>
          <div class="candidate-meta-cell">
            <img src="${app.profile_photo_url || ''}" class="candidate-photo-mini" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23e2e8f0%22/></svg>'">
            <div class="candidate-details-mini">
              <span class="candidate-name-mini">${app.full_name}</span>
              <span class="candidate-email-mini">${app.email}</span>
            </div>
          </div>
        </td>
        <td><span class="track-badge">${app.team_preference}</span></td>
        <td><div class="skills-cell">${skillsPreview}</div></td>
        <td>${expText}</td>
        <td>${formattedDate}</td>
        <td><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></td>
        <td>
          <button class="btn-outline-sm btn-view-candidate" data-id="${app.id}">Inspect</button>
        </td>
      `;
      candidatesTableBody.appendChild(tr);
    });

    // Attach row inspection handlers
    candidatesTableBody.querySelectorAll('.btn-view-candidate').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openCandidateModal(id, apps);
      });
    });
  }

  // Application inspection Detail Modal
  function openCandidateModal(id, appsList) {
    const app = appsList.find(record => record.id === id);
    if (!app) return;

    candidateModal.classList.remove('hidden');

    // Compile dynamic contents inside details modal
    // Education display list
    const eduListHtml = (app.education || []).map(edu => `
      <div class="modal-detail-card">
        <div class="modal-card-header">
          <h5>${edu.institution}</h5>
          <span>Grad: ${edu.year}</span>
        </div>
        <div class="modal-card-sub">${edu.degree} - ${edu.department}</div>
        <div class="modal-card-desc">Result score: <strong>${edu.cgpa}</strong></div>
      </div>
    `).join('') || '<p class="text-muted">No education records provided.</p>';

    // Project display list
    const projListHtml = (app.projects || []).map(proj => `
      <div class="modal-detail-card">
        <div class="modal-card-header">
          <h5>${proj.name}</h5>
          <span>Duration: ${proj.duration} (Team: ${proj.team_size})</span>
        </div>
        <div class="modal-card-sub">Stack: ${proj.tech_stack}</div>
        <p class="modal-card-desc">${proj.description}</p>
        <div class="modal-socials-grid mt-small" style="margin-top: 10px;">
          ${proj.github_url ? `<a href="${proj.github_url}" target="_blank" class="modal-social-link"><i data-lucide="github"></i> Codebase</a>` : ''}
          ${proj.live_url ? `<a href="${proj.live_url}" target="_blank" class="modal-social-link"><i data-lucide="external-link"></i> Live Demo</a>` : ''}
        </div>
        ${proj.image_urls && proj.image_urls.length > 0 ? `
          <div class="modal-proj-img-wrap" style="margin-top: 10px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); max-height: 160px;">
            <img src="${proj.image_urls[0]}" style="width: 100%; object-fit: cover;">
          </div>
        ` : ''}
      </div>
    `).join('') || '<p class="text-muted">No project records provided.</p>';

    // Experience timeline
    const expListHtml = (app.experience || []).map(exp => `
      <div class="modal-detail-card">
        <div class="modal-card-header">
          <h5>${exp.company}</h5>
          <span>${exp.start_date} to ${exp.end_date || 'Present'}</span>
        </div>
        <div class="modal-card-sub">${exp.position}</div>
        <p class="modal-card-desc">${exp.description}</p>
      </div>
    `).join('') || '<p class="text-muted">No prior work experience listed.</p>';

    // Certifications list
    const certListHtml = (app.certifications || []).map(cert => `
      <div class="modal-detail-card">
        <div class="modal-card-header">
          <h5>${cert.name}</h5>
          <span>Awarded: ${cert.date}</span>
        </div>
        <div class="modal-card-sub">Issuer: ${cert.issuer}</div>
        ${cert.pdf_url ? `<a href="${cert.pdf_url}" download="${cert.name}.pdf" class="modal-social-link" style="margin-top: 10px; display: inline-flex;"><i data-lucide="download"></i> Download Certificate PDF</a>` : ''}
      </div>
    `).join('') || '<p class="text-muted">No certifications added.</p>';

    // Skills preview tags
    const renderSkillCategory = (label, tags) => {
      if (!tags || tags.length === 0) return '';
      return `
        <div class="modal-skill-row">
          <span class="modal-skill-label">${label}</span>
          <div class="modal-skills-tags">
            ${tags.map(t => `<span class="skill-mini-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    };

    modalDetailsContainer.innerHTML = `
      <!-- Status Update Widget -->
      <div class="modal-status-update-box">
        <div class="dropdown-wrapper">
          <label>Applicant Workflow Status</label>
          <select id="modal-update-status-select" data-id="${app.id}">
            <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
            <option value="Interview" ${app.status === 'Interview' ? 'selected' : ''}>Interview</option>
            <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
            <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </div>
        <div>
          <p class="alert-desc">Changing status updates database logs. You will trigger email state triggers in next workflow block.</p>
        </div>
      </div>

      <!-- General details -->
      <div class="modal-candidate-profile">
        <img src="${app.profile_photo_url || ''}" class="modal-photo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23e2e8f0%22/></svg>'">
        <div class="modal-info-core">
          <span class="track-badge">${app.team_preference}</span>
          <h4 class="modal-candidate-name">${app.full_name}</h4>
          <div class="modal-contact-row">
            <span><i data-lucide="mail"></i> ${app.email}</span>
            <span><i data-lucide="phone"></i> ${app.phone}</span>
            <span><i data-lucide="map-pin"></i> ${app.location}</span>
            <span><i data-lucide="calendar"></i> DOB: ${app.dob}</span>
          </div>
        </div>
      </div>

      <div class="modal-grid-two">
        
        <!-- Skills -->
        <div class="modal-col-full">
          <h4 class="modal-section-title">Technical Expertise</h4>
          <div class="modal-skills-box">
            ${renderSkillCategory("Languages", app.skills.languages)}
            ${renderSkillCategory("Frameworks", app.skills.frameworks)}
            ${renderSkillCategory("Databases", app.skills.databases)}
            ${renderSkillCategory("DevOps", app.skills.devops)}
            ${renderSkillCategory("Cybersecurity", app.skills.cyber)}
          </div>
        </div>

        <!-- Social links -->
        <div class="modal-col-full">
          <h4 class="modal-section-title">Professional Links & Documents</h4>
          <div class="modal-socials-grid">
            ${app.github_url ? `<a href="${app.github_url}" target="_blank" class="modal-social-link"><i data-lucide="github"></i> GitHub</a>` : ''}
            ${app.linkedin_url ? `<a href="${app.linkedin_url}" target="_blank" class="modal-social-link"><i data-lucide="linkedin"></i> LinkedIn</a>` : ''}
            ${app.portfolio_url ? `<a href="${app.portfolio_url}" target="_blank" class="modal-social-link"><i data-lucide="globe"></i> Portfolio</a>` : ''}
            ${app.leetcode_url ? `<a href="${app.leetcode_url}" target="_blank" class="modal-social-link"><i data-lucide="code"></i> LeetCode</a>` : ''}
            ${app.hackerrank_url ? `<a href="${app.hackerrank_url}" target="_blank" class="modal-social-link"><i data-lucide="terminal"></i> HackerRank</a>` : ''}
            ${app.tryhackme_url ? `<a href="${app.tryhackme_url}" target="_blank" class="modal-social-link"><i data-lucide="shield"></i> TryHackMe</a>` : ''}
          </div>
          
          <div style="margin-top: 16px;">
            ${app.resume_url ? `<a href="${app.resume_url}" download="Resume_${app.full_name.replace(/\s+/g, '_')}.pdf" class="btn-primary w-full"><i data-lucide="file-down"></i> Download Resume PDF / DOCX</a>` : '<p class="text-red">No resume attached.</p>'}
          </div>
        </div>

        <!-- Education -->
        <div>
          <h4 class="modal-section-title">Education History</h4>
          <div class="modal-card-list">
            ${eduListHtml}
          </div>
        </div>

        <!-- Experience -->
        <div>
          <h4 class="modal-section-title">Work Timeline</h4>
          <div class="modal-card-list">
            ${expListHtml}
          </div>
        </div>

        <!-- Projects -->
        <div>
          <h4 class="modal-section-title">Showcase Projects</h4>
          <div class="modal-card-list">
            ${projListHtml}
          </div>
        </div>

        <!-- Certifications -->
        <div>
          <h4 class="modal-section-title">Certifications</h4>
          <div class="modal-card-list">
            ${certListHtml}
          </div>
        </div>

        <!-- Final Questions responses -->
        <div class="modal-col-full">
          <h4 class="modal-section-title">Final Wrap-up Details</h4>
          <div class="modal-answers-box">
            <div class="modal-answer-item">
              <h6>Why join Hyna Studio?</h6>
              <p>${app.why_join}</p>
            </div>
            <div class="modal-answer-item">
              <h6>What can you contribute to the team?</h6>
              <p>${app.contribution}</p>
            </div>
            
            <div class="modal-contact-row" style="margin-top: 10px;">
              <span><i data-lucide="clock"></i> Available hours per week: <strong>${app.hours_per_week} hrs</strong></span>
              <span><i data-lucide="dollar-sign"></i> Expected Stipend: <strong>${app.expected_stipend}</strong></span>
            </div>
          </div>
        </div>

      </div>
    `;

    lucide.createIcons();

    // Attach status update event dropdown trigger
    const statusSelect = document.getElementById('modal-update-status-select');
    statusSelect.addEventListener('change', async (e) => {
      const newStatus = e.target.value;
      const targetId = statusSelect.getAttribute('data-id');

      if (!isOfflineMode && supabase) {
        try {
          const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', targetId);
          if (error) throw error;
        } catch (err) {
          console.error("Failed saving status update in Supabase, sync local state:", err);
          updateLocalStatus(targetId, newStatus);
        }
      } else {
        updateLocalStatus(targetId, newStatus);
      }

      // Re-trigger data sync and rendering
      loadAdminData();
    });
  }

  function updateLocalStatus(targetId, newStatus) {
    const updated = localApplications.map(app => {
      if (app.id === targetId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    localApplications = updated;
    localStorage.setItem('Hyna Studio_applications', JSON.stringify(localApplications));
  }

  // ================= 16. CLIENT PROJECT REQUEST CONTROLLERS =================
  let reqAttachmentFile = "";
  let reqAttachmentName = "";
  let reqAttachmentSize = "";

  function setupProjectFormInteractions() {
    // Budget selection
    const budgetCards = document.querySelectorAll('.budget-card');
    budgetCards.forEach(card => {
      card.addEventListener('click', () => {
        budgetCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const budgetVal = card.getAttribute('data-budget');
        document.getElementById('budgetRange').value = budgetVal;
        clearErrors();
      });
    });

    // Checkbox styling support listeners
    document.querySelectorAll('.custom-checkbox-card input').forEach(input => {
      input.addEventListener('change', () => clearErrors());
    });

    // Drag & Drop for project request attachments
    const reqFileDropZone = document.getElementById('req-file-drop-zone');
    const requestFilesInput = document.getElementById('requestFiles');
    const reqFileInfoPill = document.getElementById('req-file-info-pill');
    const btnRemoveReqFile = document.getElementById('btn-remove-req-file');

    if (reqFileDropZone && requestFilesInput) {
      reqFileDropZone.addEventListener('click', () => requestFilesInput.click());

      reqFileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        reqFileDropZone.style.borderColor = 'var(--primary)';
      });

      reqFileDropZone.addEventListener('dragleave', () => {
        reqFileDropZone.style.borderColor = 'var(--border-color)';
      });

      reqFileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        reqFileDropZone.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file) handleReqFileSelect(file);
      });

      requestFilesInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleReqFileSelect(file);
      });
    }

    function handleReqFileSelect(file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        reqAttachmentFile = e.target.result;
        reqAttachmentName = file.name;
        reqAttachmentSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";

        reqFileDropZone.classList.add('hidden');
        reqFileInfoPill.classList.remove('hidden');
        document.getElementById('req-preview-name').textContent = reqAttachmentName;
        document.getElementById('req-preview-size').textContent = reqAttachmentSize;
        clearErrors();
      };
      reader.readAsDataURL(file);
    }

    if (btnRemoveReqFile) {
      btnRemoveReqFile.addEventListener('click', () => {
        reqAttachmentFile = "";
        reqAttachmentName = "";
        reqAttachmentSize = "";
        reqFileDropZone.classList.remove('hidden');
        reqFileInfoPill.classList.add('hidden');
      });
    }

    // Submit requirements form
    const projectForm = document.getElementById('project-request-form');
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      // Gather values
      const clientName = document.getElementById('clientName').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const websiteType = document.getElementById('websiteType').value;
      const projectGoals = document.getElementById('projectGoals').value.trim();
      const targetAudience = document.getElementById('targetAudience').value.trim();

      const prefTech = [];
      document.querySelectorAll('input[name="prefTech"]:checked').forEach(cb => {
        prefTech.push(cb.value);
      });

      const pageCountEl = document.querySelector('input[name="pageCount"]:checked');
      const pageCount = pageCountEl ? pageCountEl.value : "";

      const colorScheme = document.getElementById('colorScheme').value.trim();
      const designStyle = document.getElementById('designStyle').value;
      const referenceUrls = document.getElementById('referenceUrls').value.trim();

      const provideContentEl = document.querySelector('input[name="provideContent"]:checked');
      const provideContentVal = provideContentEl ? provideContentEl.value : "true";

      const reqIntegrations = [];
      document.querySelectorAll('input[name="reqIntegrations"]:checked').forEach(cb => {
        reqIntegrations.push(cb.value);
      });

      const addFeatures = [];
      document.querySelectorAll('input[name="addFeatures"]:checked').forEach(cb => {
        addFeatures.push(cb.value);
      });

      const deliveryDate = document.getElementById('deliveryDate').value;
      const budgetRange = document.getElementById('budgetRange').value;
      const requestConfirm = document.getElementById('requestConfirm').checked;

      const payload = {
        clientName,
        companyName,
        clientEmail,
        clientPhone,
        websiteType,
        projectGoals,
        targetAudience,
        prefTech,
        pageCount,
        colorScheme,
        designStyle,
        referenceUrls,
        provideContent: provideContentVal,
        reqIntegrations,
        addFeatures,
        deliveryDate,
        budgetRange,
        requestFiles: reqAttachmentFile,
        requestConfirm
      };

      const validationResult = projectRequestSchema.safeParse(payload);
      if (!validationResult.success) {
        validationResult.error.issues.forEach(issue => {
          const fieldName = issue.path[0];
          showFieldError(fieldName, issue.message);
        });
        return;
      }

      // Proceed with submission compiling
      const requestId = "REQ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const createdDate = new Date().toISOString();

      const requestData = {
        id: requestId,
        client_name: clientName,
        company_name: companyName,
        email: clientEmail,
        phone: clientPhone,
        website_type: websiteType,
        goals: projectGoals,
        target_audience: targetAudience,
        tech_stack: prefTech,
        page_count: pageCount,
        color_scheme: colorScheme,
        design_style: designStyle,
        reference_urls: referenceUrls,
        provide_content: provideContentVal === "true",
        integrations: reqIntegrations,
        additional_features: addFeatures,
        delivery_date: deliveryDate,
        budget_range: budgetRange,
        attachments: reqAttachmentFile ? { name: reqAttachmentName, size: reqAttachmentSize, data: reqAttachmentFile } : null,
        status: "New",
        created_at: createdDate
      };

      // Save to database
      if (!isOfflineMode && supabase) {
        try {
          const { error } = await supabase.from('project_requests').insert([{
            client_name: requestData.client_name,
            company_name: requestData.company_name,
            email: requestData.email,
            phone: requestData.phone,
            website_type: requestData.website_type,
            goals: requestData.goals,
            target_audience: requestData.target_audience,
            tech_stack: requestData.tech_stack,
            page_count: requestData.page_count,
            color_scheme: requestData.color_scheme,
            design_style: requestData.design_style,
            reference_urls: requestData.reference_urls,
            provide_content: requestData.provide_content,
            integrations: requestData.integrations,
            additional_features: requestData.additional_features,
            delivery_date: requestData.delivery_date,
            budget_range: requestData.budget_range,
            attachments: requestData.attachments,
            status: "New"
          }]);
          if (error) throw error;
        } catch (err) {
          console.error("Supabase request save failed, writing locally:", err);
          saveLocalRequest(requestData);
        }
      } else {
        saveLocalRequest(requestData);
      }

      // Reset fields
      projectForm.reset();
      reqAttachmentFile = "";
      reqAttachmentName = "";
      reqAttachmentSize = "";
      if (reqFileInfoPill) reqFileInfoPill.classList.add('hidden');
      if (reqFileDropZone) reqFileDropZone.classList.remove('hidden');
      document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('selected'));

      // Success view display
      successRefId.textContent = requestId;
      successTrack.textContent = `${websiteType} Project Brief`;
      successEmail.textContent = clientEmail;
      showSection(sections.success);
    });
  }

  function saveLocalRequest(req) {
    localRequests.push(req);
    localStorage.setItem('Hyna Studio_project_requests', JSON.stringify(localRequests));
  }

  // ================= 17. ADMIN TABS & PROJECT LIST OPERATIONS =================
  const tabBtnCandidates = document.getElementById('tab-btn-candidates');
  const tabBtnRequests = document.getElementById('tab-btn-requests');
  const tabViewCandidates = document.getElementById('tab-view-candidates');
  const tabViewRequests = document.getElementById('tab-view-requests');

  if (tabBtnCandidates && tabBtnRequests) {
    tabBtnCandidates.addEventListener('click', () => {
      tabBtnCandidates.classList.add('active');
      tabBtnRequests.classList.remove('active');
      tabViewCandidates.classList.add('active');
      tabViewRequests.classList.remove('active');
    });

    tabBtnRequests.addEventListener('click', () => {
      tabBtnRequests.classList.add('active');
      tabBtnCandidates.classList.remove('active');
      tabViewRequests.classList.add('active');
      tabViewCandidates.classList.remove('active');
      loadRequestsAdminData();
    });
  }

  // Load and render project requests lists
  async function loadRequestsAdminData() {
    let requests = [];

    if (!isOfflineMode && supabase) {
      try {
        const { data, error } = await supabase.from('project_requests').select('*');
        if (error) throw error;
        requests = data;
      } catch (err) {
        console.error("Supabase requests retrieval failed, loading offline local:", err);
        requests = localRequests;
      }
    } else {
      requests = localRequests;
    }

    // Calculate request metrics
    document.getElementById('stat-req-total').textContent = requests.length;
    const reviewCount = requests.filter(r => r.status === 'Under Review' || r.status === 'Proposal Sent').length;
    document.getElementById('stat-req-review').textContent = reviewCount;
    const acceptedCount = requests.filter(r => r.status === 'Accepted').length;
    document.getElementById('stat-req-accepted').textContent = acceptedCount;

    // Render rows
    renderRequestsTable(requests);

    // Connect filters
    const adminReqSearchInput = document.getElementById('admin-req-search-input');
    const adminReqFilterType = document.getElementById('admin-req-filter-type');
    const adminReqFilterStatus = document.getElementById('admin-req-filter-status');
    const adminReqFilterTech = document.getElementById('admin-req-filter-tech');

    const handleRequestFilters = () => {
      const search = adminReqSearchInput.value.toLowerCase();
      const type = adminReqFilterType.value;
      const status = adminReqFilterStatus.value;
      const tech = adminReqFilterTech.value.toLowerCase();

      const filtered = requests.filter(r => {
        const matchesSearch = r.client_name.toLowerCase().includes(search) ||
          r.company_name.toLowerCase().includes(search) ||
          r.goals.toLowerCase().includes(search);
        const matchesType = type === "All" || r.website_type === type;
        const matchesStatus = status === "All" || r.status === status;

        let matchesTech = true;
        if (tech) {
          matchesTech = r.tech_stack && r.tech_stack.some(t => t.toLowerCase().includes(tech));
        }

        return matchesSearch && matchesType && matchesStatus && matchesTech;
      });

      renderRequestsTable(filtered);
    };

    adminReqSearchInput.oninput = handleRequestFilters;
    adminReqFilterType.onchange = handleRequestFilters;
    adminReqFilterStatus.onchange = handleRequestFilters;
    adminReqFilterTech.oninput = handleRequestFilters;
  }

  function renderRequestsTable(requests) {
    const tbody = document.getElementById('requests-table-body');
    const noMsg = document.getElementById('no-requests-msg');
    tbody.innerHTML = '';

    if (requests.length === 0) {
      noMsg.classList.remove('hidden');
      return;
    }
    noMsg.classList.add('hidden');

    requests.forEach(r => {
      const tr = document.createElement('tr');

      const created = new Date(r.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const delivery = new Date(r.delivery_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      tr.innerHTML = `
        <td>
          <div class="candidate-details-mini">
            <span class="candidate-name-mini">${r.client_name}</span>
            <span class="candidate-email-mini">${r.company_name} • ${r.email}</span>
          </div>
        </td>
        <td><span class="track-badge">${r.website_type}</span></td>
        <td><strong>${r.budget_range}</strong></td>
        <td>${delivery}</td>
        <td>${created}</td>
        <td><span class="status-badge status-${r.status.toLowerCase().replace(/\s+/g, '-')}">${r.status}</span></td>
        <td>
          <button class="btn-outline-sm btn-view-request" data-id="${r.id}">Inspect</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-view-request').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openRequestModal(id, requests);
      });
    });
  }

  // Inspect Request modal detail
  function openRequestModal(id, requestsList) {
    const r = requestsList.find(req => req.id === id);
    if (!r) return;

    candidateModal.classList.remove('hidden');
    document.getElementById('modal-title-text').textContent = "Client Request Brief";

    // tech stack list
    const techHtml = (r.tech_stack || []).map(t => `<span class="skill-mini-tag">${t}</span>`).join('');
    const integrationsHtml = (r.integrations || []).map(t => `<span class="skill-mini-tag">${t}</span>`).join('') || 'None';
    const featuresHtml = (r.additional_features || []).map(t => `<span class="skill-mini-tag">${t}</span>`).join('') || 'None';

    modalDetailsContainer.innerHTML = `
      <!-- Status Update Widget -->
      <div class="modal-status-update-box">
        <div class="dropdown-wrapper">
          <label>Request Operations Status</label>
          <select id="modal-update-request-status" data-id="${r.id}">
            <option value="New" ${r.status === 'New' ? 'selected' : ''}>New</option>
            <option value="Under Review" ${r.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
            <option value="Proposal Sent" ${r.status === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
            <option value="Accepted" ${r.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
            <option value="Archived" ${r.status === 'Archived' ? 'selected' : ''}>Archived</option>
          </select>
        </div>
        <div>
          <p class="alert-desc">Updating request status sets workflow trackers and log updates.</p>
        </div>
      </div>

      <!-- Client and company info -->
      <div class="modal-candidate-profile">
        <div class="photo-preview-container" style="border-radius: 8px; width: 60px; height: 60px; background: rgba(59,130,246,0.06); display:flex; align-items:center; justify-content:center;">
          <i data-lucide="building-2" class="size-large text-gradient-blue"></i>
        </div>
        <div class="modal-info-core">
          <span class="track-badge">${r.website_type} Product</span>
          <h4 class="modal-candidate-name">${r.client_name}</h4>
          <div class="modal-contact-row">
            <span><i data-lucide="building"></i> Company: <strong>${r.company_name}</strong></span>
            <span><i data-lucide="mail"></i> ${r.email}</span>
            <span><i data-lucide="phone"></i> ${r.phone}</span>
          </div>
        </div>
      </div>

      <div class="modal-grid-two">
        <!-- Goals & description -->
        <div class="modal-col-full">
          <h4 class="modal-section-title">Website Objectives & Goals</h4>
          <div class="modal-answers-box">
            <div class="modal-answer-item">
              <p>${r.goals}</p>
            </div>
          </div>
        </div>

        <!-- Target Audience -->
        <div class="modal-col-full">
          <h4 class="modal-section-title">Target User Demographics</h4>
          <div class="modal-answers-box">
            <div class="modal-answer-item">
              <p>${r.target_audience}</p>
            </div>
          </div>
        </div>

        <!-- Tech specifications -->
        <div>
          <h4 class="modal-section-title">Technical Specifications</h4>
          <div class="modal-skills-box">
            <div class="modal-skill-row">
              <span class="modal-skill-label">Preferred Tech Stack</span>
              <div class="modal-skills-tags">${techHtml}</div>
            </div>
            <div class="modal-skill-row" style="margin-top: 10px;">
               <span class="modal-skill-label">Required Integrations</span>
               <div class="modal-skills-tags">${integrationsHtml}</div>
            </div>
            <div class="modal-skill-row" style="margin-top: 10px;">
               <span class="modal-skill-label">Additional Features</span>
               <div class="modal-skills-tags">${featuresHtml}</div>
            </div>
          </div>
        </div>

        <!-- Design specifications -->
        <div>
          <h4 class="modal-section-title">Design Style & References</h4>
          <div class="modal-skills-box">
            <div class="modal-skill-row">
              <span class="modal-skill-label">Visual Style Theme</span>
              <span class="track-badge">${r.design_style} Style</span>
            </div>
            <div class="modal-skill-row" style="margin-top: 10px;">
              <span class="modal-skill-label">Preferred Colors</span>
              <p style="font-size: 0.85rem; font-weight: 500;">${r.color_scheme}</p>
            </div>
            <div class="modal-skill-row" style="margin-top: 10px;">
              <span class="modal-skill-label">Site References</span>
              <p style="font-size: 0.85rem; word-break: break-all; white-space: pre-line;">${r.reference_urls || 'None provided'}</p>
            </div>
          </div>
        </div>

        <!-- Delivery timelines & budgets -->
        <div>
          <h4 class="modal-section-title">Financials & Schedule</h4>
          <div class="modal-detail-card">
            <div class="modal-card-header">
              <h5>Budget Range Allocation</h5>
              <span class="track-badge" style="background: rgba(16,185,129,0.08); color:#10b981; border:1px solid rgba(16,185,129,0.18); font-size:0.75rem; font-weight:700; border-radius:4px; padding:2px 6px;">${r.budget_range}</span>
            </div>
            <div class="modal-card-sub" style="margin-top: 8px;">Target Delivery: <strong>${new Date(r.delivery_date).toLocaleDateString()}</strong></div>
            <div class="modal-card-desc">Client will provide content: <strong>${r.provide_content ? 'Yes' : 'No'}</strong></div>
            <div class="modal-card-desc">Page scope details: <strong>${r.page_count} pages</strong></div>
          </div>
        </div>

        <!-- Attachments -->
        <div>
          <h4 class="modal-section-title">Guidelines & Design Attachments</h4>
          <div class="modal-card-list">
            ${r.attachments ? `
              <div class="modal-detail-card">
                <div class="modal-card-header">
                  <h5>${r.attachments.name}</h5>
                  <span>Size: ${r.attachments.size}</span>
                </div>
                <a href="${r.attachments.data}" download="${r.attachments.name}" class="btn-primary w-full" style="margin-top: 10px; display:inline-flex; align-items:center; justify-content:center; gap:8px;"><i data-lucide="download"></i> Download Guidelines File</a>
              </div>
            ` : '<p class="text-muted">No custom brief guidelines files uploaded.</p>'}
          </div>
        </div>
      </div>
    `;

    lucide.createIcons();

    // Connect status changer drop triggers
    const statusSelect = document.getElementById('modal-update-request-status');
    statusSelect.addEventListener('change', async (e) => {
      const newStatus = e.target.value;
      const targetId = statusSelect.getAttribute('data-id');

      if (!isOfflineMode && supabase) {
        try {
          const { error } = await supabase.from('project_requests').update({ status: newStatus }).eq('id', targetId);
          if (error) throw error;
        } catch (err) {
          console.error("Supabase status save failed, syncing offline local:", err);
          updateLocalRequestStatus(targetId, newStatus);
        }
      } else {
        updateLocalRequestStatus(targetId, newStatus);
      }

      // Refresh requests table list data
      loadRequestsAdminData();
    });
  }

  function updateLocalRequestStatus(targetId, newStatus) {
    const updated = localRequests.map(req => {
      if (req.id === targetId) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    localRequests = updated;
    localStorage.setItem('Hyna Studio_project_requests', JSON.stringify(localRequests));
  }

  // Close modal overlays
  btnCloseModal.addEventListener('click', () => {
    candidateModal.classList.add('hidden');
  });

  candidateModal.addEventListener('click', (e) => {
    if (e.target === candidateModal) {
      candidateModal.classList.add('hidden');
    }
  });

  // Render initial icons on load
  lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
