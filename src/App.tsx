import React, { useState } from 'react'
import { Database } from 'lucide-react'
import QueryBuilder from './components/QueryBuilder'
import QueryResult from './components/QueryResult'

function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 flex items-center text-green-400">
        <Database className="mr-2" /> SQL SELECT GENERATOR
      </h1>
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500">
        <QueryBuilder setQuery={setQuery} />
        <QueryResult query={query} />
      </div>
    </div>
  )
}

export default App