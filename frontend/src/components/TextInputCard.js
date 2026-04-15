import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function TextInputCard({ input, setInput, onProcess }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2
      }}
    >
      {/* Title */}
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Enter Items
      </Text>

      {/* Input */}
      <TextInput
        placeholder="e.g. chana dal 2kg, rice 5kg"
        value={input}
        onChangeText={setInput}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
          height: 80,
          textAlignVertical: "top"
        }}
      />

      {/* Button */}
      <TouchableOpacity
        onPress={onProcess}
        style={{
          backgroundColor: "#4A90E2",
          padding: 12,
          marginTop: 10,
          borderRadius: 8,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          PROCESS
        </Text>
      </TouchableOpacity>
    </View>
  );
}