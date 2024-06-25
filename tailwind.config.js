import daisyui from "daisyui"
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts}'],
  safelist:[
    'bg-opacity-0',
    'bg-opacity-10',
    'bg-opacity-20',
    'bg-opacity-30',
    'bg-opacity-40',
    'bg-opacity-50',
    'bg-opacity-60',
    'bg-opacity-70',
    'bg-opacity-80',
    'bg-opacity-90',
    'bg-opacity-100',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
      "winter",
      "valentine",
      {"Cappuccino": {
        'primary' : '#4b3832',
        'primary-focus' : '#29211e',
        'primary-content' : '#ffffff',

        'secondary' : '#854442',
        'secondary-focus' : '#623332',
        'secondary-content' : '#ffffff',

        'accent' : '#9edcd6',
        'accent-focus' : '#59cfc3',
        'accent-content' : '#ffffff',

        'neutral' : '#be9b7b',
        'neutral-focus' : '#856d57',
        'neutral-content' : '#ffffff',

        'base-100' : '#fff4e6',
        'base-200' : '#ded5ca',
        'base-300' : '#c3b7a7',
        'base-content' : '#3c2f2f',

        'info' : '#76bef9',
        'success' : '#56c87c',
        'warning' : '#f0dd60',
        'error' : '#e9472b',

       '--rounded-box': '1rem',
       '--rounded-btn': '10rem',
       '--rounded-badge': '1.9rem',

       '--animation-btn': '.25s',
       '--animation-input': '.2s',

       '--btn-text-case': 'lowercase',
       '--navbar-padding': '.5rem',
       '--border-btn': '1px',
     },
      'Mocha': {
         'primary' : '#cba6f7',
         'primary-focus' : '#a283c9',
         'primary-content' : '#1e1e2e',

         'secondary' : '#313244',
         'secondary-focus' : '#292938',
         'secondary-content' : '#bac2de',

         'accent' : '#94e2d5',
         'accent-focus' : '#8fc7bd',
         'accent-content' : '#4c5170',

         'neutral' : '#4c5170',
         'neutral-focus' : '#35384b',
         'neutral-content' : '#cdd6f4',

         'base-100' : '#1e1e2e',
         'base-200' : '#181825',
         'base-300' : '#11111b',
         'base-content' : '#cdd6f4',

         'info' : '#89b4fa',
         'success' : '#44cabd',
         'warning' : '#f9e2af',
         'error' : '#f38ba8',

        '--rounded-box': '1rem',
        '--rounded-btn': '10rem',
        '--rounded-badge': '1.9rem',

        '--animation-btn': '.25s',
        '--animation-input': '.2s',

        '--btn-text-case': 'lowercase',
        '--navbar-padding': '.5rem',
        '--border-btn': '1px',
      },
        'Husky': {
           'primary' : '#BFE2FF',
           'primary-focus' : '#a9c7df',
           'primary-content' : '#0A131A',

           'secondary' : '#122031',
           'secondary-focus' : '#1d2e44',
           'secondary-content' : '#cdd6f4',

           'accent' : '#c26251',
           'accent-focus' : '#b0544a',
           'accent-content' : '#122031',

           'neutral' : '#1f2323',
           'neutral-focus' : '#31393a',
           'neutral-content' : '#bac2de',

           'base-100' : '#13232f',
           'base-200' : '#0A131A',
           'base-300' : '#00010D',
           'base-content' : '#cdd6f4',

           'info' : '#95dcea',
           'success' : '#35c06a',
           'warning' : '#c5e137',
           'error' : '#ec3266',

          '--rounded-box': '.75rem',
          '--rounded-btn': '.75rem',
          '--rounded-badge': '.5rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'lowercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
        'Discord':{
          "primary": "#5865F2",               // Discord Blue
          "primary-focus": "#4752C4",         // Darker Blue for focus state
          "primary-content": "#FFFFFF",       // White text on primary
        
          "secondary": "#36393F",             // Discord Background
          "secondary-focus": "#2F3136",       // Slightly darker for focus state
          "secondary-content": "#DCDDDE",     // Light gray text on secondary
        
          "accent": "#57F287",                // Green accent color
          "accent-focus": "#45C46D",          // Darker green for focus state
          "accent-content": "#36393F",        // Dark background for accent content
        
          "neutral": "#2C2F33",               // Dark neutral color
          "neutral-focus": "#23272A",         // Darker for focus state
          "neutral-content": "#DCDDDE",       // Light gray text on neutral
        
          "base-100": "#36393F",              // Main background color
          "base-200": "#2F3136",              // Slightly darker background
          "base-300": "#202225",              // Darker still
          "base-content": "#FFFFFF",          // White text on base
        
          "info": "#00AFF4",                  // Light blue for information
          "success": "#43B581",               // Green for success
          "warning": "#FAA61A",               // Yellow for warnings
          "error": "#F04747",                 // Red for errors
        
          "--rounded-box": "0.375rem",        // Slightly rounded corners
          "--rounded-btn": "0.375rem",        // Rounded buttons
          "--rounded-badge": "0.25rem",       // Rounded badges
        
          "--animation-btn": "0.3s",          // Slightly longer animation for buttons
          "--animation-input": "0.3s",        // Slightly longer animation for inputs
        
          "--btn-text-case": "none",          // Default text case
          "--navbar-padding": "1rem",         // More padding for navbar
          "--border-btn": "1px",              // Border thickness for buttons
        },
        'Vercel':{
          "primary": "#000000",               // Primary color (black)
          "primary-focus": "#333333",         // Slightly darker primary color
          "primary-content": "#FFFFFF",       // White text on primary
        
          "secondary": "#0070F3",             // Secondary color (blue)
          "secondary-focus": "#0057C1",       // Darker blue for focus state
          "secondary-content": "#FFFFFF",     // White text on secondary
        
          "accent": "#FF0080",                // Accent color (pink)
          "accent-focus": "#D6006A",          // Darker pink for focus state
          "accent-content": "#FFFFFF",        // White text on accent
        
          "neutral": "#F8F8F8",               // Neutral color (light gray)
          "neutral-focus": "#EDEDED",         // Slightly darker neutral color
          "neutral-content": "#333333",       // Dark text on neutral
        
          "base-100": "#FFFFFF",              // Base background color (white)
          "base-200": "#F5F5F5",              // Slightly darker base background
          "base-300": "#E0E0E0",              // Darker base background
          "base-content": "#333333",          // Dark text on base
        
          "info": "#1EA7FD",                  // Information color (light blue)
          "success": "#00C781",               // Success color (green)
          "warning": "#FFAA2C",               // Warning color (yellow)
          "error": "#FF4D4F",                 // Error color (red)
        
          "--rounded-box": ".5rem",           // Rounded corners for boxes
          "--rounded-btn": ".5rem",           // Rounded corners for buttons
          "--rounded-badge": ".25rem",        // Rounded corners for badges
        
          "--animation-btn": ".3s",           // Button animation duration
          "--animation-input": ".2s",         // Input animation duration
        
          "--btn-text-case": "uppercase",     // Button text in uppercase
          "--navbar-padding": ".75rem",       // Padding for navbar
          "--border-btn": "1px solid #E0E0E0" // Border thickness for buttons
        },
        'Vercel-black':{
          "primary": "#FFF",
          "primary-focus": "#004A9C",
          "primary-content": "#00000",
        
          "secondary": "#141414",
          "secondary-focus": "#1A1A1A",
          "secondary-content": "#E0E0E0",
        
          "accent": "#FFD700",
          "accent-focus": "#FFC300",
          "accent-content": "#141414",
        
          "neutral": "#1A1A1A",
          "neutral-focus": "#2E2E2E",
          "neutral-content": "#E0E0E0",
        
          "base-100": "#0A0A0A",
          "base-200": "#1A1A1A",
          "base-300": "#2E2E2E",
          "base-content": "#E0E0E0",
        
          "info": "#00BFFF",
          "success": "#00FF00",
          "warning": "#FFC107",
          "error": "#FF6347",
        
          "--rounded-box": ".75rem",
          "--rounded-btn": ".75rem",
          "--rounded-badge": ".5rem",
        
          "--animation-btn": ".25s",
          "--animation-input": ".2s",
        
          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px"
        }
      },
    ],
  },
  plugins: [daisyui],
}

