import User from '../model/userModel.js';

// creating APIs
export const create = async(req,res)=>{

    try {
        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        else{
            const saveData = await userData.save();
            res.status(200).json({msg: "User created successfully"});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAll = async(req,res)=>{
    try {
         const userData = await User.find();
         
         if(!userData){
            return res.status(404).json({msg: "User's data not found"});
         }

         res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getOne = async(req,res)=>{

    try {
        const id = req.params.id;
        const userExit = await User.findById(id);

        if(!userExit){
            return res.status(404).json({msg: "User data not found"});
        }
        res.status(200).json(userExit);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User deleted successfully"});
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({msg: "User deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}