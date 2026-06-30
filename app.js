// Este bloque inicializa Supabase utilizando las variables que configuraste en Vercel.
// Asegúrate de que en tu index.html hayas cargado la librería de Supabase antes de este archivo.
const supabase = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexus-form');
    const input = document.getElementById('user-input');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (!texto) return;

        // Intentamos insertar el registro en la tabla 'ventas'
        const { error } = await supabase
            .from('ventas')
            .insert([{ 
                monto: 0, 
                tipo: 'ingreso', 
                notas: texto // Debe coincidir con el nombre de tu columna en Supabase
            }]);

        if (error) {
            console.error("Error al transmutar:", error);
            alert("Error de sistema: " + error.message);
        } else {
            alert("¡Transmutación exitosa!");
            input.value = ''; // Limpiamos el input tras el éxito
        }
    });
});
