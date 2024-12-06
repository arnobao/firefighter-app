import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Auth = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@firefighter.com`;
    
    try {
      if (isRegistering) {
        const { user } = await createUserWithEmailAndPassword(auth, email, code);
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          code,
          isAdmin: false
        });
      } else {
        await signInWithEmailAndPassword(auth, email, code);
      }
      onLogin();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isRegistering ? 'Inscription' : 'Connexion'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}
        {!isRegistering && (
          <input
            type="text"
            placeholder="Identifiant (p.ex. jd pour John Doe)"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="password"
          placeholder="Code (4 chiffres)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength="4"
          pattern="[0-9]{4}"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isRegistering ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full mt-4 p-2 text-blue-500"
      >
        {isRegistering ? 'Déjà inscrit ? Connectez-vous' : 'Créer un compte'}
      </button>
    </div>
  );
};

export default Auth;