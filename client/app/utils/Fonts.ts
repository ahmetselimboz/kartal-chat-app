import { Dancing_Script, Kanit, Oswald, Poppins } from 'next/font/google';

export const dancingScript = Dancing_Script({ subsets: ['latin'] });
export const oswald = Oswald({ subsets: ['latin'] });
export const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: '--font-poppins', });
export const kanit = Kanit({ subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: '--font-poppins', });
