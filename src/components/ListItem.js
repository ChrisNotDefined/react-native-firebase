import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionBar from './ActionBar';
import firebase from "../utils/firebase";
import AddItem from './AddItem';


export default function ListItem({user}) {

    const [showList,setShowList] = useState(false);

    return(
        <View style={styles.container}>

            {showList?(
            <>
            <Text>ListItems</Text>
            <Text>ListItems</Text>
            </>
            ):(
                <AddItem user={user}/>
            )}
            <ActionBar showList={showList} setShowList={setShowList}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        height:"100%"
    },
    
});