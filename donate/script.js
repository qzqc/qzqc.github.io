document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.donate-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Thank you for your support!');
        });
    });
});
