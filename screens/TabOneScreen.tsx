import {StyleSheet, Image, ScrollView, SafeAreaView, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from "axios";
import {useEffect, useState} from "react";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const apiUrl = `https://api.github.com/users`
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const githubUsers = async()=>{
    const {data} = await axios.get(apiUrl)
    setUsers(data)
    setLoading(false)
  }

  useEffect(()=>{
    githubUsers()
  },[])

  const handleSearch = (search:string)=>{
    const filteredUsers = users.filter((item:any)=> item.login.toLowerCase().includes(search.toLowerCase()))
    setUsers(filteredUsers)
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Github Users</Text>
          <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={(newText)=> handleSearch(newText)}
          />
          {users.map((user:any)=>{
            const {login,id, avatar_url} = user
            return <View key={id}>
              <Text>{login}</Text>
              <Image source={{ uri: avatar_url }} style={{ width: 'auto', height: 150 }} />
            </View>
          })}

        </ScrollView>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"#fff"
  },
});
