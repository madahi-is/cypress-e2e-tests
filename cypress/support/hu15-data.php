<?php
use App\Models\{Estudiante, Rol, User};
use Illuminate\Support\Facades\{DB, Hash};
function seedHu15(): void
{
    if (getenv('E2E_LARAVEL_ROOT') !== '/var/www' || storage_path() !== '/var/www/storage') throw new RuntimeException('Fotos HU-15 requieren storage E2E aislado.');
    $folder = storage_path('app/public/e2e-hu15');
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) throw new RuntimeException('Storage no disponible');
    foreach (['Ana' => 'previa.png', 'Bruno' => 'perfil.jpg'] as $name => $fixture) {
        $file = strtolower($name).'.'.pathinfo($fixture, PATHINFO_EXTENSION);
        if (!copy(__DIR__.'/../fixtures/archivos/'.$fixture, $folder.'/'.$file)) throw new RuntimeException('No se pudo preparar foto');
        Estudiante::where('nombres', $name)->update(['foto_url' => '/storage/e2e-hu15/'.$file]);
    }
}
function stateHu15(): array
{
    if (getenv('E2E_LARAVEL_ROOT') !== '/var/www' || storage_path() !== '/var/www/storage') throw new RuntimeException('Consulta de archivos solo en storage E2E');
    $files = [];
    $root = storage_path('app/public');
    if (is_dir($root)) foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)) as $file) {
        if ($file->isFile() && !$file->isLink()) $files[substr($file->getPathname(), strlen($root)+1)] = hash_file('sha256', $file->getPathname());
    }
    ksort($files);
    $students = Estudiante::orderBy('id_estudiante')->get();
    return ['students' => $students->toArray(), 'files' => $files,
        'users' => User::with('rol')->orderBy('id')->get()->map(function ($u) use ($students) {
            $student = $students->firstWhere('id_estudiante', $u->id_estudiante);
            return ['id' => $u->id, 'id_estudiante' => $u->id_estudiante, 'username' => $u->username, 'email' => $u->email, 'role' => $u->rol->nombre_rol,
                'debe_cambiar_password' => (bool) $u->debe_cambiar_password, 'temporary_matches' => $student ? Hash::check($student->documento_identidad, $u->password) : false];
        })->all(),
        'examen' => DB::table('examen')->value('id_examen'), 'ambiente' => DB::table('ambiente')->value('id_ambiente'),
        'habilitations' => DB::table('habilitacion')->orderBy('id_habilitacion')->get()->all(),
        'pivots' => DB::table('examen_ambiente')->orderBy('id_examen_ambiente')->get()->all(),
        'entries' => DB::table('registro_ingreso')->orderBy('id_registro')->get()->all()];
}
