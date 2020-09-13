function calcCost(obj) {
    var sum = 0;
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            sum += calcCost(obj[i]);
        } else if (i == "cost") {
            sum += obj[i];
        }
    }
    return sum;
}