showNotes();
flag = 0;
// if user adds a note, add it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt"); //geting value in 'addTxt' variable where id is 'addTxt'
  let notes = localStorage.getItem("notes"); //geting notes from localstorage
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //parse the (string->object) that we get in 'notes' into notesObj array as an object
  }
  notesObj.push(addTxt.value); //pushing the value if 'addTxt' into notes
  localStorage.setItem("notes", JSON.stringify(notesObj)); // convert those objects into strings
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

//function to show element from localstorge
function showNotes() {
  let notes = localStorage.getItem("notes"); //geting notes from localstorage
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //parse the (string->object) that we get in 'notes' into notesObj array as an object
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div id="cardColor" class="noteCard my-2 mx-2 card" style="width: 18rem; background-color: #F8EDE3;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">
            Delete Note
          </button>
          <button id="${index}" onclick="markNote(this.id)" class="btn btn-outline-warning my-2">
            Mark Important
          </button>
        </div>
      </div>
    `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `It feels empty! Use "Add a Note" section above to add notes.`;
  }
}

//function to delete a note
function deleteNote(index) {
  console.log("I am Deleting", index);

  let notes = localStorage.getItem("notes"); //geting notes from localstorage
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //parse the (string->object) that we get in 'notes' into notesObj array as an object
  }
  notesObj.splice(index, 1); //remove item with the help of the index given
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// to search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  //   e.preventDefault();
  let inputVal = search.value.toLowerCase();
  console.log(inputVal);
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

//marking imp
let red = "rgb(255,148,148)";
let yellow = "rgb(248,237,227)";
// function color() {
//   x.style.color = "#FF9494";
// }

function markNote(index) {
  console.log("Marking Important", index);

  var x = document.getElementById("cardColor");
  currentColor = window.getComputedStyle(x, null);
  bgColor = currentColor.getPropertyValue("background-color");
  // document.getElementById("cardColor").innerHTML = bgColor;
  if (bgColor === yellow) {
    x.style.backgroundColor = red;
  }
  showNotes();
}

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
5. customizing buttons
*/
