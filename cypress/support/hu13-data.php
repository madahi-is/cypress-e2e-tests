<?php
use App\Models\{Ambiente, Asignatura, Estudiante, Examen, ExamenAmbiente, Habilitacion, Rol, User};
use Illuminate\Support\Facades\Hash;
function seedHu13(): void
{
    $role = Rol::create(['nombre_rol' => 'docente']);
    foreach ([['docente.hu13', $role->id_rol], ['segundo.control.hu13', Rol::where('nombre_rol', 'personal de control de ingreso')->value('id_rol')]] as [$name, $roleId]) {
        User::create(['name' => $name, 'username' => $name, 'email' => $name.'@example.test', 'password' => Hash::make('E2ePassword!2026'), 'email_verified_at' => now(), 'id_rol' => $roleId]);
    }
    $main = Examen::firstOrFail();
    Asignatura::findOrFail($main->id_asignatura)->update(['nombre_asignatura' => 'Principal HU13']);
    $start = now()->subMinutes(30);
    $main->update(['fecha' => $start->toDateString(), 'hora_inicio' => $start->format('H:i:00'), 'duracion_minutos' => 240]);
    Ambiente::firstOrFail()->update(['nombre_ambiente' => 'Norte HU13']);
    $south = Ambiente::create(['nombre_ambiente' => 'Sur HU13', 'capacidad' => 30]);
    ExamenAmbiente::create(['id_examen' => $main->id_examen, 'id_ambiente' => $south->id_ambiente]);
    $exams = [];
    foreach (['Un ambiente HU13', 'Otro HU13', 'Futuro lejano HU13', 'Cerrado HU13'] as $title) {
        $subject = Asignatura::create(['nombre_asignatura' => $title]);
        $time = $title === 'Cerrado HU13' ? now()->subDay() : ($title === 'Futuro lejano HU13' ? now()->addDays(30) : now()->subMinutes(30));
        $e = Examen::create(['id_asignatura' => $subject->id_asignatura, 'id_periodo' => $main->id_periodo, 'fecha' => $time->toDateString(), 'hora_inicio' => $time->format('H:i:00'), 'duracion_minutos' => $title === 'Cerrado HU13' ? 60 : 240]);
        $room = Ambiente::create(['nombre_ambiente' => $title.' Aula', 'capacidad' => 30]);
        ExamenAmbiente::create(['id_examen' => $e->id_examen, 'id_ambiente' => $room->id_ambiente]);
        $exams[$title] = $e;
    }
    foreach (['Carla', 'Diego', 'Elena', 'Fabio'] as $i => $name) {
        $code = (string) (202613003 + $i);
        Estudiante::create(['nombres' => $name, 'apellidos' => 'Prueba HU13', 'codigo_universitario' => $code, 'documento_identidad' => (string) (9913003 + $i), 'email' => strtolower($name).'.hu13@example.test', 'codigo_qr' => Estudiante::qrPayload($code)]);
    }
    foreach (Estudiante::whereIn('nombres', ['Bruno', 'Carla', 'Diego', 'Elena'])->get() as $s) Habilitacion::create(['id_examen' => $main->id_examen, 'id_estudiante' => $s->id_estudiante, 'estado_habilitado' => $s->nombres !== 'Elena']);
    foreach ($exams as $title => $e) foreach (Estudiante::whereIn('nombres', $title === 'Otro HU13' ? ['Ana', 'Elena'] : ['Ana', 'Bruno'])->get() as $s) Habilitacion::create(['id_examen' => $e->id_examen, 'id_estudiante' => $s->id_estudiante, 'estado_habilitado' => true]);
}
function stateHu13(): array
{
    // stateHu11 solo consulta datos; no llama seedHu11 ni copia fotos.
    require_once __DIR__.'/hu11-data.php';
    $state = stateHu11();
    $view = file_get_contents(base_path('resources/js/Pages/Control/PanelAsistencia.vue'));
    if (!preg_match('/setInterval\(refrescar,\s*(\d+)\)/', $view, $matches)) throw new RuntimeException('No se encontró el intervalo real de polling; revisar HU-13.');
    $state['poll_interval_ms'] = (int) $matches[1];
    return $state;
}
