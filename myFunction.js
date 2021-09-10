module.exports = {
    check_session: (req) => {
        return new Promise((resolve, reject) => {
            req.session.sID ? resolve(true) : reject(false)
        });
    },
    check_position: (req) => {
        return new Promise((resolve, reject) => {
            req.session.position ? resolve(req.session.position) : reject(false)
        });
    },
    check_permission: (req) => {
        return new Promise((resolve, reject) => {
            req.session.permission ? resolve(req.session.permission) : reject(false)
        });
    }
}