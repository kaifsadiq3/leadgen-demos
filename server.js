const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const PORT=Number(process.env.PORT||3000);
const DEMOS=path.join(__dirname,"demos");
app.disable("x-powered-by");

app.get("/health",(_req,res)=>res.status(200).json({
  status:"ok",service:"leadgen-demos",timestamp:new Date().toISOString(),
  uptime_seconds:Math.round(process.uptime())
}));

app.get("/api/health",(_req,res)=>res.status(200).json({
  status:"ok",service:"leadgen-demos",timestamp:new Date().toISOString()
}));

app.get("/",(_req,res)=>res.type("html").send(
  "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>LeadGen Demos</title></head><body><h1>LeadGen Demos</h1><p>Service is online.</p></body></html>"
));

app.use("/demos",express.static(DEMOS,{extensions:["html"],index:"index.html",maxAge:"1h"}));

app.get("/demos/:slug",(req,res)=>{
  const slug=req.params.slug;
  if(!/^[a-z0-9-]+$/.test(slug)) return res.status(400).send("Invalid demo slug.");
  const target=path.join(DEMOS,slug,"index.html");
  if(!target.startsWith(DEMOS+path.sep)||!fs.existsSync(target)) return res.status(404).send("Demo not found.");
  res.sendFile(target);
});

app.get("/demos/:slug/health",(req,res)=>{
  const slug=req.params.slug;
  if(!/^[a-z0-9-]+$/.test(slug)) return res.status(400).json({status:"error"});
  const target=path.join(DEMOS,slug,"index.html");
  if(!target.startsWith(DEMOS+path.sep)||!fs.existsSync(target))
    return res.status(404).json({status:"not_found",demo:slug});
  res.status(200).json({status:"ok",demo:slug,timestamp:new Date().toISOString()});
});

app.listen(PORT,"0.0.0.0",()=>console.log(`leadgen-demos listening on ${PORT}`));
