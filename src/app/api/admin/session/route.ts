import { NextResponse } from "next/server";
import { adminConfigured, isAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    authenticated: await isAuthenticated(),
    configured: adminConfigured(),
  });
}
