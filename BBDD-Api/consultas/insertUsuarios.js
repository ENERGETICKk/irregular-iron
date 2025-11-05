// añadirUsuario.js
import { time } from 'console';
import { supabase } from '../supabaseClient.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pregunta(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function añadirUsuario() {
  console.log('\n🆕 AÑADIR NUEVO USUARIO\n');
  console.log('═══════════════════════════════════════\n');

  try {
    const nombre = await pregunta('Nombre: ');
    const apellidos = await pregunta('Apellidos: ');
    const email = await pregunta('Email: ');
    
    console.log('\nTipo de usuario:');
    console.log('1. Estudiant');
    console.log('2. Professor');
    console.log('3. Admin');
    const tipoOpcion = await pregunta('\nSelecciona una opción (1-3): ');
    
    const tipos = {
      '1': 'estudiante',
      '2': 'profesor',
      '3': 'administrador'
    };
    
    const tipo_usuario = tipos[tipoOpcion] || 'estudiant';

    // Confirmar datos
    console.log('\n📋 Datos a insertar:');
    console.log('═══════════════════════════════════════');
    console.log(`Nombre: ${nombre}`);
    console.log(`Apellidos: ${apellidos}`);
    console.log(`Email: ${email}`);
    console.log(`Tipo: ${tipo_usuario}`);
    console.log('═══════════════════════════════════════\n');

    const confirmar = await pregunta('¿Confirmar inserción? (s/n): ');

    if (confirmar.toLowerCase() !== 's') {
      console.log('❌ Operación cancelada');
      rl.close();
      return;
    }

const fechacreacion = new Date().toISOString();
console.log(fechacreacion);

// Insertar en Supabase
const { data, error } = await supabase
  .from('usuarios')
  .insert([
    {
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      email: email.trim(),
      tipo_usuario: tipo_usuario,
      fecha_creacion: fechacreacion
    }
  ])
  .select();

    if (error) throw error;

    console.log('\n✅ Usuario añadido correctamente!');
    console.log('═══════════════════════════════════════');
    console.log(JSON.stringify(data[0], null, 2));
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Error al añadir usuario:', error.message);
  } finally {
    rl.close();
  }
}

// Ejecutar
añadirUsuario();
