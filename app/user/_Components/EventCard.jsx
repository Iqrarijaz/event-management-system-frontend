import React from "react";

function EventCard({
  poster = "https://img.freepik.com/free-psd/club-dj-party-flyer-social-media-post_505751-3027.jpg?t=st=1733980717~exp=1733984317~hmac=d7a194763cdcf46187a796b449140add5dfc61acc79a39c23644bc29f51639ae&w=1380",
  name,
  startDate,
  endDate,
  location,
  isAlternate,
}) {
  return (
    <div
      className={`w-[300px] h-[400px] rounded-lg overflow-hidden ${
        isAlternate ? "bg-[#e0e0e0]" : "bg-[#ffffff]"
      } shadow-lg`}
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content container with bottom-left alignment */}
      <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-end p-4">
        <div className="text-white font-bold text-xl">{name}</div>
        <div className="text-sm text-gray-300">
          Start Date: {dateFormat(startDate)}
        </div>
        <div className="text-sm text-gray-300">
          End Date: {dateFormat(endDate)}
        </div>
      </div>
    </div>
  );
}

function dateFormat(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default EventCard;
