import moment from 'moment';

export function formatNL2BR(content) {
    return content.replace(/\n/g, "<br>");
}

export function formatPrice(price) {
    price = parseFloat(price);

    return price ? price.toFixed(2) : '0.00';
}

export function stringToDate(dateString, formatString = 'YYYY-MM-DD HH:mm:ss') {

    return moment(dateString, formatString).toDate();
}

export function dateToString(date = new Date(), formatString = 'YYYY-MM-DD HH:mm:ss') {

    return moment(date).format(formatString);
}

export function capilatizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}