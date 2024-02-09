import React, { useEffect, useState } from "react";
import "../style.css";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import PlayMovie from "../components/PlayMovie";

export default function Movie() {
  const [blackHeader, setBlackHeader] = useState(false);

  const location = useLocation();
  const movie = location.state.movie;

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://publisheranalytics.ai/publisher-sdk-stage";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.addEventListener('load', function() {
          var accountCode = "publisher-analytics-website";
          var userId = "83068";
          var sdk = new PublisherAnalyticsSDK(accountCode, userId);
          sdk.setupExperiments();
      });
    `;
    document.body.appendChild(script2);
  }, []);

  return (
    <div className="movie-page">
      <Header black={blackHeader} />
      {movie && <PlayMovie item={movie} />}
    </div>
  );
};
