import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { User } from '../types/user'

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isActive: true
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get<User[]>('/users')
      setUsers(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData)
      } else {
        await api.post('/users', formData)
      }
      resetForm()
      fetchUsers()
    } catch (err) {
      setError('Failed to save user')
      console.error('Error saving user:', err)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`)
        fetchUsers()
      } catch (err) {
        setError('Failed to delete user')
        console.error('Error deleting user:', err)
      }
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      isActive: true
    })
    setEditingUser(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div>
      <h1>Users Management</h1>
      
      {error && <div className="error">{error}</div>}

      <button 
        className="btn btn-primary" 
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: '1rem' }}
      >
        {showForm ? 'Cancel' : 'Add New User'}
      </button>

      {showForm && (
        <div className="card">
          <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                {' '}Active
              </label>
            </div>
            <button type="submit" className="btn btn-success">
              {editingUser ? 'Update' : 'Create'}
            </button>
            {editingUser && (
              <button 
                type="button" 
                className="btn" 
                onClick={resetForm}
                style={{ marginLeft: '0.5rem' }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      <div className="user-list">
        {users.length === 0 ? (
          <div className="card">No users found. Add one to get started!</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                <small>Status: {user.isActive ? '✓ Active' : '✗ Inactive'}</small>
              </div>
              <div className="user-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Users
