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
 router.post('/voter/register_poll', routeController.RegisterPoll_post);
 router.get('/requests',routeController.Requests_get);
 router.post('/accept_request', routeController.Accept_request_post);
 router.delete('/reject_request',routeController.Reject_request_delete);
 router.post('/send-otp',routeController.SendOtp_post);
 router.post('/verify-otp',routeController.VerifyOtp_post);
 router.post('/send-admin-otp',routeController.SendAdminOtp_post);
 router.post('/verify-admin-otp',routeController.VerifyAdminOtp_post);
 //router.get('/admin_profile/:id',routeController.Admin_name_get);
 router.put('/voter-Account-edit/:id',routeController.Edit_Voter_Account_put);
 router.delete('/voter-delete-account/:id',routeController.Voter_delete_Account);
 router.put('/admin-Account-edit/:id',routeController.Edit_Admin_Account_put);
 router.post('/compare',routeController.CompareImages_post);
 router.post('/verifyadmin',routeController.VerifyAdmin_post);
 router.post('/verify_voter',routeController.VerifyVoter_post);

module.exports = router;