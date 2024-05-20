const prisma = require("../../config/prisma");

const getRepairs = async(req,res)=> {
    try {
        console.log("user" + req.id);

        const repairs = await prisma.repair.findMany();
        res.json({
            message: "repairs fetched successfully",
            data: repairs,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Cant fetch repairs",
            eror: error,
        });
        
    }
}

module.exports =getRepairs;