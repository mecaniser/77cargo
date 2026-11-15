import { useEffect, useRef, useState } from 'react';
import AdminPage from './AdminPage';

export default function AdminAccess() {
  const [key, setKey] = useState('');
  const [authorized, setAuthorized] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const attempt = useRef(0);

  const signIn = async (event) => {
    event.preventDefault();
    const current = ++attempt.current;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/admin/session', {
        headers: { Authorization: `Bearer ${key}` },
        cache: 'no-store',
        credentials: 'omit',
      });
      if (current !== attempt.current) return;
      if (response.ok) {
        setAuthorized(key);
        setKey('');
      } else if (response.status === 503) {
        setError('Admin access is disabled. Ask the service owner to configure ADMIN_ACCESS_KEY_SHA256 on the Railway backend and redeploy.');
      } else if (response.status === 401 || response.status === 403) {
        setError('Access denied. Check your admin access key. If access remains blocked, ask the service owner to check the Railway access restriction.');
      } else {
        setError('Admin service unavailable. Ask the service owner to check Railway service status and deployment logs. Your access key was not saved.');
      }
    } catch {
      if (current === attempt.current) setError('Cannot reach the admin service. Check your connection, then ask the service owner to check Railway service status.');
    } finally {
      if (current === attempt.current) setBusy(false);
    }
  };

  const signOut = (message = '') => {
    ++attempt.current;
    setAuthorized('');
    setKey('');
    setError(message);
    setBusy(false);
  };

  useEffect(() => {
    if (!authorized) return;
    const expire = () => signOut('Admin session ended. Sign in again to continue.');
    const timer = setTimeout(expire, 15 * 60 * 1000);
    const restored = (event) => { if (event.persisted) expire(); };
    window.addEventListener('pageshow', restored);
    window.addEventListener('pagehide', expire);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', restored);
      window.removeEventListener('pagehide', expire);
    };
  }, [authorized]);

  // A new mount removes all private records on logout, expiry or navigation.
  if (authorized) return <AdminPage accessKey={authorized} onSignOut={signOut} />;

  return (
    <main className="min-h-screen bg-cargo-gray-50 flex items-center justify-center px-4">
      <form onSubmit={signIn} className="bg-white rounded-xl shadow-sm p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">77 Cargo admin sign-in</h1>
        <p className="mb-4">Use the admin access key provided by the service owner. It stays in memory only. Reloading or leaving this page signs you out.</p>
        <label htmlFor="admin-key" className="block mb-2">Admin access key</label>
        <input id="admin-key" type="password" required autoComplete="off"
          value={key} onChange={(event) => setKey(event.target.value)}
          disabled={busy} className="form-input w-full mb-4" />
        {error && <p role="alert" className="text-cargo-red mb-4">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Checking access…' : 'Sign in'}
        </button>
        <a href="/" className="block mt-4">Back to website</a>
      </form>
    </main>
  );
}
