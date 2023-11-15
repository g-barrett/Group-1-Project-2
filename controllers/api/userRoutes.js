const router = require('express').Router();
const { User, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// Get restaurants liked by user

router.get('/', withAuth, async (req, res) => { 
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Likes }],
        });
        const user = userData.get({ plain: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});




// Create a new like

// router.post('/', withAuth, async (req, res) => {
//     try {
//         const newLike = await Likes.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(newLike);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });