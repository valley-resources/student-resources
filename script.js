function movePage(percent=0) {
    window.scrollTo({
        top: window.innerHeight * percent,
        behavior: 'smooth'
    });
}
function clamp (val,min,max) {
    return Math.min(Math.max(val,min),max);
}
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;


    const scrollPercent = (scrollTop / windowHeight) * 100;
    const lerpPercent = clamp((scrollPercent / 7) * 100, 0, 33); //because 33% is the the max percentage it will allow due to the clamp

    document.body.querySelector('#header').style.height = `${clamp(15 * ((100 - lerpPercent) / 100),10,15)}%`;


});