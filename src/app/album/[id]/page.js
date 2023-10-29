"use client"

import React, { useState, useEffect, use } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Container from '@/components/ui/container'
import { AlbumArtwork } from '@/components/ui/albumArtwork'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChartComponent } from '@/components/barChart'

const Album = ({ params }) => {
  const id = params.id
  const [albumData, setAlbumData] = useState({
    "albumDetails": {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
          },
          "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
          "id": "1uNFoZAHBGtllmzznpCI3s",
          "name": "Justin Bieber",
          "type": "artist",
          "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
        }
      ],
      "copyrights": [
        {
          "text": "© 2021 Def Jam Recordings, a division of UMG Recordings, Inc.",
          "type": "C"
        },
        {
          "text": "℗ 2021 Def Jam Recordings, a division of UMG Recordings, Inc.",
          "type": "P"
        }
      ],
      "external_ids": {
        "upc": "00602435848990"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/album/5dGWwsZ9iB2Xc3UKR0gif2"
      },
      "genres": [],
      "href": "https://api.spotify.com/v1/albums/5dGWwsZ9iB2Xc3UKR0gif2",
      "id": "5dGWwsZ9iB2Xc3UKR0gif2",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851e6f407c7f3a0ec98845e4431",
          "width": 64
        }
      ],
      "is_playable": true,
      "label": "RBMG/Def Jam",
      "name": "Justice",
      "popularity": 83,
      "release_date": "2021-03-19",
      "release_date_precision": "day",
      "total_tracks": 16,
      "tracks": {
        "href": "https://api.spotify.com/v1/albums/5dGWwsZ9iB2Xc3UKR0gif2/tracks?offset=0&limit=50&market=ES&locale=*",
        "items": [
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 152796,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/0oaY19dUwZimIgzn3ZZLZO"
            },
            "href": "https://api.spotify.com/v1/tracks/0oaY19dUwZimIgzn3ZZLZO",
            "id": "0oaY19dUwZimIgzn3ZZLZO",
            "is_local": false,
            "is_playable": true,
            "name": "2 Much",
            "preview_url": null,
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:0oaY19dUwZimIgzn3ZZLZO"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 187238,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/5NU40QTlXrDUJzDBdv79bg"
            },
            "href": "https://api.spotify.com/v1/tracks/5NU40QTlXrDUJzDBdv79bg",
            "id": "5NU40QTlXrDUJzDBdv79bg",
            "is_local": false,
            "is_playable": true,
            "name": "Deserve You",
            "preview_url": null,
            "track_number": 2,
            "type": "track",
            "uri": "spotify:track:5NU40QTlXrDUJzDBdv79bg"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6LuN9FCkKOj5PcnpouEgny"
                },
                "href": "https://api.spotify.com/v1/artists/6LuN9FCkKOj5PcnpouEgny",
                "id": "6LuN9FCkKOj5PcnpouEgny",
                "name": "Khalid",
                "type": "artist",
                "uri": "spotify:artist:6LuN9FCkKOj5PcnpouEgny"
              }
            ],
            "disc_number": 1,
            "duration_ms": 174406,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/6F2r4HgpJnvKDmkN6JEN6J"
            },
            "href": "https://api.spotify.com/v1/tracks/6F2r4HgpJnvKDmkN6JEN6J",
            "id": "6F2r4HgpJnvKDmkN6JEN6J",
            "is_local": false,
            "is_playable": true,
            "name": "As I Am (feat. Khalid)",
            "preview_url": null,
            "track_number": 3,
            "type": "track",
            "uri": "spotify:track:6F2r4HgpJnvKDmkN6JEN6J"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 156467,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/3T03rPwlL8NVk1yIaxeD8U"
            },
            "href": "https://api.spotify.com/v1/tracks/3T03rPwlL8NVk1yIaxeD8U",
            "id": "3T03rPwlL8NVk1yIaxeD8U",
            "is_local": false,
            "is_playable": true,
            "name": "Off My Face",
            "preview_url": null,
            "track_number": 4,
            "type": "track",
            "uri": "spotify:track:3T03rPwlL8NVk1yIaxeD8U"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1anyVhU62p31KFi8MEzkbf"
                },
                "href": "https://api.spotify.com/v1/artists/1anyVhU62p31KFi8MEzkbf",
                "id": "1anyVhU62p31KFi8MEzkbf",
                "name": "Chance the Rapper",
                "type": "artist",
                "uri": "spotify:artist:1anyVhU62p31KFi8MEzkbf"
              }
            ],
            "disc_number": 1,
            "duration_ms": 212093,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/6Xgq7MvZiet0hVi3KaDSgJ"
            },
            "href": "https://api.spotify.com/v1/tracks/6Xgq7MvZiet0hVi3KaDSgJ",
            "id": "6Xgq7MvZiet0hVi3KaDSgJ",
            "is_local": false,
            "is_playable": true,
            "name": "Holy (feat. Chance The Rapper)",
            "preview_url": null,
            "track_number": 5,
            "type": "track",
            "uri": "spotify:track:6Xgq7MvZiet0hVi3KaDSgJ"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/2tIP7SsRs7vjIcLrU85W8J"
                },
                "href": "https://api.spotify.com/v1/artists/2tIP7SsRs7vjIcLrU85W8J",
                "id": "2tIP7SsRs7vjIcLrU85W8J",
                "name": "The Kid LAROI",
                "type": "artist",
                "uri": "spotify:artist:2tIP7SsRs7vjIcLrU85W8J"
              }
            ],
            "disc_number": 1,
            "duration_ms": 158324,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/137mSruegm1u6x9NvwiagR"
            },
            "href": "https://api.spotify.com/v1/tracks/137mSruegm1u6x9NvwiagR",
            "id": "137mSruegm1u6x9NvwiagR",
            "is_local": false,
            "is_playable": true,
            "name": "Unstable (feat. The Kid LAROI)",
            "preview_url": null,
            "track_number": 6,
            "type": "track",
            "uri": "spotify:track:137mSruegm1u6x9NvwiagR"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 104007,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/680qLWCMRfR6evrNNBCE9e"
            },
            "href": "https://api.spotify.com/v1/tracks/680qLWCMRfR6evrNNBCE9e",
            "id": "680qLWCMRfR6evrNNBCE9e",
            "is_local": false,
            "is_playable": true,
            "name": "MLK Interlude",
            "preview_url": null,
            "track_number": 7,
            "type": "track",
            "uri": "spotify:track:680qLWCMRfR6evrNNBCE9e"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6USv9qhCn6zfxlBQIYJ9qs"
                },
                "href": "https://api.spotify.com/v1/artists/6USv9qhCn6zfxlBQIYJ9qs",
                "id": "6USv9qhCn6zfxlBQIYJ9qs",
                "name": "Dominic Fike",
                "type": "artist",
                "uri": "spotify:artist:6USv9qhCn6zfxlBQIYJ9qs"
              }
            ],
            "disc_number": 1,
            "duration_ms": 198425,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/7aely3H8kMj9o0gt6vXHE1"
            },
            "href": "https://api.spotify.com/v1/tracks/7aely3H8kMj9o0gt6vXHE1",
            "id": "7aely3H8kMj9o0gt6vXHE1",
            "is_local": false,
            "is_playable": true,
            "name": "Die For You (feat. Dominic Fike)",
            "preview_url": null,
            "track_number": 8,
            "type": "track",
            "uri": "spotify:track:7aely3H8kMj9o0gt6vXHE1"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 170813,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/1nahzW3kfMuwReTka28tH5"
            },
            "href": "https://api.spotify.com/v1/tracks/1nahzW3kfMuwReTka28tH5",
            "id": "1nahzW3kfMuwReTka28tH5",
            "is_local": false,
            "is_playable": true,
            "name": "Hold On",
            "preview_url": null,
            "track_number": 9,
            "type": "track",
            "uri": "spotify:track:1nahzW3kfMuwReTka28tH5"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 179414,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/3buwFfY33H32wfZ6X9poV3"
            },
            "href": "https://api.spotify.com/v1/tracks/3buwFfY33H32wfZ6X9poV3",
            "id": "3buwFfY33H32wfZ6X9poV3",
            "is_local": false,
            "is_playable": true,
            "name": "Somebody",
            "preview_url": null,
            "track_number": 10,
            "type": "track",
            "uri": "spotify:track:3buwFfY33H32wfZ6X9poV3"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 153190,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/6I3mqTwhRpn34SLVafSH7G"
            },
            "href": "https://api.spotify.com/v1/tracks/6I3mqTwhRpn34SLVafSH7G",
            "id": "6I3mqTwhRpn34SLVafSH7G",
            "is_local": false,
            "is_playable": true,
            "name": "Ghost",
            "preview_url": null,
            "track_number": 11,
            "type": "track",
            "uri": "spotify:track:6I3mqTwhRpn34SLVafSH7G"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/20wkVLutqVOYrc0kxFs7rA"
                },
                "href": "https://api.spotify.com/v1/artists/20wkVLutqVOYrc0kxFs7rA",
                "id": "20wkVLutqVOYrc0kxFs7rA",
                "name": "Daniel Caesar",
                "type": "artist",
                "uri": "spotify:artist:20wkVLutqVOYrc0kxFs7rA"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4fxd5Ee7UefO4CUXgwJ7IP"
                },
                "href": "https://api.spotify.com/v1/artists/4fxd5Ee7UefO4CUXgwJ7IP",
                "id": "4fxd5Ee7UefO4CUXgwJ7IP",
                "name": "Giveon",
                "type": "artist",
                "uri": "spotify:artist:4fxd5Ee7UefO4CUXgwJ7IP"
              }
            ],
            "disc_number": 1,
            "duration_ms": 198081,
            "explicit": true,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI"
            },
            "href": "https://api.spotify.com/v1/tracks/4iJyoBOLtHqaGxP12qzhQI",
            "id": "4iJyoBOLtHqaGxP12qzhQI",
            "is_local": false,
            "is_playable": true,
            "name": "Peaches (feat. Daniel Caesar & Giveon)",
            "preview_url": null,
            "track_number": 12,
            "type": "track",
            "uri": "spotify:track:4iJyoBOLtHqaGxP12qzhQI"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/46MWeeHNVMYRIIofQBEX98"
                },
                "href": "https://api.spotify.com/v1/artists/46MWeeHNVMYRIIofQBEX98",
                "id": "46MWeeHNVMYRIIofQBEX98",
                "name": "BEAM",
                "type": "artist",
                "uri": "spotify:artist:46MWeeHNVMYRIIofQBEX98"
              }
            ],
            "disc_number": 1,
            "duration_ms": 186695,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/27UcQ6dAvQrgH9C880rCM3"
            },
            "href": "https://api.spotify.com/v1/tracks/27UcQ6dAvQrgH9C880rCM3",
            "id": "27UcQ6dAvQrgH9C880rCM3",
            "is_local": false,
            "is_playable": true,
            "name": "Love You Different (feat. BEAM)",
            "preview_url": null,
            "track_number": 13,
            "type": "track",
            "uri": "spotify:track:27UcQ6dAvQrgH9C880rCM3"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
                },
                "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
                "id": "3wcj11K77LjEY1PkEazffa",
                "name": "Burna Boy",
                "type": "artist",
                "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
              }
            ],
            "disc_number": 1,
            "duration_ms": 159250,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/2tB9OFgAHjAds3cqquLlvp"
            },
            "href": "https://api.spotify.com/v1/tracks/2tB9OFgAHjAds3cqquLlvp",
            "id": "2tB9OFgAHjAds3cqquLlvp",
            "is_local": false,
            "is_playable": true,
            "name": "Loved By You (feat. Burna Boy)",
            "preview_url": null,
            "track_number": 14,
            "type": "track",
            "uri": "spotify:track:2tB9OFgAHjAds3cqquLlvp"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              }
            ],
            "disc_number": 1,
            "duration_ms": 190779,
            "explicit": false,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/2WnAKZefdRHxtBEkRjFOHC"
            },
            "href": "https://api.spotify.com/v1/tracks/2WnAKZefdRHxtBEkRjFOHC",
            "id": "2WnAKZefdRHxtBEkRjFOHC",
            "is_local": false,
            "is_playable": true,
            "name": "Anyone",
            "preview_url": null,
            "track_number": 15,
            "type": "track",
            "uri": "spotify:track:2WnAKZefdRHxtBEkRjFOHC"
          },
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "name": "Justin Bieber",
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/5CiGnKThu5ctn9pBxv7DGa"
                },
                "href": "https://api.spotify.com/v1/artists/5CiGnKThu5ctn9pBxv7DGa",
                "id": "5CiGnKThu5ctn9pBxv7DGa",
                "name": "benny blanco",
                "type": "artist",
                "uri": "spotify:artist:5CiGnKThu5ctn9pBxv7DGa"
              }
            ],
            "disc_number": 1,
            "duration_ms": 149189,
            "explicit": true,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/3S8jK1mGzQi24ilFb45DAZ"
            },
            "href": "https://api.spotify.com/v1/tracks/3S8jK1mGzQi24ilFb45DAZ",
            "id": "3S8jK1mGzQi24ilFb45DAZ",
            "is_local": false,
            "is_playable": true,
            "name": "Lonely (with benny blanco)",
            "preview_url": null,
            "track_number": 16,
            "type": "track",
            "uri": "spotify:track:3S8jK1mGzQi24ilFb45DAZ"
          }
        ],
        "limit": 50,
        "next": null,
        "offset": 0,
        "previous": null,
        "total": 16
      },
      "type": "album",
      "uri": "spotify:album:5dGWwsZ9iB2Xc3UKR0gif2"
    },
    "albumTracks": {
      "href": "https://api.spotify.com/v1/albums/5dGWwsZ9iB2Xc3UKR0gif2/tracks?offset=0&limit=50&market=ES&locale=*",
      "items": [
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 152796,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/0oaY19dUwZimIgzn3ZZLZO"
          },
          "href": "https://api.spotify.com/v1/tracks/0oaY19dUwZimIgzn3ZZLZO",
          "id": "0oaY19dUwZimIgzn3ZZLZO",
          "is_local": false,
          "is_playable": true,
          "name": "2 Much",
          "preview_url": null,
          "track_number": 1,
          "type": "track",
          "uri": "spotify:track:0oaY19dUwZimIgzn3ZZLZO"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 187238,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/5NU40QTlXrDUJzDBdv79bg"
          },
          "href": "https://api.spotify.com/v1/tracks/5NU40QTlXrDUJzDBdv79bg",
          "id": "5NU40QTlXrDUJzDBdv79bg",
          "is_local": false,
          "is_playable": true,
          "name": "Deserve You",
          "preview_url": null,
          "track_number": 2,
          "type": "track",
          "uri": "spotify:track:5NU40QTlXrDUJzDBdv79bg"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/6LuN9FCkKOj5PcnpouEgny"
              },
              "href": "https://api.spotify.com/v1/artists/6LuN9FCkKOj5PcnpouEgny",
              "id": "6LuN9FCkKOj5PcnpouEgny",
              "name": "Khalid",
              "type": "artist",
              "uri": "spotify:artist:6LuN9FCkKOj5PcnpouEgny"
            }
          ],
          "disc_number": 1,
          "duration_ms": 174406,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/6F2r4HgpJnvKDmkN6JEN6J"
          },
          "href": "https://api.spotify.com/v1/tracks/6F2r4HgpJnvKDmkN6JEN6J",
          "id": "6F2r4HgpJnvKDmkN6JEN6J",
          "is_local": false,
          "is_playable": true,
          "name": "As I Am (feat. Khalid)",
          "preview_url": null,
          "track_number": 3,
          "type": "track",
          "uri": "spotify:track:6F2r4HgpJnvKDmkN6JEN6J"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 156467,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/3T03rPwlL8NVk1yIaxeD8U"
          },
          "href": "https://api.spotify.com/v1/tracks/3T03rPwlL8NVk1yIaxeD8U",
          "id": "3T03rPwlL8NVk1yIaxeD8U",
          "is_local": false,
          "is_playable": true,
          "name": "Off My Face",
          "preview_url": null,
          "track_number": 4,
          "type": "track",
          "uri": "spotify:track:3T03rPwlL8NVk1yIaxeD8U"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1anyVhU62p31KFi8MEzkbf"
              },
              "href": "https://api.spotify.com/v1/artists/1anyVhU62p31KFi8MEzkbf",
              "id": "1anyVhU62p31KFi8MEzkbf",
              "name": "Chance the Rapper",
              "type": "artist",
              "uri": "spotify:artist:1anyVhU62p31KFi8MEzkbf"
            }
          ],
          "disc_number": 1,
          "duration_ms": 212093,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/6Xgq7MvZiet0hVi3KaDSgJ"
          },
          "href": "https://api.spotify.com/v1/tracks/6Xgq7MvZiet0hVi3KaDSgJ",
          "id": "6Xgq7MvZiet0hVi3KaDSgJ",
          "is_local": false,
          "is_playable": true,
          "name": "Holy (feat. Chance The Rapper)",
          "preview_url": null,
          "track_number": 5,
          "type": "track",
          "uri": "spotify:track:6Xgq7MvZiet0hVi3KaDSgJ"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2tIP7SsRs7vjIcLrU85W8J"
              },
              "href": "https://api.spotify.com/v1/artists/2tIP7SsRs7vjIcLrU85W8J",
              "id": "2tIP7SsRs7vjIcLrU85W8J",
              "name": "The Kid LAROI",
              "type": "artist",
              "uri": "spotify:artist:2tIP7SsRs7vjIcLrU85W8J"
            }
          ],
          "disc_number": 1,
          "duration_ms": 158324,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/137mSruegm1u6x9NvwiagR"
          },
          "href": "https://api.spotify.com/v1/tracks/137mSruegm1u6x9NvwiagR",
          "id": "137mSruegm1u6x9NvwiagR",
          "is_local": false,
          "is_playable": true,
          "name": "Unstable (feat. The Kid LAROI)",
          "preview_url": null,
          "track_number": 6,
          "type": "track",
          "uri": "spotify:track:137mSruegm1u6x9NvwiagR"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 104007,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/680qLWCMRfR6evrNNBCE9e"
          },
          "href": "https://api.spotify.com/v1/tracks/680qLWCMRfR6evrNNBCE9e",
          "id": "680qLWCMRfR6evrNNBCE9e",
          "is_local": false,
          "is_playable": true,
          "name": "MLK Interlude",
          "preview_url": null,
          "track_number": 7,
          "type": "track",
          "uri": "spotify:track:680qLWCMRfR6evrNNBCE9e"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/6USv9qhCn6zfxlBQIYJ9qs"
              },
              "href": "https://api.spotify.com/v1/artists/6USv9qhCn6zfxlBQIYJ9qs",
              "id": "6USv9qhCn6zfxlBQIYJ9qs",
              "name": "Dominic Fike",
              "type": "artist",
              "uri": "spotify:artist:6USv9qhCn6zfxlBQIYJ9qs"
            }
          ],
          "disc_number": 1,
          "duration_ms": 198425,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/7aely3H8kMj9o0gt6vXHE1"
          },
          "href": "https://api.spotify.com/v1/tracks/7aely3H8kMj9o0gt6vXHE1",
          "id": "7aely3H8kMj9o0gt6vXHE1",
          "is_local": false,
          "is_playable": true,
          "name": "Die For You (feat. Dominic Fike)",
          "preview_url": null,
          "track_number": 8,
          "type": "track",
          "uri": "spotify:track:7aely3H8kMj9o0gt6vXHE1"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 170813,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/1nahzW3kfMuwReTka28tH5"
          },
          "href": "https://api.spotify.com/v1/tracks/1nahzW3kfMuwReTka28tH5",
          "id": "1nahzW3kfMuwReTka28tH5",
          "is_local": false,
          "is_playable": true,
          "name": "Hold On",
          "preview_url": null,
          "track_number": 9,
          "type": "track",
          "uri": "spotify:track:1nahzW3kfMuwReTka28tH5"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 179414,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/3buwFfY33H32wfZ6X9poV3"
          },
          "href": "https://api.spotify.com/v1/tracks/3buwFfY33H32wfZ6X9poV3",
          "id": "3buwFfY33H32wfZ6X9poV3",
          "is_local": false,
          "is_playable": true,
          "name": "Somebody",
          "preview_url": null,
          "track_number": 10,
          "type": "track",
          "uri": "spotify:track:3buwFfY33H32wfZ6X9poV3"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 153190,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/6I3mqTwhRpn34SLVafSH7G"
          },
          "href": "https://api.spotify.com/v1/tracks/6I3mqTwhRpn34SLVafSH7G",
          "id": "6I3mqTwhRpn34SLVafSH7G",
          "is_local": false,
          "is_playable": true,
          "name": "Ghost",
          "preview_url": null,
          "track_number": 11,
          "type": "track",
          "uri": "spotify:track:6I3mqTwhRpn34SLVafSH7G"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/20wkVLutqVOYrc0kxFs7rA"
              },
              "href": "https://api.spotify.com/v1/artists/20wkVLutqVOYrc0kxFs7rA",
              "id": "20wkVLutqVOYrc0kxFs7rA",
              "name": "Daniel Caesar",
              "type": "artist",
              "uri": "spotify:artist:20wkVLutqVOYrc0kxFs7rA"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4fxd5Ee7UefO4CUXgwJ7IP"
              },
              "href": "https://api.spotify.com/v1/artists/4fxd5Ee7UefO4CUXgwJ7IP",
              "id": "4fxd5Ee7UefO4CUXgwJ7IP",
              "name": "Giveon",
              "type": "artist",
              "uri": "spotify:artist:4fxd5Ee7UefO4CUXgwJ7IP"
            }
          ],
          "disc_number": 1,
          "duration_ms": 198081,
          "explicit": true,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI"
          },
          "href": "https://api.spotify.com/v1/tracks/4iJyoBOLtHqaGxP12qzhQI",
          "id": "4iJyoBOLtHqaGxP12qzhQI",
          "is_local": false,
          "is_playable": true,
          "name": "Peaches (feat. Daniel Caesar & Giveon)",
          "preview_url": null,
          "track_number": 12,
          "type": "track",
          "uri": "spotify:track:4iJyoBOLtHqaGxP12qzhQI"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/46MWeeHNVMYRIIofQBEX98"
              },
              "href": "https://api.spotify.com/v1/artists/46MWeeHNVMYRIIofQBEX98",
              "id": "46MWeeHNVMYRIIofQBEX98",
              "name": "BEAM",
              "type": "artist",
              "uri": "spotify:artist:46MWeeHNVMYRIIofQBEX98"
            }
          ],
          "disc_number": 1,
          "duration_ms": 186695,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/27UcQ6dAvQrgH9C880rCM3"
          },
          "href": "https://api.spotify.com/v1/tracks/27UcQ6dAvQrgH9C880rCM3",
          "id": "27UcQ6dAvQrgH9C880rCM3",
          "is_local": false,
          "is_playable": true,
          "name": "Love You Different (feat. BEAM)",
          "preview_url": null,
          "track_number": 13,
          "type": "track",
          "uri": "spotify:track:27UcQ6dAvQrgH9C880rCM3"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
              },
              "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
              "id": "3wcj11K77LjEY1PkEazffa",
              "name": "Burna Boy",
              "type": "artist",
              "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
            }
          ],
          "disc_number": 1,
          "duration_ms": 159250,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/2tB9OFgAHjAds3cqquLlvp"
          },
          "href": "https://api.spotify.com/v1/tracks/2tB9OFgAHjAds3cqquLlvp",
          "id": "2tB9OFgAHjAds3cqquLlvp",
          "is_local": false,
          "is_playable": true,
          "name": "Loved By You (feat. Burna Boy)",
          "preview_url": null,
          "track_number": 14,
          "type": "track",
          "uri": "spotify:track:2tB9OFgAHjAds3cqquLlvp"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            }
          ],
          "disc_number": 1,
          "duration_ms": 190779,
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/2WnAKZefdRHxtBEkRjFOHC"
          },
          "href": "https://api.spotify.com/v1/tracks/2WnAKZefdRHxtBEkRjFOHC",
          "id": "2WnAKZefdRHxtBEkRjFOHC",
          "is_local": false,
          "is_playable": true,
          "name": "Anyone",
          "preview_url": null,
          "track_number": 15,
          "type": "track",
          "uri": "spotify:track:2WnAKZefdRHxtBEkRjFOHC"
        },
        {
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
              },
              "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
              "id": "1uNFoZAHBGtllmzznpCI3s",
              "name": "Justin Bieber",
              "type": "artist",
              "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/5CiGnKThu5ctn9pBxv7DGa"
              },
              "href": "https://api.spotify.com/v1/artists/5CiGnKThu5ctn9pBxv7DGa",
              "id": "5CiGnKThu5ctn9pBxv7DGa",
              "name": "benny blanco",
              "type": "artist",
              "uri": "spotify:artist:5CiGnKThu5ctn9pBxv7DGa"
            }
          ],
          "disc_number": 1,
          "duration_ms": 149189,
          "explicit": true,
          "external_urls": {
            "spotify": "https://open.spotify.com/track/3S8jK1mGzQi24ilFb45DAZ"
          },
          "href": "https://api.spotify.com/v1/tracks/3S8jK1mGzQi24ilFb45DAZ",
          "id": "3S8jK1mGzQi24ilFb45DAZ",
          "is_local": false,
          "is_playable": true,
          "name": "Lonely (with benny blanco)",
          "preview_url": null,
          "track_number": 16,
          "type": "track",
          "uri": "spotify:track:3S8jK1mGzQi24ilFb45DAZ"
        }
      ],
      "limit": 50,
      "next": null,
      "offset": 0,
      "previous": null,
      "total": 16
    },
    "streamingData": {
      "_id": "64eaec119579649da7c86107",
      "spotifyId": "5dGWwsZ9iB2Xc3UKR0gif2",
      "title": "Justice",
      "artistSpotifyId": "1uNFoZAHBGtllmzznpCI3s",
      "totalStreams": 6767855304,
      "dailyStreams": {
        "25-08-2023": 3545164,
        "26-08-2023": 3270468,
        "27-08-2023": 3025674,
        "28-08-2023": 3377606,
        "29-08-2023": 3483411,
        "30-08-2023": 3492230,
        "31-08-2023": 3502492,
        "01-09-2023": 3485321,
        "15-09-2023": 3673242
      },
      "createdAt": "2023-08-27T06:24:17.797Z",
      "updatedAt": "2023-09-17T16:36:15.593Z",
      "__v": 0
    }
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchAlbumData = async () => {
    try {
      const res = await axios.get(`/api/album/${id}`)
      console.log(res.data)
      setAlbumData(res.data.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   fetchAlbumData()
  // }, [])



  return (
    <Container>
      {/* basic details section */}
      {albumData.length !== 0 ? (
        <div className="relative h-[500px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="overflow-hidden rounded-md flex justify-center">
            <Image
              src={albumData?.albumDetails?.images[0]?.url}
              alt={albumData?.albumDetails?.name}
              width={400}
              height={400}
              className={cn(
                "object-cover transition-all hover:scale-105 rounded-xl",
              )}
            />
          </div>
          <div className='flex flex-col'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
              {albumData?.albumDetails?.name}
            </h1>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {albumData?.albumDetails?.artists?.map((artist, i) => (
                <span className='' key={i}>{artist.name}</span>
              ))}
            </h2>
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Popularity
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {albumData?.albumDetails?.popularity}
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Release Date
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {albumData?.albumDetails?.release_date}
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Total tracks
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {albumData?.albumDetails?.total_tracks}
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Label
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {albumData?.albumDetails?.label}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* streaming details section */}

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Now
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChartComponent />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <RecentSales /> */}
            </CardContent>
          </Card>
        </div>
      </div>

    </Container>
  )
}

export default Album