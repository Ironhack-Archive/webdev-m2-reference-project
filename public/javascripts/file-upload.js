'use strict';
let input = document.querySelector('.inputfile');

let label = input.nextElementSibling;

let labelVal = label.innerHTML;

  input.addEventListener('change', (e) => {
    var fileName = '';
    if (this.files && this.files.length > 1) {
      fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
    } else {
      fileName = e.target.value.split('\\').pop();
    };
    if (fileName) {
      label.innerHTML = fileName;
    } else {
      label.innerHTML = labelVal;
    };
  });