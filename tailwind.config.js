/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // amber-500
          600: '#d97706', // amber-600
          700: '#b45309', // amber-700
          800: '#92400e', // amber-800
          900: '#78350f', // amber-900
        },
        fluent: {
          bg: '#fcfcfd',
          surface: '#ffffff',
          surfaceHover: '#f8fafc',
          surfaceActive: '#f1f5f9',
          border: '#e2e8f0',
          text: '#0f172a',
          textSecondary: '#64748b',
          acrylic: 'rgba(255, 255, 255, 0.7)',
        },
        forensic: {
          dark: '#0a1122',
          medium: '#0f172a',
          light: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Arial', 'Helvetica', 'sans-serif'],
      },
      backdropBlur: {
        fluent: '20px',
      },
      boxShadow: {
        fluent: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'fluent-elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
