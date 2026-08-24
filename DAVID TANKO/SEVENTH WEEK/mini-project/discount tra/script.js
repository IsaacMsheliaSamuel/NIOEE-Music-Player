let product = document.querySelector("#product");
let price = document.querySelector("#price");
let discount = document.querySelector("#discount");
let screen = document.querySelector(".screen");

function discount_amount() {
    let product_Name = product.value;
    let product_Price = Number(price.value);
    let product_Discount = Number(discount.value);
    if (product_Name === "" || product_Price <= 0 || product_Discount < 0) {
        screen.textContent="Please enter valid details.";screen.style.color= "red";
        return;
    }
    let discountAmount = product_Price * (product_Discount / 100);
    let Finalprice = product_Price - discountAmount;
    let Totalsaving = product_Price * (product_Discount/100)
    screen.innerHTML = `
        <div style="border:2px solid black;border-radius:8px;width: 500px;height:50px;text-align:center";padding-top:20px;margin-left:20px;hover" class="card">
        Product: ${product_Name}</div>
        <br>
        <div style="border:2px solid black;border-radius:8px;width: 500px;height:50px;text-align:center";padding-top:20px;margin-left:20px" class="card">
        Original Price: $${product_Price}
        </div>
        <br>
        <div style="border:2px solid black;border-radius:8px;width: 500px;height:50px;text-align:center";padding-top:20px;margin-left:20px" class="card">
        Discount: $${discountAmount}<br>
        </div>
        <br>
        <div style="border:2px solid black;border-radius:8px;width: 500px;height:50px;text-align:center";padding-top:20px;margin-left:20px" class="card">
        Final price: $${Finalprice}
        </div>
        <br>
        <div style="border:2px solid black;border-radius:8px;width: 500px;height:50px;text-align:center";padding-top:20px;margin-left:20px" class="card">
        Total Saving: $${Totalsaving}
        </div>
    `;
}
function save(){
    event.preventDefault();
    var product = document.getElementById("product").value;
    var price = document.getElementById("price").value;
    var discount = document.getElementById("discount").value + "%";
    localStorage.setItem('product:',product);
    localStorage.setItem('product price:',price);
    localStorage.setItem('product:',discount);
}
