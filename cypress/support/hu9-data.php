<?php
// Se carga únicamente después de las comprobaciones de app_e2e en database.php.
use App\Models\{Asignatura, Estudiante, Examen, Grupo, Inscripcion, Periodo, Rol, User};
use Illuminate\Support\Facades\{DB, Hash};

function seedHu9(): void
{
    Estudiante::create(['nombres' => 'Carla', 'apellidos' => 'Hu Nueve',
        'codigo_universitario' => '202609903', 'documento_identidad' => '9909903',
        'email' => 'carla.hu9@example.test', 'codigo_qr' => Estudiante::qrPayload('202609903')]);
    $role = Rol::create(['nombre_rol' => 'docente']);
    foreach ([1, 2] as $n) {
        User::create(['name' => "Docente $n HU9", 'username' => "docente$n.e2e",
            'email' => "docente$n.e2e@example.test", 'password' => Hash::make('E2ePassword!2026'),
            'email_verified_at' => '2026-01-01 00:00:00', 'id_rol' => $role->id_rol]);
    }
    $teacher = User::where('username', 'docente1.e2e')->value('id');
    $math = Asignatura::create(['nombre_asignatura' => 'Matemática HU9']);
    $physics = Asignatura::create(['nombre_asignatura' => 'Física HU9']);
    Asignatura::create(['nombre_asignatura' => 'Vacía HU9']);
    $groups = [];
    foreach (['A', 'B', 'C'] as $name) {
        $groups[$name] = Grupo::create(['id_asignatura' => $math->id_asignatura,
            'id_usuario' => $teacher, 'gestion' => '2026-2', 'nombre_grupo' => $name]);
    }
    Grupo::create(['id_asignatura' => $physics->id_asignatura, 'id_usuario' => $teacher,
        'gestion' => '2026-2', 'nombre_grupo' => 'A']);
    Grupo::create(['id_asignatura' => $math->id_asignatura, 'id_usuario' => $teacher,
        'gestion' => '2026-1', 'nombre_grupo' => 'A']);
    for ($i = 1; $i <= 13; $i++) {
        Grupo::create(['id_asignatura' => $math->id_asignatura, 'id_usuario' => $teacher,
            'gestion' => '2026-2', 'nombre_grupo' => sprintf('P%02d', $i)]);
    }
    Inscripcion::create(['id_grupo' => $groups['B']->id_grupo,
        'id_estudiante' => Estudiante::where('codigo_universitario', '202600902')->value('id_estudiante')]);
    Inscripcion::create(['id_grupo' => $groups['C']->id_grupo,
        'id_estudiante' => Estudiante::where('codigo_universitario', '202600901')->value('id_estudiante')]);
    // El examen/habilitación de Ana vienen del reset común. Solo HU-9 usa fechas fijas.
    Periodo::query()->update(['gestion' => '2026', 'numero' => 2,
        'fecha_inicio' => '2026-07-01', 'fecha_fin' => '2026-12-31']);
    $exam = Examen::firstOrFail();
    $exam->update(['id_asignatura' => $math->id_asignatura, 'fecha' => '2026-10-15']);
    $exam->grupos()->attach($groups['C']->id_grupo);
}

function stateHu9(): array
{
    // Snapshots permiten detectar borrados en cascada o escrituras rechazadas que mutaron datos.
    return [
        'groups' => Grupo::orderBy('id_grupo')->get()->toArray(),
        'subjects' => Asignatura::orderBy('id_asignatura')->get()->toArray(),
        'users' => User::with('rol')->orderBy('id')->get()->map(fn ($u) => [
            'id' => $u->id, 'name' => $u->name, 'username' => $u->username,
            'role' => $u->rol->nombre_rol,
        ])->all(),
        'students' => Estudiante::orderBy('id_estudiante')->get()->toArray(),
        'enrollments' => Inscripcion::orderBy('id_inscripcion')->get()->toArray(),
        'examGroups' => DB::table('examen_grupo')->orderBy('id_examen_grupo')->get()->toArray(),
        'habilitations' => DB::table('habilitacion')->orderBy('id_habilitacion')->get()->toArray(),
    ];
}
