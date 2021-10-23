const eventsModels = require('../models/events.model');



class eventsController {
    add = (req, res) => {
        const body = req.body;
        const sID = body.sID;
        const content = body.content;
        const type = body.type;
        const objectID = body.objectID;

        eventsModels.add(sID, content, type, objectID).then(() => {
            res.status(201).json({ 'result': true });
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            res.status(500).json({ 'result': err });
            return new Promise((resolve, reject) => { });
        })
    }
    fetchOfficer = (req, res) => {
        eventsModels.fetch_officer().then((officer_sID) => {
            res.status(200).json({ 'result': officer_sID });
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            res.status(500).json({ 'result': err });
            return new Promise((resolve, reject) => { });
        })
    }
    fetchComment = (req, res) => {
        const params = req.params;
        const sID = params.sID;

        eventsModels.fetch_comment(sID).then((result) => {
            res.status(200).json(result);
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            res.status(500).json({ 'result': err });
            return new Promise((resolve, reject) => { });
        })
    }
}

module.exports = new eventsController();