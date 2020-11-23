//scroll to top
const toTop = document.querySelector(".back-to-top");
console.log('toTop')
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})

// Project filter grid
$grid = $('.projects').isotope({
    itemSelector: '.project-item',
    layoutMode: 'masonry'
});

$('.filter button').on('click', function () {
    $(".filter button").removeClass('active');
    $(this).addClass('active');

    $grid.isotope({
        filter: $(this).data('filter')
    })

})
setTimeout(function () {
    $('.projects').masonry({
        itemSelector: '.project-item', // the grid item selector
    }).masonry("layout");
}, 100);

// setTimeout(function () { $(".project-item").masonry().masonry("reloadItems"); }, 500);

