'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table/data-table";
import Loader from "../ui/loader";

const MostStreamedArtists = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/others/mostStreamedArtists`);
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
        <DataTable data={data} type="artist" searchColumn={"name"} title={'Most Streamed Artists'} description={"Following are the most streamed artists in Spotify history. The numbers are in billions."} />
      )}
      {loading && <Loader component={true} />}
    </>
  );
};

export default MostStreamedArtists;
