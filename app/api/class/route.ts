import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const className = await db.class.findMany({
    include: {
      teacher: true,
    },
  });


  return NextResponse.json(className);
}
