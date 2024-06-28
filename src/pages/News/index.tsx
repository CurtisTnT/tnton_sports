import NewsCard from "@/components/cards/NewsCard";
import ContentContainer from "@/components/layouts/ContentContainer";
import { NEWS } from "@/json/news";

export default function News() {
  return (
    <ContentContainer>
      <h1 className="my-5 text-xl uppercase font-bold">Thông tin tổng hợp cầu lông</h1>

      <div className="grid grid-cols-4">
        {NEWS.map((news) => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </ContentContainer>
  );
}
