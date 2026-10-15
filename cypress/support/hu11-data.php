<?php
// database.php carga este archivo únicamente después de verificar app_e2e.
use App\Models\{Ambiente, Asignatura, Estudiante, Examen, ExamenAmbiente, Habilitacion, Rol, User};
use Carbon\Carbon;
use Illuminate\Support\Facades\{DB, Hash};

function seedHu11(): void
{
    // Nunca copiar fixtures a storage del Laravel original del host.
    if (storage_path() !== '/var/www/storage' || getenv('E2E_LARAVEL_ROOT') !== '/var/www') {
        throw new RuntimeException('HU-11 requiere el runner con storage E2E aislado en /var/www/storage.');
    }
    $folder = storage_path('app/public/e2e-hu11');
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) throw new RuntimeException('No se pudo preparar storage HU-11.');
    if (!copy(__DIR__.'/../fixtures/archivos/perfil.png', $folder.'/perfil.png')) throw new RuntimeException('No se pudo copiar la foto E2E.');
    foreach (Estudiante::all() as $student) {
        $student->update(['foto_url' => '/storage/e2e-hu11/perfil.png']);
    }
    $role = Rol::create(['nombre_rol' => 'docente']);
    User::create(['name' => 'Docente HU11', 'username' => 'docente.hu11',
        'email' => 'docente.hu11@example.test', 'password' => Hash::make('E2ePassword!2026'),
        'email_verified_at' => '2026-01-01 00:00:00', 'id_rol' => $role->id_rol]);
    $main = Examen::firstOrFail();
    Asignatura::findOrFail($main->id_asignatura)->update(['nombre_asignatura' => 'Verificación HU11']);
    $north = Ambiente::firstOrFail();
    $north->update(['nombre_ambiente' => 'Aula Norte HU11']);
    $south = Ambiente::create(['nombre_ambiente' => 'Aula Sur HU11', 'capacidad' => 30]);
    $exclusive = Ambiente::create(['nombre_ambiente' => 'Aula Exclusiva HU11', 'capacidad' => 30]);
    ExamenAmbiente::create(['id_examen' => $main->id_examen, 'id_ambiente' => $south->id_ambiente]);
    $others = [];
    foreach (['Otro examen HU11', 'Sin ambientes HU11'] as $title) {
        $subject = Asignatura::create(['nombre_asignatura' => $title]);
        $others[] = Examen::create(['id_asignatura' => $subject->id_asignatura,
            'id_periodo' => $main->id_periodo, 'fecha' => now()->toDateString(),
            'hora_inicio' => '23:00', 'duracion_minutos' => 30]);
    }
    ExamenAmbiente::create(['id_examen' => $others[0]->id_examen, 'id_ambiente' => $exclusive->id_ambiente]);
    $ana = Estudiante::where('codigo_universitario', '202600901')->firstOrFail();
    $bruno = Estudiante::where('codigo_universitario', '202600902')->firstOrFail();
    Habilitacion::create(['id_estudiante' => $bruno->id_estudiante, 'id_examen' => $main->id_examen, 'estado_habilitado' => true]);
    Habilitacion::create(['id_estudiante' => $ana->id_estudiante, 'id_examen' => $others[0]->id_examen, 'estado_habilitado' => true]);
    foreach (['Carla', 'Diego', 'Elena', 'Fabio', 'Gina'] as $n => $name) {
        $code = (string) (202611003 + $n);
        $student = Estudiante::create(['nombres' => $name, 'apellidos' => 'Prueba HU',
            'codigo_universitario' => $code, 'documento_identidad' => (string) (9911003 + $n),
            'email' => strtolower($name).'.hu11@example.test', 'codigo_qr' => Estudiante::qrPayload($code),
            'foto_url' => '/storage/e2e-hu11/perfil.png']);
        if ($name === 'Elena') continue;
        Habilitacion::create(['id_estudiante' => $student->id_estudiante,
            'id_examen' => $name === 'Fabio' ? $others[0]->id_examen : $main->id_examen,
            'estado_habilitado' => $name === 'Fabio',
            'motivo_inhabilitacion' => $name === 'Carla' ? 'Documentación incompleta HU11' : ($name === 'Gina' ? '' : null)]);
    }
}

function stateHu11(): array
{
    // Solo SELECT: no migrate, seed, actualizaciones ni escrituras de archivos.
    $records = DB::table('registro_ingreso as r')
        ->join('examen_ambiente as ea', 'ea.id_examen_ambiente', '=', 'r.id_examen_ambiente')
        ->select('r.*', 'ea.id_examen', 'ea.id_ambiente')
        ->selectRaw('EXTRACT(EPOCH FROM r.fecha_hora_ingreso)::double precision AS ingreso_epoch')
        ->orderBy('r.id_registro')->get()->map(function ($r) {
            $r->hora_mensaje = Carbon::parse($r->fecha_hora_ingreso)->format('H:i');
            return $r;
        })->all();
    return [
        'server_epoch' => now()->getTimestamp(),
        'students' => Estudiante::orderBy('id_estudiante')->get()->toArray(),
        'users' => User::with('rol')->orderBy('id')->get()->map(fn ($u) => [
            'id' => $u->id, 'email' => $u->email, 'role' => $u->rol->nombre_rol,
        ])->all(),
        'exams' => Examen::with('asignatura')->orderBy('id_examen')->get()->map(fn ($e) => [
            'id_examen' => $e->id_examen, 'title' => $e->asignatura->nombre_asignatura,
        ])->all(),
        'rooms' => Ambiente::orderBy('id_ambiente')->get()->toArray(),
        'pivots' => ExamenAmbiente::orderBy('id_examen_ambiente')->get()->toArray(),
        'habilitations' => Habilitacion::orderBy('id_habilitacion')->get()->toArray(),
        'records' => $records,
    ];
}
