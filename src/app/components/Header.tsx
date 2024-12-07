import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Streaming NextJS</h1>
        </div>
        <nav className="flex space-x-4">
          <a href="/" className="hover:text-gray-400 transition">Home</a>
          <a href="/movies" className="hover:text-gray-400 transition">Movies</a>
          <a href="/series" className="hover:text-gray-400 transition">Series</a>
          <a href="/about" className="hover:text-gray-400 transition">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;