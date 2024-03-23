'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";
import Loader from "../ui/loader";

const MostStreamedAlbums = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/others/mostStreamedAlbums`);
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data?.length > 0 && (
        <DataTable data={data} type="album2" searchColumn={"name"} title={'Most Streamed Albums'} description={"Following are the most streamed albums in Spotify history."} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default MostStreamedAlbums;
