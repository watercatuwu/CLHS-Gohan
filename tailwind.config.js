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
     }},
     {
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
      }},
      {
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
      },
    ],
  },
  plugins: [daisyui],
}

