"use client";
import PodcastCard from "@/components/PodcastCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LatestPodcastsList from "@/components/LatestPodcastList";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);


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
        <LatestPodcastsList />
      </section>
    </div>
  );
};

export default Home;
