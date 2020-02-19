function multChange() {
    const price = document.querySelector(".rent-price").innerHTML
    const days = document.querySelector(".rent-days-input").value
    const mult = price * days
    document.querySelector(".rent-price-sum").value = mult
}

document.querySelector(".rent-days-input").addEventListener("input", multChange)
document.addEventListener("load", multChange())