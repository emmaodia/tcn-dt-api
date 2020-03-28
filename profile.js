const express = require('express');
const Profile = require('./profile-model');
const router = express.Router();

router.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
  });
  

router.get('/:profile', async(req, res) => {

    try {
        const profile = await Profile.findById(req.params.profile);

        if(!profile) {
            return res.status(404).json({
              message : "Profile not found!"
            })
          }
    
        res.status(200).json({
                                firstName: profile.firstName,
                                lastName: profile.lastName,
                                specialty: profile.specialty,
                                experience: profile.experience,
                                cv: profile.cv,
                                workAt: profile.workAt,
                                email: profile.email
                            })
    
        return console.log(profile);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
   
})


router.get('/', async(req, res) => {

    try {

        const profile = await Profile.find();
        const response = await profile.map(profile => {
            return {
                _id: profile._id,
                firstName: profile.firstName,
                lastName: profile.lastName,
                specialty: profile.specialty,
                experience: profile.experience,
                cv: profile.cv,
                workAt: profile.workAt,
                email: profile.email
            }
        })
        res.status(200).json({response});
        console.log(response)
    }catch(error) {
        console.log(error)
        res.status(500).json(error);
    } 
})

router.post('/create', async(req, res) => {
    try {
        const {firstName, lastName, specialty, experience, cv, workAt } = req.body;
        const profile = new Profile({firstName, lastName, specialty, experience, cv, workAt });

        const response = await profile.save();

        res.status(200).json(response);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
})

router.patch('/:profile', async(req, res) => {

    try {
        const profile = await Profile.findOneAndUpdate({ _id: req.params.profile }, req.body);

    res.status(200).json({
        firstName: profile.firstName,
        lastName: profile.lastName,
        specialty: profile.specialty,
        experience: profile.experience,
        cv: profile.cv,
        workAt: profile.workAt,
        email: profile.email
    })

    return console.log(profile);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
    
})

router.delete('/:profile', async(req, res) => {
    try {
        const id = req.params.profile;

    const profile = await Profile.remove({ _id : id })
    
    res.status(200).json({ msg: "Profile has been deleted!" })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
    
})


module.exports = router;
