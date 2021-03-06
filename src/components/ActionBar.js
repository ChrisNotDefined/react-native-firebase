import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import firebase from "../utils/firebase";

export default function ActionBar(props) {
    const {showList,setShowList} = props;

    return(
    <View style={styles.viewFooter}>
        <View style={styles.viewLogout}>
        <Text style={styles.text} onPress={()=>firebase.auth().signOut()}>Cerrar Sesión</Text>
        </View>
        <View style={styles.viewAdd}>
        <Text style={styles.text} onPress={()=>setShowList(!showList)}>{showList ? "Nuevo Item": "Mostrar lista"}</Text>
        </View>      
    </View>
    )
}

const styles = StyleSheet.create({
    viewFooter:{
        position:"absolute",
        bottom:0,
        flexDirection: "row",
        width: "100%",
        height:50,
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:30,
        marginBottom:20
    },
    text:{
        fontSize:16,
        color:"#fff",
        textAlign: "center"
    },
    viewLogout:{
        backgroundColor:"red",
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:20

    },
    viewAdd:{
        backgroundColor:"#08f",
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:20

    }
});