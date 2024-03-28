
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;
    let moving = false;
    let lastTouch = {x: 0, y: 0};
    let canvasPos = {x: 0, y: 0};

    function startPaint(e) {
        if(e.touches.length === 1){
            painting = true;
            moving = false;
            ctx.beginPath();
            ctx.moveTo(e.touches[0].clientX - canvasPos.x, e.touches[0].clientY - canvasPos.y);
        } else if(e.touches.length > 1){
            painting = false;
            moving = true;
            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
        e.preventDefault();
    }

    function endPaint() {
        painting = false;
        moving = false;
    }

    function movePaint(e) {
        if(painting){
            ctx.lineTo(e.touches[0].clientX - canvasPos.x, e.touches[0].clientY - canvasPos.y);
            ctx.stroke();
        } else if(moving && e.touches.length > 1){
            const dx = e.touches[0].clientX - lastTouch.x;
            const dy = e.touches[0].clientY - lastTouch.y;
            canvasPos.x += dx;
            canvasPos.y += dy;
            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
            canvas.style.transform = `translate(${canvasPos.x}px, ${canvasPos.y}px)`;
        }
        e.preventDefault();
    }

    canvas.addEventListener('touchstart', startPaint);
    canvas.addEventListener('touchmove', movePaint);
    canvas.addEventListener('touchend', endPaint);
    canvas.addEventListener('touchcancel', endPaint);
});
