import NewsCard from "@/components/cards/NewsCard";
import ContentContainer from "@/components/layouts/ContentContainer";
import HomeTitle from "@/components/titles/HomeTitle";
import { NEWS } from "@/json/news";

export default function News() {
  return (
    <ContentContainer>
      <HomeTitle title="NEWS" />

      <div className="grid grid-cols-4">
        {NEWS.slice(0, 4).map((news) => (
          <NewsCard {...news} />
        ))}
      </div>
    </ContentContainer>
  );
}
