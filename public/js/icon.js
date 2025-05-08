document.addEventListener('DOMContentLoaded', function() {
    
    const footerIcons = document.querySelectorAll('.footer-icon');
    
    
    footerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            
            footerIcons.forEach(i => i.classList.remove('active'));
            
            
            this.classList.add('active');
        });
    });
    
   
    const currentPage = window.location.pathname.split('/').pop();
    footerIcons.forEach(icon => {
        if (icon.getAttribute('href') === './' + currentPage) {
            icon.classList.add('active');
        }
    });
});