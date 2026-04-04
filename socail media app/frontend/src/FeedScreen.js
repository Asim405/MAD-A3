import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([
    { id: '1', title: 'Loading...', body: 'Checking database...', userId: 'System' }
  ]);

  useEffect(() => {
    // Change 'localhost' to your IP if testing on a phone
    fetch('http://localhost:3001/posts') 
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log("Fetch error: ", err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Details', { post: item })}
            style={{ padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>By: {item.userId}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}