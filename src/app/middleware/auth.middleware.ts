import jwt from "jsonwebtoken"

interface JWTPayload{
    _id:string;
}

type RouteHandler = (
    req: Request & { user?: JWTPayload }, 
    params: { params: { id: string } }
) => Promise<Response>

export function verifyJWT(handler:RouteHandler){
    return async(req:Request, params:{params:{id:string}})=>{
        try {
            const headers = req.headers;
            const token= headers.get("Authorization")?.replace("Bearer ", "")
            if(!token){
                return Response.json({
                    success:false, message:"Unathorized - no token provided"
                }, {status:401})
            }
    
            const jwt_secret = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxMjMiLCJpYXQiOjE3MjUxNzYwNDl9.ySxH5jPjlzDPLI_-eTedOHnpZoacqJzgzV1bf8aASpQ"
            if(!jwt_secret){
                return Response.json({
                    success:false, message:"jwt secret not defined"
                }, {status:401})
            }

            console.log(token);
            console.log(jwt_secret);
            const decodedToken = jwt.verify(token,jwt_secret) as JWTPayload;

            (req as Request & { user: JWTPayload }).user = decodedToken;

            return handler(req,params)
    
        } catch (error) {
            console.log("Invalid token", error);
            return Response.json({
                success:false, message:"inValid token"
            }, {status:401})
        }
    }
    
}