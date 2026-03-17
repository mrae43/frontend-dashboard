import type { StylesConfig } from "react-select";
import type { OptionType } from "../components/members/MembersFIlter";

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

export const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '0.75rem',
    padding: '2px 8px',
    borderColor: state.isFocused ? '#94a3b8' : '#e2e8f0',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#cbd5e1',
    },
    backgroundColor: 'white',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f8fafc' : 'white',
    color: '#1e293b',
    fontSize: '14px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#f1f5f9',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    border: '1px solid #e2e8f0',
    zIndex: 50,
  }),
};
