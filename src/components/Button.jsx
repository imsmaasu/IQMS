import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button Component
 * 
 * Supports:
 * - Internal routing via React Router `to`
 * - External links via `href`
 * - Standard button events via `onClick`
 * - Variants: 'primary', 'navy', 'outline', 'whatsapp', 'soft'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  style = {},
  ...props
}) {
  const baseStyles = {
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    border: '1px solid transparent',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    ...style
  };

  const sizeStyles = {
    sm: { padding: '0.45rem 0.9rem', fontSize: '0.85rem' },
    md: { padding: '0.7rem 1.35rem', fontSize: '0.95rem' },
    lg: { padding: '0.9rem 1.85rem', fontSize: '1.05rem', borderRadius: 'var(--radius-lg)' }
  }[size] || { padding: '0.7rem 1.35rem', fontSize: '0.95rem' };

  let variantStyles = {};
  switch (variant) {
    case 'primary':
      variantStyles = {
        backgroundColor: 'var(--color-teal-accent)',
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
      };
      break;
    case 'navy':
      variantStyles = {
        backgroundColor: 'var(--color-primary-navy)',
        color: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(15, 30, 54, 0.2)',
      };
      break;
    case 'whatsapp':
      variantStyles = {
        backgroundColor: 'var(--color-whatsapp)',
        color: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
      };
      break;
    case 'outline':
      variantStyles = {
        backgroundColor: 'transparent',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-headline)',
      };
      break;
    case 'soft':
      variantStyles = {
        backgroundColor: 'var(--color-teal-light)',
        borderColor: 'var(--color-teal-border)',
        color: 'var(--color-teal-hover)',
      };
      break;
    default:
      variantStyles = {
        backgroundColor: 'var(--color-teal-accent)',
        color: '#FFFFFF',
      };
  }

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 18} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 18} />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} style={combinedStyles} className={`btn-custom btn-${variant} ${className}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={combinedStyles} 
        className={`btn-custom btn-${variant} ${className}`} 
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={combinedStyles}
      className={`btn-custom btn-${variant} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
