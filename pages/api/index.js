
import ytdl from "ytdl-core";

export default async function handler(req, res) {


  const {url}  = req.query;
 
  if (req.method === "GET") {
  
    const videoId = ytdl.getURLVideoID(url);
    const video = await ytdl.getInfo(url);
    
    res.status(200).json(video);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
