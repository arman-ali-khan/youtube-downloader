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
    <div>
         <div>
                    <iframe src={downloadData.videoDetails.embed.iframeUrl} width="100%" height="200px"></iframe>
                </div>
          {formats?.map((format, i) => (
            <div className={`${format.qualityLabel || 'hidden'} ${ format.hasAudio || 'hidden'}`} key={i}>
               
              <div>{format.qualityLabel}</div>
              <div className="relative">
                <a className="btn btn-success" href={format.url} target="_blank">
                  {format.qualityLabel}
                </a>
                {format.hasAudio || <div className="absolute left-0 top-0"><IoVolumeMuteOutline size={15}/></div>}
              </div>
            </div>
          ))}
        </div>
    }
       
      </div>
    </main>
  );
};

export default index;
