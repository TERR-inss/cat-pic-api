const fs = require('fs');
const path = require('path');
const db = path.join(__dirname, '../database.json');

// let id = 0;

const uploadNew = async (req, res, next) => {
    const { id, image } = req.body;

    try {
        // here we read the database and parse it to return the object containing all the data
        const dbData = await JSON.parse(fs.readFileSync(db));
        // assign the current id as the label for storing the new image
        dbData[id] = image;
        // rewrite the database file with its new key value included
        fs.writeFileSync(db, JSON.stringify(dbData));

        res.locals.message = 'Image upload confirmed';

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.uploadNew: ERROR: ${err}`,
            message: {
                err: 'Error occurred in catPicController.uploadNew. Check server log for more detail',
            },
            status: 400,
        });
    }
}

const getOne = async (req, res, next) => {
    const { id } = req.params;

    try {           
        res.locals.pic = await JSON.parse(fs.readFileSync(db))[id];

        if (res.locals.pic === undefined) return next({
            log: 'Specified cat pic not found',
            message: {
                err: 'Could not return the requested resource'
            },
            status: 404
        });

        else return next();
    }

    catch (err) {
        return next({
            log: `catPicController.getOne: ERROR: ${err}`,
            message: {
                err: 'Error occurred in catPicController.getOne. Check server log for more detail',
            },
            status: 400,
        });
    }
}

const getAll = async (req, res, next) => {
    try {
        res.locals.pics = fs.readFileSync(db);
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
    getAll,
    getOne,
    deleteOne,
    updateOne,
};