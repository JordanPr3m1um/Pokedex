// App.tsx
import React, { useState } from 'react';
import { Pokemon } from './Types';
import WelcomeScreen from './WelcomeScreen';
import PokeList from './PokeList';
import PokeDetails from './PokeDetails';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  if (screen === 'welcome') {
    return <WelcomeScreen onEnter={() => setScreen('list')} />;
  } else if (screen === 'list') {
    return <PokeList onSelect={pokemon => { setSelectedPokemon(pokemon); setScreen('details'); }} />;
  } else if (screen === 'details' && selectedPokemon) {
    return <PokeDetails pokemon={selectedPokemon} onBack={() => setScreen('list')} />;
  }
};

export default App;
