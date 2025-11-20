/**
 * Replace these endpoints and response shapes with your backend API.
 * All functions should throw on non-2xx responses with a user-friendly message.
 */

const json = (response) => {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json();
};

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ access_token: string }>}
 */
export async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return json(res);
}

/**
 * @param {string} accessToken
 * @returns {Promise<{ qrScanned: 0|1, qrLink?: string }>}
 */
export async function get2FAStatus(accessToken) {
  const res = await fetch("/api/auth/2fa/status", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return json(res);
}

/**
 * @param {string} code six-digit code
 * @param {string} accessToken
 * @returns {Promise<{ success: boolean }>}
 */
export async function verify2FA(code, accessToken) {
  const res = await fetch("/api/auth/2fa/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ code }),
  });
  return json(res);
}
