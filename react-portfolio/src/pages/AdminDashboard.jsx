import React, { useState, useContext } from 'react';
import { adminAction } from '../api';
import { DataContext } from '../context/DataContext';
import { LogIn, Save, Plus, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { data, reloadData } = useContext(DataContext);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State for forms
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  // When tab changes, reset form states
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage('');
    setEditingItem(null);
    setFormData({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await adminAction('authenticate', password, 'Profile');
      setIsAuthenticated(true);
    } catch (err) {
      setMessage('Authentication failed. Check your password.');
    }
    setLoading(false);
  };

  const handleUpdate = async (sheetName, payload) => {
    setLoading(true);
    setMessage('');
    try {
      await adminAction('update', password, sheetName, payload);
      setMessage('Update successful!');
      reloadData();
    } catch (err) {
      setMessage('Update failed: ' + err.message);
    }
    setLoading(false);
  };

  const handleAdd = async (sheetName, payload) => {
    setLoading(true);
    setMessage('');
    try {
      await adminAction('add', password, sheetName, payload);
      setMessage('Added successfully!');
      reloadData();
    } catch (err) {
      setMessage('Add failed: ' + err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (sheetName, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setLoading(true);
    setMessage('');
    try {
      await adminAction('delete', password, sheetName, { id });
      setMessage('Deleted successfully!');
      reloadData();
    } catch (err) {
      setMessage('Delete failed: ' + err.message);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#081b29', color: '#fff' }}>
        <form onSubmit={handleLogin} style={{ background: '#112e42', padding: '30px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '10px', background: '#00eeff', color: '#081b29', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            {loading ? 'Authenticating...' : <><LogIn size={18} /> Login</>}
          </button>
          {message && <p style={{ color: 'red', fontSize: '14px' }}>{message}</p>}
        </form>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === 'Profile' || activeTab === 'About') {
      const defaultProfile = { name: '', role: '', description: '', imageURL: '', github: '', linkedin: '', email: '', phone: '', instagram: '', whatsapp: '' };
      const defaultAbout = { heading: '', description: '', resumeURL: '' };
      const defaults = activeTab === 'Profile' ? defaultProfile : defaultAbout;
      
      const currentData = data[activeTab.toLowerCase()]?.[0] || defaults;
      // We use currentData as default if formData is empty
      const activeData = Object.keys(formData).length > 0 ? formData : { ...defaults, ...currentData };

      const handleChange = (e) => setFormData({ ...activeData, [e.target.name]: e.target.value });

      return (
        <div style={{ padding: '20px', background: '#112e42', borderRadius: '10px', marginTop: '20px' }}>
          <h3>Edit {activeTab}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {Object.keys(activeData).map((key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ textTransform: 'capitalize' }}>{key}</label>
                {key === 'description' ? (
                  <textarea name={key} value={activeData[key] || ''} onChange={handleChange} rows={4} style={{ padding: '10px' }} />
                ) : (
                  <input type="text" name={key} value={activeData[key] || ''} onChange={handleChange} style={{ padding: '10px' }} />
                )}
              </div>
            ))}
            <button onClick={() => handleUpdate(activeTab, activeData)} style={{ padding: '10px', background: '#00eeff', color: '#081b29', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      );
    } else {
      // List view for Experience, Skills, Projects, Services
      const listData = data[activeTab.toLowerCase()] || [];
      const defaultItemKeys = {
        'Experience': { id: '', title: '', company: '', period: '', description: '' },
        'Skills': { id: '', name: '', percentage: '', icon: '', category: '' },
        'Projects': { id: '', title: '', description: '', imageURL: '', liveLink: '', githubLink: '' },
        'Services': { id: '', title: '', description: '', icon: '' }
      };

      const handleEditItemChange = (e) => {
        setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
      };

      if (editingItem) {
        return (
          <div style={{ padding: '20px', background: '#112e42', borderRadius: '10px', marginTop: '20px' }}>
            <h3>{editingItem.isNew ? 'Add New' : 'Edit'} {activeTab}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              {Object.keys(defaultItemKeys[activeTab]).map((key) => {
                if (key === 'isNew') return null;
                return (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ textTransform: 'capitalize' }}>{key}</label>
                    {key === 'description' ? (
                      <textarea name={key} value={editingItem[key] || ''} onChange={handleEditItemChange} rows={4} style={{ padding: '10px' }} />
                    ) : (
                      <input type="text" name={key} value={editingItem[key] || ''} onChange={handleEditItemChange} style={{ padding: '10px' }} />
                    )}
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => {
                  if (editingItem.isNew) {
                    handleAdd(activeTab, editingItem);
                  } else {
                    handleUpdate(activeTab, editingItem);
                  }
                  setEditingItem(null);
                }} style={{ padding: '10px', background: '#00eeff', color: '#081b29', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Save size={18} /> Save
                </button>
                <button onClick={() => setEditingItem(null)} style={{ padding: '10px', background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Manage {activeTab}</h3>
            <button onClick={() => {
                setEditingItem({ ...defaultItemKeys[activeTab], id: Date.now().toString(), isNew: true });
              }} 
              style={{ padding: '8px 15px', background: '#00eeff', color: '#081b29', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Plus size={18} /> Add New
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {listData.map((item) => (
              <div key={item.id} style={{ background: '#112e42', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.title || item.name}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#ccc' }}>ID: {item.id}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => {
                    setEditingItem(item);
                  }} style={{ padding: '8px', background: '#4db33d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(activeTab, item.id)} style={{ padding: '8px', background: '#cc0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
            {listData.length === 0 && <p>No items found.</p>}
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#081b29', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #112e42', paddingBottom: '20px' }}>
        <h1 style={{ color: '#00eeff' }}>Portfolio Admin Dashboard</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </header>
      
      {message && (
        <div style={{ background: message.includes('failed') ? '#cc0000' : '#4db33d', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', marginTop: '20px', gap: '30px' }}>
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['Profile', 'About', 'Experience', 'Skills', 'Projects', 'Services'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => handleTabChange(tab)}
              style={{ 
                padding: '10px', 
                background: activeTab === tab ? '#00eeff' : '#112e42', 
                color: activeTab === tab ? '#081b29' : '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
