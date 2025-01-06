const {Router} = require('express');
const routeController = require('../controllers/routeController')
const router = Router();

router.post('/votersignup', routeController.votersignup_post);
router.post('/voterlogin', routeController.voterlogin_post);
 router.get('/profile',routeController.profile_get);
 router.post('/adminsignup',routeController.adminsignup_post);
 router.post('/adminlogin',routeController.adminlogin_post);
 //router.get('/profile',routeController.profile_get);
 router.post('/create-contestant', routeController.Contestant_post);
 router.post('/create-poll',routeController.Poll_post);
 router.get('/adminhome/view-results',routeController.Result_get);
 router.get('/view-poll',routeController.Poll_get);
 router.delete('/delete-poll/:id',routeController.Poll_delete);
 router.post('/logout',routeController.logout_post);
 router.get('/vote_status/:id',routeController.Vote_Status_get);
 router.put('/cast_vote',routeController.Cast_Vote_put);
 router.delete('/adminhome/delete-contestant/:id',routeController.Contestant_delete);
 //router.get('/admin_profile/:id',routeController.Admin_name_get);

module.exports = router;