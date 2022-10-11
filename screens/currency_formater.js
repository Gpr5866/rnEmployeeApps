export function currency(value, isDecimal, valueOnly) {

    let idr = "Rp"

    let formatedValue = ''

    let floatValue = parseFloat(value).toFixed(2)
    // console.log('checkFormatCurrency', floatValue)
    let stringValue = floatValue.toString()
    let splitValue = stringValue.split('.')
    let amount = splitValue[0]
    let decimal = splitValue[1]
    let newValue = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    if (newValue < 0) {
        let absNewValue = Math.abs(newValue)
        formatedValue = absNewValue
    } else {
        formatedValue = newValue
    }

    if (formatedValue && decimal){
        if (isDecimal){
            if (valueOnly) {
                if (floatValue < 0) {
                    return "-" + formatedValue + ',' + decimal
                } else {
                    return formatedValue + ',' + decimal
                }
            } else {
                if (floatValue < 0) {
                    return "-" + idr + "" + formatedValue + ',' + decimal
                } else {
                    return idr + "" + formatedValue + ',' + decimal
                }
            }
        }else{
            if (valueOnly) {
                if (floatValue < 0) {
                    return "-" + formatedValue
                } else {
                    return formatedValue
                }
            } else {
                if (floatValue < 0) {
                    return "-" + idr + "." + formatedValue
                } else {
                    return idr + "." + formatedValue
                }
            }
        }
    }else{
        if (valueOnly) {
            return "-"
        } else {
            return idr + "." + "-"
        }
    }
}