import db from '../../../db';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';
import { or, ilike, eq,inArray } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('query');
  const query = rawQuery ? rawQuery.trim() : null;

  if (!query) {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  }

  const fuzzySearchQuery = "%" + query + "%";
  const whereClauses = [
    ilike(advocates.firstName, fuzzySearchQuery),
    ilike(advocates.lastName, fuzzySearchQuery),
    ilike(advocates.city, fuzzySearchQuery),
    ilike(advocates.degree, fuzzySearchQuery),
    inArray(advocates.specialties, [query]),
  ];

  if (!isNaN(parseInt(query))){
    whereClauses.push(eq(advocates.yearsOfExperience, parseInt(query)));
  }


  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ...whereClauses
      )
    );

  return Response.json({ data });
}
