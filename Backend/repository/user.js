import User from "../models/User";

export async function userExist(email)
{
    try {
    const result= await User.findOne({ email });
    return result;
        
    } catch (error) {
        console.log("Error in the repository layer at userExist()",error);
        throw error;
    }

}

export async function createUser({name,email,password})
{
    try {
        const user = await User.create({ name, email, password});
        return user;
    } catch (error) {
        console.log("Error in repository layer at createUser()",error);
        throw error;
    }
}