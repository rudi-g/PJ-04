
function gallerySlider(id, options) {
    let sliderCont;
    let images;

    options = options || {
        dots: true,
        tabs: true,
        imgSelector: '.pictures figure'
    }

    document.addEventListener('DOMContentLoaded', function(){
        sliderCont = document.getElementById(id);
        if (sliderCont === undefined) return;

        images = sliderCont.querySelectorAll(options.imgSelector).length > 0 
                    ? getElements(options.imgSelector)
                    : getElements('.pictures img');

        if (images.length > 1) {
            initArrows();

            if (options.dots) {
                initDots();
            }

            if (options.tabs) {
                initTabs();
            }
        }
    })

    function initArrows() {
        const arrows = getElements('.controllers');
        
        if (arrows.length > 0) {
            arrows.forEach(arrow => {
                arrow.addEventListener('click', function(){
                    let curIndex = Array.from(images).findIndex(image => image.classList.contains('active') == true);
                    let nextIndex;

                    if (arrow.classList.contains('left')) {
                        nextIndex = curIndex == 0 ? images.length - 1 : curIndex - 1;
                    } else {
                        nextIndex = curIndex == images.length - 1 ? 0 : curIndex + 1;
                    }

                    slide(curIndex, nextIndex);
                })
            });
        }
    }
    
    function initDots() {
        const dots = getElements('.bullets-pagination .bullet');
        let curIndex;

        if (dots.length > 0) {
            dots.forEach((dot, nextIndex) => {
                dot.addEventListener('click', function(){
                    curIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active') == true);
                    slide(curIndex, nextIndex);
                })
            });
        }
    }

    function initTabs() {
        const tabs = getElements('.tabs .tab');
        let curIndex;

        if (tabs.length > 0) {
            tabs.forEach((tab, nextIndex) => {
                tab.addEventListener('click', function(){
                    curIndex = Array.from(tabs).findIndex(tab => tab.classList.contains('active') == true);
                    slide(curIndex, nextIndex);
                })
            });
        }
    }    

    function getElements(query) {
        return sliderCont.querySelectorAll(query);
    }

    function slide(current, next) {
        if (current === undefined || next === undefined) return;

        const info = getElements('.fields-grid');

        toggleClass(images, current, next);
        toggleClass(info, current, next);

        if (options.dots) {
            const dots = getElements('.bullets-pagination .bullet');
            toggleClass(dots, current, next);
        }

        if (options.tabs) {
            const tabs = getElements('.tabs .tab');
            toggleClass(tabs, current, next);
        }
    }

    function toggleClass(array, current, next) {
        array[current].classList.remove('active');
        array[next].classList.add('active');
    }
}