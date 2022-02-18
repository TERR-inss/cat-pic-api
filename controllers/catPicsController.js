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

const getAll = (req, res, next) => {
    // dummy func here
    res.json({ message: "GET all pics" });
}

const deleteAll = (req, res, next) => {
    // dummy func
    res.json({ message: "DELETE all pics" });
}

const getOne = (req, res, next) => {
    // dummy func
    res.json({ message: "only GET one pic" });
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
    deleteAll,
    updateOne,
};