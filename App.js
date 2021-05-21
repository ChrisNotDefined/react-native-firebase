import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import Auth from "./src/components/Auth";
import firebase from "./src/utils/firebase";
import "firebase/auth/";
import ListItem from "./src/components/ListItem";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const subscription = firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });

    return () => {
      subscription();
    };
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <ListItem user={user} /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <View>
      <Text>Bienvenido </Text>
      <Button title="cerrar sesión" onPress={logout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  },
});
