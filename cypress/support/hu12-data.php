<?php
// database.php verifica pgsql/app_e2e y current_database() antes de cargarlo.
use App\Models\{Asignatura, Examen, Estudiante, Incidencia, Rol, User};
use Illuminate\Support\Facades\{DB, Hash};
function seedHu12(bool $empty = false): void
{
    $role = Rol::create(['nombre_rol' => 'docente']);
    User::create(['name' => 'Docente HU12', 'username' => 'docente.hu12', 'email' => 'docente.hu12@example.test',
        'password' => Hash::make('E2ePassword!2026'), 'email_verified_at' => '2026-01-01 00:00:00', 'id_rol' => $role->id_rol]);
    $main = Examen::firstOrFail();
    Asignatura::findOrFail($main->id_asignatura)->update(['nombre_asignatura' => 'Incidencias HU12']);
    $subject = Asignatura::create(['nombre_asignatura' => 'Segundo examen HU12']);
    $other = Examen::create(['id_asignatura' => $subject->id_asignatura, 'id_periodo' => $main->id_periodo,
        'fecha' => '2026-03-12', 'hora_inicio' => '09:00', 'duracion_minutos' => 60]);
    if ($empty) return;
    $student = Estudiante::where('codigo_universitario', '202600901')->firstOrFail();
    $user = User::where('email', 'control.e2e@example.test')->firstOrFail();
    $rows = [];
    for ($i = 1; $i <= 18; $i++) $rows[] = [$main->id_examen, 'Otro', "2026-03-11 12:00:".str_pad((string) $i, 2, '0', STR_PAD_LEFT)];
    foreach (Incidencia::TIPOS as $i => $type) $rows[] = [$main->id_examen, $type, ($i % 2 ? '2026-03-12' : '2026-03-10').' 10:00:00'];
    $rows[] = [$main->id_examen, 'Otro', '2026-03-11 00:00:00'];
    $rows[] = [$main->id_examen, 'Otro', '2026-03-11 23:59:59'];
    $rows[] = [$other->id_examen, 'Expulsión', '2026-03-11 13:00:00'];
    $rows[] = [$other->id_examen, 'Otro', '2026-03-12 13:00:00'];
    foreach ($rows as $i => [$exam, $type, $time]) Incidencia::create([
        'id_examen' => $exam, 'id_estudiante' => $i % 2 ? null : $student->id_estudiante,
        'id_usuario' => $user->id, 'tipo_incidencia' => $type,
        'descripcion_motivo' => 'Historial HU12 '.str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT),
        'fecha_hora' => $time,
    ]);
}
function stateHu12(): array
{
    // Solo SELECT y lectura de rutas; no migraciones, seeds ni escrituras.
    $records = DB::table('incidencia')->select('*')
        ->selectRaw('EXTRACT(EPOCH FROM fecha_hora)::double precision AS fecha_epoch')
        ->selectRaw('fecha_hora::date::text AS fecha_dia')
        ->orderBy('id_incidencia')->get()->all();
    $routes = collect(app('router')->getRoutes()->getRoutes())->filter(fn ($r) => str_contains($r->uri(), 'incidencias'))
        ->map(fn ($r) => ['uri' => $r->uri(), 'methods' => $r->methods(), 'name' => $r->getName()])->values()->all();
    return ['server_epoch' => now()->getTimestamp(), 'records' => $records, 'routes' => $routes,
        'entries' => DB::table('registro_ingreso')->orderBy('id_registro')->get()->all(),
        'students' => Estudiante::orderBy('id_estudiante')->get()->toArray(),
        'exams' => Examen::with('asignatura')->orderBy('id_examen')->get()->map(fn ($e) => [
            'id_examen' => $e->id_examen, 'title' => $e->asignatura->nombre_asignatura, 'fecha' => $e->fecha])->all(),
        'users' => User::with('rol')->orderBy('id')->get()->map(fn ($u) => [
            'id' => $u->id, 'email' => $u->email, 'username' => $u->username, 'role' => $u->rol->nombre_rol])->all()];
}
