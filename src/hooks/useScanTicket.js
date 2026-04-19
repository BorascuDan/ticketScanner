const API_URL = import.meta.env.VITE_API_URL

export async function scanTicket(id) {
  const res = await fetch(`${API_URL}/${id}/scan`)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const message = body?.message ?? `Server responded with ${res.status}`
    throw new Error(message)
  }

  return res.json()
}
