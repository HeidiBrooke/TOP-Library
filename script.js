let bookTitle;
let bookAuthor;
let bookPagesRead;
let bookCompleted;
let myLibrary = [];

const newBook = new Book('bookTitle', 'bookAuthor', 'bookPagesRead', 1);
const newBook2 = new Book('bookTitle2', 'bookAuthor', 'bookPagesRead', 0);
myLibrary[0] = newBook;
myLibrary[1] = newBook2;

function Book (title, author, pageNum, haveRead) {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.haveRead = haveRead;
    this.info = function(){
        return title + "by " + author + ", " + pageNum + "pages, " + haveRead;     
    }
}

function addBookToLibrary() {
    bookTitle = document.getElementById('book-title').value;
    bookAuthor = document.getElementById('author').value;
    bookPagesRead = document.getElementById('pages-read').value;
    bookCompleted = document.getElementById('checkbox');
    if(bookCompleted.checked){
        bookCompleted = 1;
    }
    else {
        bookCompleted = 0;
    }
    console.log("bookC: " + bookCompleted)
    // bookCompleted.value
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
    const btn = document.querySelectorAll('.add'); 
    console.log(btn);
    btn[0].addEventListener('click', addBookToLibrary);
    const delBtn = document.querySelectorAll('.delete'); 
    console.log(delBtn);
    delBtn.forEach(div => {
        div.addEventListener('click', deleteBook)});
    const formBtn = document.querySelectorAll('.pop-up');
    formBtn[0].addEventListener('click', popUpForm);
    const formBtnClose = document.querySelectorAll('.close');
    formBtnClose[0].addEventListener('click', closeForm);
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
    bkpagesRead.textContent = pagesRead + "pgs";
    const bkRead = document.createElement('div');
    bkRead.classList.add('book-completed');
    card.appendChild(bkRead);
    const bkReadLabel = document.createElement('div');
    bkReadLabel.classList.add('book-read-label');
    bkRead.appendChild(bkReadLabel);
    bkReadLabel.textContent = "Completed:"
    const toggle = document.createElement('label');
    toggle.classList.add('switch');
    bkRead.appendChild(toggle);
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox');
    console.log("haveRead: " + haveRead)
    if(haveRead === 0) {
        console.log("is checke?" + checkbox.checked);
        checkbox.checked = false;
    }
    else {
        console.log("is checke?" + checkbox.checked);
        checkbox.checked = true;
    }
    toggle.appendChild(checkbox);
    const slider = document.createElement('span');
    slider.classList.add('slider');
    slider.classList.add('round');
    toggle.appendChild(slider);
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('button');
    deleteBtn.classList.add('delete')
    deleteBtn.textContent = '-';
    card.appendChild(deleteBtn);
    addListeners();
}

function deleteBook(e){
    console.log("deleting" + e.target);
    let div = e.target.parentElement;
    console.log(div);
    let dataAtt = div.getAttribute("data-ind");
    console.log("dataAtt is: " + dataAtt);
    myLibrary.splice(dataAtt, 1);
    resetLibrary();
    displayBooks1();
};

function resetLibrary(){
    const cards = document.getElementsByClassName("book");
    console.log(cards);
    const cardsArray = Array.from(cards);
    cardsArray.forEach(card => {
        console.log(card);
        card.remove()});
}

function popUpForm(){
    const form = document.getElementById("form");
    form.style.display = "block";
}

function closeForm(){
    const form = document.getElementById("form");
    form.style.display = "none";
}

displayBooks1();
addListeners();


//form validation

const bookTitleElement = document.getElementById('book-title');
bookTitleElement.addEventListener('input', checkBookValidity);

const bookAuthorElement = document.getElementById('author');
bookAuthorElement.addEventListener('input', checkAuthorValidity);

const bookPagesElement = document.getElementById('pages-read');
bookPagesElement.addEventListener('input', checkPagesValidity);

function checkBookValidity(e) {
    console.log('checking validity')
    let error;
    if(!e.target.checkValidity()){
        error = document.createElement('span');
        error.classList.add('error');
        error.setAttribute('id', 'book-error');
        error.textContent = 'A title is required.'
        e.target.parentElement.appendChild(error);
    }
    else{
        error = document.getElementById('book-error')
        if(error !== null){
            error.remove();
        }
    }
}

function checkAuthorValidity(e) {
    console.log('checking validity')
    let error;
    if(!e.target.checkValidity()){
        error = document.getElementById('author-error');
        if(error === null){
            error = document.createElement('span');
            error.classList.add('error');
            error.setAttribute('id', 'author-error');
            error.textContent = 'Author must contain at least 3 characters'
            e.target.parentElement.appendChild(error);
        }
        
    }
    else{
        error = document.getElementById('author-error')
        if(error !== null){
            error.remove();
        }
    }
}

function checkPagesValidity(e) {
    console.log('checking validity')
    let error;
    if(!e.target.checkValidity()){
        error = document.getElementById('page-error');
        if(error === null){
            error = document.createElement('span');
            error.classList.add('error');
            error.setAttribute('id', 'page-error');
            error.textContent = 'Entry must be a number'
            e.target.parentElement.appendChild(error);
        }
        
    }
    else{
        error = document.getElementById('page-error')
        if(error !== null){
            error.remove();
        }
    }
}

