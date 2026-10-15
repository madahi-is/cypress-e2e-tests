<?php
// Cargado únicamente después de verificar configuración y conexión app_e2e.
use App\Models\{Ambiente, Asignatura, Estudiante, Examen, ExamenAmbiente, Grupo, Habilitacion, Inscripcion, Rol, User};
use Illuminate\Support\Facades\{DB, Hash};
function seedHu14(): void
{
    $teacherRole = Rol::create(['nombre_rol' => 'docente']);
    $controlRole = Rol::where('nombre_rol', 'personal de control de ingreso')->value('id_rol');
    foreach ([['docente1', $teacherRole->id_rol], ['docente2', $teacherRole->id_rol], ['control2', $controlRole], ['control3', $controlRole]] as [$name,$role]) {
        User::create(['name' => ucfirst($name).' HU14', 'username' => $name.'.hu14', 'email' => $name.'.hu14@example.test', 'id_rol' => $role,
            'password' => Hash::make('E2ePassword!2026'), 'email_verified_at' => '2026-01-01 00:00:00']);
    }
    $main = Examen::firstOrFail();
    Asignatura::findOrFail($main->id_asignatura)->update(['nombre_asignatura' => 'Compartido HU14']);
    $main->update(['fecha' => now()->addDays(2)->toDateString(), 'hora_inicio' => '10:00', 'duracion_minutos' => 60]);
    $room = Ambiente::create(['nombre_ambiente' => 'Segunda aula HU14', 'capacidad' => 30]);
    ExamenAmbiente::create(['id_examen' => $main->id_examen, 'id_ambiente' => $room->id_ambiente]);
    foreach (['Ana', 'Bruno'] as $i => $name) {
        $group = Grupo::create(['id_asignatura' => $main->id_asignatura, 'id_usuario' => User::where('username', 'docente'.($i+1).'.hu14')->value('id'), 'gestion' => '2026-2', 'nombre_grupo' => $i ? 'B' : 'A']);
        $main->grupos()->attach($group->id_grupo);
        $student = Estudiante::where('nombres', $name)->firstOrFail();
        Inscripcion::create(['id_grupo' => $group->id_grupo, 'id_estudiante' => $student->id_estudiante]);
        if ($i) Habilitacion::create(['id_examen' => $main->id_examen, 'id_estudiante' => $student->id_estudiante, 'estado_habilitado' => false, 'motivo_inhabilitacion' => 'Fixture HU14']);
    }
    $subject = Asignatura::create(['nombre_asignatura' => 'Segundo HU14']);
    $other = Examen::create(['id_asignatura' => $subject->id_asignatura, 'id_periodo' => $main->id_periodo, 'fecha' => now()->addDays(3)->toDateString(), 'hora_inicio' => '09:00', 'duracion_minutos' => 60]);
    $group = Grupo::create(['id_asignatura' => $subject->id_asignatura, 'id_usuario' => User::where('username', 'docente1.hu14')->value('id'), 'gestion' => '2026-2', 'nombre_grupo' => 'A']);
    $other->grupos()->attach($group->id_grupo);
    ExamenAmbiente::create(['id_examen' => $other->id_examen, 'id_ambiente' => $room->id_ambiente]);
}
function stateHu14(): array
{
    // Solo SELECT. Se excluyen sesiones y hashes de contraseña de los snapshots.
    $state = [
        'assignments' => DB::table('examen_personal_control')->orderBy('id_examen_personal')->get()->all(),
        'exams' => DB::table('examen')->join('asignatura', 'asignatura.id_asignatura', '=', 'examen.id_asignatura')->select('examen.*', 'asignatura.nombre_asignatura as title')->orderBy('id_examen')->get()->all(),
        'users' => DB::table('users')->join('rol', 'rol.id_rol', '=', 'users.id_rol')->select('users.id', 'users.name', 'users.username', 'users.email', 'users.id_rol', 'users.id_estudiante', 'users.debe_cambiar_password', 'rol.nombre_rol as role')->orderBy('users.id')->get()->all(),
    ];
    foreach (['rol' => 'id_rol', 'asignatura' => 'id_asignatura', 'periodo' => 'id_periodo', 'estudiante' => 'id_estudiante', 'habilitacion' => 'id_habilitacion', 'ambiente' => 'id_ambiente', 'examen_ambiente' => 'id_examen_ambiente', 'grupo' => 'id_grupo', 'inscripcion' => 'id_inscripcion', 'examen_grupo' => 'id_examen_grupo', 'registro_ingreso' => 'id_registro', 'incidencia' => 'id_incidencia'] as $table => $key) {
        $state[$table] = DB::table($table)->orderBy($key)->get()->all();
    }
    return $state;
}
