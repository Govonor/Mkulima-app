// components/FloatingSearchBar.tsx
import React, { useState } from 'react';

const FloatingSearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full px-4 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default FloatingSearchBar;
