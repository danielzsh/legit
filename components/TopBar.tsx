import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const TopBar: React.FC = () => {
  return (
    <div className="relative flex pt-7 justify-between items-center pr-7 bg-gray-50">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-5">
        <input
          type="text"
          placeholder="Search for books..."
          className="p-2 pl-4 border border-gray-300 rounded-lg w-96 focus:outline-none"
        />
        <button className="text-gray-800 py-2 px-3 rounded bg-indigo-200 duration-300 hover:opacity-70">
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </div>

      <div className="flex space-x-6 ml-auto">
        <Link href="/profile">
          <FontAwesomeIcon icon={faUser} className="text-2xl duration duration-300 hover:opacity-70 text-gray-800" />
        </Link>
        <Link href="/settings">
          <FontAwesomeIcon icon={faCog} className="text-2xl duration duratino-300 hover:opacity-70 text-gray-800" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
