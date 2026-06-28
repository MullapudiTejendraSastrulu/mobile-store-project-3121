import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMobiles, addMobile, updateMobile, deleteMobile } from '../api'
import './Main.css'

const empty = { mobileId: '', brand: '', model: '', price: '' }
const PAGE_SIZE = 20

export default function Main() {
  const navigate = useNavigate()
  const [mobiles, setMobiles] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => { fetchMobiles() }, [])

  const fetchMobiles = async () => {
    setLoading(true)
    try {
      const res = await getMobiles()
      setMobiles(res.data)
    } catch {
      setError('Failed to load mobiles.')
    } finally {
      setLoading(false)
    }
  }

  const notify = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await updateMobile(editId, form)
        notify('Mobile updated successfully!')
      } else {
        await addMobile(form)
        notify('Mobile added successfully!')
      }
      setForm(empty)
      setEditId(null)
      setShowModal(false)
      fetchMobiles()
    } catch {
      setError('Operation failed. Try again.')
    }
  }

  const handleEdit = (mobile) => {
    setForm({ mobileId: mobile.mobileId, brand: mobile.brand, model: mobile.model, price: mobile.price })
    setEditId(mobile.mobileId)
    setShowModal(true)
  }

  const handleDelete = async (mobileId) => {
    if (!window.confirm('Delete this mobile?')) return
    try {
      await deleteMobile(mobileId)
      notify('Mobile deleted.')
      fetchMobiles()
    } catch {
      setError('Delete failed.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true) }

  const filtered = mobiles.filter(m =>
    m.brand?.toLowerCase().includes(search.toLowerCase()) ||
    m.model?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }

  const brands = [...new Set(mobiles.map(m => m.brand))]
  const avgPrice = mobiles.length
    ? (mobiles.reduce((s, m) => s + parseFloat(m.price || 0), 0) / mobiles.length).toFixed(0)
    : 0

  return (
    <div className="main">
      {/* NAVBAR */}
      <nav className="main-nav">
        <div className="logo">📱 MobileStore</div>
        <div className="nav-right">
          <span className="nav-user">👤 Admin</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="main-body">
        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div>
              <div className="stat-value">{mobiles.length}</div>
              <div className="stat-label">Total Mobiles</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏷️</div>
            <div>
              <div className="stat-value">{brands.length}</div>
              <div className="stat-label">Brands</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div>
              <div className="stat-value">₹{avgPrice}</div>
              <div className="stat-label">Avg Price</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <div>
              <div className="stat-value">{filtered.length}</div>
              <div className="stat-label">Showing</div>
            </div>
          </div>
        </div>

        {/* TOAST */}
        {success && <div className="toast toast-success">✅ {success}</div>}
        {error   && <div className="toast toast-error">❌ {error}</div>}

        {/* TOOLBAR */}
        <div className="toolbar">
          <input
            className="search-input"
            placeholder="🔍 Search by brand or model..."
            value={search}
            onChange={handleSearch}
          />
          <button className="add-btn" onClick={openAdd}>+ Add Mobile</button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          {loading ? (
            <div className="table-empty"><span className="big-spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="table-empty">
              <div style={{ fontSize: '3rem' }}>📭</div>
              <p>No mobiles found</p>
            </div>
          ) : (
            <table className="mobile-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mobile ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((m, i) => (
                  <tr key={m.id}>
                    <td>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td><span className="badge">{m.mobileId}</span></td>
                    <td><strong>{m.brand}</strong></td>
                    <td>{m.model}</td>
                    <td><span className="price-tag">₹{m.price}</span></td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(m)}>✏️ Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(m.mobileId)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Previous</button>
            <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
            <span className="page-info">Page {page} of {totalPages} · {filtered.length} results</span>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '✏️ Edit Mobile' : '➕ Add Mobile'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {[
                { name: 'mobileId', label: 'Mobile ID',  placeholder: 'e.g. MOB001' },
                { name: 'brand',    label: 'Brand',      placeholder: 'e.g. Samsung' },
                { name: 'model',    label: 'Model',      placeholder: 'e.g. Galaxy S24' },
                { name: 'price',    label: 'Price (₹)',  placeholder: 'e.g. 75000' },
              ].map(f => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    name={f.name}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    disabled={editId && f.name === 'mobileId'}
                  />
                </div>
              ))}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">{editId ? 'Update' : 'Add Mobile'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
