import { LoaderFunction } from "@remix-run/server-runtime";
import { supabase } from "../../../lib/supabase/supabase.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { data: blob, error: downloadError } = await supabase.storage
    .from(params.bucket || "future_default_bucket")
    .download(params.file || "default_img.jpg");
  const blobArrayBuffer = await blob?.arrayBuffer();
  return new Response(blobArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": blob?.type!,
      "Content-Length": `${blob?.size}`,
    },
  });
};
