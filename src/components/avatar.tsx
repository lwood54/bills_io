import * as React from "react";
import { supabase } from "../supabase";
import Button from "./Base/Button/button";
import EditIcon from "./Icons/edit-icon";
import UploadIcon from "./Icons/upload-icon";

interface AvatarProps {
  url: string;
  size: number;
  onUpload: (filePath: string) => void;
}
export const Avatar: React.FC<AvatarProps> = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [displayType, setDisplayType] = React.useState("hidden");

  React.useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log("error on file upload", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="rounded relative"
      onMouseEnter={() => setDisplayType("block")}
      onMouseLeave={() => setDisplayType("hidden")}
    >
      <label
        className={`${displayType} cursor-pointer absolute flex justify-center items-center w-full h-full bg-sky-600 rounded-3xl active:bg-sky-500`}
        htmlFor="single"
      >
        <UploadIcon color="#e0f2fe" />
      </label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-3xl"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      {/* <div>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div> */}
    </div>
  );
};
