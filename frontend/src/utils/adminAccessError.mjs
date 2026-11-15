const unavailableMessage = 'Admin service unavailable. Ask the service owner to check Railway service status and deployment logs. Your access key was not saved.';

export async function adminAccessError(response) {
  if (response.status === 503) {
    // A proxy outage can also return 503 (often HTML). Only diagnose missing
    // auth configuration when the backend supplies its specific error code.
    let payload;
    try {
      payload = await response.json();
    } catch {
      return unavailableMessage;
    }
    if (payload?.detail?.code === 'ADMIN_AUTH_NOT_CONFIGURED') {
      return 'Admin access is disabled. Ask the service owner to configure ADMIN_ACCESS_KEY_SHA256 on the Railway backend and redeploy.';
    }
    return unavailableMessage;
  }
  if (response.status === 401 || response.status === 403) {
    return 'Access denied. Check your admin access key. If access remains blocked, ask the service owner to check the Railway access restriction.';
  }
  return unavailableMessage;
}
