// app.js - Motor de NEXUS OS
const SUPABASE_URL = "TU_URL_AQUÍ"; // Pega tu URL de Supabase
const SUPABASE_KEY = "TU_KEY_ANON_AQUÍ"; // Pega tu llave anon
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const form = document.getElementById('nexus-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('user-input');
        const texto = input.value;
        
        // Registro visual básico
        const div = document.createElement('div');
        div.textContent = "Registrando: " + texto;
        chatContainer.appendChild(div);
        
        // Guardar en Supabase
        await supabase.from('ventas').insert([{ monto: 0, tipo: 'ingreso', fecha: new Date() }]);
        input.value = '';
    });
});
