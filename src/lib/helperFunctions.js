export const millisecondsToMinutesSeconds = (duration_ms) => {
  let seconds = Math.floor(duration_ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  // Format the result as minutes:seconds
  let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return formattedDuration;
}

export const getLatestDateValue = (data) => {
  try {
    let maxDate = null;
    let maxValue = null;

    for (const dateStr in data) {
      // Parsing the date string in the format "DD-MM-YYYY"
      const parts = dateStr.split('-');
      const currentDate = new Date(`${parts[1]}-${parts[0]}-${parts[2]}`);
      const value = data[dateStr];

      if (!isNaN(currentDate.getTime()) && (maxDate === null || currentDate > maxDate)) {
        maxDate = currentDate;
        maxValue = value;
      }
    }
    return maxValue;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const formatDate = (dateString) => {
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: userTimezone || 'UTC',
    };
    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const toSentenceCase = (word) => {
  if (!word) return null;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const countriesList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];



export const formatDataForWrappedBanner = (data, platform) => {
  let formattedData = {
    coverImg: null,
    topArtists: [],
    topSongs: [],
    topAlbums: [],
  };

  if (platform === 'lastFm') {
    formattedData.coverImg = data?.albums?.[0]?.image?.[3]?.['#text'];
    formattedData.topArtists = data?.artists?.slice(0, 5)?.map((artist) => artist?.name);
    formattedData.topSongs = data?.tracks?.slice(0, 5)?.map((track) => {
      return {
        name: track?.name,
        artist: track?.artist?.name,
        playcount: track?.playcount,
      }
    });
    formattedData.topAlbums = data?.albums?.slice(0, 5)?.map((album) => {
      return {
        name: album?.name,
        artist: album?.artist?.name,
        playcount: album?.playcount,
      }
    });
  } else if (platform === 'spotify') {
    formattedData.coverImg = data?.artists[0]?.images[0]?.url;
    formattedData.topArtists = data?.artists?.slice(0, 5)?.map((artist) => artist?.name);
    formattedData.topSongs = data?.tracks?.slice(0, 5)?.map((track) => {
      return {
        name: track?.name,
        artist: track?.artists?.map((artist) => artist?.name).join(", "),
      }
    });
  }
  return formattedData;
}

// export const bgOptions = [
//   'bg-gradient-to-r from-cyan-500 to-blue-500',
//   'bg-gradient-to-r from-purple-500 to-purple-900',
//   'bg-gradient-to-r from-slate-900 to-slate-700',
//   'bg-gradient-to-r from-emerald-500 to-emerald-900',
//   'bg-gradient-to-r from-blue-800 to-indigo-900',
//   'bg-gradient-to-r from-violet-200 to-pink-200',
//   'bg-gradient-to-r from-amber-200 to-yellow-400',
//   'bg-black',
//   'bg-white'
// ]

export const bgOptions = [
  {
    color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    text: 'black'
  },

  {
    color: 'bg-gradient-to-r from-purple-500 to-purple-900',
    text: 'white'
  },

  {
    color: 'bg-gradient-to-r from-slate-900 to-slate-700',
    text: 'white'
  },

  {
    color: 'bg-gradient-to-r from-emerald-500 to-emerald-900',
    text: 'white'
  },

  {
    color: 'bg-gradient-to-r from-blue-800 to-indigo-900',
    text: 'white'
  },
  {
    color: 'bg-gradient-to-r from-red-500 to-orange-500',
    text: 'black'
  },

  {
    color: 'bg-gradient-to-r from-violet-200 to-pink-200',
    text: 'black'
  },
  {
    color: 'bg-gradient-to-r from-amber-500 to-pink-500',
    text: 'black'
  },

  {
    color: 'bg-gradient-to-r from-amber-200 to-yellow-400',
    text: 'black'
  },
  {
    color: 'bg-gradient-to-r from-fuchsia-500 to-cyan-500',
    text: 'black'
  },
  {
    color: 'bg-gradient-to-r from-lime-400 to-lime-500',
    text: 'black'
  },

  {
    color: 'bg-black',
    text: 'white'
  },

  {
    color: 'bg-white',
    text: 'black'
  }
]



export const timePeriodMap = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "Last 1 year",
  "7day": "Last 7 days",
  "1month": "Last 1 month",
  "3month": "Last 3 months",
  "6month": "Last 6 months",
  "12month": "Last 1 year",
  "overall": "All Time"
}