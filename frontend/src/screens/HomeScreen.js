import { useState } from "react";
import { ScrollView } from "react-native";
import { processTextAPI } from "../services/textApi";
import { uploadImageAPI } from "../services/imageApi";
import ImageUploadCard from "../components/ImageUploadCard";
import TextInputCard from "../components/TextInputCard";
import EditableTable from "../components/EditableTable";

export default function HomeScreen() {

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [showResult, setShowResult] = useState(false); // 🔥

  const handleText = async () => {
    const data = await processTextAPI(input);
    setItems(data);
    setShowResult(true); // 🔥 hide image section
  };

  const handleImage = async () => {
    const data = await uploadImageAPI(image);
    setItems(data);
    setShowResult(true);
  };

  return (
    <ScrollView style={{ padding: 10 }}>

      <TextInputCard
        input={input}
        setInput={setInput}
        onProcess={handleText}
      />

      {/* 👇 Hide after process */}
      {!showResult && (
        <ImageUploadCard
          image={image}
          setImage={setImage}
          onUpload={handleImage}
        />
      )}

      {/* 👇 Table */}
      {showResult && <EditableTable data={items} />}

    </ScrollView>
  );
}