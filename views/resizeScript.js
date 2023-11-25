var start_size = 200;
document.querySelector('#dynamicTop').style.top = `${start_size}px`;
addEventListener('resize', ()=>{
   let prop = start_size;
   if (window.innerWidth/screen.width < 0.877) {
       prop = 400;
}
   document.querySelector('#dynamicTop').style.top = `${prop}px`;
});