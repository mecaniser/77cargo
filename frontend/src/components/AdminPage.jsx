import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingCount: 0,
    interviewCount: 0,
    contactCount: 0
  });

  useEffect(() => {
    loadData();
  }, [activeTab, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'applications') {
        const response = await fetch('/api/applications');
        if (response.ok) {
          const data = await response.json();
          const filtered = statusFilter ? data.filter(app => app.status === statusFilter) : data;
          setApplications(filtered);
          
          // Calculate stats
          setStats({
            totalApplications: data.length,
            pendingCount: data.filter(app => app.status === 'pending').length,
            interviewCount: data.filter(app => app.status === 'interview').length,
            contactCount: stats.contactCount
          });
        }
      } else {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
          setStats(prev => ({ ...prev, contactCount: data.length }));
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        loadData();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interview: 'bg-purple-100 text-purple-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-cargo-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ clipPath: 'inset(0 0 25% 0)' }}>
                    <path d="M30 10L15 25L30 40" stroke="#C41E3A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g style={{ clipPath: 'inset(25% 0 0 0)' }}>
                    <path d="M40 10L25 25L40 40" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <span className="text-xl font-display font-bold">
                  <span className="text-cargo-red">77</span>
                  <span className="text-cargo-dark">Cargo</span>
                </span>
              </Link>
              <span className="text-cargo-gray-300">|</span>
              <span className="text-cargo-gray-500 font-medium">Admin Dashboard</span>
            </div>
            <Link to="/" className="text-cargo-gray-400 hover:text-cargo-red transition-colors text-sm">
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-cargo-gray-400 text-sm font-medium mb-1">Total Applications</div>
            <div className="text-3xl font-display font-bold text-cargo-dark">{stats.totalApplications}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-cargo-gray-400 text-sm font-medium mb-1">Pending Review</div>
            <div className="text-3xl font-display font-bold text-yellow-600">{stats.pendingCount}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-cargo-gray-400 text-sm font-medium mb-1">Interview Stage</div>
            <div className="text-3xl font-display font-bold text-blue-600">{stats.interviewCount}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-cargo-gray-400 text-sm font-medium mb-1">Contact Messages</div>
            <div className="text-3xl font-display font-bold text-cargo-red">{stats.contactCount}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-cargo-gray-100">
            <nav className="flex">
              <button 
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'applications' 
                    ? 'border-cargo-red text-cargo-red' 
                    : 'border-transparent text-cargo-gray-400 hover:text-cargo-dark'
                }`}
              >
                Job Applications
              </button>
              <button 
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'contacts' 
                    ? 'border-cargo-red text-cargo-red' 
                    : 'border-transparent text-cargo-gray-400 hover:text-cargo-dark'
                }`}
              >
                Contact Messages
              </button>
            </nav>
          </div>

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-input max-w-[200px] text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={loadData} className="btn-secondary text-sm py-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Refresh
                </button>
              </div>

              {/* Applications Table */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-cargo-red border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-cargo-gray-400">Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-cargo-gray-400">No applications found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cargo-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Experience</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-cargo-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cargo-gray-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-cargo-gray-50">
                          <td className="px-4 py-4 text-sm text-cargo-dark">
                            {app.first_name} {app.last_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-cargo-gray-600">{app.email}</td>
                          <td className="px-4 py-4 text-sm text-cargo-gray-600">{app.phone}</td>
                          <td className="px-4 py-4 text-sm text-cargo-gray-600">
                            {app.years_experience ? `${app.years_experience} years` : 'N/A'}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-cargo-gray-600">
                            {formatDate(app.created_at)}
                          </td>
                          <td className="px-4 py-4">
                            <select 
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                              className="text-xs border border-cargo-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="interview">Interview</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-cargo-red border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-cargo-gray-400">Loading messages...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-cargo-gray-400">No contact messages found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border border-cargo-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-cargo-dark">
                            {contact.first_name} {contact.last_name}
                          </h3>
                          <p className="text-sm text-cargo-gray-400">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-cargo-gray-400">{contact.phone}</p>
                          )}
                        </div>
                        <span className="text-xs text-cargo-gray-400">{formatDate(contact.created_at)}</span>
                      </div>
                      {contact.company_name && (
                        <p className="text-sm text-cargo-gray-600 mb-2">
                          <span className="font-medium">Company:</span> {contact.company_name}
                        </p>
                      )}
                      <p className="text-cargo-gray-700 whitespace-pre-line">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

