function addListeners(){
    const div = document.querySelectorAll('.button'); 
    div => div.addEventListener('click', addBook);
}

addListeners();

function addBook(e){ 
    let num = e.target.innerHTML;
    lastButtonPressed = num;
    let display = document.getElementById('display');  
}