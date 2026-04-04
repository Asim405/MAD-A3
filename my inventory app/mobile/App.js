import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

const API_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000/inventory'
  : 'http://localhost:3000/inventory';

const badgeColor = (quantity) => {
  if (quantity > 50) return '#0f766e';
  if (quantity >= 10) return '#ca8a04';
  return '#b91c1c';
};

export default function App() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError('Unable to load inventory. Check backend and API URL.');
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return inventory;
    return inventory.filter((item) => item.item_name.toLowerCase().includes(query));
  }, [inventory, search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory Manager</Text>
        <Text style={styles.headerSubtitle}>React Native app connected to Express + MySQL</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search items..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => `${item.item_name}-${index}`}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View>
                <Text style={styles.itemName}>{item.item_name}</Text>
                <Text style={styles.itemMeta}>Quantity</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: badgeColor(item.quantity) }]}> 
                <Text style={styles.badgeText}>{item.quantity}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No inventory items match your search.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 6,
    color: '#cbd5e1',
    fontSize: 14,
  },
  searchBox: {
    padding: 16,
    backgroundColor: '#0f172a',
  },
  searchInput: {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },
  itemName: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '600',
  },
  itemMeta: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 13,
  },
  badge: {
    minWidth: 64,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
