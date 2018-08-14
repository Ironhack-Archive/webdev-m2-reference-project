'use strict';

const theParent = document.querySelector('.quotes-container');

const handleClickEvent = (e) => {
  const id = e.target.id;
  if (id) {
    axios.post(`https://localhost:3000/quotes/${id}/like`, {})
      .then(response => {
        console.log('post success');
        console.log(response);
      })
      .catch(error => {
        console.log('Oh No! Error!');
        console.log(error);
      });
  }
  e.stopPropagation();
};

theParent.addEventListener('click', handleClickEvent);
