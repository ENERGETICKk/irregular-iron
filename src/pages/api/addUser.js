import { supabase } from '../../scripts/supabaseClient';

export async function POST({ request }) {
  console.log('🔵 API llamada - Inicio');
  
  try {
    const body = await request.json();    
    const { nombre, apellidos, email, tipo_usuario } = body;

    
    if (!nombre || !apellidos || !email || !tipo_usuario) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const fechacreacion = new Date().toISOString();
    
    console.log('📝 Intentando insertar:', {
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      email: email.trim(),
      tipo_usuario: tipo_usuario,
      fecha_creacion: fechacreacion
    });

    
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

    if (error) {
      console.error('ERROR SUPABASE:', error);
      return new Response(
        JSON.stringify({ 
          error: error.message,
          details: error
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Usuario insertado:', data);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        data: data 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err) {
    console.error('ERROR CATCH:', err);
    return new Response(
      JSON.stringify({ 
        error: err.message 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}