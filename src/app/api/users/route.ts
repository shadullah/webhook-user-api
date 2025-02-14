import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";


// const JWT_SECRET = process.env.JWT_SECRET || "";

export  async function POST (req:Request) {
    await dbConnect()
    try {
        const {username, email, password}= await req.json()

        if (
            [username, email, password].some((field) => field?.trim() === "")
          ) {
            return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
          }

    const existedUser = await UserModel.findOne({ email });

    if(existedUser){
        return Response.json({ success: false, message: "User with this email already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, email, password:hashedPassword})

    if(!newUser){
        return Response.json({ success: false, message: "Something went wrong registering user" }, { status: 500 });
    }

    await newUser.save();

          return Response.json({
            success:true,
            message:"User registered successfully!!"
        }, {status:201})

    } catch (error) {
        console.log('error registering user', error);
        return Response.json({
            success:false,
            message:"error registering user"
        }, {
            status:500
        })
    }
}


export async function GET() {
    await dbConnect();
    try {
        const users = await UserModel.find({}, "-password");
        
        return Response.json({
            success: true,
            users
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users", error);
        return Response.json({
            success: false,
            message: "Error fetching users"
        }, { status: 500 });
    }
}
