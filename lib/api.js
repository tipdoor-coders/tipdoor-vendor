// --- Login User ---
export async function loginUser(username, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();

  if (typeof window !== 'undefined') {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
  }

  return data;
}

// --- Refresh Token ---
export async function refreshToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('No refresh token found');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();
  if (data.access) localStorage.setItem('access', data.access);
  return data.access;
}

// --- Authenticated Fetch ---
export async function fetchWithAuth(endpoint, options = {}) {
  let access = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

  let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: access ? `Bearer ${access}` : '',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    // Try to refresh token
    try {
      access = await refreshToken();
      res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: access ? `Bearer ${access}` : '',
          ...options.headers,
        },
      });
    } catch {
      throw new Error('Session expired');
    }
  }

  return res.json();
}

// --- Register User ---
export async function registerUser(username, password, email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });

  if (!res.ok) throw new Error('Registration failed');
  const data = await res.json();

  if (typeof window !== 'undefined') {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
  }
  return data;
}
