let myLibrary = [];
const getList = () => document.getElementById("list");
const getFormContainer = () =>
  document.getElementsByClassName("form-container")[0];
const bookName = () => document.getElementById("name");
const bookAuthor = () => document.getElementById("author");
const bookPages = () => document.getElementById("pages");
const bookIsReaded = () => document.getElementById("is-readed");
const getCloseFormBtn = () => document.getElementById("close-form");
const getNewBookBtn = () => document.getElementById("new-book-btn");
const getSubmitBtn = () => document.getElementById("submit");
const getDeleteBtn = () =>  document.querySelectorAll(".card-button");
const getToggleBtn = () => document.querySelectorAll(".toggle");

function Book(title, author, cantPages, isReaded) {
  this.title = title;
  this.author = author;
  this.cantPages = cantPages;
  this.isReaded = isReaded;
}

function addBookToLibrary(title, author, cantPages, isReaded) {
  myLibrary.push(new Book(title, author, cantPages, isReaded));
}

function showCards(arr) {
  document.getElementById('list').innerHTML = '';
  arr.forEach((element, index) => {
    const newElement = document.createElement("div");
    newElement.className = "element";
    newElement.id = `${index}`;
    if (element.isReaded)
      newElement.innerHTML = `${element.title} by ${element.author}, ${element.cantPages} Pages, readed <button value="${index}" class="card-button">x</button><button value="${index}" class="toggle">readed?</button>`;
    else
      newElement.innerHTML = `${element.title} by ${element.author}, ${element.cantPages} Pages, not readed yet <button value="${index}" class="card-button">x</button ><button value="${index}" class="toggle">readed?</button>`;
    getList().appendChild(newElement);
  });
  getDeleteBtn().forEach(element => {
    element.addEventListener('click', event => {
      myLibrary.splice(event.target.value, 1);
      showCards(myLibrary);
    })
  })
  getToggleBtn().forEach(element => {
    element.addEventListener('click', event => {
      myLibrary[event.target.value].isReaded = !myLibrary[event.target.value].isReaded;
      showCards(myLibrary);
    })
  })
}

getNewBookBtn().addEventListener("click", () =>
  getFormContainer().classList.add("show")
);
getCloseFormBtn().addEventListener("click", (event) => {
  getFormContainer().classList.remove("show");
  event.preventDefault();
});
getSubmitBtn().addEventListener("click", (event) => {
  const name = bookName().value;
  const author = bookAuthor().value;
  const pages = bookPages().value;
  const isReaded = bookIsReaded().value;
  console.log(name, author, pages, isReaded === "is-readed");
  addBookToLibrary(name, author, parseInt(pages), isReaded === "is-readed");
  console.table(myLibrary);
  showCards(myLibrary);
  event.preventDefault();
  document.getElementById('form').reset();
});



addBookToLibrary("jamon", "salame", 200, false);
addBookToLibrary("iato", "java", 600, true);
addBookToLibrary("otro iato", "neio", 1200, false);
addBookToLibrary("otro iato", "neio", 1200, true);

showCards(myLibrary);



