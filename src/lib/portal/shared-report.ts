import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/server";
import type { SharedReport } from "@/lib/portal/report";

// Request-scoped memoization shares the access check between metadata and page.
export const getSharedReport = cache(async (shareToken: string): Promise<SharedReport | null> => {
  const { data, error } = await createPublicClient().rpc("fetch_shared_report", {
    p_token: shareToken,
  });
  return error ? null : data as SharedReport | null;
});
