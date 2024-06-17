import ContentContainer from "@/components/layouts/ContentContainer";
import HomeTitle from "@/components/titles/HomeTitle";
import { NEWS } from "@/json/news";
import { formatDateTime } from "@/utils/helpers";
import { Link } from "react-router-dom";

export default function News() {
  return (
    <ContentContainer>
      <HomeTitle title="NEWS" />

      <div className="grid grid-cols-4">
        {NEWS.slice(0, 4).map(
          ({ id, title, date, description, image_url, link_url }) => (
            <div
              key={id}
              className="relative flex flex-col items-center text-center col-span-1"
            >
              <Link
                to={link_url}
                className="block w-[280px] h-[180px] rounded overflow-hidden"
              >
                <img
                  src={image_url}
                  alt="news-img"
                  width={280}
                  height={180}
                  className="scale-110 hover:scale-100"
                />
              </Link>

              <div className="-translate-y-10 w-[250px] p-2 rounded-md bg-white shadow-[0px_2px_10px_1px] shadow-pink/50">
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
                <p className="ellipsis-3-lines text-sm text-white-dark-yellow font-medium">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </ContentContainer>
  );
}
