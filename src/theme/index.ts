import { responsiveFontSizes } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { light, dark } from './palette';
import { Theme } from '@material-ui/core/styles/createTheme';

/**
 * For customizing theme, modifying CustomTheme
 */
const customTheme: CustomTheme = {
  customPalette: {
    primary: {
      mortgage: '#156EFA',
      mortgageAlter: '#927F64',
      bridge: '#28514D',
      rental: '#53269B',
      jumbo: '#5D4D60',
    },
    formBorder: {
      mortgage:
        'linear-gradient(98.19deg, rgba(5, 18, 41, .3), rgba(21, 110, 250, .3))',
      mortgageAlter:
        'linear-gradient(293.09deg, rgba(158, 141, 117, .3), rgba(33, 34, 35, .3))',
      bridge:
        'linear-gradient(284.86deg, rgba(40, 81, 77, .3), rgba(3, 40, 36, .3))',
      rental:
        'linear-gradient(293.09deg, rgba(83, 38, 155, .3), rgba(24, 7, 51, .3))',
      jumbo:
        'linear-gradient(293.09deg, rgba(83, 38, 155, .3), rgba(24, 7, 51, .3))',
    },
    selectorBg: {
      mortgage: '#EDF4FF',
      mortgageAlter: '#EDEBEA',
      bridge: '#F5FBF4',
      rental: '#F9F5FF',
      jumbo: 'rgba(135, 129, 136, .2)',
    },
    confirmBtn: {
      bg: {
        mortgage: 'linear-gradient(98.19deg, #051229 -16.09%, #156EFA 100%);',
        mortgageAlter:
          'linear-gradient(293.09deg, #9E8D75 11.97%, #212223 112.88%);',
        bridge: 'linear-gradient(284.86deg, #28514D -3.1%, #032824 84.9%);',
        rental: 'linear-gradient(293.09deg, #53269B 11.97%, #180733 112.88%);',
        jumbo: 'linear-gradient(286.26deg, #5D4D60 29.15%, #252D3E 158.46%);',
      },
      boxShadow: {
        mortgage:
          '1px 1px 2px rgba(23, 26, 31, 0.5), -1px -1px 2px rgba(240, 245, 254, 0.1);',
        mortgageAlter:
          '1px 1px 2px rgba(23, 26, 31, 0.5), -1px -1px 2px rgba(240, 245, 254, 0.1);',
        bridge:
          '1px 1px 2px rgba(23, 26, 31, 0.5), -1px -1px 2px rgba(240, 245, 254, 0.1);',
        rental:
          '1px 1px 2px rgba(23, 26, 31, 0.5), -1px -1px 2px rgba(240, 245, 254, 0.1);',
        jumbo:
          '1px 1px 2px rgba(23, 26, 31, 0.5), -1px -1px 2px rgba(240, 245, 254, 0.1);',
      },
    },
  },
};

interface CustomTheme {
  customPalette: {
    primary: {
      mortgage: string;
      mortgageAlter: string;
      bridge: string;
      rental: string;
      jumbo: string;
    };
    formBorder: {
      mortgage: string;
      mortgageAlter: string;
      bridge: string;
      rental: string;
      jumbo: string;
    };
    selectorBg: {
      mortgage: string;
      mortgageAlter: string;
      bridge: string;
      rental: string;
      jumbo: string;
    };
    confirmBtn: {
      bg: {
        mortgage: string;
        mortgageAlter: string;
        bridge: string;
        rental: string;
        jumbo: string;
      };
      boxShadow: {
        mortgage: string;
        mortgageAlter: string;
        bridge: string;
        rental: string;
        jumbo: string;
      };
    };
  };
}


export type GlobalTheme = Theme & CustomTheme;

export type ThemeMode = 'light' | 'dark';

/**
 * getThem is a function () => GlobalTheme
 * @param mode 
 */
const getTheme: (mode: ThemeMode) => GlobalTheme = mode => {
  return {
    ...responsiveFontSizes({
      ...createTheme({
        palette: mode === 'light' ? light : dark,
        typography: {
          fontFamily: 'Montserrat',
          h3: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: '3rem',
            lineHeight: 1.5,
          },
          h5: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            lineHeight: 1.5,
          },
          subtitle1: {
            fontSize: '1.5rem',
            lineHeight: 1.7,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
          },
          body2: {
            fontSize: '.875rem',
            lineHeight: 1.5,
          },
        },
        zIndex: {
          appBar: 1200,
          drawer: 1100,
        },
      }),
    }),
    ...customTheme,
  };
};

export default getTheme;
