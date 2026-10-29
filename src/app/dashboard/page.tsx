import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Project dashboard",
  description: "Private dashboard for managing portfolio projects.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
