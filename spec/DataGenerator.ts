
export let configData = {
    countString: 20,
    rangeNumber: 10000,
};

export function randomNumber() {
    return Math.floor(Math.random() * configData.rangeNumber);
}

export function randomString() {
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    configData.rangeNumber = alphaChars.length;
    for (var i = 0; i < configData.countString; i++) {
        generatedString += alphaChars[randomNumber()];
    }

    return generatedString.toLowerCase();
}

export function randomBoolean() {
    return (Math.floor(Math.random() * configData.rangeNumber) % 2) ? true : false;
}

export function randomDate() {
    return new Date().toISOString();
}

export function randomArray(array) {
    let result: any = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'object' && array[i] !== null && !Array.isArray(array[i]) && array[i] instanceof Date == false)
            result.push(generateData(array[i]));
        else if (Array.isArray(array[i]))
            result.push(randomArray(array[i]));
        else
            result.push(randomprimitiveData(array[i]));
    }
    return result;
}

function randomprimitiveData(type) {
    if (type == 'string' || type == 'Strnig' || (typeof type == 'string' && type != 'number' && type != 'Number' && type != 'boolean' && type != 'Boolean' && type != 'date' && type != 'Date'))
        return randomString();
    if (typeof type == 'number' || type == 'number' || type == 'Number')
        return randomNumber();
    if (typeof type == 'boolean' || type == 'boolean' || type == 'Boolean')
        return randomBoolean();
    if (type == 'date' || type == 'Date' || type instanceof Date)
        return randomDate();
    if (Array.isArray(type))
        return randomArray(type);
    if (typeof type === 'object' && type !== null && !Array.isArray(type) && type instanceof Date == false)
        return generateData(type);
    if (type == null || type == 'Null')
        return null;
}

function generateData(object) {
    let result = {};
    let keys = Object.keys(object);
    let values = Object.values(object);
    let type;
    for (let i = 0; i < keys.length; i++) {
        type = values[i];
        if (type == 'string' || type == 'Strnig' || (typeof type == 'string' && type != 'number' && type != 'Number' && type != 'boolean' && type != 'Boolean' && type != 'date' && type != 'Date'))
            result[keys[i]] = randomString();
        if (type == 'number' || type == 'Number' || typeof type == 'number')
            result[keys[i]] = randomNumber();
        if (type == 'boolean' || type == 'Boolean' || typeof type == 'boolean')
            result[keys[i]] = randomBoolean();
        if (type == 'date' || type == 'Date' || type instanceof Date)
            result[keys[i]] = randomDate();
        if (Array.isArray(type))
            result[keys[i]] = randomArray(type);
        if (typeof type === 'object' && type !== null && !Array.isArray(type) && type instanceof Date == false)
            result[keys[i]] = generateData(type);
        if (type == null || type == 'Null')
            result[keys[i]] = null;
    }
    return result;
}

function findProperty(object, properties = {}) {
    let keys = Object.keys(properties);
    let values = Object.values(properties);
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (object.hasOwnProperty(keys[i]))
            object[keys[i]] = values[i];
    }
    return object;
}

export function mockResult(object, count = 1, properties = {}) {
    // let obj = createObj(object);
    let result: any = [];
    if (count > 1) {
        for (let i = 0; i < count; i++) {
            result.push(generateData(object));
            if (Object.keys(properties).length > 0) {
                result[i] = findProperty(result[i], properties);
                result.splice(result.indexOf(result[i]), 1, result[i]);
            }
        }
    } else {
        result = generateData(object);
        if (Object.keys(properties).length > 0)
            result = findProperty(result, properties);
    }


    return result;
}

export function mockPageListResult(object, count = 1, properties = {}) {
    // let obj = createObj(object);
    let result: any = [];
    let finalResult: any;
    let tServiceModel = { result: {}, message: 'string', error: 'string', hasError: 'boolean', refrenceId: 'string', };
    let pageListModel = { indexFrom: 'number', pageIndex: 'number', pageSize: 'number', totalCount: 'number', totalPages: 'number', items: [], hasPreviousPage: 'boolean', hasNextPage: 'boolean', };

    let serviceResult: any;
    finalResult = generateData(tServiceModel);
    serviceResult = generateData(pageListModel);
    for (let i = 0; i < count; i++) {
        result.push(generateData(object));
        if (Object.keys(properties).length > 0) {
            result[i] = findProperty(result[i], properties);
            result.splice(result.indexOf(result[i]), 1, result[i]);
        }
    }
    serviceResult.items = result;

    if (Object.keys(properties).length > 0) {
        finalResult = findProperty(finalResult, properties);
        serviceResult = findProperty(serviceResult, properties);
    }

    Object.assign(finalResult.result, serviceResult);
    return finalResult;
}

export function mockTServiceResult(object, properties = {}) {
    // let obj = createObj(object);
    let finalResult: any;
    let model: any;
    let tServiceModel = { result: {}, message: 'string', error: 'string', hasError: 'boolean', refrenceId: 'string' };

    finalResult = generateData(tServiceModel);
    if (typeof object == 'string') {
        finalResult.result = randomString();
    } else {
        model = generateData(object);

        if (Object.keys(properties).length > 0) {
            finalResult = findProperty(finalResult, properties);
            model = findProperty(model, properties);
        }
        if (!properties.hasOwnProperty('result')) {
            Object.assign(finalResult.result, model);
        }
    }
    return finalResult;
}


// export function createObj(model) {
//     let object = {};
//     for (let i = 0; i < Object.values(model).length; i++) {
//         object[Object.keys(model)[i]] =  model[Object.keys(model)[i]];

//         if (Array.isArray(model[Object.keys(model)[i]])) {
//             object[Object.keys(model)[i]] = model[Object.keys(model)[i]];
//         }
//         if (typeof model[Object.keys(model)[i]] === 'object' &&  model[Object.keys(model)[i]] !== null && !Array.isArray(model[Object.keys(model)[i]])) {
//             object[Object.keys(model)[i]] = model[Object.keys(model)[i]];
//         }
//     }
//     return object;
// }
