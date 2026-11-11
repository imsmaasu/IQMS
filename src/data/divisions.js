/**
 * Divisions Registry
 *
 * Every division of SerajUlMaymar is defined here.
 * Routes, header nav, footer columns, Home rows, and Contact quick links
 * are ALL generated from this array.
 */

const divisions = [
  {
    id: 'construction',
    slug: 'construction',
    number: '01',
    name: 'Construction',
    tagline: 'Custom homes and full renovations, start to handover.',
    summary:
      'We build custom homes on your plot and handle complete renovations, from foundations to finishing. One team, one point of contact, delivered turnkey in Karachi.',
    accentKey: 'construction',
    services: [
      'Custom home construction on your plot',
      'Full house renovation',
      'Washroom renovation, start to finish',
      'Kitchen and interior finishing',
    ],
    heroCopy: {
      eyebrow: 'CONSTRUCTION · KARACHI',
      headline: 'Your home, built by one team from ground up.',
      description:
        'Custom homes on your plot, full renovations, washroom and kitchen remodels. One team handles everything, start to handover.',
    },
    formConfig: {
      title: 'Request a Quote',
      submitLabel: 'Send via WhatsApp',
      messagePrefix: 'CONSTRUCTION QUOTE REQUEST: SerajUlMaymar',
      fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'e.g. Ahmed Khan' },
        { name: 'whatsapp', label: 'WhatsApp or Phone', type: 'tel', required: true, placeholder: 'e.g. 0300 1234567' },
        {
          name: 'service',
          label: 'Service Needed',
          type: 'select',
          required: true,
          options: [
            'Custom home construction',
            'Full house renovation',
            'Washroom renovation',
            'Kitchen and interiors',
            'Other',
          ],
        },
        { name: 'area', label: 'Area in Karachi', type: 'text', required: true, placeholder: 'e.g. DHA Phase 6, Gulshan' },
        { name: 'notes', label: 'Additional Details', type: 'textarea', required: false, placeholder: 'Plot size, timeline, budget range, etc.' },
      ],
    },
    seo: {
      title: 'Construction | SerajUlMaymar',
      description:
        'Custom home construction and full renovations in Karachi. One team, start to handover. SerajUlMaymar Construction.',
    },
  },

  {
    id: 'software',
    slug: 'software',
    number: '02',
    name: 'Software',
    tagline: 'Web, desktop, mobile, and AI: built to spec.',
    summary:
      'We build web applications, desktop software, mobile apps, and AI solutions for clients in Pakistan and abroad. No off the shelf templates, every project is scoped and built from scratch.',
    accentKey: 'software',
    services: [
      'Web applications',
      'Desktop applications',
      'Mobile applications',
      'AI solutions',
    ],
    heroCopy: {
      eyebrow: '// SOFTWARE HOUSE',
      headline: 'Software built to spec, not from a template.',
      description:
        'Web apps, desktop apps, mobile apps, and AI solutions. We work with clients in Pakistan and abroad.',
    },
    formConfig: {
      title: 'Project Inquiry',
      submitLabel: 'Send via WhatsApp',
      messagePrefix: 'SOFTWARE PROJECT INQUIRY: SerajUlMaymar',
      fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'e.g. Sara Ali' },
        { name: 'whatsapp', label: 'WhatsApp or Email', type: 'text', required: true, placeholder: 'e.g. 0300 1234567 or email' },
        { name: 'project', label: 'What do you need built', type: 'textarea', required: true, placeholder: 'Describe your project: web app, mobile app, AI tool, etc.' },
        { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false, placeholder: 'Timeline, budget range, existing systems, etc.' },
      ],
    },
    seo: {
      title: 'Software House | SerajUlMaymar',
      description:
        'Custom web apps, desktop software, mobile apps, and AI solutions. SerajUlMaymar Software House, Karachi.',
    },
  },

  {
    id: 'education',
    slug: 'education',
    number: '03',
    name: 'Education',
    tagline: 'Qualified tutors for every subject and level.',
    summary:
      'IQMS STEM SEED PARKS: a tutor marketplace for all subjects and all levels. Matric and FSc, O and A Levels, ECAT and MDCAT, and University. Online or on site in Karachi.',
    accentKey: 'education',
    services: [
      'Matric and FSc tuition',
      'O and A Levels tuition',
      'ECAT and MDCAT preparation',
      'University level tutoring',
    ],
    heroCopy: {
      eyebrow: 'IQMS STEM SEED PARKS · EDUCATION',
      headline: 'Qualified tutors, every subject, every level.',
      description:
        'From Matric to University: Maths, Physics, Chemistry, Biology, Computer Science, English, engineering subjects, and all others on request. Online or on site.',
    },
    formConfig: {
      title: 'Enroll for Tutoring',
      submitLabel: 'Submit and Connect on WhatsApp',
      messagePrefix: 'TUTOR ENROLLMENT: IQMS STEM SEED PARKS',
      fields: [
        { name: 'studentName', label: 'Student Name', type: 'text', required: true, placeholder: 'e.g. Ali Ahmed' },
        { name: 'guardian', label: 'Parent or Guardian Name', type: 'text', required: false, placeholder: 'Optional' },
        { name: 'whatsapp', label: 'WhatsApp Number', type: 'tel', required: true, placeholder: 'e.g. 0300 1234567' },
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          required: true,
          options: [
            'Matric or FSc (BISE)',
            'O Levels (Cambridge)',
            'A Levels (Cambridge)',
            'ECAT Preparation',
            'MDCAT Preparation',
            'University or Higher Education',
            'Other',
          ],
        },
        {
          name: 'subject',
          label: 'Subject',
          type: 'select',
          required: true,
          options: [
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'Computer Science',
            'English',
            'Programming (Python, C++, Java)',
            'Engineering Subjects',
            'Other (specify in notes)',
          ],
        },
        {
          name: 'mode',
          label: 'Mode',
          type: 'select',
          required: true,
          options: ['Online', 'On site', 'Either'],
        },
        {
          name: 'timing',
          label: 'Preferred Timing',
          type: 'select',
          required: false,
          options: [
            'Morning (9 AM to 1 PM)',
            'Afternoon (2 PM to 5 PM)',
            'Evening (5 PM to 9 PM)',
            'Night (8 PM to 11 PM)',
            'Weekends only',
            'Flexible',
          ],
        },
        { name: 'city', label: 'City or Area (if on site)', type: 'text', required: false, placeholder: 'e.g. Karachi, DHA Phase 5' },
        { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false, placeholder: 'Learning goals, preferred tutor gender, etc.' },
      ],
    },
    seo: {
      title: 'Education | IQMS STEM SEED PARKS | SerajUlMaymar',
      description:
        'Find qualified tutors for Matric, FSc, O and A Levels, ECAT, MDCAT, and University subjects. Online or on site. IQMS STEM SEED PARKS.',
    },
  },

  {
    id: 'marriage',
    slug: 'marriage-bureau',
    number: '04',
    name: 'Marriage Bureau',
    tagline: 'Private family registrations, reviewed with care.',
    summary:
      'A marriage bureau service in Karachi. Candidates or families complete a structured registration form, and our team reviews it privately and follows up on WhatsApp.',
    accentKey: 'rose',
    accent: 'rose',
    customPage: true,
    services: [
      'Candidate biodata registration',
      'Partner requirement intake',
      'Private record review in Karachi',
      'Direct family follow-up on WhatsApp',
    ],
    heroCopy: {
      eyebrow: 'MARRIAGE BUREAU · KARACHI',
      headline: 'Finding the right rishta, with care.',
      description:
        'Register once for yourself or a family member. Our bureau team reads your details privately and follows up directly on WhatsApp.',
    },
    formConfig: {
      title: 'Registration Form',
    },
    seo: {
      title: 'Marriage Bureau | SerajUlMaymar',
      description:
        'Marriage Bureau in Karachi, Pakistan. Register candidate details and partner requirements privately. SerajUlMaymar Marriage Bureau.',
    },
  },
];

export default divisions;
