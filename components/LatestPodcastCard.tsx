"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LatestPodcastCardProps } from "@/types";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const LatestPodcastCard = ({
  imgUrl,
  title,
  podcastId,
  audioDuration,
  views,
}: LatestPodcastCardProps) => {
  const router = useRouter();
  const updatePodcastViews = useMutation(api.podcasts.updatePodcastViews);

  const handleViews = async () => {
    try {
      await updatePodcastViews({ podcastId }); // Zvýšení počtu zhlédnutí
      router.push(`/podcasts/${podcastId}`, {
        scroll: true,
      });
    } catch (error) {
      console.error("Failed to update views", error);
    }
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
        <div className="flex w-full flex-row gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-row items-center justify-between gap-5 xl:gap-20">
            <h1 className="text-18 w-[100px] font-extrabold tracking-[-0.32px] text-white-1">
              {title}
            </h1>
            <div className="flex items-center">
              <Image
                src="/icons/headphone.svg"
                alt="headphone"
                width={32}
                height={32}
              />
              <p className="text-16 p-2 text-white-1 font-bold">{views}</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/clock.svg"
                alt="clock"
                width={32}
                height={32}
                className="text-white-1"
              />
              <p className="text-16 p-2 text-white-1 font-bold">
                {Math.floor(audioDuration / 60)}:
                {("0" + Math.floor(audioDuration % 60)).slice(-2)}
              </p>
            </div>
          </article>
          <div className="flex justify-end">
            <Button
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
    </div>
  );
};

export default LatestPodcastCard;