const API_BASE = "/api";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: HeadersInit = { "Content-Type": "application/json", ...options.headers };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getContent: () => request<Record<string, unknown>>("/content"),

  updateContent: (section: string, data: unknown, token: string) =>
    request<Record<string, unknown>>("/content", {
      method: "PUT",
      body: JSON.stringify({ [section]: data }),
    }, token),

  getGallery: () =>
    request<{ filename: string; url: string }[]>("/gallery"),

  uploadPhotos: async (files: File[], token: string) => {
    const form = new FormData();
    files.forEach((f) => form.append("photos", f));
    const res = await fetch(`${API_BASE}/gallery/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<{ filename: string; url: string }[]>;
  },

  deletePhoto: (filename: string, token: string) =>
    request<{ ok: boolean }>(`/gallery/${filename}`, { method: "DELETE" }, token),
};
