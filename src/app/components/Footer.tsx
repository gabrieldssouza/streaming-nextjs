import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="container flex flex-col items-center justify-center p-4 bg-black text-white md:flex-row md:justify-around">
            <div className="mb-4 md:mb-0">
            <Image src="/saveemovies.png" alt="SaveeMovies Logo" width={150} height={50} />
            </div>
            <div>
            <p>© Todos os direitos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;
