let bookTitle;
let bookAuthor;
let bookPagesRead;
let bookCompleted;
let myLibrary = [];

const newBook = new Book('bookTitle', 'bookAuthor', 'bookPagesRead', 'bookCompleted');
const newBook2 = new Book('bookTitle2', 'bookAuthor', 'bookPagesRead', 'bookCompleted');
myLibrary[0] = newBook;
myLibrary[1] = newBook2;

function Book (title, author, pageNum, haveRead) {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.haveRead = haveRead
    this.info = function(){
        return title + "by " + author + ", " + pageNum + "pages, " + haveRead;     
    }
}

function addBookToLibrary() {
    bookTitle = document.getElementById('book-title').value;
    bookAuthor = document.getElementById('author').value;
    bookPagesRead = document.getElementById('pages-read').value;
    bookCompleted = "complete";
    const newBook = new Book(bookTitle, bookAuthor, bookPagesRead, bookCompleted);
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayBooks();
}


function displayBooks1(){
    console.log("am displaying")
    myLibrary.forEach(book => { 
        let index = myLibrary.indexOf(book);
        addBookCard(book.title, book.author, book.pageNum, book.haveRead, index)
    });
}

function displayBooks(){
    console.log("am displaying")
    let cards = document.querySelectorAll('.card');
    console.log("cards array:" + cards)
        let cardIndex;
        let cardIndeces = [];
        cards.forEach(card => {
            cardIndex = card.dataset.ind;
            console.log("dataset value" + cardIndex )
            cardIndeces.push(cardIndex);
            }
           )

    console.log("card indeces array: " + cardIndeces)
    myLibrary.forEach(book => { 
        let index = myLibrary.indexOf(book);
        let imIncluded = cardIndeces.includes(index);
        index = index.toString();
        console.log(imIncluded)
        console.log(index + "imIncluded in:  " + cardIndeces + "?")
        if (cardIndeces.includes(index)) {
            console.log(index + " is indcluded in " + cardIndeces )
            return;
        }
        else {
        addBookCard(book.title, book.author, book.pageNum, book.haveRead, index);
        }  
    });
}
function addListeners(){
    console.log("adding listeners")
    const btn = document.querySelectorAll('.button'); 
    console.log(btn);
    btn[0].addEventListener('click', addBookToLibrary);
}

// function bookFormSubmit(){
//     console.log("been pressed")
//     bookTitle = document.getElementById('book-title').value;
//     bookAuthor = document.getElementById('author').value;
//     bookPagesRead = document.getElementById('pages-read').value;
//     addBook(bookTitle, bookAuthor, bookPagesRead);
// }

function addBookCard(title, author, pagesRead, haveRead, index){
    console.log("am loggin card")
    console.log(title, author, pagesRead, haveRead);
    const card = document.createElement('div');
    card.dataset.ind = index;
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
    bktitle.textContent = title;
    const bkauthor = document.createElement('div');
    bkauthor.classList.add('author');
    info.appendChild(bkauthor);
    bkauthor.textContent = author;
    const bkpagesRead = document.createElement('div');
    bkpagesRead.classList.add('pages-read');
    info.appendChild(bkpagesRead);
    bkpagesRead.textContent = pagesRead;
    const bkRead = document.createElement('div');
    bkRead.classList.add('pages-read');
    info.appendChild(bkRead);
    bkRead.textContent = haveRead;

}
displayBooks1();
addListeners();