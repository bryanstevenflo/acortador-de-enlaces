const form = document.getElementById('form');
const urlInput = document.getElementById('url-input');
const submitBtn = form.querySelector('button');
const resultBox = document.getElementById('result');
const resultInput = document.getElementById('result-input');
const copyBtn = document.getElementById('copy-btn');
const errorEl = document.getElementById('error');

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function randomCode(length = 6) {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O/1/l/I
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Genera un código y lo inserta; si ya existe (colision), reintenta.
async function createShortLink(targetUrl, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    const code = randomCode();
    const { error } = await supabaseClient.from('links').insert({ code, target: targetUrl });
    if (!error) return code;
    if (error.code !== '23505') throw error; // 23505 = clave duplicada, cualquier otro error se propaga
  }
  throw new Error('No se pudo generar un codigo unico, intenta de nuevo.');
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.classList.add('hidden');
  resultBox.classList.add('hidden');

  const url = urlInput.value.trim();
  if (!isValidUrl(url)) {
    return showError('La URL no es valida. Debe incluir http:// o https://');
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Generando...';

  try {
    const code = await createShortLink(url);
    const base = `${location.origin}${location.pathname.replace('index.html', '')}`;
    resultInput.value = `${base}wait.html?c=${code}`;
    resultBox.classList.remove('hidden');
  } catch (err) {
    showError(err.message || 'No se pudo conectar con la base de datos.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Generar';
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(resultInput.value);
  copyBtn.textContent = 'Copiado';
  setTimeout(() => (copyBtn.textContent = 'Copiar'), 1500);
});
