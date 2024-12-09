import { useState, useEffect } from 'react';
import Image from 'next/image';

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    onSearch(searchQuery.trim());
  }, [searchQuery, onSearch]);

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container-md mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Image src="/saveemovies.png" alt="Savee Movies" width={200} height={100} />
        </div>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search movies..."
            className="px-4 py-2 rounded-l bg-zinc-900 text-white focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;