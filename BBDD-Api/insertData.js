// insertData.js
import { supabase } from "./supabaseClient.js";

// Insertar un usuario
const { data: usuario, error: errorUsuario } = await supabase
  .from("usuarios")
  .insert([
    {
      nombre: "Carlos",
      apellidos: "Pérez Gómez",
      email: "carlos@example.com",
      tipo_usuario: "profesor"
    },
  ])
  .select();

if (errorUsuario) console.error("❌ Error insertando usuario:", errorUsuario);
else console.log("✅ Usuario insertado:", usuario);


// Insertar una zona (aula)
const { data: zona, error: errorZona } = await supabase
  .from("aulas_zonas")
  .insert([
    {
      nombre: "Laboratorio 999",
      tipo: "laboratorio",
      ubicacion: "Edificio B - Planta 2",
      capacidad: 30
    },
  ])
  .select();

if (errorZona) console.error("❌ Error insertando zona:", errorZona);
else console.log("✅ Zona insertada:", zona);
