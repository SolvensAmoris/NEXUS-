// Asegúrate de reemplazar estos valores con tus credenciales de Supabase
const SUPABASE_URL = "TU_URL_AQUÍ";
const SUPABASE_ANON_KEY = "TU_ANON_KEY_AQUÍ";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('nexus-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const texto = document.getElementById('user-input').value;
    
    // Mostramos feedback en consola para depurar
    console.log("Enviando nota:", texto);

    const { error } = await supabase
        .from('ventas')
        .insert([{ 
            monto: 0, 
            tipo: 'ingreso', 
            notas: texto // Asegúrate que tu columna en Supabase se llame 'notas'
        }]);

    if (error) {
        // Esto te dirá exactamente qué falla si no se guarda
        alert("Error al guardar en Supabase: " + error.message);
        console.error("Error completo:", error);
    } else {
        alert("¡Transmutación exitosa!");
        document.getElementById('user-input').value = ''; // Limpiamos el input
    }
});
