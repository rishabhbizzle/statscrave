'use client';


import Head from "@/assets/artist.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
const Artist = () => {
  const url =
    "https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-artist-100/recent.json";
  const [data, setData] = useState({
    date: "YYYY-DD-MM",
    data: [
      {
        name: "string",
        image: "string",
        rank: "number",
        last_week_rank: "number | null",
        peak_rank: "number",
        weeks_on_chart: "number",
      },
    ],
  });

  useEffect(() => {
    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
        setData(await response.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [startList, setStartList] = useState(0);
  const [endList, setEndList] = useState(10);
  const date = data.date;
  const songs = data.data;

  const nextList = () => {
    setStartList(startList + 10);
    setEndList(endList + 10);
  };

  const prevList = () => {
    setStartList(startList - 10);
    setEndList(endList - 10);
  };

  let songsList = songs.slice(startList, endList);

  const handleChange = (rank, last_week_rank) => {
    if (last_week_rank === null) {
      return ["text-center bg-blue-100", "NEW"];
    } else {
      if (rank > last_week_rank) {
        return ["text-center bg-red-100", `-${rank - last_week_rank}`];
        //Down
      } else if (rank === last_week_rank) {
        return ["text-center bg-blue-100", "="];
      } else {
        return ["text-center bg-green-100", `+${last_week_rank - rank}`];
        //UP
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-[8px] sm:text-[10px] md:text-[15px] main max-w-[700px] p-2 md:p-6 my-10">
        <div className="head w-full shadow-2xl">
          <Image src={Head} className="items-center" alt="artist100" />
        </div>
        {/* <div className="hot">
        <img src={Hot} alt="" />
        </div> */}
        <div className="p-[14px] md:p-5 bg-[#182655] w-full flex justify-center shadow-2xl">
          <table className=" bg-white w-full ">
            <tr>
              <th className="bg-[#182655] text-white text-left md:px-2 w-5">
                RANK
              </th>
              <th className="bg-[#182655] text-white text-left px-1 md:px-2 w-7">
                +/-
              </th>
              <th className="bg-[#182655] text-white text-left"></th>
              <th className="bg-[#182655] text-white text-left px-1 md:px-2 sm:w-80 ">
                NAME
              </th>
              <th className="bg-[#182655] text-white text-left px-1 md:px-2 w-8">
                PEAK
              </th>
              <th className="bg-[#182655] text-white text-left px-1 w-12">
                W.O.C
              </th>
            </tr>

            {songsList.map((song, i) => (
              <tr className="even:bg-white odd:bg-gray-100 text-black" key={i}>
                <td className="pr-1 md:pr-3 text-end border-r-2 border-dashed">
                  {song.rank}
                </td>
                <td className={handleChange(song.rank, song.last_week_rank)[0]}>
                  {handleChange(song.rank, song.last_week_rank)[1]}
                </td>
                <td className="w-8 h-8 md:w-10 md:h-10">
                  <img
                    src={song.image}
                    alt="cover"
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </td>
                <td className="px-1 h-3 md:px-2 md:h-10 border-r-2 border-dashed">
                  {song.name}
                </td>
                <td className="px-1 md:px-2 border-r-2 border-dashed">
                  {song.peak_rank}
                </td>
                <td
                  className={
                    song.weeks_on_chart < 200 ? "px-2" : "bg-yellow-100 px-2"
                  }
                >
                  {song.weeks_on_chart}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="date text-right">
          <h3 className="">{date}</h3>
        </div>
        <div className="flex justify-between my-6">
          <button
            disabled={startList <= 0}
            onClick={prevList}
            className={
              startList <= 0
                ? "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            }
          >
            Prev
          </button>
          {/* <a href="#" onClick={handleCaptureClick}>
        <button  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
           Save
        </button>
        </a> */}
          <button
            disabled={endList >= 100}
            onClick={nextList}
            className={
              endList >= 100
                ? "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artist;
