'use strict';

const heart = document.querySelectorAll('.heart');

heart.forEach((heart) => {
  const handleClickEvent = (event) => {
    const id = event.target.getAttribute('data');

    axios.post(`http://localhost:3000/quotes/${id}/like`)
      .then(response => {
        const likeCounterElement = event.path[3].childNodes[3].children[0].childNodes[0];

        if (response.data.action === 'liked') {
          likeCounterElement.innerText = response.data.likes;
        } else if (response.data.action === 'unliked') {
          likeCounterElement.innerText = response.data.likes;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  heart.addEventListener('click', handleClickEvent);
});
