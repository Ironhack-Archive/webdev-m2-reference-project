'use strict';

const heart = document.querySelectorAll('.heart');

heart.forEach((heart) => {
  const handleClickEvent = (event) => {
    const id = event.target.getAttribute('data');
    console.log(id);

    axios.post(`http://localhost:3000/quotes/${id}/like`)
      .then(response => {
        console.log('post success');
        console.log(response);
      })
      .catch(error => {
        console.log('Oh No! Error!');
        console.log(error);
      });
  };
  heart.addEventListener('click', handleClickEvent);
});
