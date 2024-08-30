import { connect } from "@/dgConfig/dbConfig";
import Album from "@/models/albumModel";
import Artist from "@/models/artistModel";
import Song from "@/models/songModel";
import Updates from "@/models/updatesModel";

export default async function sitemap() {
  await connect()
  
  async function fetchIds(type) {
    if (type === 'artists') {
      // Fetch artist IDs
      const artists = await Artist.find({}, 'spotifyId').lean();
      return artists.map(artist => artist.spotifyId);
    } else if (type === 'albums') {
      // Fetch album IDs
      const albums = await Album.find({}, 'spotifyId').lean();
      return albums.map(album => album.spotifyId);
    } else if (type === 'tracks') {
      // Fetch track IDs
      const tracks = await Song.find({}, 'spotifyId').lean();
      return tracks.map(track => track.spotifyId);
    } else if (type === 'updates') {
      // Fetch blogs
      const blogs = await Updates.find({}, 'slug').lean();
      return blogs.map(blog => blog.slug);
    }
  }

  // Fetch IDs for artists, albums, and tracks
  const artistIds = await fetchIds('artists');
  const albumIds = await fetchIds('albums');
  const trackIds = await fetchIds('tracks');
  const blogSlugs = await fetchIds('updates');

  // Generate dynamic routes
  const artistRoutes = artistIds.map(id => ({
    url: `https://www.statscrave.com/artist/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const albumRoutes = albumIds.map(id => ({
    url: `https://www.statscrave.com/album/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const trackRoutes = trackIds.map(id => ({
    url: `https://www.statscrave.com/track/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const blogRoutes = blogSlugs.map(slug => ({
    url: `https://www.statscrave.com/updates/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));




  // Your existing static routes
  const staticRoutes = [
    {
      url: 'https://www.statscrave.com/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.statscrave.com/replay/spotify',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.statscrave.com/updates',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.statscrave.com/replay',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.statscrave.com/replay/lastFm',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/hot100',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/global200',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/artist100',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/album200',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/melonCharts',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/genie',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/bugs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/qqMusic',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/lastFmTopTracks',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/charts/lastFmTopArtists',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    
    {
      url: 'https://www.statscrave.com/records',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-streamed-artists',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-streamed-albums',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-streamed-songs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-popular-artists',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-streamed-songs-single-day',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/records/most-viewed-music-videos',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.statscrave.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    }
  ];

  // Combine static and dynamic routes
  return [
    ...staticRoutes,
    ...artistRoutes,
    ...albumRoutes,
    ...trackRoutes,
    ...blogRoutes
  ];
}