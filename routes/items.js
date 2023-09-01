const express = require('express');
const router = express.Router();
const Items = require("../models/Items");
var fetchuser = require('../middleware/fetchuser.js');
const { body, validationResult } = require('express-validator');

// get all the items GET  

router.get('/items', async (req, res) => {
    try {
        const items = await Items.find({});
        res.json(items)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal error occured");
    }
})

// add a new items using POST 
router.post('/items', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('address', 'Enter a valid address').isLength({ min: 5 }),
    body('phonenumber', 'Enter a valid phonenumber').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { name,address,phonenumber} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const items = new Items({
            name,address,phonenumber,user: req.body.id
        })
        const savedItems = await items.save()
        res.json(savedItems)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal error occured");
    }
})



// update a items  PUT 

router.put('/items/:id', [
], async (req, res) => {
    const {  name,address,phonenumber} = req.body;
    // create a new newItems object
    const newItems = {};
    if (name) { newItems.name = name };
    if (address) { newItems.address = address };
    if (phonenumber) { newItems.phonenumber = phonenumber };
    // find the items to be updated and update it
    let items = await Items.findById(req.params.id);
    if (!items) { return res.status(404).send("items Found") }

    items = await Items.findByIdAndUpdate(req.params.id, { $set: newItems }, { new: true })
    res.json({ items });
})

//delete a items
router.delete('/items/:id', [
], async (req, res) => {

    // find the items to be delete and delete it
    let items = await Items.findById(req.params.id);
    if (!items) { return res.status(404).send("items Not Found") }

    items = await Items.findOneAndDelete({_id:req.params.id})
    res.json({ "Success" : "items has been Deleted" });
})

module.exports = router;