export function formatNL2BR(content) {
    return content.replace(/\n/g, "<br>");
}

export function formatPrice(price) {
    price = parseFloat(price);

    return price ? price.toFixed(2) : '0.00';
}

export function stringToDate(dateString) {

    return new Date(dateString);
}