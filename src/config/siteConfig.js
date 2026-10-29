/**
 * Site Configuration for IQMS STEM SEED PARKS
 * 
 * Edit your contact information, WhatsApp numbers, brand name,
 * and social channels in one centralized location.
 */

export const siteConfig = {
  brandName: "IQMS STEM SEED PARKS",
  shortName: "STEM SEED PARKS",
  tagline: "Cultivating Academic Excellence in STEM & Beyond",
  description: "Connecting ambitious students with top qualified tutors for Matric/FSc, O/A Levels, ECAT/MDCAT, and University courses. Available online across Pakistan and on-site in select cities.",

  // Contact details - Replace with your actual WhatsApp & phone numbers
  whatsappNumber: "923642044330", // Format: country code without '+' e.g. 923642044330
  displayPhone: "+92 364 2044330",
  email: "info@iqms-stemseedparks.com",
  supportEmail: "admissions@iqms-stemseedparks.com",
  
  // Locations / Office
  headquarters: "Islamabad / Lahore / Karachi & Nationwide Online",
  availableCities: [
    "Islamabad",
    "Rawalpindi",
    "Lahore",
    "Karachi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Online (Worldwide)"
  ],

  // Working Hours & Support
  officeHours: "Monday – Saturday: 9:00 AM – 9:00 PM (PKT)",
  responseTime: "Within 15 to 30 minutes during active hours",

  // Social Links (Future Proof)
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },

  // Helper function to generate direct WhatsApp chat links
  getWhatsAppUrl(customMessage = "") {
    const defaultMsg = `Hello IQMS STEM SEED PARKS! I would like to inquire about tutoring services.`;
    const text = encodeURIComponent(customMessage.trim() || defaultMsg);
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }
};

export default siteConfig;
