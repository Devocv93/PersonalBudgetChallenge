import moment from "moment";

const url = "http://192.168.x.x:3300/api";

function ConvertDate(date){   
    return moment(date).format('DD/MM/YYYY')
}

export {
    url, 
    ConvertDate
}