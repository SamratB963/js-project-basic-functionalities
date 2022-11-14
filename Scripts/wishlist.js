let data = []
let id;


//Fetching Data of Wishlisted
function fetchData() {
    fetch("https://mini-server-sam.herokuapp.com/api/wishlisted")

        .then((res) => res.json())
        .then((d) => {
            data = d;
            appendData(data);
        });
}

fetchData();

//Appending Data of Wishlisted
function appendData(data) {
    let container = document.getElementById("container");
    container.innerHTML = null;
    if (data.length == 0) {
        let head = document.createElement("h1");
        head.innerText = "No data found. Enter correct data...";
        container.append(head);
    }
    data.map((elem) => {
        let subdiv = document.createElement("div")
        subdiv.id = "subdiv"
        let imgDiv = document.createElement("div")
        imgDiv.id = "imgContainer"
        let img = document.createElement("img")
        img.src = "https://images.woodenstreet.de/image/data/study-table/amstel-study-table-revised/honey/front-1.jpg"

        let heartIcon = document.createElement("p")
        heartIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`
        heartIcon.addEventListener("click", function () {
            wishlistCard(elem)

        })


        let description = document.createElement("p")
        description.innerText = elem.description


        let price = document.createElement("h5")
        price.innerText = `Rs.  ${elem.price}`


        let deleteBtn = document.createElement("button")
        deleteBtn.id = "deleteBtn"
        deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`
        deleteBtn.addEventListener("click", function () {
            deleteCard(elem)
        })


        let editBtn = document.createElement("button")
        editBtn.id = "editBtn"
        editBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Edit`
        editBtn.addEventListener("click", function () {
            modalDiv.style.display = "block"
            modalDiv.style.position = "absolute"
            container.style.opacity = 0.1
            id = elem.id;
        })

        let br = document.createElement("br")
        imgDiv.append(img, heartIcon)
        subdiv.append(imgDiv, description, price, deleteBtn, editBtn)
        container.append(subdiv)

    })
}