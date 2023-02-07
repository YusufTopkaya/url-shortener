const express =require('express')
const router=express.Router()
const validUrl=require('valid-url')
const shortId=require('shortid')
const config=require('config')
const randomcode=require('../Utilities/randomcode')

const Url=require('../models/url.js')

const port=config.get("port")||5000;

// Create short url
router.post('/shorten', async(req,res)=>{
    console.log(req.body.longUrl)
   const longUrl= req.body.longUrl
   var urlCode=req.body.customcode
   const baseUrl=config.get('baseUrl')

//Check base url

   if(!validUrl.isUri(baseUrl)){
    return res.status(401).json('Invalid base url')
   }



//Create Url code
if(!urlCode)
urlCode=randomcode(6)

//Check long url

   if(validUrl.isUri(longUrl)){
    try {
        let url=await Url.findOne({urlCode})
        if(url){
            res.status(409).json("Custom code already taken.");
        }else{
            const shortUrl=baseUrl+port+'/'+urlCode
            url=new Url({
                longUrl,
                shortUrl,
                urlCode,
                date:new Date()
            })
            await url.save()
            res.json(url)
        }

    } catch (err) {
        console.error(err)
        res.status(500).json("Server error")
    }
   }else{
    res.status(401).json('Invalid long url')
   }

})





module.exports=router;