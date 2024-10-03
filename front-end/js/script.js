let background = document.getElementById('background');
let city_behind = document.getElementById('city-behind');
let text1 = document.getElementById('text1');
let text2 = document.getElementById('text2');
let btn = document.getElementById('btn');
let city_front = document.getElementById('city-front');
let header = document.querySelector('header');

window.addEventListener('scroll', function () {
  let value = window.scrollY;
  background.style.left = value * 0.25 + 'px';
  city_behind.style.top = value * 0.5 + 'px';
  city_front.style.top = value * 0 + 'px';
  text1.style.marginTop = value *2.5 + 'px';
  text2.style.marginTop = value *2.5 + 'px';
  btn.style.marginTop = value * 1.5 + 'px';
  header.style.top = value * 0.5 + 'px';
})