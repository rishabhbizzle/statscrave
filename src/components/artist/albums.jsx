import React, { useEffect, useState } from "react";
import { DataTable } from "../data-table/data-table";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";
const ArtistAlbums = ({ id }) => {

  const [loading, setLoading] = useState(false);
  const [albumsData, setAlbumsData] = useState([]);
  const fetchArtistAlbumsDailyData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/daily/albums/${id}`
      );
      setAlbumsData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtistAlbumsDailyData();
  }, [id]);

  return (
    <div>
      {albumsData.length > 0 && (
        <DataTable data={albumsData} type="album" searchColumn={"title"} />
      )}

      {loading && <Loader component={true} />}
    </div>
  );
};

export default ArtistAlbums;
