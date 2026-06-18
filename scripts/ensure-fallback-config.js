import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '../firebase-applet-config.json');

if (!fs.existsSync(configPath)) {
  const fallbackConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    firestoreDatabaseId: ""
  };
  fs.writeFileSync(configPath, JSON.stringify(fallbackConfig, null, 2), 'utf-8');
  console.log("Generated fallback firebase-applet-config.json for compilation on Vercel/CI.");
} else {
  console.log("Using existing firebase-applet-config.json");
}
