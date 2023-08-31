import IntroPagination from "../Components/IntroPagination";
import video from "../assets/video/intro-video.mp4";
import video2 from "../assets/video/beach.mp4"
import video3 from "../assets/video/beach2.mp4"
import { useState } from "react";
function Vidoes() {
  const videos = [
    {
      link: video,
    },
    {
      link: video2,
    },
    {
      link: video3,
    },
  ];
  const [activePage, setActivePage] = useState(1);
  const productPerPage = 1;
  const totalPageCount = Math.ceil(videos.length / productPerPage);
  const start = (activePage - 1) * productPerPage;
  const end = start + productPerPage;
 
  return (
    <>
      <div className="intro-video">
        {
            videos.slice(start, end).map((a,b)=>(
                <video key={b} id="introVideo" muted autoPlay loop src={a.link}></video>
        
            ))
        }
          
     
      </div>
      <IntroPagination  
        totalPageCount={totalPageCount}
        setActivePage={setActivePage}
        activePage={activePage}/>
     
 
    </>
  );
}

export default Vidoes;
