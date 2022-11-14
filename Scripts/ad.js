let data = []
let modalDiv = document.getElementById("modalBox")
let closeBtn = document.getElementById("modalCloseButton")
closeBtn.addEventListener("click",function(e){
    modalDiv.style.display = "none"
    e.stopPropagation();
})

let formSub = document.getElementById("adsForm")
formSub.addEventListener("submit", myFormSubmit);

function myFormSubmit(e){
    e.preventDefault();

    let type = document.getElementById("typeTag").value;
    let year = document.getElementById("yearTag").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;

    if(type =="default" || year == "default" || description == "" || price == ""){
        alert("Please fill all details")
    }
    else{
        let formObject = {
            type:type, year:year, description:description, price:price
        }
        console.log(formObject)

        fetch("https://mini-server-sam.herokuapp.com/api/furniture", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(function(res){
            return res.json()
        })
        .then(data =>console.log(data))
        .catch(err => console.log(err))
        modalDiv.style.display = "block"
        modalDiv.style.position = "absolute"
    }
}
let modalFormSub = document.getElementById("modalForm")
modalFormSub.addEventListener("submit",modalFormSubmit)
function modalFormSubmit(e){
    e.preventDefault()
    let otp = document.getElementById("otpInput").value;
    if(otp != "1234"){
        alert("Wrong OTP")
    }
    else {
        window.location.href = "products.html"
    }
    
}