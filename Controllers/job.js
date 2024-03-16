const JobDetail=require('../Models/Job')

// const get_job_details = async (req, res) => {
//     try {
//         const allJobDetails =await JobDetail.find({})
//         res.status(200).json(allJobDetails)
//     } catch (error) {
//         res.json({errorMeassge:error})
//     }
// }

const get_job_details_id = async (req, res) => {
    try {
      const postId = req.params.postId;
        const jonPost=await JobDetail.findById(postId)
        res.json(jonPost)
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  };
  
const get_job_details=async (req,res)=>{
try {

   const {company, skills}=req.query

    const queryObject={};

    if(company){
        // queryObject.companyName=company;
        queryObject.companyName={$regex:company,$options:"i"}
    }

    if (skills) {
        const skillsArray = skills.split(',');
        queryObject.skills = {
            $in: skillsArray.map(skill => new RegExp(skill, 'i')),
          };
      }
      

    const filterDetails=await JobDetail.find(queryObject)
    res.json({filterDetails})

} catch (error) {
    res.json({ errorMessage: error.message });

}

}  

const post_job_detail =async (req, res) => {
try {
    const {companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        locationType,
        location,
        jobDescription,
        about,
        skills,
        information}=req.body
    
    if(
        !companyName||
        !logoUrl||
        !jobPosition||
        !salary||
        !jobType||
        !locationType||
        !location||
        !jobDescription||
        !about||
        !skills||
        !information
    ){
        return res.json({message:'Fill all details!'}).status(400)
    }

    const jobDetails=new JobDetail({
        companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        locationType,
        location,
        jobDescription,
        about,
        skills,
        information,
    })

    await jobDetails.save()
    res.json({message:'job post created'}).status(201)

} catch (error) {
    res.json({errorMeassge:error})
}
}

const patch_edit_job_post=async(req,res)=>{
    try {
        const postId=req.params.postId;
        const existingPost=await JobDetail.findById(postId)
        if(!existingPost){
            return res.json({message:'job post not founnd'}).status(404)
        }

        const {
        companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        locationType,
        location,
        jobDescription,
        about,
        skills,
        information,
        }=req.body

        if(
            !companyName||
            !logoUrl||
            !jobPosition||
            !salary||
            !jobType||
            !locationType||
            !location||
            !jobDescription||
            !about||
            !skills||
            !information
        ){
            return res.json({message:'Fill all details!'}).status(400)
        }else{
           const updatedJobPost= await JobDetail.findByIdAndUpdate({_id:postId},{
                companyName,
                logoUrl,
                jobPosition,
                salary,
                jobType,
                locationType,
                location,
                jobDescription,
                about,
                skills,
                information,
                },{ new: true })

            res.json(updatedJobPost).status(200)
        }

    } catch (error) {
        res.json({errorMeassge:error})

    }
}

module.exports = {
    get_job_details,
    post_job_detail,
    get_job_details_id,
    patch_edit_job_post,
    // get_filter_job
}