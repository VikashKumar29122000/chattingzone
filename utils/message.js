const moment =require('moment');


module.exports=function formatMessage(username,message){
    return {
        username:username,
        message:message,
        time:moment().format('h:mm a')
    }
}