import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import "firebase/firestore";
import firebase from "../utils/firebase";
import moment from "moment";

const db = firebase.firestore(firebase);

export default function AddItem(props) {
  const { user } = props;

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const hideDatePicker = () => {
    setIsPickerVisible(false);
  };

  const confirmDate = (date) => {
    const fecha = date;

    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    hideDatePicker();

    setFormData({
      ...formData,
      date: fecha,
    });
  };

  const showDatePicker = () => {
    setIsPickerVisible(true);
  };

  const handleNewItem = () => {
    console.log(formData);
    let errors = {};
    if (!formData.name || !formData.lastName || !formData.date) {
      if (!formData.name) errors.name = true;
      if (!formData.lastName) errors.lastName = true;
      if (!formData.fecha) errors.fecha = true;
    } else {
      console.log('Form Valid');
      const item = formData;
      db.collection(user.uid)
        .add(item)
        .then(() => {
          console.log('Success');

        })
        .catch((err) => {

          console.log('Failedddd');
          errors = {
            name: true,
            lastName: true,
            date: true,
          };

          console.log(err);
        });
    }

    setError(errors);
  };

  const onChange = (e, property) => {
    setFormData({
      ...formData,
      [property]: e.nativeEvent.text,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, error.name && styles.error]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, "name")}
          value={formData.name}
        />
        <TextInput
          style={[styles.input, error.lastName && styles.error]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, "lastName")}
          value={formData.lastName}
        />
        
        <TouchableOpacity
          onPress={showDatePicker}
          style={[styles.input, styles.datePicker, error.date && styles.error]}
        >
          <Text style={styles.buttonText}>{formData.date ? moment(formData.date).format('LL') : 'Seleccionar una fecha'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleNewItem}>
          <Text style={styles.buttonText}>Crear Item</Text>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={confirmDate}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    color: "white",
    width: "80%",
    marginBottom: 25,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "white",
  },
  datePicker: {
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "goldenrod",
    paddingVertical: 10,
    width: "80%",
    elevation: 10,
    borderRadius: 99,
  },
  error: {
    borderColor: "red",
  },
});
