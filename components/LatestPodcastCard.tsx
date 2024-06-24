"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from '@/providers/AudioProvider';
import { LatestPodcastCardProps } from "@/types";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const LatestPodcastCard = ({
  imgUrl,
  title,
  audioUrl,
  author,
  podcastId,
  podcastTitle,
}: LatestPodcastCardProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const latestPodcastCard = useQuery(api.podcasts.getLatestPodcastCard);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current!.duration);
      };

      const audioElement = audioRef.current;
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [audioUrl]);

  const handleViews = () => {
    // increase views
    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  const handlePlay = () => {
    setAudio({
      title: podcastTitle,
      audioUrl,
      imageUrl: imgUrl,
      author,
      podcastId,
    });
  };

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-row gap-8 max-md:items-center md:flex-col">
        <Image
          src={imgUrl}
          width={70}
          height={70}
          alt="PodcastImage"
          className="aspect-square rounded-lg cursor-pointer"
          onClick={handleViews}
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-row gap-2 max-md:items-center">
            <h1 className="text-16 font-extrabold tracking-[-0.32px] text-white-1">
              {title}
            </h1>
            <h1 className="">{podcastTitle}</h1>
            <h2 className="text-16 font-normal text-white-3">{author}</h2>
            <p>{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</p>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[50px] rounded-full bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />
          </Button>
        </div>
      </div>
      <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
    </div>
  );
};

export default LatestPodcastCard;
