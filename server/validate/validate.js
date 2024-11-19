exports.theValueExist = function(value) {
    if ((value == '') || (value == null) || (value == undefined) || (value == [])) {
        return false;
    } else {
        return true;
    }
};

