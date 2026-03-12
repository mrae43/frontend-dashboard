export const VARIANT_STYLES = {
  success: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  danger: 'text-rose-700 bg-rose-50 border-rose-200',
  info: 'text-blue-700 bg-blue-50 border-blue-200',
  neutral: 'text-slate-500 bg-slate-50 border-slate-200',
} as const;

// Helper to get the styles safely
export const getBadgeStyles = (variant: keyof typeof VARIANT_STYLES) => {
  return VARIANT_STYLES[variant] || VARIANT_STYLES.neutral;
};