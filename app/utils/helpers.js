exports.randomInt = (min, max)=>{
    return Math.floor((Math.random()*max)+min)
}

exports.fileFilter = (req, file, cb)=>{
    if(file.mimetype == 'image/jpeg'){
        cb(null, true);
    }else{
        cb('Only jpeg File is Supported!', false);
    }
}