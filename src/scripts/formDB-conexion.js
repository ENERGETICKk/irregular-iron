import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta absoluta del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../"); // Subir 2 niveles hasta la raíz del proyecto

// Cargar .env desde la raíz del proyecto
dotenv.config({ path: path.join(rootDir, ".env") });

const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SUPABASE_URL) ||
  process.env.PUBLIC_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SUPABASE_ANON_KEY) ||
  process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Faltan variables de entorno PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY");
  console.error("Ruta actual:", __dirname);
  console.error("Buscando .env en:", path.join(rootDir, ".env"));
  process.exit(1);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Conexión con Supabase inicializada correctamente.");

// Si se ejecuta directamente con Node (pnpm run db-init)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("🧪 Verificando conexión...");

  const testConnection = async () => {
    const { data, error } = await supabase.from("usuarios").select("id").limit(1);
    if (error) {
      console.error("❌ Error al conectar con la base de datos:", error.message);
    } else {
      console.log("✅ Conexión a la tabla 'usuarios' verificada correctamente!");
    }
  };

  testConnection();
}
