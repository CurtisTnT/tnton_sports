import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import videoIntro from "../../assets/videos/videoIntro.mp4";

export default function VideoIntro() {
  return (
    <section className="flex relative justify-center bg-white-yellow">
      <video src={videoIntro} autoPlay loop muted className="w-2/3" />

      <div className="absolute left-[10%] bottom-6 flex flex-col gap-1 p-2 text-white bg-black-light/50 rounded">
        <h1 className="text-4xl font-bold">WHAT IS BADMINTON?</h1>

        <p>
          Cầu lông là một môn thể thao phổ biến, được yêu thích trên toàn thế
          giới...
        </p>

        <Link to="/badminton-introduction" className="group mt-2 border border-white bg-transparent self-end">
          <div className="flex items-center gap-4 -translate-x-[3px] -translate-y-[3px] bg-white text-black px-4 py-3 group-hover:text-pink">
            <p className="font-semibold">Khám phá thêm</p>
            <FaArrowRightLong size={20} className="shrink-0 group-hover:translate-x-2 duration-300" />
          </div>
        </Link>
      </div>
    </section>
  );
}
