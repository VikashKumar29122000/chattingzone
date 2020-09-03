const moment =require('moment');



module.exports=function formatMessage(username,message){
    return {
        username:username,
        message:message,
        time:(moment().utcOffset()== -0)?moment(Date.now()+19800000).format('h:mm a'):moment(Date.now()).format('h:mm a')
    }
}