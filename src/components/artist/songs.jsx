'use client'

import React, { useEffect, useState } from "react";
import { DataTable } from "../data-table/data-table";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";

const ArtistSongs = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const fetchArtistSongsDailyData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/daily/songs/${id}`
      );
      setSongsData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtistSongsDailyData();
  }, [id]);

  return (
    <div>
      {songsData.length > 0 && (
        <DataTable data={songsData} type="songs" searchColumn={"title"} />
      )}
      {loading && <Loader component={true} />}
    </div>
  );
};

export default ArtistSongs;
