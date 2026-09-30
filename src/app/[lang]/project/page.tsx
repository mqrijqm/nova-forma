import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import { projects } from '@/content/projects'
import Archive from '@/components/archive/Archive'
import LangPill from '@/components/LangPill'

export const metadata: Metadata = { title: 'Project' }

export default async function ProjectArchive({ params }: PageProps<'/[lang]/project'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)
  return (
    <>
      <LangPill lang={lang} />
      <h1 className="sr-only">{t.nav.project}</h1>
      <Archive items={projects} lang={lang} t={t} />
    </>
  )
}
