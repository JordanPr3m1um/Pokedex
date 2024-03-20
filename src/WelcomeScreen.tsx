import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => (
  <View style={styles.container}>
    <Image
      style={styles.pokeball}
      source={{uri: 'https://th.bing.com/th/id/OIP.Caauk3ptnvXNENEytZ1vXQHaHa?rs=1&pid=ImgDetMain'}}
    />
    <Text style={styles.title}>Bienvenido al PokeDex!</Text>
    <View style={styles.buttonContainer}>
      <Button title=" iNGRESAR" onPress={onEnter} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeball: {
    position: 'absolute',
    top: 50,
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24, 
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
