const moment =require('moment');

// fixed for heroku sever 
if (moment().utcOffset() == -0){
    // for server
    tms += 28800000
}

module.exports=function formatMessage(username,message){
    return {
        username:username,
        message:message,
        time:(moment().utcOffset()== -0)?moment(Date.now()+28800000).format('h:mm a'):moment(Date.now()).format('h:mm a')
    }
}