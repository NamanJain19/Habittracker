/**
 * Theme-aware class mappings for consistent light/dark mode support
 * Use these mappings to replace hardcoded dark theme classes
 */

export const themeClasses = {
  // Background colors
  'bg-dark-background': 'bg-light-bg dark:bg-dark-bg',
  'bg-white/5': 'bg-light-surface dark:bg-dark-surface',
  'backdrop-blur-xl bg-white/5': 'bg-light-surface dark:bg-dark-surface',
  
  // Text colors
  'text-light-foreground': 'text-light-text dark:text-dark-text',
  'text-light-foreground/70': 'text-light-text-secondary dark:text-dark-text-secondary',
  'text-light-foreground/60': 'text-light-text-secondary dark:text-dark-text-secondary',
  
  // Border colors
  'border-white/10': 'border-light-border dark:border-dark-border',
  'border border-white/10': 'border border-light-border dark:border-dark-border',
  
  // Input/Form colors
  'bg-white/5 border-white/10 text-light-foreground': 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text',
};
