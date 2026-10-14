import { csvResponse, toCsv } from '@/lib/admin/csv';
import { listSubscribers } from '@/lib/admin/queries';

export async function GET() {
  const rows = await listSubscribers();
  return csvResponse(toCsv(['Email', 'Signed up'], rows.map((row) => [row.email, row.createdAt])), 'subscribers');
}
