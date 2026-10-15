<?php
// Invocado después de seedHu9() y las comprobaciones de aislamiento de database.php.
use App\Models\{Asignatura, Estudiante, Grupo, Inscripcion};

function seedHu10(): void
{
    foreach ([['202610101', 'Lucía', 'Mamani Quispe'], ['202610102', 'Lucía', 'Rojas']] as $n => [$code, $name, $surname]) {
        Estudiante::create(['codigo_universitario' => $code, 'documento_identidad' => (string) (9910101 + $n),
            'nombres' => $name, 'apellidos' => $surname, 'email' => "lucia$n.hu10@example.test",
            'codigo_qr' => Estudiante::qrPayload($code)]);
    }
    $math = Asignatura::where('nombre_asignatura', 'Matemática HU9')->value('id_asignatura');
    $paged = Grupo::where('id_asignatura', $math)->where('gestion', '2026-2')->where('nombre_grupo', 'P01')->firstOrFail();
    $numbers = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho',
        'Nueve', 'Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciseis'];
    foreach ($numbers as $n => $word) {
        $code = (string) (202610001 + $n);
        $student = Estudiante::create(['codigo_universitario' => $code,
            'documento_identidad' => (string) (9910001 + $n), 'nombres' => 'Lista',
            'apellidos' => "Alumno $word", 'email' => "lista$n.hu10@example.test",
            'codigo_qr' => Estudiante::qrPayload($code)]);
        Inscripcion::create(['id_grupo' => $paged->id_grupo, 'id_estudiante' => $student->id_estudiante]);
    }
    $physics = Asignatura::where('nombre_asignatura', 'Física HU9')->value('id_asignatura');
    $other = Grupo::where('id_asignatura', $physics)->where('gestion', '2026-2')->where('nombre_grupo', 'A')->firstOrFail();
    Inscripcion::create(['id_grupo' => $other->id_grupo,
        'id_estudiante' => Estudiante::where('codigo_universitario', '202600902')->value('id_estudiante')]);
}
