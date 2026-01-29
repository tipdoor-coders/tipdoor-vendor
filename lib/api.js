// --- Login User ---
export async function loginUser(username, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh/`, {
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
  let access =
    typeof window !== 'undefined'
      ? localStorage.getItem('access')
      : null;

  const makeRequest = async (token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  };

  let res = await makeRequest(access);
  if (res.status === 401) {
    try {
      access = await refreshToken();
      res = await makeRequest(access);
    } catch {
      localStorage.removeItem('access');

      const error = new Error('Session expired');
      error.status = 401;
      throw error;
    }
  }

  if (!res.ok) {
    let errorBody = null;
    try {
      errorBody = await res.json();
    } catch { }

    const error = new Error(
      errorBody?.detail || 'Request failed'
    );
    error.status = res.status;
    error.body = errorBody;
    throw error;
  }
  return res.json();
}

// --- Register User ---
export async function registerUser(username, password, email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/`, {
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
