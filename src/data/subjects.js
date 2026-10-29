/**
 * Subjects Data
 * Comprehensive catalog of subjects offered at IQMS STEM SEED PARKS.
 * Easily filterable and pre-selectable in the enrollment form.
 */

export const subjectCatalog = [
  {
    category: "STEM Core (Sciences & Math)",
    description: "Foundational and advanced sciences with an emphasis on conceptual clarity, experimental thinking, and numerical problem solving.",
    subjects: [
      {
        id: "mathematics",
        name: "Mathematics",
        levels: ["Matric/FSc", "O/A Levels", "ECAT/MDCAT", "University"],
        description: "Algebra, Trigonometry, Calculus, Vectors, Statistics, Mechanics, and Discrete Mathematics.",
        isHot: true
      },
      {
        id: "physics",
        name: "Physics",
        levels: ["Matric/FSc", "O/A Levels", "ECAT/MDCAT", "University"],
        description: "Mechanics, Electricity & Magnetism, Waves, Modern Physics, Thermodynamics, and Lab concepts.",
        isHot: true
      },
      {
        id: "chemistry",
        name: "Chemistry",
        levels: ["Matric/FSc", "O/A Levels", "ECAT/MDCAT"],
        description: "Organic, Inorganic, Physical, Analytical Chemistry, and balancing stoichiometry equations.",
        isHot: true
      },
      {
        id: "biology",
        name: "Biology",
        levels: ["Matric/FSc", "O/A Levels", "ECAT/MDCAT"],
        description: "Cell biology, Genetics, Human Physiology, Ecology, Evolution, and MDCAT high-yield topics.",
        isHot: true
      }
    ]
  },
  {
    category: "Computing & IT",
    description: "Hands-on coding, algorithmic thinking, and modern computer science from school curriculum to university level.",
    subjects: [
      {
        id: "computer-science",
        name: "Computer Science",
        levels: ["Matric/FSc (ICS)", "O/A Levels", "University"],
        description: "Theory, pseudocode, computer architecture, databases, and network fundamentals.",
        isHot: true
      },
      {
        id: "programming",
        name: "Programming & Software Engineering",
        levels: ["University", "O/A Levels"],
        description: "C++, Python, Java, Object Oriented Programming (OOP), Data Structures & Algorithms (DSA).",
        isHot: true
      },
      {
        id: "web-dev",
        name: "Web Development & Database Systems",
        levels: ["University", "All Levels"],
        description: "HTML, CSS, JavaScript, SQL, Database Normalization, and Full Stack fundamentals."
      }
    ]
  },
  {
    category: "Engineering & Advanced STEM",
    description: "Undergraduate engineering course tutoring led by subject specialists and practicing engineers.",
    subjects: [
      {
        id: "circuit-analysis",
        name: "Circuit Analysis & Digital Logic",
        levels: ["University"],
        description: "Kirchhoff's laws, AC/DC analysis, Boolean logic, Karnaugh maps, and microcontroller basics."
      },
      {
        id: "engineering-maths",
        name: "Linear Algebra & Differential Equations",
        levels: ["University"],
        description: "Eigenvalues, Matrix transformations, ODEs, PDEs, Laplace transforms, and boundary value problems."
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics & Fluid Mechanics",
        levels: ["University"],
        description: "First & second laws, enthalpy, Carnot cycles, fluid statics, and Navier-Stokes concepts."
      }
    ]
  },
  {
    category: "Languages & Humanities",
    description: "Essential communicative competence, reading comprehension, analytical essay writing, and social sciences.",
    subjects: [
      {
        id: "english",
        name: "English Language & Literature",
        levels: ["Matric/FSc", "O/A Levels", "ECAT/MDCAT", "University"],
        description: "Grammar, academic essay writing, comprehension analysis, vocabulary building, and IELTS/SAT foundation."
      },
      {
        id: "economics-business",
        name: "Economics & Business Studies",
        levels: ["O/A Levels", "University"],
        description: "Microeconomics, Macroeconomics, Market structures, Accounting, and Business management."
      },
      {
        id: "pakistan-studies-islamiyat",
        name: "Pakistan Studies & Islamiyat",
        levels: ["Matric/FSc", "O/A Levels"],
        description: "Structured timeline analysis, past paper answer structuring, and source-based questions."
      }
    ]
  }
];

export const allFlatSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Programming (Python / C++ / Java)",
  "Data Structures & Algorithms",
  "Engineering Mechanics & Circuits",
  "Linear Algebra & Calculus",
  "English Language & Essay Writing",
  "Economics & Accounting",
  "MDCAT Full Subject Pack",
  "ECAT Full Subject Pack",
  "Other Subject (Specify in notes)"
];

export default subjectCatalog;
