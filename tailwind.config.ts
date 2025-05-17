
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors for our claymorphic UI
				gremio: {
					'primary': '#9b87f5',
					'secondary': '#7E69AB',
					'tertiary': '#6E59A5',
					'light': '#D6BCFA',
					'soft': '#E5DEFF',
					'blue': '#D3E4FD',
					'pink': '#FFDEE2',
					'mint': '#C7F9CC',
					'gray': '#F1F0FB',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'clay': '24px',
			},
			boxShadow: {
				'clay-sm': '6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.8)',
				'clay': '10px 10px 20px rgba(0, 0, 0, 0.07), -10px -10px 20px rgba(255, 255, 255, 0.8)',
				'clay-lg': '16px 16px 30px rgba(0, 0, 0, 0.06), -16px -16px 30px rgba(255, 255, 255, 0.8)',
				'clay-inner': 'inset 6px 6px 12px rgba(0, 0, 0, 0.05), inset -6px -6px 12px rgba(255, 255, 255, 0.8)',
				'clay-button': '4px 4px 8px rgba(0, 0, 0, 0.1)',
				'clay-pressed': 'inset 4px 4px 8px rgba(0, 0, 0, 0.15), inset -1px -1px 3px rgba(255, 255, 255, 0.3)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'clay-gradient': 'linear-gradient(145deg, #f5f2ff, #e5deff)',
				'hero-gradient': 'linear-gradient(135deg, #ebe4ff 0%, #d6bcfa 100%)',
				'card-pastel': 'linear-gradient(145deg, #f9f7ff, #ede4ff)',
				'button-gradient': 'linear-gradient(145deg, #a18ef7, #8e7ad8)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
