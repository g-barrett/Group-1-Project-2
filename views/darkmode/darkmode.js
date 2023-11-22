document.addEventListener('DOMContentLoaded', function () {
    const toggleModeButton = document.getElementById('toggleMode');
    const body = document.body;

    toggleModeButton.addEventListener('click', function () {
        body.classList.toggle('dark');
    });
});
