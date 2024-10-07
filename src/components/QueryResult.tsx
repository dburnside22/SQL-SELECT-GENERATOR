import React from 'react'
import { Code } from 'lucide-react'

interface QueryResultProps {
  query: string
}

const QueryResult: React.FC<QueryResultProps> = ({ query }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md border border-green-500">
      <h2 className="text-lg font-semibold mb-2 flex items-center text-green-400">
        <Code className="mr-2" /> Generated SQL Query
      </h2>
      <pre className="bg-black p-3 rounded-md overflow-x-auto border border-green-500">
        <code className="text-sm text-green-400">{query || 'Your query will appear here'}</code>
      </pre>
    </div>
  )
}

export default QueryResult