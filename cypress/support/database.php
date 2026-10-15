<?php
// Exclusivo de pruebas: nunca se carga desde rutas de producción.
use App\Models\{Ambiente, Asignatura, Estudiante, Examen, ExamenAmbiente, Habilitacion, Periodo, Rol, User};
use Illuminate\Support\Facades\{Artisan, DB, Hash};

// Laravel se monta de solo lectura en /var/www dentro del runner.
$laravelRoot = getenv('E2E_LARAVEL_ROOT') ?: dirname(__DIR__, 3).'/income-control-system';
if (!is_file($laravelRoot.'/vendor/autoload.php') || !is_file($laravelRoot.'/bootstrap/app.php')) {
    throw new RuntimeException('E2E_LARAVEL_ROOT debe apuntar al Laravel original con vendor instalado.');
}
require $laravelRoot.'/vendor/autoload.php';
$app = require $laravelRoot.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
if (getenv('E2E_DB_DATABASE') !== 'app_e2e' || config('database.default') !== 'pgsql'
    || config('database.connections.pgsql.database') !== 'app_e2e') {
    throw new RuntimeException('Solo se permite preparar app_e2e. No se modifica app ni app_testing.');
}
if (DB::connection('pgsql')->selectOne('select current_database() as name')->name !== 'app_e2e') {
    throw new RuntimeException('Conexión E2E incorrecta.');
}
$action = $argv[1] ?? '';
if (!in_array($action, ['reset', 'state', 'reset-hu9', 'state-hu9', 'reset-hu10', 'state-hu10', 'reset-hu11', 'state-hu11', 'reset-hu12', 'reset-hu12-empty', 'state-hu12', 'reset-hu13', 'state-hu13', 'reset-hu14', 'state-hu14', 'reset-hu15', 'state-hu15'], true)) throw new RuntimeException('Acción inválida');
if (in_array($action, ['reset', 'reset-hu9', 'reset-hu10', 'reset-hu11', 'reset-hu12', 'reset-hu12-empty', 'reset-hu13', 'reset-hu14', 'reset-hu15'], true)) {
    Artisan::call('migrate:fresh', ['--database' => 'pgsql', '--force' => true]);
    foreach (['administrador', 'personal de control de ingreso', 'estudiante'] as $role) {
        Rol::create(['nombre_rol' => $role]);
    }
    foreach (['admin' => 'administrador', 'control' => 'personal de control de ingreso'] as $name => $role) {
        User::create(['name' => ucfirst($name).' E2E', 'username' => $name.'.e2e',
            'email' => $name.'.e2e@example.test', 'password' => Hash::make('E2ePassword!2026'),
            'email_verified_at' => now(), 'id_rol' => Rol::where('nombre_rol', $role)->value('id_rol')]);
    }
    foreach (['Ana', 'Bruno'] as $index => $name) {
        $code = '20260090'.($index + 1);
        $student = Estudiante::create(['nombres' => $name, 'apellidos' => 'Prueba',
            'codigo_universitario' => $code, 'documento_identidad' => '990090'.($index + 1),
            'email' => strtolower($name).'.e2e@example.test',
            // Usa el comportamiento actual; no oculta su predictibilidad.
            'codigo_qr' => Estudiante::qrPayload($code)]);
        User::create(['name' => $name.' Prueba', 'username' => $code, 'email' => $student->email,
            'id_estudiante' => $student->id_estudiante, 'debe_cambiar_password' => false,
            'password' => Hash::make('E2ePassword!2026'), 'email_verified_at' => now(),
            'id_rol' => Rol::where('nombre_rol', 'estudiante')->value('id_rol')]);
    }
    $subject = Asignatura::create(['nombre_asignatura' => 'Identificación E2E']);
    $room = Ambiente::create(['nombre_ambiente' => 'Aula E2E', 'capacidad' => 30]);
    $period = Periodo::create(['gestion' => (string) now()->year, 'tipo' => 'semestre',
        'numero' => 1, 'fecha_inicio' => now()->startOfYear()->toDateString(),
        'fecha_fin' => now()->endOfYear()->toDateString()]);
    $exam = Examen::create(['id_asignatura' => $subject->id_asignatura, 'id_periodo' => $period->id_periodo,
        'fecha' => now()->toDateString(), 'hora_inicio' => '23:00', 'duracion_minutos' => 30]);
    ExamenAmbiente::create(['id_examen' => $exam->id_examen, 'id_ambiente' => $room->id_ambiente]);
    foreach (Estudiante::where('codigo_universitario', '202600901')->get() as $student) {
        Habilitacion::create(['id_examen' => $exam->id_examen,
            'id_estudiante' => $student->id_estudiante, 'estado_habilitado' => true]);
    }
}
if (in_array($action, ['reset-hu9', 'reset-hu10'], true)) {
    require __DIR__.'/hu9-data.php';
    seedHu9();
}
if ($action === 'reset-hu10') {
    require __DIR__.'/hu10-data.php';
    seedHu10();
}
if ($action === 'reset-hu11') {
    require __DIR__.'/hu11-data.php';
    seedHu11();
}
if (in_array($action, ['reset-hu12', 'reset-hu12-empty'], true)) {
    require __DIR__.'/hu12-data.php';
    seedHu12($action === 'reset-hu12-empty');
}
if ($action === 'reset-hu13') {
    require __DIR__.'/hu13-data.php';
    seedHu13();
}
if ($action === 'reset-hu14') {
    require __DIR__.'/hu14-data.php';
    seedHu14();
}
if ($action === 'reset-hu15') {
    require __DIR__.'/hu15-data.php';
    seedHu15();
}
if (in_array($action, ['reset-hu15', 'state-hu15'], true)) {
    require_once __DIR__.'/hu15-data.php';
    echo json_encode(stateHu15(), JSON_THROW_ON_ERROR);
} elseif (in_array($action, ['reset-hu14', 'state-hu14'], true)) {
    require_once __DIR__.'/hu14-data.php';
    echo json_encode(stateHu14(), JSON_THROW_ON_ERROR);
} elseif (in_array($action, ['reset-hu13', 'state-hu13'], true)) {
    require_once __DIR__.'/hu13-data.php';
    echo json_encode(stateHu13(), JSON_THROW_ON_ERROR);
} elseif (in_array($action, ['reset-hu12', 'reset-hu12-empty', 'state-hu12'], true)) {
    require_once __DIR__.'/hu12-data.php';
    echo json_encode(stateHu12(), JSON_THROW_ON_ERROR);
} elseif (in_array($action, ['reset-hu11', 'state-hu11'], true)) {
    require_once __DIR__.'/hu11-data.php';
    echo json_encode(stateHu11(), JSON_THROW_ON_ERROR);
} elseif (in_array($action, ['reset-hu9', 'state-hu9', 'reset-hu10', 'state-hu10'], true)) {
    require_once __DIR__.'/hu9-data.php';
    echo json_encode(stateHu9(), JSON_THROW_ON_ERROR);
} else {
echo json_encode(['students' => Estudiante::orderBy('id_estudiante')->get()->toArray(),
    'examen' => Examen::value('id_examen'), 'ambiente' => Ambiente::value('id_ambiente')], JSON_THROW_ON_ERROR);
}
