import jwt from 'jsonwebtoken'

export const requireAuth = (req,res,next)=>{

    try{

        const token = req.headers.authorization;

        const decodedToken = jwt.verify(token, "123")

        req.userData = decodedToken;

        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({message:"authentication failed"})
    }
}