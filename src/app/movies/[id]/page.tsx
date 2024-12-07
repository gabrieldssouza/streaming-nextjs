import { useEffect, useState } from 'react';
import Image from 'next/image';

const onemovie = () => {
    const data = ["movie1"];
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {data.map((movie: any) => (
        <div key={movie.id} className="p-4 border rounded-lg">
          <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={200} height={300} className="rounded-lg" />
          <h2 className="text-xl font-bold mt-2">{movie.title}</h2>
          <p className="text-gray-500">{movie.release_date}</p>
          <p className="mt-2">{movie.overview}</p>
        </div>
      ))}
    </div>
    )
}