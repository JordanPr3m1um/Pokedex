import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/2a6a6b66983a97a6bdc889b9e0a2a42a25e2522e/sprites/pokemon/';

interface Pokemon {
  url: string;
}

interface PokemonDetail {
  name: string;
  id: number;
  abilities: { ability: { name: string } }[];
  species: { url: string };
}

interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string, language: { name: string } }[];
}

interface PokeDetailsProps {
  pokemon: Pokemon;
  onBack: () => void;
}

const PokeDetails = ({ pokemon, onBack }: PokeDetailsProps) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => {
        setPokemonDetail(data);
        return fetch(data.species.url);
      })
      .then(response => response.json())
      .then(data => setPokemonSpecies(data));
  }, [pokemon]);

  const description = pokemonSpecies?.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;

  return pokemonDetail ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Volver" onPress={onBack} color="red" />
      </View>
      <Image style={styles.image} source={{ uri: `${IMAGE_URL}${pokemonDetail.id}.png` }} />
      <Text style={styles.name}>{pokemonDetail.name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <Text style={styles.title}>Habilidades:</Text>
      {pokemonDetail.abilities.map(ability => (
        <Text key={ability.ability.name} style={styles.ability}>{ability.ability.name}</Text>
      ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  ability: {
    fontSize: 16,
  },
});

export default PokeDetails;
