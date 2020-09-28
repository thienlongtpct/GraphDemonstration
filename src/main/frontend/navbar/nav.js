let nav_open_btn = document.querySelector('.nav-open-btn');
let nav_close_btn = document.querySelector('.nav-close-btn');
let nav_nav = document.querySelectorAll('.nav-nav');

nav_open_btn.addEventListener('click', () => {
    nav_nav.forEach(nav_el => { nav_el.classList.add('visible') });
});

nav_close_btn.addEventListener('click', () => {
    nav_nav.forEach(nav_el => { nav_el.classList.remove('visible') });
});

// GET IN TOUCH COMPONENT
let floating_btn = document.querySelector('.floating-btn');
let close_btn = document.querySelector('.close-btn');
let social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});

document.getElementById("theory").onclick = function () {
    if (document.getElementById("theory-sub").style.display === 'initial') {
        document.getElementById("theory-sub").style.display = 'none';
        document.getElementById("theory").innerHTML = '<a href="#"><i class="fa fa-book" aria-hidden="true" style="margin-right: 15px;"></i>Теория графа <i class="far fa-angle-down"></i></a>';
        document.getElementById("theory").style.fontWeight = 'normal';
    }
    else {
        document.getElementById("theory-sub").style.display = 'initial';
        document.getElementById("theory").innerHTML = '<a href="#"><i class="fa fa-book" aria-hidden="true" style="margin-right: 15px;"></i>Теория графа <i class="far fa-angle-up"></i></a>';
        document.getElementById("theory").style.fontWeight = '500';
    }
}
