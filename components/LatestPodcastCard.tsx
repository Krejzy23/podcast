"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAudio } from "@/providers/AudioProvider";
import { LatestPodcastCardProps } from "@/types";
import { Button } from "./ui/button";

const LatestPodcastCard = ({
  imgUrl,
  title,
  audioUrl,
  author,
  podcastId,
  podcastTitle,
  views,
}: LatestPodcastCardProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
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
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
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
    <div className="mt-6 flex w-full max-md:justify-center">
      <div className="flex flex-row items-center gap-8 p-5 border-b border-white-3">
        <Image
          src={imgUrl}
          width={70}
          height={70}
          alt="PodcastImage"
          className="aspect-square rounded-lg cursor-pointer"
          onClick={handleViews}
        />
        <div className="flex w-full flex-col md:flex-row gap-5 max-md:items-center md:gap-9">
          <article className="flex md:flex-row flex-col items-center justify-between gap-5 md:gap-10 xl:gap-20">
            <div className="flex flex-col w-[50px] md:w-[100px] lg:w-[200px] xl:w-[300px] 2xl:w-[500px]">
              <h1 className="text-5 md:text-10 lg:text-20 font-extrabold tracking-[-0.32px] text-white-1">
                {title}
              </h1>
              <h2 className="text-14 font-normal text-white-3">
                Author: {author}
              </h2>
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/icons/headphone.svg"
                  alt="headphone"
                  width={24}
                  height={24}
                />
                <p className="text-16 text-white-1 font-bold p-2">{views}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/icons/clock.svg"
                  alt="clock"
                  width={24}
                  height={24}
                />
                <p className="text-16 p-2 text-white-1 font-bold">
                  {Math.floor(duration / 60)}:
                  {("0" + Math.floor(duration % 60)).slice(-2)}
                </p>
              </div>
            </div>
          </article>
          <div className="flex justify-end">
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
      </div>
      <audio ref={audioRef} src={audioUrl} style={{ display: "none" }} />
    </div>
  );
};

export default LatestPodcastCard;
