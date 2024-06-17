import { Link } from "react-router-dom";

import { News } from "@/services/interface";
import { formatDateTime } from "@/utils/helpers";

export default function NewsCard(props: News) {
  const { id, link_url, image_url, title, date, description } = props;

  return (
    <div
      key={id}
      className="relative flex flex-col items-center text-center col-span-1 group"
    >
      <Link
        to={link_url}
        className="block w-[280px] h-[180px] rounded overflow-hidden group-hover:-translate-y-2 duration-500"
      >
        <img
          src={image_url}
          alt="news-img"
          width={280}
          height={180}
          className="scale-110 hover:scale-100 duration-500"
        />
      </Link>

      <div className="-translate-y-16 group-hover:-translate-y-5 duration-500 w-[250px] p-2 rounded-md bg-white shadow-[0px_2px_10px_1px] shadow-pink/50">
        <Link
          to={link_url}
          className="font-semibold ellipsis-2-lines hover:text-pink"
        >
          {title}
        </Link>
        <div className="w-full h-px mt-4 bg-pink" />
        <div className="flex justify-center -translate-y-1/2">
          <div className="w-2/3 bg-pink text-xs py-0.5 text-white rounded-3xl">
            {formatDateTime(date)}
          </div>
        </div>
        <p className="ellipsis-3-lines text-sm text-white-dark-yellow font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
