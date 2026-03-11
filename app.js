let cl = console.log

const ProductContainer = document.getElementById("ProductContainer")
const ProductForm = document.getElementById("ProductForm")

const titleControl = document.getElementById("title")
const  descriptionControl = document.getElementById("description")
const imgControl = document.getElementById("img")

let BASE_URL = `https://fakestoreapi.com`
let PRODUCT_URL = `${BASE_URL}/products`

let xhr = new XMLHttpRequest()

xhr.open("GET", PRODUCT_URL, true)

xhr.send()

xhr.onload = function () {

    if (xhr.status >= 200 && xhr.status <= 299) {

        let data = JSON.parse(xhr.response)

        cl(data)

        Productcreate(data)

    }

}



const Productcreate = (arr) => {

    let result = ""

    for (let i = arr.length - 1; i >= 0; i--) {

        result += `

<div class="col-md-4 mb-3"id="${arr[i].id}">

<div class="card h-100 cardColor movieCard">

<figure>

<img src="${arr[i].image}" class="IMGCard">

<figcaption class="info">

<h6>${arr[i].title}</h6>

<p>$${arr[i].price}</p>

<p>${arr[i].description}</p>

</figcaption>

</figure>
   <div class="card-footer d-flex justify-content-between">
            <button  onclick="onEdit(this)" class="btn btn-primary">Edit</button>
            <button  onclick="onRemove(this)"  class="btn btn-danger">Remove</button>
           </div>

</div>

</div>

`

    }

    ProductContainer.innerHTML = result

}



function onProductForm(eve) {

    eve.preventDefault()

    let Product_obj = {

        title: titleControl.value,

        description: descriptionControl.value,

        image: imgControl.value,

        price: 100

    }

    cl(Product_obj)

    let xhr = new XMLHttpRequest()

    xhr.open("POST", PRODUCT_URL, true)

    xhr.send(JSON.stringify(Product_obj))

    xhr.onload = function () {

        if (xhr.status >= 200 && xhr.status <= 299) {

            let data = JSON.parse(xhr.response)

            cl(data)

        }

    }



    let col = document.createElement("div")

    col.className = `col-md-4 mb-3`

    col.innerHTML = `

<div class="card h-100 cardColor movieCard">

<figure>

<img src="${Product_obj.image}" class="IMGCard">

<figcaption class="info">

<h6>${Product_obj.title}</h6>

<p>$${Product_obj.price}</p>

<p>${Product_obj.description}</p>

</figcaption>

</figure>
   <div class="card-footer d-flex justify-content-between">
            <button onclick="onEdit(this)" class="btn btn-primary">Edit</button>
            <button  onclick="onRemove(this)"class="btn btn-danger">REMOVE</button>
           </div>

</div>

</div>

`

    ProductContainer.prepend(col)

    ProductForm.reset()

}





function onEdit(ele){
    let EDIT_ID=ele.closest('.col-md-4').id
    cl(EDIT_ID)

    let EDIT_URL=`${BASE_URL}/products/${EDIT_ID}`
    cl(EDIT_URL)
    let xhr=new XMLHttpRequest()
    xhr.open("GET",EDIT_URL,true)
    xhr.send()
    xhr.onload= function(){
        if(xhr.status>=200 && xhr.status<=300){
  let EDIT_OBJ=JSON.parse(xhr.response)
        titleControl.value=EDIT_OBJ.title,
      descriptionControl.value=EDIT_OBJ.description,
        imgControl.value=EDIT_OBJ.image
        }
      
    }
}






 function onRemove(ele){
    let REMOVE_ID=ele.closest('.col-md-4').id
    let REMOVE_URL=`${BASE_URL}/products/${REMOVE_ID}`
    cl(REMOVE_URL)
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
      ele.closest('.col-md-4').remove()
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
  

 }
ProductForm.addEventListener("submit", onProductForm)