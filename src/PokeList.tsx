import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { Pokemon } from './types';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/2a6a6b66983a97a6bdc889b9e0a2a42a25e2522e/sprites/pokemon/';

const PokeList = ({ onSelect }: { onSelect: (pokemon: Pokemon) => void }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}?limit=20&offset=${offset}`)
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  }, [offset]);

  const PokemonItem = ({ pokemon, index }: { pokemon: Pokemon, index: number }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(pokemon)}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{offset + index + 1}</Text>
        <Text style={styles.text}>{pokemon.name}</Text>
      </View>
      <Image style={styles.image} source={{ uri: `${IMAGE_URL}${pokemon.url.split('/')[6]}.png` }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Anterior" onPress={() => setOffset(offset > 0 ? offset - 20 : 0)} />
      <FlatList
        data={pokemonList}
        renderItem={({ item, index }) => <PokemonItem pokemon={item} index={index} />}
        keyExtractor={item => item.name}
      />
      <Button title="Siguiente" onPress={() => setOffset(offset + 20)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default PokeList;