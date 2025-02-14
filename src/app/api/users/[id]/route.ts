import dbConnect from "@/app/lib/dbConnect";
import { verifyJWT } from "@/app/middleware/auth.middleware";
import UserModel from "@/app/model/User";
import mongoose from "mongoose";


async function getUser(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const userId = params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return Response.json({
                success: false,
                message: "Invalid user ID format",
            }, { status: 400 });
        }
        
        const user = await UserModel.findById(
            new mongoose.Types.ObjectId(userId), 
            "-password"
        );
        
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }
        
        return Response.json({
            success: true,
            user
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user", error);
        return Response.json({
            success: false,
            message: "Error fetching user"
        }, { status: 500 });
    }
}

export const GET= verifyJWT(getUser)