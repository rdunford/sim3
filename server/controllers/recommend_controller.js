module.exports = {

    filterByCategory: (req, res, next) => {
        console.log('req.body: ',req.body);
        let {category} = req.body.category


        const db = req.app.get('db');
        db.filterByCategory([category]).then(friends =>{
            res.status(200).send(friends);
        }).catch(err => console.log(err));
    },

    addRecommend: (req, res, next) => {
    //     console.log('addRecommend', req.body)
    //     let robotId = req.body.id
    //     req.app.get('db').add_friend([robotId]).then(added =>{
    //         res.status(200).send('Friend added!')
    //     }).catch(err => console.log(err));
    }

}