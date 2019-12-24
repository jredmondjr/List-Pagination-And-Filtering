/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*******************************************/

const ul = document.querySelector(".student-list");
let studentList = document.querySelectorAll("li");
let searchList = studentList;
const overallPage = document.querySelector(".page")
const itemsPerPage = 10;
let itemsIndex = [];

// gets the max page that is passible on the current list based on the quantity of elements per page
const getMaxPage = () => {
    return Math.ceil(searchList.length / itemsPerPage);
}

let maxPage = getMaxPage();

// sets the items index which is used to determine the starting index of each page for pagination
const setIndex = () => {
    itemsIndex = [];
    for(let i = 0; i < searchList.length; i++){
        if(i % itemsPerPage == 0){
            itemsIndex.push(i);
        }
    }
}

// Adds search input then allows you to filter the results based on the input
const addSearch = () => {
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("student-search");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search for students..."
    const button = document.createElement("button");
    button.textContent = "Search";
    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    overallPage.querySelector(".page-header").appendChild(searchDiv);
    input.addEventListener("keydown", (e) => {
        if(e.keyCode == 13){
            button.click();
        }
    })
    button.addEventListener("click", (e) => {
        searchList = [];
        studentList.forEach(student => {
            inputValid = input.value.trim()
            if(inputValid){
                if (student.querySelector("h3").textContent.toUpperCase().includes(input.value.toUpperCase())){
                    searchList.push(student);
                }
            }
            else{
                searchList.push(student);
            }
        });
        document.querySelector(".pagination").remove();
        addPaginationLinks(1)
    });
    addPaginationLinks(1)
}

// blanks out the page then adds the correct elements to the page
const showPage = (page) => {
    ul.textContent = ""
    pageCount = itemsIndex[page - 1];
    if (!name){
        for(let i = pageCount; i < pageCount + itemsPerPage; i++){
            if(searchList[i]){
            ul.appendChild(searchList[i]);
            }
        }
    }
}


// Creates The Pagination Buttons and adds an event listener to each one
const addPaginationLinks = (page) => {

    setIndex();
    maxPage = getMaxPage();
    currentlyActiveButton = "";

    const buttonUl = document.createElement("ul");
    buttonUl.classList.add("pagination");

    overallPage.appendChild(buttonUl);

    showPage(page);

    for(let i = 1; i <= maxPage; i++){
        const buttonLi = document.createElement("li");
        buttonUl.appendChild(buttonLi);
        const a = document.createElement("a");
        buttonLi.appendChild(a);
        a.textContent = i;
        a.href = "#"
        if(i == page){
            a.classList.add("active");
            currentlyActiveButton = a;
        }
        a.addEventListener("click", (e) => {
            showPage(a.textContent);
            a.classList.add("active");
            currentlyActiveButton.classList.remove("active");
            currentlyActiveButton = a;
        })
        buttonUl.appendChild(buttonLi);
    }
}



addSearch();

