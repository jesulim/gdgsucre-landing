'use client';
import { useState, useEffect } from 'react';
import BandEnvironment from './BandEnvironment';
import { dummyUsers, getRandomUser } from '../utils/dummyData';


// todo esto es obra de claude, lo dejo para ayudarte con el debug
export default function DemoBandEnvironment() {
  const [currentUser, setCurrentUser] = useState(dummyUsers[0]);
  const [debugInfo, setDebugInfo] = useState({
    texturesLoaded: false,
    errors: []
  });

  useEffect(() => {
    // Check if the card textures are available
    const checkTextures = async () => {
      try {
        const frontResponse = await fetch('/assets/front.png');
        const backResponse = await fetch('/assets/back.png');
        
        setDebugInfo(prev => ({
          ...prev,
          texturesLoaded: frontResponse.ok && backResponse.ok,
          errors: [
            ...prev.errors,
            !frontResponse.ok ? 'Front texture not found' : null,
            !backResponse.ok ? 'Back texture not found' : null
          ].filter(Boolean)
        }));
      } catch (error) {
        setDebugInfo(prev => ({
          ...prev,
          errors: [...prev.errors, error.message]
        }));
      }
    };

    checkTextures();
  }, []);

  const handleChangeUser = () => {
    setCurrentUser(getRandomUser());
  };

  return (
    <div className="relative">
      {/* Debug controls overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-2">Demo Controls</h2>
        <div className="mb-4">
          <p><strong>Name:</strong> {currentUser.userName}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
        </div>
        <button 
          onClick={handleChangeUser}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Change User
        </button>
        
        {/* Debug section */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <h3 className="text-lg font-bold mb-2">Debug Info</h3>
          <p><strong>Textures Loaded:</strong> {debugInfo.texturesLoaded ? 'Yes' : 'No'}</p>
          {debugInfo.errors.length > 0 && (
            <div>
              <p><strong>Errors:</strong></p>
              <ul className="list-disc pl-5">
                {debugInfo.errors.map((error, index) => (
                  <li key={index} className="text-red-400">{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-2">
            <p><strong>Test Images:</strong></p>
            <div className="flex gap-2 mt-1">
              <img 
                src="/assets/front.png" 
                alt="Front texture" 
                className="w-16 h-16 object-cover border border-gray-400"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4=';
                  setDebugInfo(prev => ({
                    ...prev,
                    errors: [...prev.errors, 'Front texture failed to load in UI']
                  }));
                }}
              />
              <img 
                src="/assets/back.png" 
                alt="Back texture" 
                className="w-16 h-16 object-cover border border-gray-400"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4=';
                  setDebugInfo(prev => ({
                    ...prev,
                    errors: [...prev.errors, 'Back texture failed to load in UI']
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actual BandEnvironment component */}
      <BandEnvironment 
        userName={currentUser.userName}
        email={currentUser.email}
        role={currentUser.role}
        picture={currentUser.picture}
      />
    </div>
  );
} 