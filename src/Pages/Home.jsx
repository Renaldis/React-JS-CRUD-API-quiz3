import axios from "axios";
import CardData from "../Components/CardData";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://quiz-api-rho.vercel.app/api/mobile-apps")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* batas awal Content Section */}
      <section className="bg-gray-200 p-5">
        <div className="container mx-auto mt-10 w-[90%]">
          <h1 className="text-xl font-bold ">Find your data that you need!</h1>
        </div>
        <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start w-[90%]">
          {/* Batas awal Card section */}
          {data !== null &&
            data.map((res, index) => {
              return <CardData key={index} res={res} />;
            })}
          {/* Batas akhir Card section */}
        </div>
      </section>
      {/* batas akhir Content Section */}
    </>
  );
};

export default Home;
