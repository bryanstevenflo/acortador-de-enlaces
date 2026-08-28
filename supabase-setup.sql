-- Tabla de enlaces acortados
create table if not exists links (
  code text primary key,
  target text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: el sitio es público (usa la anon key en el navegador),
-- así que hay que abrir SOLO lo estrictamente necesario.
alter table links enable row level security;

-- Cualquiera puede crear un enlace (necesario: el formulario corre en el navegador del visitante)
create policy "cualquiera puede insertar enlaces"
  on links for insert
  to anon
  with check (true);

-- Cualquiera puede leer un enlace por su código (necesario para la redirección)
create policy "cualquiera puede leer enlaces"
  on links for select
  to anon
  using (true);

-- Nadie puede actualizar ni borrar desde el navegador (sin política = bloqueado por defecto)
