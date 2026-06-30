// Inicialización del cliente Supabase
const supabase = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexus-form');
    const input = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (!texto) return;

        // Feedback visual inmediato
        const div = document.createElement('div');
        div.className = 'glass-panel p-3 rounded-xl text-xs text-white my-2';
        div.textContent = "Procesando...";
        chatContainer.appendChild(div);

        try {
            // Envío a la tabla 'ventas'
            const { error } = await supabase
                .from('ventas')
                .insert([{ monto: 0, tipo: 'ingreso', nota: texto }]);

            if (error) throw error;

            div.textContent = "✅ Registrado: " + texto;
            input.value = '';
        } catch (err) {
            console.error("Error:", err);
            div.textContent = "Error de conexión. Verifica Supabase.";
        }
    });
});
