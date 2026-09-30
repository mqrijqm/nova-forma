export const locales = ['en', 'bs'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l)
