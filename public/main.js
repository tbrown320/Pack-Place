const pencils = document.getElementsByClassName("fa-pencil");
const discard = document.getElementsByClassName("fa-times");

// Array.from(pencils).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const id = this.parentNode.parentNode.dataset.id
//     const grade = this.parentNode.parentNode.querySelector('.newGrade').value
//     if (!grade) {
//       return alert('Type a new grade in the box before adding.')
//     }
//     fetch('assignments', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         'id': id,
//         'grade': grade
//       })
//     })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         window.location.reload(true)
//       })
//   });
// });

//event listener for edit card tool
Array.from(pencils).forEach(function (element) {
  element.addEventListener('click', function () {
    const card = this.parentNode.parentNode
    const id = card.dataset.id
    const grade = card.querySelector('.newGrade').value
    const price = card.querySelector('.newPrice').value
    //if no grade or price when tell user to type them in
    if (!grade && !price) {
      return alert('Type a new grade or new price to edit the card.')
    }
    fetch('cards', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'grade': grade,
        'price': price
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(discard).forEach(function (element) {
  element.addEventListener('click', function () {
    const id = this.parentNode.parentNode.dataset.id
    fetch('cards', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// reflective effect coding
let reflectiveCards = document.getElementsByClassName("reflective");

Array.from(reflectiveCards).forEach(function (element) {
  // follow the mouse while it is over this one card
  element.addEventListener('mousemove', function (event) {
    let rect = element.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;

    // hand the position to CSS for the glare
    element.style.setProperty('--mx', x + '%');
    element.style.setProperty('--my', y + '%');

    // tilt a little toward the cursor (max about 6 degrees)
    let tiltX = ((y - 50) / 50) * -6;
    let tiltY = ((x - 50) / 50) * 6;
    element.style.transform =
      'perspective(700px) rotateX(' + tiltX + 'deg) ' +
      'rotateY(' + tiltY + 'deg)';
  });

  // put the card back flat when the mouse leaves
  element.addEventListener('mouseleave', function () {
    element.style.transform = '';
  });
});