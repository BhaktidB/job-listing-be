const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// login error handling
const errorHandling = (err) => {
    const errors = {
        email: '',
        password: ''
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Incorrect Email'
        return errors
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect Password'
        return errors
    }

    // validate unique
    if (err.code === 11000) {
        errors.email = 'User already exists'
        return errors
    }

    console.log(err.message, err.code)
    return errors
}

// reg errors
const RegErrorHandling=(err)=>{
    const errors = {
        name:'',
        email: '',
        password: ''
    }
// validate unique
if (err.code === 11000) {
    errors.email = 'User already exists'
    return errors
}

if (err.message === 'Password must be at least 6 characters long') {
     errors.password=err.message
     return errors
}

if (err.message === "user already exists") {
    errors.email='User already exists'
    return errors
}

}

// create token
const maxAge = 24 * 60 * 60 * 3;
const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
}

// register 
const register_post = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                errorMeassge: "Enter credentials"
            })
        }
        if(password.length < 6) {
            res.status(400);
            throw Error('Password must be at least 6 characters long');
            }

        const isExisting = await User.findOne({
            email: email
        })
        if (isExisting) {
             res.status(409)
            throw Error("user already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const userData = new User({
            name,
            email,
            password: hashPassword
        })

        await userData.save()
        res.json(userData)

    } catch (error) {
        const errors = RegErrorHandling(error)
        res.json({
            errors
        })
    }

}

// login
// const login_post = async (req, res) => {
//     try {
//         const {
//             email,
//             password
//         } = req.body;
//         if (!email || !password) {
//             throw Error("Credentials required")
//         }
//         const isExisting = await User.findOne({
//             email: email
//         })
//         if (isExisting) {
//             const matchPassword = await bcrypt.compare(password, isExisting.password)
//             if (matchPassword) {
//                 const token = createToken(isExisting._id)
//                 res.cookie('jwt', token, {
//                     httpOnly: true,
//                     maxAge: maxAge * 1000
//                 })
//                 res.json({
//                     message: 'logged',
//                     name: isExisting.name,
//                     token: token,
//                     userId: isExisting._id
//                 })
//             }
//             throw Error('incorrect password')

//         }
//         throw Error('incorrect email')

//     } catch (error) {
//         const errors = errorHandling(error)
//         res.json({
//             errors
//         })
//     }

// }

const login_post = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errors: { credentials: 'Credentials required' } });
        }
        const isExisting = await User.findOne({
            email: email
        });
        if (isExisting) {
            const matchPassword = await bcrypt.compare(password, isExisting.password);
            if (matchPassword) {
                const token = createToken(isExisting._id);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                    secure: false 
                });
                return res.json({
                    message: 'logged',
                    name: isExisting.name,
                    token: token,
                    userId: isExisting._id
                });
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    } catch (error) {
        const errors = errorHandling(error);
        return res.status(400).json({ errors });
    }
};


// logout
const logout_get = (req, res) => {
    res.clearCookie('jwt');
    console.log('cleared cookie')
    
    // res.cookie('jwt', "", {
    //     maxAge: 0
    // }).json("logged out")
    // res.redirect()

}

module.exports = {
    register_post,
    login_post,
    logout_get
}