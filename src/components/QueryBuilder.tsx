import React, { useState } from 'react'
import { Table, Plus, Minus } from 'lucide-react'

interface Field {
  name: string
  alias: string
  condition: string
}

interface QueryBuilderProps {
  setQuery: (query: string) => void
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ setQuery }) => {
  const [tableName, setTableName] = useState('')
  const [fields, setFields] = useState<Field[]>([{ name: '', alias: '', condition: '' }])

  const handleAddField = () => {
    setFields([...fields, { name: '', alias: '', condition: '' }])
  }

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index)
    setFields(newFields.length ? newFields : [{ name: '', alias: '', condition: '' }])
  }

  const handleFieldChange = (index: number, key: keyof Field, value: string) => {
    const newFields = [...fields]
    newFields[index][key] = value
    setFields(newFields)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fieldNames = fields
      .filter(f => f.name)
      .map(f => f.alias ? `${f.name} AS ${f.alias}` : f.name)
      .join(', ')
    const conditions = fields
      .filter(f => f.name && f.condition)
      .map(f => `${f.name} = '${f.condition}'`)
      .join(' AND ')
    const query = `SELECT ${fieldNames || '*'} FROM ${tableName}${conditions ? ` WHERE ${conditions}` : ''}`
    setQuery(query)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="tableName" className="block text-sm font-medium text-green-400 mb-1">
          Table Name
        </label>
        <div className="flex items-center">
          <Table className="mr-2 text-green-400" />
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="flex-grow shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-green-400 px-2 py-1"
            placeholder="Enter table name"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-green-400 mb-1">Fields, Aliases, and Conditions</label>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
              className="flex-grow mr-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-green-400 px-2 py-1"
              placeholder="Field name"
            />
            <input
              type="text"
              value={field.alias}
              onChange={(e) => handleFieldChange(index, 'alias', e.target.value)}
              className="flex-grow mr-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-green-400 px-2 py-1"
              placeholder="Alias (optional)"
            />
            <input
              type="text"
              value={field.condition}
              onChange={(e) => handleFieldChange(index, 'condition', e.target.value)}
              className="flex-grow shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-green-400 px-2 py-1"
              placeholder="Value (for WHERE clause)"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="ml-2 px-2 py-1 text-green-400 hover:text-green-300"
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="mt-2 flex items-center text-sm text-green-400 hover:text-green-300"
        >
          <Plus size={16} className="mr-1" /> Add Field
        </button>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Generate Query
      </button>
    </form>
  )
}

export default QueryBuilder