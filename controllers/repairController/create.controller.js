const prisma = require("../../config/prisma");

const createrepair = async(req, res)=> {
    try {
        console.log(req.body)
        const {productName, description} = req.body;
         const date  =  Date.now();
         const newscheduledDate = new Date(date).toISOString();

         const savedata = await prisma.repair.create({
            data: {
                productName: productName,
                description: description,
                scheduledDate: newscheduledDate,
            },
        });

        res.status(200).json({
            status: "success",
            data: savedata,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fail",
            message: "Cant create repair",
            eror: error,
        });
        
    }
}
module.exports =createrepair;