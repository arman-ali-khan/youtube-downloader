import { useRouter } from "next/router";
import { useState } from "react";
const index = () => {
  const router = useRouter();
  const url = router.asPath;

  // download url
  const [downnloadUrl,setDownloadUrl] = useState('')
const viewUrl = downnloadUrl.split('/')[3]


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <div className="flex items-center">
     <input
     onChange={(e)=>setDownloadUrl(e.target.value)}
        placeholder="https://youtube.com"
        className="input input-bordered"
        type="url"
      />

      <button
        onClick={() => {
         return router.push(`/${viewUrl}`);
        }}
        className="btn btn-warning"
      >
      Download
      </button>
     </div>
    </main>
  );
};

export default index;
