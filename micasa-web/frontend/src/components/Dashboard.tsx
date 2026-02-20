import { useState, useEffect } from 'react'
import { api } from '@/services/auth'

export default function Dashboard() {
  const [homes, setHomes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddHome, setShowAddHome] = useState(false)
  const [newHomeName, setNewHomeName] = useState('')

  useEffect(() => {
    fetchHomes()
  }, [])

  const fetchHomes = async () => {
    try {
      const response = await api.get('/homes')
      setHomes(response.data.data)
    } catch (error) {
      console.error('Error fetching homes:', error)
    } finally {
      setLoading(false)
    }
  }

  const addHome = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHomeName.trim()) return

    try {
      await api.post('/homes', { name: newHomeName })
      setNewHomeName('')
      setShowAddHome(false)
      fetchHomes()
    } catch (error) {
      console.error('Error adding home:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your homes and maintenance tasks
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddHome(true)}
            className="btn-primary"
          >
            Add Home
          </button>
        </div>
      </div>

      {showAddHome && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Home</h3>
            <form onSubmit={addHome}>
              <input
                type="text"
                value={newHomeName}
                onChange={(e) => setNewHomeName(e.target.value)}
                placeholder="Home name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex space-x-3 mt-4">
                <button type="submit" className="btn-primary flex-1">
                  Add Home
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddHome(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l8 0" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No homes yet</h3>
            <p className="text-gray-500">Get started by adding your first home.</p>
          </div>
        ) : (
          homes.map((home: any) => (
            <div key={home.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{home.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Type: {home.type}</p>
                {home.address && <p>Address: {home.address}</p>}
                <div className="flex justify-between pt-2">
                  <span>Appliances: {home._count?.appliances || 0}</span>
                  <span>Tasks: {home._count?.maintenanceTasks || 0}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm">
                  Add Appliance
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
