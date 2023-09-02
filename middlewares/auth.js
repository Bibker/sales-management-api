const jwt = require("jsonwebtoken");
const auth = async (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decodedToken = jwt.verify(token, process.env.SECRET);
                console.log("TOKEN VERIFIED");
                req.user=decodedToken.user;
                next();

            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    res.json({
                        status:"failed",
                        statusMessage:error
                    })
                } else {
                   res.json({
                    status:"failed",
                    statusMessage:error.message
                   })
                }
            }
            
        } else {
            res.status(401).json({
                status:"failed",
                statusMessage: 'Auth Token not found. (Bearer)' 
            });
        }   
    } catch (error) {
        
    }

}
module.exports = auth;