import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoVolumeMuteOutline } from 'react-icons/io5';
const index = () => {
  const router = useRouter();
  const url = router.asPath;

  // download url
  const [downnloadUrl,setDownloadUrl] = useState('')
const viewUrl = downnloadUrl.split('/')[3]

  // loading
  const [loading, setLoading] = useState(false);
  // loading
  const [loading1, setLoading1] = useState(true);
  // get download data
  const [downloadData, setDownloadData] = useState({});
  // format download data
  const formats = downloadData?.formats;
  //get download data
  useEffect(() => {
    setLoading1(true)
    axios.get(`/api?url=${`https://youtube.com${url}`}`).then((res) => {
      setDownloadData(res.data);
      console.log(res.data);
      if (res.data) {
        setLoading1(false)
        return setLoading(false);
      }
    });
  }, [url]);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <div className="flex items-center">
     <input
     onChange={(e)=>setDownloadUrl(e.target.value)}
        defaultValue={`https://youtube.com${url}`}
        className="input input-bordered"
        type="url"
      />

      <button
        onClick={() => {
         return router.push(`/${viewUrl}`);
        }}
        className="btn btn-warning"
      >
        {loading ? "Loading..." : "Download"}
      </button>
     </div>
      <div>{
        loading1 ? <div>Loading...</div>
    : 
    <div className="w-96">
      <div className="bg-base-200 px-4 py-2">
        <h2 className="text-xl font-bold">{downloadData.videoDetails.title}</h2>
      </div>
      {/* <div className="grid grid-cols-4">
        {
          downloadData.videoDetails.thumbnails.map(thumb=>{
            return <img src={thumb.url} key={thumb.url} className="w-full h-full object-cover" />
          })
        }
      </div> */}
         <div>
                    <iframe src={downloadData.videoDetails.embed.iframeUrl} width="100%" height="200px"></iframe>
                </div>
                <div className="w-full bg-base-100 p-3">
              <h2 className="text-base font-bold">Video</h2>
            </div>
          <div className="flex flex-row-reverse justify-center gap-1 flex-wrap my-2">
           
          {formats?.map((format, i) => (
            <div className={`flex justify-center ${format.qualityLabel || 'hidden'} ${ format.hasAudio || 'hidden'}`} key={i}>
              <div className="relative ">
                <a className="btn btn-success" href={format.url} target="_blank">
                  {format.qualityLabel}
                </a>
                {format.hasAudio || <div className="absolute left-0 top-0"><IoVolumeMuteOutline size={15}/></div>}
              </div>
            </div>
          ))}
          </div>
                <div className="w-full bg-base-100 p-3">
              <h2 className="text-base font-bold">Audio</h2>
            </div>
          <div className="flex flex-row-reverse justify-center gap-1 flex-wrap my-2">
           
          {formats?.map((format, i) => (
            <div className={`flex justify-center ${format.qualityLabel && 'hidden'} ${ format.hasAudio || 'hidden'}`} key={i}>
              <div className="relative ">
                <a className="btn btn-success" href={format.url} target="_blank">
                 Mp3
                </a>
                {format.hasAudio || <div className="absolute left-0 top-0"><IoVolumeMuteOutline size={15}/></div>}
              </div>
            </div>
          ))}
          </div>
        </div>
    }
       
      </div>
    </main>
  );
};

export default index;
