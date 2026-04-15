import { useState } from "react";
import { ScrollView } from "react-native";
import { processTextAPI, uploadImageAPI } from "../services/api";
import ImageUploadCard from "../components/ImageUploadCard";
import TextInputCard from "../components/TextInputCard"; // ✅ add this

export default function HomeScreen() {

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);

  const handleText = async () => {
    const data = await processTextAPI(input);
    setItems(data);
  };

  const handleImage = async () => {
    const data = await uploadImageAPI(image);
    setItems(data);
  };

  return (
    <ScrollView>

      <TextInputCard
        input={input}
        setInput={setInput}
        onProcess={handleText}
      />

      <ImageUploadCard
        image={image}
        setImage={setImage}
        onUpload={handleImage}
      />

    </ScrollView>
  );
}