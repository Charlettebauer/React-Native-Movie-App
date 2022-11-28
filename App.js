import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';

export default function App() {
  const apiurl = 'https://api.themoviedb.org/3/search/movie?api_key=d5fd3296592039d98783a240a1c1d43f'

  const [state, setState] = useState({
    s: "Enter a movie...",
    results: ([]),
    selected: {}
  });

  const myListEmpty = () => {
    return(
      <View View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No movies found</Text> 
      </View> 
    );
  };

  const search = () => {
    axios.get(apiurl + "&query=" + state.s).then(({ data }) => {
      let results = data.Search
      console.log(data);
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }    
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState => { 
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      /> 

     <ScrollView style={styles.results}>
      {state?.results && state.results.map(result => (
        <View key={results.imdbID} style={styles.result}>
          <Image
             source={{ uri: result.Poster}}
             style={{
             width: '100%',
             height: 300
            }}
      resizeMode="cover"
      />
      <Text style={styles.heading}>{result.Title}</Text>
        </View>
      ))}
     </ScrollView>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizonatal: 20
  },
  title: {
     color: '#FFF',
     fontSize: 32,
     fontWeight: '700',
     textAlign: 'center',
     marginBottom: 20
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBotton: 40 
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  }   
});
