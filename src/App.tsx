import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppContext } from './context/AppContext'

function App() {
  const [count, setCount] = useState(0)
  const { 
    fieldValue, 
    updateFieldValue, 
    message, 
    updateMessage, 
    theme, 
    toggleTheme, 
    isLoading, 
    setLoading,
    error,
    setError,
    document,
    template,
    fieldName,
    formParameters
  } = useAppContext()

  const handleFieldValueChange = () => {
    const newValue = fieldValue === 'Hello' ? 'World' : 'Hello'
    updateFieldValue(newValue)
  }

  const handleMessageChange = () => {
    updateMessage(message ? '' : 'This is a sample message from the context!')
  }

  const handleLoadingToggle = () => {
    setLoading(!isLoading)
    // Simulate async operation
    setTimeout(() => setLoading(false), 2000)
  }

  const handleErrorTest = () => {
    if (error) {
      setError(null)
    } else {
      setError('This is a sample error message!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
                <img src={reactLogo} className="h-8 w-8 animate-spin-slow" alt="React logo" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FormBird Component</h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="text-lg">🌙</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* FormBird Props Card */}
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">FormBird Props</h2>
              <div className="flex space-x-2">
                <button onClick={handleFieldValueChange} className="btn-primary text-sm">
                  Update Field
                </button>
                <button onClick={handleMessageChange} className="btn-secondary text-sm">
                  {message ? 'Clear' : 'Set'} Message
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Field Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Field Name:</span>
                    <span className="font-medium">{fieldName || 'No field name'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Field Value:</span>
                    <span className="font-medium">{String(fieldValue || 'No value')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Message:</span>
                    <span className="font-medium max-w-xs truncate">{message || 'No message'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Data Objects</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document Keys:</span>
                    <span className="font-medium">
                      {Object.keys(document).length > 0 ? Object.keys(document).join(', ') : 'No document'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template Keys:</span>
                    <span className="font-medium">
                      {Object.keys(template).length > 0 ? Object.keys(template).join(', ') : 'No template'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Form Parameters:</span>
                    <span className="font-medium">
                      {Object.keys(formParameters).length > 0 ? Object.keys(formParameters).join(', ') : 'No parameters'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App State Card */}
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">App State</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Theme:</span>
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                  {theme}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Loading:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isLoading ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Counter:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Error State</h3>
                  <div className="text-sm">
                    {error ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 text-xs">{error}</p>
                      </div>
                    ) : (
                      <span className="text-green-600 text-xs">No errors</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button onClick={handleLoadingToggle} className="btn-primary">
                  {isLoading ? 'Loading...' : 'Simulate Loading'}
                </button>
                <button onClick={handleErrorTest} className="btn-danger">
                  {error ? 'Clear Error' : 'Test Error'}
                </button>
                <button onClick={() => setCount((count) => count + 1)} className="btn-secondary">
                  Increment Counter
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React + Vite + Tailwind CSS</p>
        </footer>
      </main>
    </div>
  )
}

export default App
