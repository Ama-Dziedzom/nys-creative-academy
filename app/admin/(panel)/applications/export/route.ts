import type { NextRequest } from 'next/server';
import { getAcademies } from '@/content';
import { csvResponse, toCsv } from '@/lib/admin/csv';
import { allApplications } from '@/lib/admin/queries';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [rows, academies] = await Promise.all([
    allApplications({
      q: params.get('q')?.trim() || undefined,
      status: params.get('status') || undefined,
      academy: params.get('academy') || undefined,
    }),
    getAcademies(),
  ]);
  const academyName = (slug: string) => academies.find((academy) => academy.slug === slug)?.name ?? slug;
  const csv = toCsv(
    ['Received', 'First name', 'Last name', 'Email', 'Phone', 'Academy', 'Track', 'Status', 'Motivation', 'Notes'],
    rows.map((row) => [
      row.createdAt,
      row.firstName,
      row.lastName,
      row.email,
      row.phone,
      academyName(row.academy),
      row.track,
      row.status,
      row.motivation,
      row.notes,
    ]),
  );
  return csvResponse(csv, 'applications');
}
