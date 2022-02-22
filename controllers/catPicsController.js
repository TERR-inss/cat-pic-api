const CatPic = require('../models/catPicModel');

const uploadNew = async (req, res, next) => {
    try {
        await CatPic.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
        });

        res.locals.message = 'Successfully uploaded cat pic';

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
};

const getAll = async (req, res, next) => {
    try {
        res.locals.pics = await CatPic.find({});

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

const getOne = async (req, res, next) => {
    const { name } = req.params;

    try {     
        res.locals.pic = await CatPic.findOne({ "name": name });

        if (res.locals.pic === null) return next({
            log: 'Specified cat pic not found',
            message: {
                err: 'Could not find the requested resource'
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

const deleteOne = (req, res, next) => {
    // dummy func
    res.json({ message: "only DELETE one" });
}

const updateOne = (req, res, next) => {
    // dummy func
    res.json({ message: "UPDATE one pic"});
}

module.exports = {
    uploadNew,
    getAll,
    getOne,
    deleteOne,
    updateOne,
};