let bookTitle;
let bookAuthor;
let bookPagesRead;

function addListeners(){
    console.log("adding listeners")
    const btn = document.querySelectorAll('.button'); 
    console.log(btn);
    btn[0].addEventListener('click', bookFormSubmit);
}

function bookFormSubmit(){
    console.log("been pressed")
    bookTitle = document.getElementById('book-title').value;
    bookAuthor = document.getElementById('author').value;
    bookPagesRead = document.getElementById('pages-read').value;
    addBook(bookTitle, bookAuthor, bookPagesRead);
}

function addBook(title, author, pagesRead){
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('book');
    console.log(card);
    const shelf = document.getElementsByClassName('shelf');
    shelf[0].appendChild(card);
    const info = document.createElement('div');
    info.classList.add('book-info');
    card.appendChild(info);
    const bktitle = document.createElement('div');
    bktitle.classList.add('book-title');
    info.appendChild(bktitle);
    bktitle.textContent = bookTitle;
    const bkauthor = document.createElement('div');
    bkauthor.classList.add('author');
    info.appendChild(bkauthor);
    bkauthor.textContent = bookAuthor;
    const bkpagesRead = document.createElement('div');
    bkpagesRead.classList.add('pages-read');
    info.appendChild(bkpagesRead);
    bkpagesRead.textContent = bookPagesRead;
}

addListeners();