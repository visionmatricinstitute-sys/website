import { createClient } from "@/lib/supabase/server"

// Logs an admin action for the audit trail. Never throws — a logging failure must not
// break the primary action it's recording (e.g. deleting a quiz should still succeed
// even if the audit_log insert fails for some reason).
export async function logAudit(params: {
  actorId: string
  action: string
  entityType: string
  entityId?: string
  metadata?: Record<string, unknown>
}) {
  try {
    const supabase = await createClient()
    await supabase.from("audit_log").insert({
      actor_id: params.actorId,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId ?? null,
      metadata: params.metadata ?? null,
    })
  } catch {
    // Swallow — see comment above.
  }
}
