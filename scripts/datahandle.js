const storageKey = "books";
let storageItem = [];


function makeData(data) {
    storageItem.push(data)
    const JSONData = JSON.stringify(storageItem);
    localStorage.setItem(storageKey, JSONData);
}

function retrieveData() {
    const rawData = localStorage.getItem(storageKey)
    const convertedData = JSON.parse(rawData);
    if (convertedData !== null) {
        storageItem = convertedData;
    }
}

document.addEventListener("load", retrieveData())
document.addEventListener("load", displayBooks())

function displayBooks() {
    for (const books of storageItem) {
        makeBook(books.id, books.title, books.author, books.year, books.isComplete, false);
    }
}

function isThisBookRead(book) {
    const bookId = book.parentElement.children[0].innerText;
    const savedBook = bookSearcher(bookId);
    if (savedBook.isComplete == true) {
        savedBook.isComplete = false;
    } else if (savedBook.isComplete == false) {
        savedBook.isComplete = true;
    }
    localStorage.setItem(storageKey, JSON.stringify(storageItem));
}

function completelyDeleteBook(book) {
    const bookId = book.parentElement.children[0].innerText;
    const savedBook = bookSearcher(bookId);
    const bookIndex = storageItem.indexOf(savedBook)
    storageItem.splice(bookIndex, 1);
    localStorage.setItem(storageKey, JSON.stringify(storageItem))
}

function bookSearcher(bookId) {
    for (let book of storageItem) {
        if (book.id == bookId) {
            return book
        }
    }
}

function bookSearcherByTitle(input) {
    let bookList = [];
    let actualinput = new RegExp("^" + input, 'gi');
    console.log(actualinput);
    for (let book of storageItem) {
        if (actualinput.test(book.title)) {
            bookList.push(book);
        }
    }
    console.log(bookList);
    return bookList;
}

function editBookData(bookId, newTitle, newAuthor, newYear) {
    const book = bookSearcher(bookId);
    book.title = newTitle;
    book.author = newAuthor;
    book.year = newYear;
    localStorage.setItem(storageKey, JSON.stringify(storageItem))
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("change", function(){
    let searchresult = bookSearcherByTitle(searchbar.value);
    console.log(searchresult);
/*    const oldbooks = document.getElementsByClassName("book");
    const resultbooks = document.getElementsByClassName("bookresult")
    if (searchresult == []) {
        for (let i = 0; i < oldbooks.length; i++) {
            oldbooks[i].style.display = "initial";
        }
        for (let i = 0; i < resultbooks.length; i++) {
            resultbooks[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < oldbooks.length; i++) {
            oldbooks[i].style.display = "none";
        }
        for (const books in searchresult) {
            makeBook(books.id, books.title, books.author, books.year, books.isComplete, true);
        }
    }*/
});
