export const fontFamily = {
    primary: ['Raleway', 'sans-serif'],
    body: ['Catamaran', 'sans-serif'],
}

export const colors = {
    divider: 'rgba(var(--divider))',
    background: 'hsl(var(--background), <alpha-value>)',
    foreground: 'hsl(var(--foreground), <alpha-value>)',

    default: {
        DEFAULT: 'hsl(var(--background), <alpha-value>)',
        50: 'hsl(var(--default-50), <alpha-value>)',
        100: 'hsl(var(--default-100), <alpha-value>)',
        200: 'hsl(var(--default-200), <alpha-value>)',
        300: 'hsl(var(--default-300), <alpha-value>)',
        400: 'hsl(var(--default-400), <alpha-value>)',
        500: 'hsl(var(--default-500), <alpha-value>)',
        600: 'hsl(var(--default-600), <alpha-value>)',
        700: 'hsl(var(--default-700), <alpha-value>)',
        800: 'hsl(var(--default-800), <alpha-value>)',
        900: 'hsl(var(--default-900), <alpha-value>)',
        hover: 'hsl(var(--default-hover), <alpha-value>)',
        active: 'hsl(var(--default-active), <alpha-value>)',
        foreground: 'hsl(var(--default-foreground), <alpha-value>)',
    },

    primary: {
        DEFAULT: 'hsl(var(--primary), <alpha-value>)',
        50: 'hsl(var(--primary-50), <alpha-value>)',
        100: 'hsl(var(--primary-100), <alpha-value>)',
        200: 'hsl(var(--primary-200), <alpha-value>)',
        300: 'hsl(var(--primary-300), <alpha-value>)',
        400: 'hsl(var(--primary-400), <alpha-value>)',
        500: 'hsl(var(--primary-500), <alpha-value>)',
        600: 'hsl(var(--primary-600), <alpha-value>)',
        700: 'hsl(var(--primary-700), <alpha-value>)',
        800: 'hsl(var(--primary-800), <alpha-value>)',
        900: 'hsl(var(--primary-900), <alpha-value>)',
        hover: 'hsl(var(--primary-hover), <alpha-value>)',
        active: 'hsl(var(--primary-active), <alpha-value>)',
        foreground: 'hsl(var(--primary-foreground), <alpha-value>)',
    },

    secondary: {
        DEFAULT: 'hsl(var(--secondary), <alpha-value>)',
        50: 'hsl(var(--secondary-50), <alpha-value>)',
        100: 'hsl(var(--secondary-100), <alpha-value>)',
        200: 'hsl(var(--secondary-200), <alpha-value>)',
        300: 'hsl(var(--secondary-300), <alpha-value>)',
        400: 'hsl(var(--secondary-400), <alpha-value>)',
        500: 'hsl(var(--secondary-500), <alpha-value>)',
        600: 'hsl(var(--secondary-600), <alpha-value>)',
        700: 'hsl(var(--secondary-700), <alpha-value>)',
        800: 'hsl(var(--secondary-800), <alpha-value>)',
        900: 'hsl(var(--secondary-900), <alpha-value>)',
        hover: 'hsl(var(--secondary-hover), <alpha-value>)',
        active: 'hsl(var(--secondary-active), <alpha-value>)',
        foreground: 'hsl(var(--secondary-foreground), <alpha-value>)',
    },

    danger: {
        DEFAULT: 'hsl(var(--danger), <alpha-value>)',
        50: 'hsl(var(--danger-50), <alpha-value>)',
        100: 'hsl(var(--danger-100), <alpha-value>)',
        200: 'hsl(var(--danger-200), <alpha-value>)',
        300: 'hsl(var(--danger-300), <alpha-value>)',
        400: 'hsl(var(--danger-400), <alpha-value>)',
        500: 'hsl(var(--danger-500), <alpha-value>)',
        600: 'hsl(var(--danger-600), <alpha-value>)',
        700: 'hsl(var(--danger-700), <alpha-value>)',
        800: 'hsl(var(--danger-800), <alpha-value>)',
        900: 'hsl(var(--danger-900), <alpha-value>)',
        hover: 'hsl(var(--danger-hover), <alpha-value>)',
        active: 'hsl(var(--danger-active), <alpha-value>)',
        foreground: 'hsl(var(--danger-foreground), <alpha-value>)',
    },
    success: {
        DEFAULT: 'hsl(var(--success), <alpha-value>)',
        50: 'hsl(var(--success-50), <alpha-value>)',
        100: 'hsl(var(--success-100), <alpha-value>)',
        200: 'hsl(var(--success-200), <alpha-value>)',
        300: 'hsl(var(--success-300), <alpha-value>)',
        400: 'hsl(var(--success-400), <alpha-value>)',
        500: 'hsl(var(--success-500), <alpha-value>)',
        600: 'hsl(var(--success-600), <alpha-value>)',
        700: 'hsl(var(--success-700), <alpha-value>)',
        800: 'hsl(var(--success-800), <alpha-value>)',
        900: 'hsl(var(--success-900), <alpha-value>)',
        hover: 'hsl(var(--success-hover), <alpha-value>)',
        active: 'hsl(var(--success-active), <alpha-value>)',
        foreground: 'hsl(var(--success-foreground), <alpha-value>)',
    },
    warning: {
        DEFAULT: 'hsl(var(--warning), <alpha-value>)',
        50: 'hsl(var(--warning-50), <alpha-value>)',
        100: 'hsl(var(--warning-100), <alpha-value>)',
        200: 'hsl(var(--warning-200), <alpha-value>)',
        300: 'hsl(var(--warning-300), <alpha-value>)',
        400: 'hsl(var(--warning-400), <alpha-value>)',
        500: 'hsl(var(--warning-500), <alpha-value>)',
        600: 'hsl(var(--warning-600), <alpha-value>)',
        700: 'hsl(var(--warning-700), <alpha-value>)',
        800: 'hsl(var(--warning-800), <alpha-value>)',
        900: 'hsl(var(--warning-900), <alpha-value>)',
        hover: 'hsl(var(--warning-hover), <alpha-value>)',
        active: 'hsl(var(--warning-active), <alpha-value>)',
        foreground: 'hsl(var(--warning-foreground), <alpha-value>)',
    },

    info: {
        DEFAULT: 'hsl(var(--info), <alpha-value>)',
        50: 'hsl(var(--info-50), <alpha-value>)',
        100: 'hsl(var(--info-100), <alpha-value>)',
        200: 'hsl(var(--info-200), <alpha-value>)',
        300: 'hsl(var(--info-300), <alpha-value>)',
        400: 'hsl(var(--info-400), <alpha-value>)',
        500: 'hsl(var(--info-500), <alpha-value>)',
        600: 'hsl(var(--info-600), <alpha-value>)',
        700: 'hsl(var(--info-700), <alpha-value>)',
        800: 'hsl(var(--info-800), <alpha-value>)',
        900: 'hsl(var(--info-900), <alpha-value>)',
        hover: 'hsl(var(--info), <alpha-value>)',
        active: 'hsl(var(--info), <alpha-value>)',
        foreground: 'hsl(var(--info-foreground), <alpha-value>)',
    },
}

