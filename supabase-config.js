// Reemplaza estos dos valores con los de tu proyecto:
// Supabase → Settings → API → "Project URL" y "anon public" key.
// La anon key SÍ es segura de exponer en el navegador: solo puede hacer
// lo que las políticas RLS (supabase-setup.sql) le permiten.
const SUPABASE_URL = 'https://xyhsyelbyllnsqqanpdy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5aHN5ZWxieWxsbnNxcWFucGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NzE4MDUsImV4cCI6MjEwMzQ0NzgwNX0.Wyo9_VQQKWmmWVaVn4LdaY70eI7IZFzWs95bPW4K4zc';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
