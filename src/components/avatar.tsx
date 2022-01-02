import * as React from "react";
import { supabase } from "../supabase";
import GenericAvatar from "./Icons/generic_avatar";
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
      className="rounded relative flex justify-center md:justify-between"
      onMouseEnter={() => setDisplayType("block")}
      onMouseLeave={() => setDisplayType("hidden")}
    >
      <label
        className={`${displayType} cursor-pointer absolute flex justify-center items-center w-36 h-36 bg-sky-600/75 rounded-full active:bg-sky-500`}
        htmlFor="single"
      >
        <UploadIcon />
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
        <img src={avatarUrl} alt="Avatar" className="rounded-full w-36 h-36" />
      ) : (
        <div className="h-36 w-36">
          <GenericAvatar />
        </div>
      )}
    </div>
  );
};
