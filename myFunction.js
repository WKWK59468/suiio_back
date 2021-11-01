module.exports = {
  check_session: (req) => {
    return new Promise((resolve, reject) => {
      req.session.sID ? resolve(true) : reject(false);
    });
  },
  check_position: (req) => {
    return new Promise((resolve, reject) => {
      req.session.position ? resolve(req.session.position) : reject(false);
    });
  },
  check_permission: (req) => {
    return new Promise((resolve, reject) => {
      if (req.session.permission !== undefined) {
        resolve(req.session.permission);
      } else {
        reject(false);
      }
    });
  },
};
