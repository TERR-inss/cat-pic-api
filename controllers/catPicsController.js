const fs = require('fs');
const path = require('path');
// const db = path.join(__dirname, '../database.json');
const datastore = path.join(__dirname, '../datastore/');


const uploadNew = async (req, res, next) => {
    const { id } = req.params;
    const imageLocation = datastore + `${id}`;
    const image = req.body;

    const uploadNewErr = 'Error occurred in catPicController.uploadeNew. Check server log for more detail';  

    try {
        await fs.open(imageLocation, err => {
            if (err) return;
            else return next({
                log: `Given ID already in use`,
                message: { err: uploadNewErr },
                status: 409,
            });
        });

        await fs.appendFile(imageLocation, image, err => {
            if (err) return next({
                log: `catPicController.uploadNew: ERROR: ${err}`,
                message: { err: uploadNewErr },
            });
        });

        res.locals.message = 'Image upload confirmed';

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.uploadNew: ERROR: ${err}`,
            message: { err: uploadNewErr },
            status: 400,
        });
    }
}

const getOne = (req, res, next) => {
    const { id } = req.params;
    const imageLocation = datastore + `${id}`;

    const getOneErr = 'Error occurred in catPicController.getOne. Check server log for more detail';

    try {           
        res.locals.pic = fs.readFileSync(imageLocation, (err, data) => {
            if (err) return next({
                log: 'Error attempting to read file at specified location',
                message: { err: getOneErr },
                status: 404,                    
            });
        });

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.getOne: ERROR: ${err}`,
            message: { err: getOneErr },
            status: 400,
        });
    }
}

const getAll = async (req, res, next) => {

    const getAllErr = 'Error occurred in catPicController.getAll. Check server log for more detail';

    try {
        const dir = fs.opendirSync(datastore, (err, dir) => {
            if (err) return next({
                log: `Error attempting to open directory of pics`,
                message: { err: getAllErr },
            });
        });

        console.log(dir);

        const listOfPics = [];

        for await (const dirent of dir) {
            listOfPics.push(dirent.name);
        }

        res.locals.list = listOfPics;

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.getAll: ERROR: ${err}`,
            message: {
                err: 'Error occurred in catPicController.getAll. Check server log for more detail',
            },
            status: 400,
        });
    }
}

const deleteOne = async (req, res, next) => {
    const { id } = req.body;

    try {
        const dbData = JSON.parse(fs.readFileSync(db));
        delete dbData[id];
        fs.writeFileSync(db, JSON.stringify(dbData));

        res.locals.message = `Successfully deleted cat pic: ${id}`;

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.deleteOne: ERROR: ${err}`,
            message: {
                err: 'Error occurred in catPicController.deleteOne. Check server log for more detail',
            },
            status: 400
        });
    }
}

const updateOne = async (req, res, next) => {
    const { id, image } = req.body;

    try {
        // here we read the database and parse it to return the object containing all the data
        const dbData = await JSON.parse(fs.readFileSync(db));
        // assign the current id as the label for storing the new image
        dbData[id] = image;
        // rewrite the database file with its new key value included
        fs.writeFileSync(db, JSON.stringify(dbData));

        res.locals.message = `Updated cat pic: ${id}.`

        return next();
    }
    
    catch (err) {
        return next({
            log: `catPicController.updateOne: ERROR: ${err}`,
            message: {
                err: 'Error occurred in catPicController.updateOne. Check server log for more detail',
            },
            status: 400
        });
    }
}

module.exports = {
    uploadNew,
    getOne,
    getAll,
    updateOne,
    deleteOne,
};