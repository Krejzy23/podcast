"use client";
import PodcastCard from "@/components/PodcastCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LatestPodcastCard from "@/components/LatestPodcastCard";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const latestPodcastCard = useQuery(api.podcasts.getLatestPodcastCard);

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map(
            ({ _id, imageUrl, podcastTitle, podcastDescription }) => (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            )
          )}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Latest Podcasts</h1>
        <div className="w-full">
          {latestPodcastCard?.map(
            ({
              _id,
              imageUrl,
              podcastTitle,
              author,
              audioUrl,
              audioDuration,
            }) => (
              <LatestPodcastCard
                key={_id}
                podcastId={_id}
                imgUrl={imageUrl!}
                title={podcastTitle}
                author={author}
                audioUrl={audioUrl!}
                audioDuration={audioDuration}
                podcastTitle={podcastTitle}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
