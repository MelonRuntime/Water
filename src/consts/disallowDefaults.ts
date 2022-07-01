const actionDefaultDisallows = (except: string[] = []) => {
    let values = {
        "DROP": true,
        "SELECT": true,
        "DELETE": true,
        "UPDATE": true,
        "TRUNCATE": true
    };

    let result = {};

    Object.entries(values).forEach((value) => {
        if(!except.includes(value[0])) {
            result[value[0]] = value[1];
        }
    });
    
    return result;
};

const queryDefaultDisallows = (except: string[] = []) => {
    let values = {
        "DROP": false,
        "DELETE": false,
        "UPDATE": false,
        "TRUNCATE": false
    };

    let result = {};

    Object.entries(values).forEach((value) => {
        if(!except.includes(value[0])) {
            result[value[0]] = value[1];
        }
    });
    
    return result;
};

export { actionDefaultDisallows, queryDefaultDisallows }