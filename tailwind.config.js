/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xp: {
          desktop: '#004E98',
          taskbar: '#245EDC',
          start: '#3D9538',
          titlebarDark: '#0055EA',
          titlebarLight: '#00A5FE',
          windowBg: '#ECE9D8',
          border: '#00138C',
          selection: '#316AC5',
        }
      },
      fontFamily: {
        sans: ['Tahoma', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'bliss': "url('/bliss.jpg')",
        'titlebar-gradient': 'linear-gradient(180deg, #0058e6 0%, #3a93ff 8%, #288eff 40%, #127dff 88%, #036bfe 100%)',
        'titlebar-inactive': 'linear-gradient(180deg, #7697e7 0%, #7e9ee3 8%, #94b2ec 40%, #7697e7 88%, #5b7edc 100%)',
        'taskbar-gradient': 'linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #333 100%)',
        'start-gradient': 'linear-gradient(180deg, #3d9538 0%, #46aa40 8%, #4ba946 40%, #3d9538 88%, #317f2b 100%)',
      }
    },
  },
  plugins: [],
}
