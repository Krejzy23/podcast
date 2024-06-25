"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LatestPodcastCard from "@/components/LatestPodcastCard";

const LatestPodcastsList = () => {
  const latestPodcastCard = useQuery(api.podcasts.getLatestPodcastCard);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-20 font-bold text-white-1">Latest Podcasts</h1>
      <div className="w-full">
        {latestPodcastCard?.map(
          ({ _id, imageUrl, podcastTitle, audioDuration, views }) => (
            <LatestPodcastCard
              key={_id}
              podcastId={_id}
              imgUrl={imageUrl!}
              title={podcastTitle}
              audioDuration={audioDuration}
              podcastTitle={podcastTitle}
              views={views}
            />
          )
        )}
      </div>
    </section>
  );
};

export default LatestPodcastsList;