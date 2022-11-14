let data = []
let id;
let modalDiv = document.getElementById("modalBox")
let closeBtn = document.getElementById("modalCloseButton")
closeBtn.addEventListener("click", function (e) {
    let container = document.getElementById("container")
    container.style.opacity = 1
    modalDiv.style.display = "none"
    e.stopPropagation();
})

//Fetching Data of Furniture
function fetchData() {
    fetch("https://mini-server-sam.herokuapp.com/api/furniture")

        .then((res) => res.json())
        .then((d) => {
            data = d;
            appendData(data);
        });
}

fetchData();

//Appending Data of Furniture
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

//WishList Functionality
function wishlistCard(elem) {
    fetch(`https://mini-server-sam.herokuapp.com/api/furniture/${elem.id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch(err => console.log(err))
    let type = elem.type
    let year = elem.year
    let description = elem.description
    let price = elem.price
    let formObject = {
        type: type, year: year, description: description, price: price
    }

    fetch("https://mini-server-sam.herokuapp.com/api/wishlisted", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
        .then(function (res) {
            return res.json()
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

//Delete Functionality
function deleteCard(elem) {

    fetch(`https://mini-server-sam.herokuapp.com/api/furniture/${elem.id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    setTimeout(function () {
        window.location.reload()
    }, 500)

}

//Editing Functionality
let modalForm = document.getElementById("modalForm")
modalForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    let container = document.getElementById("container")
    let editPrice = Number(document.getElementById("modalPrice").value)

    if (editPrice == "") {
        alert("Please Enter The Price")
    }
    else {
        let editObject = {
            price: editPrice
        }

        await fetch(`https://mini-server-sam.herokuapp.com/api/furniture/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editObject)
        })
            .then((res) => {
                console.log(res.json())
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })
        container.style.opacity = 1

    }


})


//Sort By Price Functionality
document.getElementById("sortbyprice").addEventListener("change", sortFunc)

function sortFunc() {
    let sortValue = document.getElementById("sortbyprice").value;

    if (sortValue == "ltoh") {
        data.sort((a, b) => Number(a.price) - Number(b.price));
        return appendData(data)
    }
    if (sortValue == "htol") {
        data.sort((a, b) => Number(b.price) - Number(a.price));
        return appendData(data)
    }
    else {
        appendData(data)
    }
}

//Filter by type Functionality
document.getElementById("selectFilter").addEventListener("change", filterFunc)

function filterFunc() {
    let filterValue = document.getElementById("selectFilter").value;

    if (filterValue == "table") {
        if (data.length > 0) {
            console.log(data)
            let newData = data.filter((e) => e.type == "Table" || e.type == "table");

            appendData(newData);
        }
    }
    else if (filterValue == "bed") {
        if (data.length > 0) {
            let newData = data.filter((e) => e.type == "Bed" || e.type == "bed");
            appendData(newData);
        }
    }
    if (filterValue == "chair") {
        if (data.length > 0) {
            let newData = data.filter((e) => e.type == "Chair" || e.type =="chair");

            appendData(newData);
        }
    }
    else if (filterValue == "sofa") {
        if (data.length > 0) {
            let newData = data.filter((e) => e.type == "Sofa" || e.type == "sofa");
            appendData(newData);
        }
    }
    else if (filterValue == "default") {
        console.log(data)
        console.log(data.length)
        appendData(data)
    }
}
