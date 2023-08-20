let movieName = "";
movieName = localStorage.getItem('movieName');
let price = 0;
price = parseInt(localStorage.getItem('price'));
console.log(typeof(price));
document.getElementById("movieName").textContent = movieName;
document.getElementById("price").innerHTML = `₹${price}`;
findPrice()
function findPrice() {
    let ticketNum = parseInt(document.getElementById("numberOfTickets").value);
    let fee = parseFloat(((price * ticketNum) * 1.75 / 100).toFixed(2)); // Parse as float
    document.getElementById("convience-fee").textContent = `₹${fee.toFixed(2)}`; // Display fee with two decimal places
    let subtotal = parseFloat((price * ticketNum).toFixed(2)) + fee; // Parse as float
    document.getElementById("subtotal").innerHTML = `₹${subtotal.toFixed(2)}`; // Display subtotal with two decimal places

}

function goback(){
    window.location.href = 'index.html';
}