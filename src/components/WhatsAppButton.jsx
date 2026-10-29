import React from 'react';
import siteConfig from '../config/siteConfig';

export function WhatsAppIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.73 7.35C8.54 7.35 8.24 7.42 7.99 7.69C7.74 7.96 7.03 8.63 7.03 9.99C7.03 11.35 8.02 12.67 8.16 12.86C8.3 13.05 10.1 15.82 12.85 17.01C13.51 17.29 14.02 17.46 14.42 17.59C15.08 17.8 15.68 17.77 16.16 17.7C16.69 17.62 17.8 17.03 18.03 16.38C18.26 15.73 18.26 15.18 18.19 15.06C18.12 14.94 17.93 14.87 17.65 14.73C17.37 14.59 16 13.92 15.75 13.83C15.49 13.73 15.31 13.68 15.12 13.96C14.94 14.24 14.42 14.87 14.26 15.06C14.1 15.24 13.94 15.27 13.66 15.13C13.38 14.99 12.49 14.7 11.43 13.75C10.61 13.02 10.05 12.11 9.91 11.87C9.77 11.63 9.9 11.5 10.04 11.36C10.17 11.23 10.33 11.02 10.47 10.86C10.61 10.7 10.66 10.58 10.75 10.4C10.84 10.22 10.8 10.06 10.73 9.92C10.66 9.78 10.13 8.48 9.91 7.95C9.7 7.43 9.48 7.5 9.32 7.49C9.17 7.48 8.99 7.48 8.73 7.35Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp Button (shown globally in bottom corner)
 */
export default function WhatsAppFloatingButton({ message }) {
  const url = siteConfig.getWhatsAppUrl(message);

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={24} color="#FFFFFF" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
