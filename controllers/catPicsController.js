const fs = require('fs');
const path = require('path');
// const db = path.join(__dirname, '../database.json');
const datastore = path.join(__dirname, '../datastore/');


const uploadNew = (req, res, next) => {
    const { id } = req.params;
    const imageLocation = datastore + `${id}`;
    const image = req.body;

    const uploadNewErr = 'Error occurred in catPicController.uploadeNew. Check server log for more detail';  

    try {
        if (fs.existsSync(imageLocation)) return next({
                log: `Given ID already in use`,
                message: { err: uploadNewErr },
                status: 409,
            });

        fs.appendFileSync(imageLocation, image, err => {
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

const updateOne = (req, res, next) => {
    const { id } = req.params;
    const newImageData = req.body;
    const imageLocation = datastore + `${id}`;

    const updateOneErr = 'Error occurred in catPicController.updateOneErr. Check server log for more detail';    

    try {
        if (!fs.existsSync(imageLocation)) return next({
            log: 'No image at location indicated by provided ID',
            message: { err: updateOneErr }
        })

        fs.writeFileSync(imageLocation, newImageData, err => {
            if (err) return next({
                log: 'Unable to update image specified by given ID',
                message: { err: updateOneErr }
            });
        });

        res.locals.message = `Updated cat pic: ${id}.`

        return next();
    }
    
    catch (err) {
        return next({
            log: `catPicController.updateOne: ERROR: ${err}`,
            message: { err: updateOneErr },
            status: 400
        });
    }
}

const deleteOne = (req, res, next) => {
    const { id } = req.body;
    const imageLocation = datastore + `${id}`;
    
    const deleteOneErr = 'Error occurred in catPicController.deleteOne. Check server log for more detail';

    try {
        fs.unlinkSync(imageLocation, err => {
            if (err) return next({
                log: 'Unable to delete image specified by given ID',
                message: { err: deleteOneErr }
            })
        });

        res.locals.message = `Successfully deleted cat pic: ${id}`;

        return next();
    }

    catch (err) {
        return next({
            log: `catPicController.deleteOne: ERROR: ${err}`,
            message: { err: deleteOneErr },
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