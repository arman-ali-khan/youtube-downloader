import Layout from "@/Layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
const index = () => {
  const router = useRouter();
  const url = router.asPath;

  // download url
  const [downnloadUrl, setDownloadUrl] = useState("");
  const viewUrl = downnloadUrl.split("/")[3];

  return (
    <Layout title={"Download Youtube Videos and Audio"}>
      <div className="flex min-h-screen flex-col items-center p-24">
        <div className="flex items-center">
          <input
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=vuNGR9jJspE"
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
      </div>
    </Layout>
  );
};

export default index;
