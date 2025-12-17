import { supabase } from '../../scripts/supabaseClient';

export async function GET() {

  try {
    
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('fecha_creacion', { ascending: false }); 

    if (error) {
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
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor al procesar la solicitud.',
        details: err.message
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}