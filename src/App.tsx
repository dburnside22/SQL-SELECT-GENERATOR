import React, { useState } from "react";
import { Database } from "lucide-react";
import QueryBuilder from "./components/QueryBuilder";
import QueryResult from "./components/QueryResult";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      <h1 className="flex items-center mb-6 text-4xl font-bold text-green-400">
        <Database className="mr-2" /> SQL SELECT GENERATOR!
      </h1>
      <div className="w-full max-w-4xl p-6 bg-gray-900 border border-green-500 rounded-lg shadow-lg">
        <QueryBuilder setQuery={setQuery} />
        <QueryResult query={query} />
      </div>
    </div>
  );
}

export default App;
