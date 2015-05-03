(function(window){

    var hb,cover,second;

    var onload = function() {
        init();
    }

    function init() {
        hb = document.getElementById('hb');
        hb.style.top = '30px';
        hb.style.transform = 'rotate(10deg)';
        hb.addEventListener('touchstart',change,false);

        cover = document.getElementById('cover');
        second= document.getElementById('second');
    }
    function change() {
        hb.style.top = '-193px';
        hb.style.right = '100%';

        cover.style.opacity = 0;
        second.style.opacity = 1;
    }

    window.onload = onload;
})(window)

