import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssTypography from '@tailwindcss/typography'
import { animation, boxShadow, colors, fontFamily, keyframes } from './src/theme'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: colors,
            animation: animation,
            fontFamily: fontFamily,
            keyframes: keyframes,
            boxShadow: boxShadow,
        },
    },
    plugins: [tailwindcssAnimate, tailwindcssTypography()],
} satisfies Config
