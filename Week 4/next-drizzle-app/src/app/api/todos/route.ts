// app/api/todos/route.ts
import { db } from "@/app/db/drizzle";
import { todo } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await db.select().from(todo);
  return NextResponse.json(todos);
}