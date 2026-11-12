const pencils = document.getElementsByClassName("fa-pencil");
const discard = document.getElementsByClassName("fa-times");
const binderCards = document.getElementsByClassName("card");
const backdrop = document.getElementById("spotlight-backdrop");

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

    if (element.classList.contains("spotlight")) {
      // the glare is only on when card is centered
      // hand the position to CSS for the glare
      element.style.setProperty('--mx', x + '%');
      element.style.setProperty('--my', y + '%');
      return
    }


    // // tilt a little toward the cursor (max about 6 degrees)
    // let tiltX = ((y - 50) / 50) * -6;
    // let tiltY = ((x - 50) / 50) * 6;
    // element.style.transform =
    //   'perspective(700px) rotateX(' + tiltX + 'deg) ' +
    //   'rotateY(' + tiltY + 'deg)';
  });

  // put the card back flat when the mouse leaves
  element.addEventListener('mouseleave', function () {
    element.style.transform = '';
  });
});

// binder spotlight brings a card to the center when clicked
Array.from(binderCards).forEach(function (element) {
  element.addEventListener('click', function (event) {
    // clicks on the pencil or x do nothing here
    if (event.target.classList.contains("fa-pencil") ||
      event.target.classList.contains("fa-times")) {
      return
    }
    //clicking a card that is already selected puts it back
    if (element.classList.contains("spotlight")) {
      element.classList.remove("spotlight")
      backdrop.classList.remove("show")
      return
    }
    // only one card can be center stage at a time
    Array.from(binderCards).forEach(function (other) {
      other.classList.remove("spotlight")
    })
    element.classList.add("spotlight")
    backdrop.classList.add("show")
  })
})

// clicking around the card puts it back in its slot
backdrop.addEventListener('click', function () {
  Array.from(binderCards).forEach(function (element) {
    element.classList.remove("spotlight")
  })
  backdrop.classList.remove("show")
})

// clicking escape puts the card back in its slot
document.addEventListener('keydown', function (event) {
  if (event.key === "Escape") {
    Array.from(binderCards).forEach(function (element) {
      element.classList.remove("spotlight")
    })
    backdrop.classList.remove("show")
  }
})