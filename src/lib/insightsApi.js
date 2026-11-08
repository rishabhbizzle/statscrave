// Fetch helpers for the backend's precomputed insights / milestones.
// Return null (single) or [] (lists) on any failure so pages degrade quietly.

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
const REVALIDATE = 3600;

async function getJson(path, init) {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: REVALIDATE }, ...init });
    if (!res.ok) return { ok: false, status: res.status, data: null };
    const body = await res.json();
    return { ok: true, status: res.status, data: body?.data ?? null };
  } catch (error) {
    return { ok: false, status: 0, data: null };
  }
}

export async function fetchInsight(type, id, init) {
  const r = await getJson(`/insights/${type}/${encodeURIComponent(id)}`, init);
  return r.ok ? r.data : null;
}

export async function fetchMilestones(kind, params = {}, init) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== "")).toString();
  const r = await getJson(`/milestones/${kind}${qs ? `?${qs}` : ""}`, init);
  return r.ok && Array.isArray(r.data) ? r.data : [];
}

// Generic GET for the other insight-backed lists (debuts, releases, ...).
export async function fetchList(path, params = {}, init) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== "")).toString();
  const r = await getJson(`${path}${qs ? `?${qs}` : ""}`, init);
  return r.ok && Array.isArray(r.data) ? r.data : [];
}
