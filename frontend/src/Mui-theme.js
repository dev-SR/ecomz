import { useState } from 'react';

const themeObj = {
   palette: {
      type: 'light',
      primary: {
         main: '#4a148c',
         light: '#3c44b126'
      },
      secondary: {
         main: '#ff4081',
         light: '#f8324526'
      }
   },

   typography: {
      fontFamily: 'Nunito',
      basic: {
         fontFamily: 'Nunito'
      }
   },
   props: {
      MuiIconButton: {
         disableRipple: true
      }
   },
   overrides: {
      MuiAppBar: {
         root: {
            transform: 'translateZ(0)'
         }
      }
   }

   // Style sheet name ⚛️
   // MuiInputBase: {
   //    // Name of the rule
   //    input: {
   //       // Some CSS
   //       // color: 'white'
   //    }
   // },
   // MuiOutlinedInput: {
   //    // Name of the rule
   //    root: {
   //       // Some CSS
   //       '& fieldset': {
   //          borderColor: '#e8eaf6',
   //          borderWidth: '2px'
   //       },
   //       '&:hover .MuiOutlinedInput-notchedOutline': {
   //          borderColor: '#fff59d'
   //       },
   //       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
   //          borderColor: '#d81b60'
   //       }
   //    }
   // },
   // MuiInputLabel: {
   //    // Name of the rule
   //    root: {
   //       // Some CSS
   //       color: 'white'
   //    }
   // },
   // MuiFormLabel: {
   //    root: {
   //       '&.Mui-focused': {
   //          color: 'white'
   //       }
   //    }
   // },
   // MuiCheckbox: {
   //    // Name of the rule
   //    root: {
   //       color: '#d81b60'
   //    },
   //    colorPrimary: {
   //       '&.Mui-checked': {
   //          color: '#d81b60'
   //       }
   //    }
   // }
};

const useToggleTheme = () => {
   const [theme, setTheme] = useState(themeObj);
   const {
      palette: { type }
   } = theme;
   const [mode, setMode] = useState('dark');

   const toggleTheme = () => {
      const updatedTheme = {
         ...theme,
         palette: {
            ...theme.palette,
            type: type === 'light' ? 'dark' : 'light'
         },
         overrides:
            type === 'light'
               ? {
                    MuiCssBaseline: {
                       '@global': {
                          body: {
                             backgroundColor: '#212121'
                          }
                       }
                    }
                 }
               : ''
      };
      setTheme(updatedTheme);
      setMode(mode === 'dark' ? 'light' : 'dark');
   };
   return [theme, mode, toggleTheme];
};

export default useToggleTheme;
