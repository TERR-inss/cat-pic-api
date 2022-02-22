const express = require('express');
const router = express.Router();
const catPicsController = require('../controllers/catPicsController');

router.post('/catPics', catPicsController.uploadNew, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.get('/catPics/:name', catPicsController.getOne, (req, res) => {
    if (res.locals.message) {
        console.log('test -> if');
        return res.status(200).json(res.locals.message);
    }
    else {
        console.log('test -> else');
        return res.status(200).send(res.locals.pic);
    } 
});

router.get('/catPics', catPicsController.getAll, (req, res) => {
    return res.status(200).json(res.locals.pics);
});

router.put('/catPics/:name', catPicsController.updateOne);

router.delete('/catPics/:name', catPicsController.deleteOne);

module.exports = router;