module.exports = {
    
    getFriends: (req, res, next) => {
        req.app.get('db').get_recfriends().then(resp =>{
            res.status(200).send(resp);
        }).catch(err => console.log(err))
    },

    addFriend: (req, res, next) => {

    },

    removeFriend: (req, res, next) => {

    }
}