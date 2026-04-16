import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function TextInputCard({ input, setInput, onProcess }) {

  return (
    <View style={{
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10
    }}>

      <Text style={{ fontWeight: "bold" }}>Enter Items</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
          height: 80
        }}
      />

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