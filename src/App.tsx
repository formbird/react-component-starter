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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React with AppContext</h1>
      
      {/* FormBird Props Demo */}
      <div className="card">
        <h3>FormBird Props</h3>
        <p><strong>Field Name:</strong> {fieldName || 'No field name'}</p>
        <p><strong>Field Value:</strong> {String(fieldValue || 'No value')}</p>
        <p><strong>Message:</strong> {message || 'No message'}</p>
        <p><strong>Document Keys:</strong> {Object.keys(document).length > 0 ? Object.keys(document).join(', ') : 'No document'}</p>
        <p><strong>Template Keys:</strong> {Object.keys(template).length > 0 ? Object.keys(template).join(', ') : 'No template'}</p>
        <p><strong>Form Parameters:</strong> {Object.keys(formParameters).length > 0 ? Object.keys(formParameters).join(', ') : 'No parameters'}</p>
        
        <button onClick={handleFieldValueChange}>
          Update Field Value
        </button>
        <button onClick={handleMessageChange}>
          {message ? 'Clear Message' : 'Set Message'}
        </button>
      </div>

      {/* App State Demo */}
      <div className="card">
        <h3>App State</h3>
        <p><strong>Theme:</strong> {theme}</p>
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
        <p><strong>Counter:</strong> {count}</p>
        
        <button onClick={toggleTheme}>
          Toggle Theme
        </button>
        <button onClick={handleLoadingToggle}>
          {isLoading ? 'Loading...' : 'Simulate Loading'}
        </button>
        <button onClick={handleErrorTest}>
          {error ? 'Clear Error' : 'Test Error'}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment Counter
        </button>
      </div>
    </>
  )
}

export default App
