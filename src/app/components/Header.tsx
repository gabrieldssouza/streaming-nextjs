import { useState } from 'react';
import Image from 'next/image';

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim());
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Image src="/saveemovies.png" alt="Savee Movies" width={200} height={100} />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search movies and series..."
            className="px-4 py-2 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;