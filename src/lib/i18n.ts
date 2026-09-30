export const locales = ['bs', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'bs'
export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l)
