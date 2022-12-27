import {Button, Pressable, StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useState} from "react";

export default function TabTwoScreen() {
  const [list, setList] = useState([]) as any;
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null) as any;
  const [editing, setEditing] = useState(false);
  const onPressLearnMore =()=>{
    if (editId && editing) {
      setList(
          list.map((item: any) => {
            if (item.id === editId) {
              return { ...item, title: search };
            }
            return item;
          })
      );
      setEditing(false);
      setEditId(0);
    }else{
      const newItem = {
        id: new Date().getTime().toString(),
        title: search
      }
      setList([...list, newItem])
      setSearch("")
    }


  }

  const deleteOneItem = (id:number)=>{
    const filteredItem = list.filter((item:any)=> item.id !== id)
    setList(filteredItem)
  }

  const editOneItem = (id:number)=>{
    list.map((item:any)=>{
      if(item.id === id){
        setSearch((item.title))
      }
    })
    setEditing(true)
    setEditId(id)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocer</Text>
      <TextInput
          style={styles.input}
          onChangeText={(text:string) => setSearch(text)}
          placeholder="e.g. Eggs"
          value={search}
      />
      <View style={styles.pressable}>
        <Button onPress={onPressLearnMore} color="#B33771" title="Add To List"></Button>
      </View>

      <View style={styles.listView}>

        {list.map((item:any)=>{
          return <View style={styles.inlineItem}>
            <Text style={styles.listItem} key={item.id}> {item.title}</Text>
            <View style={styles.editButton} >
              <Button onPress={()=> editOneItem(item.id)} title={"Edit"} color={"#55E6C1"}/>
            </View>
            <View style={styles.editButton}>
              <Button onPress={()=> deleteOneItem(item.id)} title={"Delete"} color={"#FC427B"}/>
            </View>
          </View>
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal:16
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    backgroundColor:"#fff",
    width:"80%"
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable:{
    width:"80%"
  },
  listView:{
    flex:1,
    alignItems:"flex-start",
    marginTop:10
  },
  listItem:{
    fontSize:25,

  },
  inlineItem:{
    flex: 1,
    flexDirection:"row",
    alignItems:"baseline",

  },
  editButton:{
    paddingRight:11,
    paddingLeft:11
  }


});
