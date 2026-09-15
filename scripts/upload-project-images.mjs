import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUCKET = "product-images";
const FOLDER = "projects/piala-aer-tembaga";
const LOCAL_DIR = "public/Piala_Aer_Tembaga_Selected_Web_Photos";

async function main() {
  const files = (await readdir(LOCAL_DIR)).filter((f) => f.endsWith(".png"));

  console.log(`Uploading ${files.length} images to ${BUCKET}/${FOLDER}...\n`);

  for (const file of files) {
    const localPath = join(LOCAL_DIR, file);
    const storagePath = `${FOLDER}/${file}`;
    const data = await readFile(localPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, data, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
    } else {
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
      console.log(`  ✓ ${file}`);
      console.log(`    ${publicUrl}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
