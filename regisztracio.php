
<?php

header('Content-Type: application/json; charset=utf-8');

require_once 'config.php';

// Csak POST kérés fogadása
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Nem engedélyezett kérési metódus.'
    ]);
    exit;
}

// Beérkező adatok feldolgozása
$input = json_decode(file_get_contents('php://input'), true);

// JSON mellett hagyományos POST-adatok fogadása is lehetséges
if (!is_array($input)) {
    $input = $_POST;
}

// Adatok kiolvasása
$email = trim($input['e-mail'] ?? '');
$vezeteknev = trim($input['vezeteknev'] ?? '');
$keresztnev = trim($input['keresztnev'] ?? '');
$telefonszam = trim($input['telefonszam'] ?? '');
$szerepkor = trim($input['szerepkor_valaszto'] ?? '');

// Kötelező mezők ellenőrzése
if (
    empty($email) ||
    empty($vezeteknev) ||
    empty($keresztnev) ||
    empty($telefonszam) ||
    empty($szerepkor)
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Minden mező kitöltése kötelező!'
    ]);
    exit;
}

// E-mail-cím ellenőrzése
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Érvénytelen e-mail-cím!'
    ]);
    exit;
}

// Szöveges mezők hosszának ellenőrzése
if (
    mb_strlen($email) > 255 ||
    mb_strlen($vezeteknev) > 100 ||
    mb_strlen($keresztnev) > 100 ||
    mb_strlen($telefonszam) > 30
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Az egyik megadott adat túl hosszú!'
    ]);
    exit;
}

// Telefonszám ellenőrzése
if (!preg_match('/^[0-9+\-\s()]{7,30}$/', $telefonszam)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Érvénytelen telefonszám!'
    ]);
    exit;
}

// Szerepkör ellenőrzése
if (!in_array($szerepkor, ['szallito', 'megbizo'], true)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Érvénytelen felhasználói szerepkör!'
    ]);
    exit;
}

try {

    // E-mail-cím ellenőrzése az adatbázisban
    $stmt = $pdo->prepare(
        "SELECT id FROM users WHERE email = :email"
    );

    $stmt->execute([
        ':email' => $email
    ]);

    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Ezzel az e-mail-címmel már regisztráltak!'
        ]);
        exit;
    }

    // Új felhasználó mentése
    $stmt = $pdo->prepare(
        "INSERT INTO users
        (email, first_name, last_name, phone, role)
        VALUES
        (:email, :first_name, :last_name, :phone, :role)"
    );

    $stmt->execute([
        ':email' => $email,
        ':first_name' => $keresztnev,
        ':last_name' => $vezeteknev,
        ':phone' => $telefonszam,
        ':role' => $szerepkor
    ]);

    // Sikeres regisztráció
    header('Location: index_bootstrap.html');
    exit;

} catch (PDOException $e) {

    // Adatbázishiba kezelése
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Adatbázishiba történt a regisztráció során.'
    ]);
}

?>
