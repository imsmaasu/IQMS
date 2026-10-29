/**
 * Academic Levels Data
 * Phase 1 configuration for Matric/FSc, O/A Levels, ECAT/MDCAT, and University.
 * Extensible for adding new certifications or grades later.
 */

export const academicLevels = [
  {
    id: "matric-fsc",
    title: "Matric & FSc",
    badge: "BISE / Federal Board",
    category: "Secondary & Higher Secondary",
    summary: "Comprehensive concept-building and board exam preparation with past-paper solving techniques for high percentages.",
    highlights: [
      "Rigorous board exam drill & paper presentation tips",
      "Conceptual clarity in Physics, Chemistry & Biology",
      "Special focus on FSc Pre-Medical & Pre-Engineering",
      "Regular mock assessments and chapter-wise tests"
    ],
    popularSubjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "English"
    ],
    grades: ["9th Class", "10th Class (Matric)", "11th Class (1st Year FSc/ICS)", "12th Class (2nd Year FSc/ICS)"]
  },
  {
    id: "o-a-levels",
    title: "O & A Levels",
    badge: "Cambridge CAIE & Edexcel",
    category: "British Curriculum",
    summary: "Expert Cambridge-trained tutors familiar with mark schemes, command words, syllabus updates, and grade threshold strategies.",
    highlights: [
      "Deep understanding of Cambridge marking schemes",
      "Past papers topical & yearly practice (10+ years)",
      "Structured support for coursework and practical papers",
      "Pacing aligned with May/June and Oct/Nov series"
    ],
    popularSubjects: [
      "Mathematics (Pure, Mechanics, Stats)",
      "Physics (5054 / 9702)",
      "Chemistry (5070 / 9701)",
      "Biology (5090 / 9700)",
      "Computer Science",
      "Economics & Business Studies"
    ],
    grades: ["IGCSE", "O Level (O1, O2, O3)", "AS Level", "A2 Level"]
  },
  {
    id: "entry-tests",
    title: "ECAT & MDCAT Prep",
    badge: "Competitive Entry Tests",
    category: "Test Preparation",
    summary: "High-yield shortcut formulas, speed calculations, and time management strategies for medical and engineering entrance tests.",
    highlights: [
      "Shortcuts, time-saving tricks & mental math",
      "Negative marking avoidance strategies",
      "Curriculum coverage for NUMS, MDCAT (PMDC), ECAT (UET), NUST (NET), FAST & GIKI",
      "Extensive full-length mock exams under timed conditions"
    ],
    popularSubjects: [
      "MDCAT Biology & Chemistry",
      "ECAT Advanced Mathematics & Physics",
      "Logical Reasoning & Analytical Ability",
      "English Reading Comprehension & Vocab",
      "NET / FAST / GIKI Prep Modules"
    ],
    grades: ["MDCAT (Pre-Medical)", "ECAT (Pre-Engineering)", "NET (NUST)", "FAST / GIKI / PIEAS"]
  },
  {
    id: "university",
    title: "University & Higher STEM",
    badge: "Undergrad & Graduate",
    category: "Higher Education",
    summary: "Specialized subject support by experienced university lecturers, software engineers, and postgraduates for challenging degrees.",
    highlights: [
      "Data Structures, Algorithms & Programming (C++, Python, Java)",
      "Engineering Core: Calculus, Linear Algebra, Thermodynamics, Circuit Analysis",
      "Assistance with coding assignments, projects & conceptual viva",
      "Flexible schedule tailored to university semester calendars"
    ],
    popularSubjects: [
      "Calculus & Differential Equations",
      "Programming (C++, Python, OOP)",
      "Data Structures & Algorithms",
      "Digital Logic Design & Circuits",
      "Linear Algebra & Discrete Math",
      "Thermodynamics & Fluid Mechanics"
    ],
    grades: ["BS Computer Science / SE", "Electrical / Mechanical Engineering", "BS Mathematics / Physics", "BBA / Quantitative Finance"]
  }
];

export default academicLevels;
