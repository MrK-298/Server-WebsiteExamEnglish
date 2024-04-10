module.exports = {
    ResRend: function (res, success, data) {
       if(success){
        res.send({
            success: success,
            data: data
        });
       }else{
        res.status(404).send({
            success: success,
            data: data
        });
       }
    }
}