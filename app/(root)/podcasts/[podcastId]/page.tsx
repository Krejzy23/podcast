import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({ params }: {params: {podcastId: string }}) => {
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">
          Currently playing
        </h1>
        <figure className="flex gap-3">
          <Image 
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          {/* <h2 className="text-16 font-bold text-white-1">
            {podcast?.views}
          </h2> */}
        </figure>
      </header>

    </section>
  )
}

export default PodcastDetails