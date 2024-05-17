import React, { useEffect, useState } from "react";
import { getHomePage } from "../../utils/constants";
import Carousel from "./components/Carousel";
import TrendingSection from "./components/trending/TrendingSection";
import Section from "./components/Section";
const WatchPage = () => {
  const [homeData, setHomeData] = useState();

  useEffect(() => {
    async function getData() {
      const data = await getHomePage();
      setHomeData(data);
    }
    getData();
  }, []);

  return (
    <div className="watch-page">
      <Carousel carouselData={homeData?.carouselData} />

      <div className="max-w-[200px] md:max-w-[650px] lg:max-w-[980px] xl:max-w-[1250px] mx-auto">
        {homeData?.combinedData &&
          Object.keys(homeData?.combinedData)
            .slice(0, 2)
            .map((item, index) => (
              <Section
                section={item}
                data={homeData?.combinedData?.[item]}
                key={index}
              />
            ))}
        <TrendingSection trendingData={homeData?.trendingData} />
        {homeData?.combinedData &&
          Object.keys(homeData?.combinedData)
            .slice(3, 5)
            .map((item, index) => (
              <Section
                section={item}
                data={homeData?.combinedData?.[item]}
                key={index}
              />
            ))}
      </div>
    </div>
  );
};

export default WatchPage;