export const boxShadow = {
    small: '0px 0px 5px 0px rgb(var(--shadow-color-1)), 0px 2px 10px 0px rgb(var(--shadow-color-2)), inset 0px 0px 1px 0px rgb(var(--shadow-color-3))',
    medium: '0px 0px 15px 0px rgb(--shadow-color-4)), 0px 2px 30px 0px rgb(--shadow-color-5)), inset 0px 0px 1px 0px rgb(--shadow-color-6))',
    large: '0px 0px 30px 0px rgb(--shadow-color-7)), 0px 30px 60px 0px rgb(--shadow-color-8)), inset 0px 0px 1px 0px rgb(--shadow-color-9))',
}

export const animation = {
    ripple: 'ripple-effect 0.6s ease-out',
    meteor: 'meteor-effect 10s linear infinite',
    marquee: 'marquee-effect 40s var(--_animation-direction, forwards) linear infinite',
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'circle-grow': 'circle-grow 0.7s ease-in-out',
}

export const keyframes = {
    'marquee-effect': {
        to: {
            transform: 'translate(calc(-50% - 0.5rem))',
        },
    },
    'ripple-effect': {
        '0%': { transform: 'scale(0)', opacity: '1' },
        '90%': { transform: 'scale(4)', opacity: '0' },
        '100%': { transform: 'scale(0)', opacity: '0' },
    },
    'meteor-effect': {
        '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
        '70%': { opacity: '1' },
        '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
        },
    },
    'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
    },
    'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
    },

    'circle-grow': {
        '0%': { 'clip-path': 'circle(0% at 50% 0%)' },

        '100%': { 'clip-path': 'circle(150% at 50% 0%)' },
    },
}
