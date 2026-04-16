import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function EditableTable({ data }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setItems(data);
    }
  }, [data]);

  // 🔥 Update logic
  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    const qty = parseFloat(updated[index].quantity) || 0;
    const price = parseFloat(updated[index].price) || 0;

    updated[index].total = qty * price;

    setItems(updated);
  };

  // ➕ Add row
  const addRow = () => {
    setItems([
      ...items,
      { name: "", quantity: "1", price: "0", total: 0, matched: false }
    ]);
  };

  // ❌ Delete row
  const deleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 🔥 Grand total
  const grandTotal = items.reduce((sum, item) => {
    return sum + (item.total || 0);
  }, 0);

  return (
    <View style={{ marginTop: 20 }}>

      {/* HEADER */}
      <View style={{
        flexDirection: "row",
        backgroundColor: "#ddd",
        padding: 10
      }}>
        <Text style={{ flex: 2 }}>Item</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Qty</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Price</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Total</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Action</Text>
      </View>

      {/* ROWS */}
      {items.map((item, index) => (
        <View key={index} style={{
          flexDirection: "row",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#eee",
          alignItems: "center"
        }}>

          {/* NAME */}
          <TextInput
            style={{ flex: 2 }}
            value={item.name}
            onChangeText={(val) => updateItem(index, "name", val)}
            />

          {/* QTY */}
          <TextInput
            style={{ flex: 1, textAlign: "center" }}
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={(val) => updateItem(index, "quantity", val)}
          />

          {/* PRICE */}
          <TextInput
            style={{ flex: 1, textAlign: "center" }}
            value={String(item.price)}
            keyboardType="numeric"
            onChangeText={(val) => updateItem(index, "price", val)}
          />

          {/* TOTAL */}
          <Text style={{ flex: 1, textAlign: "center" }}>
            ₹{item.total || 0}
          </Text>

          {/* DELETE */}
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => deleteRow(index)}
          >
            <Text style={{ color: "red" }}>❌</Text>
          </TouchableOpacity>

        </View>
      ))}

      {/* ➕ ADD BUTTON */}
      <TouchableOpacity
        onPress={addRow}
        style={{
          backgroundColor: "#4A90E2",
          padding: 12,
          marginTop: 10,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white" }}>+ Add Row</Text>
      </TouchableOpacity>

      {/* 💰 GRAND TOTAL */}
      <View style={{
        marginTop: 15,
        padding: 15,
        backgroundColor: "#4A90E2",
        borderRadius: 8
      }}>
        <Text style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold"
        }}>
          Grand Total: ₹{grandTotal}
        </Text>
      </View>

    </View>
  );
}