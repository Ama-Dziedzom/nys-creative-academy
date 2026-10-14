import type { Metadata } from 'next';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Footer } from '@/components/Footer';
import { HeadingText } from '@/components/Lines';
import { getAcademies, getApplyPage, getSiteSettings } from '@/content';

export const metadata: Metadata = { title: 'Apply' };

export default async function ApplyPage() {
  const [content, academies, settings] = await Promise.all([getApplyPage(), getAcademies(), getSiteSettings()]);
  return (
    <>
      <main className="apply-page">
        <h2>
          <HeadingText heading={content.title} />
        </h2>
        <p className="prose">{content.intro}</p>
        <ApplicationForm academies={academies} content={content} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
