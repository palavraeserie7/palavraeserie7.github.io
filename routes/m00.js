import express
from "express";

const router =
express.Router();

router.post(
"/execute",

async(req,res)=>{

return res.json({

engine:"M00",

status:"ONLINE"

});

});

export default router;
