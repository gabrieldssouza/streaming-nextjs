import { useState, useEffect } from 'react';
import Image from 'next/image';

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    onSearch(searchQuery.trim());
  }, [searchQuery, onSearch]);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container-md mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Image src="/saveemovies.png" alt="Savee Movies" width={200} height={100} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search movies..."
              className="px-4 py-2 rounded-l bg-zinc-900 text-white focus:outline-none"
            />
          </div>
          <div className="flex md:hidden">
            {showInput ? (
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-l bg-zinc-900 text-white focus:outline-none"
              />
            ) : (
              <button onClick={toggleInput} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;