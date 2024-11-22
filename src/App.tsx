import { useState } from "react";
import "./App.css";
import { supabase } from "./utils/supabace";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(`Clothes/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading file:", error);
    } else {
      console.log("File uploaded successfully:", data);
    }
  };

  const onchangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  return (
    <>
      <div>
        <input type="file" onChange={onchangeImage} />
        <button onClick={handleUpload}>アップロードする</button>
      </div>
    </>
  );
}

export default App;
