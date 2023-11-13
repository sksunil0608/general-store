form = document.getElementById("form");
form.addEventListener("submit", addProduct);
getAllProducts();

// Show all the proudcts available on page loading.
function showAllProductsOnPage(response) {
const data = response.data.allProducts
  const form_border = document.getElementById("products");
  let product_data = document.createElement("div");

  product_data.innerHTML = `<table id="table" style="width: 90%; padding: 6px; margin: 30px;">
                      <tr class="border-1">
                        <th class="border-1 text-primary">Product Name</th>
                        <th class="border-1 text-primary">Description</th>
                        <th class="border-1 text-primary">Price</th>
                        <th class="border-1 text-primary">Quantity</th>
                        <th class="border-1 text-primary">Buy1</th>
                        <th class="border-1 text-primary">Buy2</th>
                        <th class="border-1 text-primary">Buy3</th>
                      </tr>
                   </table>`;
  form_border.appendChild(product_data);
  data.forEach((i) => {
    const table = document.getElementById("table");
    // Create a new row
    var newRow = table.insertRow(table.rows.length);
    newRow.id = i.id;

    // Insert cells into the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = i.product_name;
    cell2.innerHTML = i.product_desc;
    cell3.innerHTML = i.product_price;
    cell4.innerHTML = i.product_quantity;
    cell5.innerHTML = ` <button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyProduct(${i.id}, ${1})">
                                Buy1
                            </button>`;
    cell6.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyProduct(${i.id}, ${2})">
                                Buy2
                            </button>`;
    cell7.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyProduct(${i.id}, ${3})">
                                Buy3
                            </button>`;
  });
}
// Show the Added User Data on the Page
function showAddedProduct(response) {
  const data = response.data.allProducts;

  const table = document.getElementById("table");
  // Create a new row
  var newRow = table.insertRow(table.rows.length);
  newRow.id = data.id;
  // Insert cells into the row
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);

  cell1.innerHTML = data.product_name;
  cell2.innerHTML = data.product_desc;
  cell3.innerHTML = data.product_price;
  cell4.innerHTML = data.product_quantity;
  cell5.innerHTML = ` <button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyOne('${data.id}')">
                                Buy1
                            </button>`;
 cell6.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyProduct(${data.id}, ${2})">
                                Buy2
                            </button>`;
    cell7.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="buyProduct(${data.id}, ${3})">
                                Buy3
                            </button>`;
}

function buyProductUIChange(productId,quantity) {
    if (!productId && !quantity) {
      const alertHTML = `<div class="alert alert-danger" role="alert">
     <h5>Please Buy a lower Quantity</h5>
    </div>`;

      const targetElement = document.getElementById("products-heading");
      targetElement.insertAdjacentHTML("afterend", alertHTML);
      return 0;
    }
  const row = document.getElementById(productId);
  const quantityCell = row.querySelector("td:nth-child(4)");
  

  // Update quantity in the UI
  let newQuantity = quantity;
  quantityCell.innerText = newQuantity;

  // Check if the quantity is 0, delete the row
  if (newQuantity === 0) {
    row.remove();
  }
}
// Clears input box after adding/ updatign element.
function emptyAllInputBox() {
  document.querySelector("#product_name").value = "";
  document.querySelector("#product_price").value = "";
  document.querySelector("#product_desc").value = "";
  document.querySelector("#product_quantity").value = "";
}


//-----------------------------------API Calling Starts Here--------------------------------//

// Fetch Product from API
async function getAllProducts() {
  try {
    const response = await axios.get("http://localhost:3000/products");
    showAllProductsOnPage(response);

  } catch (err) {
    console.log(err);
  }
}

// Adding product to Backend API
async function addProduct(event) {
  event.preventDefault();

  const product_name = event.target.product_name.value;
  const product_desc = event.target.product_desc.value;
  const product_price = event.target.product_price.value;
  const product_quantity = event.target.product_quantity.value;
  const obj = {
    product_name,
    product_desc,
    product_price,
    product_quantity,
  };
  try {
    const response = await axios.post("http://localhost:3000/add-product", obj);
    showAddedProduct(response);
    emptyAllInputBox();
  } catch (error) {
    console.log("Error Occured:", error);
  }
}


async function buyProduct(id,qty){
    try{
        const prodId = id;
        const quantity = qty
        const response = await axios.post(
          `http://localhost:3000/product/buy/?prodId=${prodId}&quantity=${quantity}`
        );
        buyProductUIChange(response.data.id,response.data.product_quantity);

    }catch(err){
        console.log(err)
    }
}
async function buyTwo(){
    try{

    }catch(err){
        console.log(err)
    }
}
async function buyThree(){
    try{

    }catch(err){
        console.log(err)
    }
}
