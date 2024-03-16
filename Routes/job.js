const express=require('express')
const router=express.Router();
const jobController=require('../Controllers/job')
const {verify}=require('../Middlewares/verifyUser')


router.get('/all-job-details',jobController.get_job_details)
router.get('/all-job-details/filter/:postId',jobController.get_job_details_id)
// router.get('/all-job-details/filter',verify,jobController.get_job_details)
router.post('/post-job',verify,jobController.post_job_detail)
router.patch('/edit-post/:postId',verify,jobController.patch_edit_job_post)

module.exports=router;

// {
//     "companyName": "google",
//     "logoUrl": "xyz",
//     "jobPosition": "xyz",
//     "salary": "xyz",
//     "jobType": "xyz",
//     "locationType": "xyz",
//     "location": "xyz",
//     "jobDescription": "xyz",
//     "about": "xyz",
//     "skills": ["html", "css", "Node.js"],
//     "information": "xyz"
// }