import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploadCard({ image, setImage, onUpload }) {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginTop: 20 }}>

      <Text style={{ fontWeight: "bold" }}>Upload Image</Text>

      <TouchableOpacity onPress={pickImage} style={{ backgroundColor: "#777", padding: 10, marginTop: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Select Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={{ height: 150, marginTop: 10 }} />}

      <TouchableOpacity onPress={onUpload} style={{ backgroundColor: "#28a745", padding: 12, marginTop: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Upload</Text>
      </TouchableOpacity>

    </View>
  );
}