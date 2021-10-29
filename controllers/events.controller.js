const eventsModels = require('../models/events.model');

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.timestamp.getFullYear();
        const Month = ((element.timestamp.getMonth() + 1) < 10) ? "0" + (element.timestamp.getMonth() + 1) : (element.timestamp.getMonth() + 1);
        const Date = (element.timestamp.getDate() < 10) ? "0" + element.timestamp.getDate() : element.timestamp.getDate();
        element.timestamp = Year + "-" + Month + "-" + Date;
    });
    return res;
}

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

        eventsModels.fetch_comment(sID).then(async (result) => {
            result = await dateFormat(result);
            res.status(200).json(result);
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            if (err === "There is nothing to show.") {
                res.status(404).json({ 'result': err });
                return new Promise((resolve, reject) => { });
            } else {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => { });
            }
        })
    }
}

module.exports = new eventsController();