/**
 * Marriage Bureau Page Copy & Media Metadata
 *
 * All editable copy for /marriage-bureau lives here.
 * Facts policy: Karachi, Pakistan; shared WhatsApp/email from siteConfig.js;
 * English only; no unverified claims, stats, testimonials, or fees.
 */

export const marriageBureauCopy = {
  hero: {
    eyebrow: 'MARRIAGE BUREAU · KARACHI',
    headlineBefore: 'Finding the right ',
    headlineEmphasis: 'rishta,',
    headlineAfter: ' with care.',
    description:
      'Register once for yourself or a family member. Our team in Karachi reads every submission privately and follows up directly on WhatsApp.',
    primaryCta: 'Start registration',
    secondaryCta: 'Ask on WhatsApp',
    whatsappIntro: 'Hello SerajUlMaymar Marriage Bureau, I would like to ask about registration.',
  },

  // Placeholder 4-step workflow — owner can confirm or edit these strings anytime.
  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    headlineBefore: 'Four quiet ',
    headlineEmphasis: 'steps',
    headlineAfter: ' from form to introduction.',
    steps: [
      {
        number: '01',
        title: 'Register',
        description:
          'Fill in the candidate details and partner requirements in the form below.',
      },
      {
        number: '02',
        title: 'We review your details',
        description:
          'Our bureau team reads the registration privately and checks your preferences.',
      },
      {
        number: '03',
        title: 'We shortlist against your requirements',
        description:
          'We compare your criteria carefully with private family records.',
      },
      {
        number: '04',
        title: 'Families are introduced',
        description:
          'We follow up with you on WhatsApp to take the conversation forward.',
      },
    ],
  },

  whatItCovers: {
    eyebrow: 'WHAT THE FORM COVERS',
    pullQuoteBefore: 'Two parts: ',
    pullQuoteEmphasis: 'about the candidate,',
    pullQuoteAfter: ' and what you are looking for.',
    items: [
      {
        title: 'Personal & background',
        detail: 'Names, date of birth, mother tongue, faith, health, and daily habits.',
      },
      {
        title: 'Education',
        detail: 'Highest degree, field of study, institution, grades, and certifications.',
      },
      {
        title: 'Family details',
        detail: 'Parents, siblings, family values, ancestral origin, and living arrangement.',
      },
      {
        title: 'Profession & income',
        detail: 'Occupation, organization, work location, property status, and plans.',
      },
      {
        title: 'Residency & contact',
        detail: 'Residency status, relocation willingness, primary contact, and photo privacy.',
      },
      {
        title: 'Partner requirements',
        detail: 'Preferred age, marital status, education, location, values, and dealbreakers.',
      },
    ],
  },

  choices: {
    eyebrow: 'YOUR CHOICES',
    headlineBefore: 'Shared on ',
    headlineEmphasis: 'your',
    headlineAfter: ' terms.',
    statements: [
      'Most fields are optional so you can share only what you are comfortable sharing.',
      'You choose your own photo privacy preference, or you may skip uploading a photo.',
      'Registration is strictly for adults, 18 years of age or older.',
    ],
  },

  registration: {
    eyebrow: 'REGISTRATION',
    headlineBefore: 'Candidate ',
    headlineEmphasis: 'registration',
    headlineAfter: ' form.',
    requiredNote: 'Only 12 fields are required. Share the rest only if you are comfortable.',
    // Privacy line shown at top of the panel AND on Review (Prompt 2 Section G)
    privacyNotice:
      'Your details are sent to the bureau and kept in its private records. They are not shown publicly. Most fields are optional.',
    autosaveNote:
      'Your progress is saved in this browser tab until you submit or clear the form. Sensitive fields (Passport Number and CNIC) and your photo are never saved in the draft.',
  },

  closing: {
    eyebrow: 'SERAJULMAYMAR · KARACHI',
    headlineBefore: 'Register once. We ',
    headlineEmphasis: 'follow up',
    headlineAfter: ' on WhatsApp.',
    cta: 'Ask on WhatsApp',
  },

  images: {
    heroMain: {
      src: '/images/marriage-bureau/hero-main.webp',
      width: 1400,
      height: 2100,
      alt: 'Bridal hands decorated with traditional mehndi henna and gold wedding bands',
      objectPosition: 'center 52%',
    },
    heroSecondary: {
      src: '/images/marriage-bureau/hero-secondary.webp',
      width: 1200,
      height: 1680,
      alt: 'Octagonal ivory velvet ring box holding wedding bands on neutral fabric',
      objectPosition: 'center center',
    },
    howItWorksBanner: {
      src: '/images/marriage-bureau/how-it-works.webp',
      width: 1600,
      height: 1200,
      alt: 'Formal cream invitation stationery framed with dried botanicals on dark cloth',
      objectPosition: 'center center',
    },
    closingBand: {
      src: '/images/marriage-bureau/closing-band.webp',
      width: 1600,
      height: 1200,
      alt: 'Two pierced metal lanterns with warm glowing light against a dark background',
      objectPosition: 'center center',
    },
  },
};

export default marriageBureauCopy;

