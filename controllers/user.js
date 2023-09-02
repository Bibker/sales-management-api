const { models: { User } } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt');

module.exports = {
    create: async (req, res) => {
        if (req.body.fullname && req.body.email && req.body.password) {
            let { fullname, email, password } = req.body;
            findUser({ email: email }).then(async (user)=> {
                if(user)
                {
                    res.json({
                        status: "failed",
                        statusMessage: "User already Registered."
                    })

                }
                else
                {
                    bcrypt.hash(password,10, async (err, hash) => {
                        if(!err)
                        {
                            password=hash;
                            await User.create({
                                fullname, email, password
                            });
                            res.status(201);
                            res.json({
                                status: "success",
                                statusMessage: "User Registered Successfully."
                            });

                        }

                    })
                }
            })
        }
        else {
            res.status(400);
            res.json({
                status:"failed",
                statusMessage:"Please Enter All Fields.<br>(fullname , email, password))"
            });
        }
    },

    search:async (req,res)=> {
        const {id} = req.user;
        findUser({id:id}).then((user)=>{
            res.json(user);
        })
    },
    update: async (req,res) => {
        const {id}=req.user;
        const {fullname, email, password} = req.body;
        try {
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    status:"failed",
                    statusMessage: 'User not found' 
                });
            }

            user.fullname = fullname;
            user.email = email;
            user.password = password;
            await user.save();

            res.json({ 
                status:"success",
                statusMessage:"User details updated successfully."
             });
        } catch (error) {
            res.status(500).json({
                status:"failed",
                statusMessage: error 
            });
        }


    },

    login: async (req, res) => {
        if (req.body.email && req.body.password) {
            const { email, password } = req.body;
            await User.findOne({
                where: { email: email },
            })
                .then((user) => {
                    if (user) {
                        bcrypt.compare(password, user.password, (err,result)=> 
                        {
                            console.log(result);
                            if(result){
                                const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' });
                                res.json({
                                    status: "success",
                                    statusMessage: "User Verified Successfully.",
                                    token: token,
                                    expiresIn: "1 hour"
                                })
                            }
                            else if(err)
                            {
                                res.json({
                                    status:"failed",
                                    statusMessage:err
                                })
                            }
                            else
                            {
                                res.json({
                                    status: "failed",
                                    statusMessage: "Your password is incorrect."
                                })
                            }
                        })
                       
                    }
                    else {
                        res.json({
                            status:"failed",
                            statusMessage: "This User doesnot exist."
                        });

                    }
                })
                .catch((error) => {
                    console.error('Error occurred while querying the database:', error);
                })
        }
        else {
            res.status(400)
            res.json({
                status:"failed",
                statusMessage:"Please enter your email & password."
        });
        }

    },
    
    all:async (req,res) => {
        await User.findAll({
            attributes: { exclude: ['password'] }
        })
            .then((users) => {
                if (users.length) {
                    res.json(users)
                }
                else {
                    res.send("<h1>No users found in database</h1>");
                }
            })
            .catch((error) => {
                console.error('Error occurred while querying the database:', error);
            })

    }
}

const findUser = async (user) => await User.findOne({
    where: user
});