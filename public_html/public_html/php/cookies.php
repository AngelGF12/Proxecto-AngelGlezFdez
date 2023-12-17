<?php
//Se verifica si ya se ha aceptado el consentimiento de cookies
if (!isset($_COOKIE['cookieConsent'])) {
    //Si no se ha aceptado, muestra el banner
    echo '<div id="cookieBanner" class="cookie-banner">';
    echo '    <p>Este sitio web utiliza cookies para ofrecerte la mejor experiencia de usuario. Selecciona tus preferencias de cookies:</p>';
    echo '    <button id="acceptAllCookies">Aceptar Todas</button>';
    echo '    <button id="acceptNecessaryCookies">Aceptar Solo Necesarias</button>';
    echo '    <button id="rejectAllCookies">Rechazar Todas</button>';
    echo '</div>';
}
?>
