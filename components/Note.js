import React  from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";

export default class Note extends React.Component {
      render() { 
          const {id, title, data, deleteMethod} = this.props
          return ( 
              <View id={id} style={styles.note}>
                
                <Text style={styles.noteTitle}>{title}</Text>
                <Text style={styles.noteText}>{data}</Text>

                <TouchableOpacity 
                    onPress={deleteMethod} 
                    style={styles.noteDelete}
                    accessibilityLabel='Press to remove task from list'
                    >
                    <Text style={styles.noteDeleteText}>x</Text>
                </TouchableOpacity>

              </View>
           );
      }
  }

const styles = StyleSheet.create({
    note: {
    flex: 1,
    height:70,
    padding:5,
    margin:2,
    borderWidth:2,
    },
    noteTitle: {
    fontWeight: 'bold',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
    },
    noteDeleteText: {
        color: 'black',
        fontWeight: 'bold',
    },
    noteDelete: {
    borderWidth:1,
    borderColor:'"rgba(0,0,0,0.2)"',
    alignItems:'center',
    justifyContent:'center',
    width:20,
    height:20,
    left:5,
    backgroundColor:'#e5547b',
    borderRadius:20,
    }
})