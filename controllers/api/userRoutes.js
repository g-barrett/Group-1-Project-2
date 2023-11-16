// const router = require('express').Router();
// const { User, Likes } = require('../../models');
// const withAuth = require('../../utils/auth');

// // Get restaurants liked by user

// router.get('/', withAuth, async (req, res) => { 
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             include: [{ model: Likes }],
//         });
//         const user = userData.get({ plain: true });
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// module.exports = router;
