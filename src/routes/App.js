import React, { useEffect, useState } from "react";
import db from "../db";
import MovieRow from "../components/MovieRow";
import "../style.css";
import FeaturedMovie from "../components/FeaturedMovie";
import Header from "../components/Header";
import PublisherAnalyticsLogo from "../components/images/publisher-logo.png";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await db.getHomeList();
      setMovieList(list);

      // Pegando o filme em destaque
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await db.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

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
          var accountCode = "abdev";
          var userId = "83068";
          var sdk = new PublisherAnalyticsSDK(accountCode, userId);
          sdk.setupExperiments();
      });
    `;
    document.body.appendChild(script2);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <img
          style={{ width: "80px" }}
          src={PublisherAnalyticsLogo}
          alt="Publisher Analytics Logo"
        />
        <p>
          This is a{" "}
          <a href="https://www.publisheranalytics.ai/">Publisher Analytics</a>{" "}
          Demo Page
        </p>
        <p>Rights for Netflix and themoviedb.org</p>
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Carregando"
            size={13}
          ></img>
        </div>
      )}
    </div>
  );
};
