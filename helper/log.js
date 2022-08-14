const DEBUG = true;

//LOG : Logs to the console
function LOG(msg) {
    if(!DEBUG) return;

    console.log(msg);
}



module.exports = {
    LOG,
}