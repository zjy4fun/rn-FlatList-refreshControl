import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';

type Person = {
  name: string;
  age: number;
};

const COLORS = ['red', 'green', 'blue', 'black', 'yellow'];

function App(): React.JSX.Element {
  const [personList, setPersonList] = useState<Person[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [color, setColor] = useState<number>(0);

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    const fakeData: Person[] = [];
    for (let i = 0; i < 100; i++) {
      fakeData.push({
        name: `Person ${i}`,
        age: Math.floor(Math.random() * 100),
      });
    }
    setPersonList(fakeData);
  };

  const handleRefresh = async () => {
    console.log('refresh');
    setIsRefreshing(true);
    await new Promise<void>(resolve => {
      setTimeout(() => {
        const fakeData: Person[] = [];
        for (let i = 0; i < 100; i++) {
          fakeData.push({
            name: `Person ${i}`,
            age: Math.floor(Math.random() * 100),
          });
        }
        setPersonList(fakeData);
        const randomColor = Math.floor(Math.random() * COLORS.length);
        setColor(randomColor);
        console.log('refresh done');
        setIsRefreshing(false);
        resolve();
      }, 3000);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={personList}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <Text style={(styles.text, {color: COLORS[color]})}>
                {item.name}
              </Text>
              <Text style={(styles.text, {color: COLORS[color]})}>
                {item.age}
              </Text>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: 'white',
    borderRadius: 10,

    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    color: 'red',
    fontSize: 20,
  },
});

export default App;
