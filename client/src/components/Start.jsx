import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

const Start = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const auth = getAuth(); 
  const provider = new GoogleAuthProvider();

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    });

    return () => unsubscribe();
  }, [auth]);


  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setIsAuthenticated(true);
      navigate(location.pathname);
    } catch (error) {
      console.error("Sign-in failed", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/home'); 
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 text-black font-epilogue">
      <h2 className="text-4xl font-bold mb-6">Let's Get Started Creating a Campaign!</h2>
      <p className="text-xl mb-6">Donate for the needy or raise funds for a cause close to your heart.</p>

      {isAuthenticated ? (
        <button
          onClick={handleStart}
          className="px-8 py-3 hover:scale-110 text-[#ffde59] text-xl font-semibold transition duration-300 ease-in-out"
        >
          Start Now
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="mt-4 px-8 py-3 text-[#ffde59] text-xl font-semibold hover:scale-110 transition duration-300 ease-in-out"
        >
          Sign In with Google
        </button>
      )}
    </section>
  );
};

export default Start;
