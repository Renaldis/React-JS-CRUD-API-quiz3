import axios from "axios";
import Data from "../Components/Data";
import Input from "../Components/Input";
import { useEffect, useState } from "react";

const ManageData = () => {
  const [data, setData] = useState(null);

  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    category: "",
    release_year: "2009",
    size: "",
    price: "",
    rating: "",
    image_url: "",
    is_android_app: 0,
    is_ios_app: 0,
  });

  //indikator
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentId, setCurrentId] = useState(-1);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("https://quiz-api-rho.vercel.app/api/mobile-apps")
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log(err);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  // Action Delete Data
  const handleDelete = (e) => {
    let idData = e.target.value;
    axios
      .delete(`https://quiz-api-rho.vercel.app/api/mobile-apps/${idData}`)
      .then((res) => {
        setFetchStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  // handlePlatformChange
  const handlePlatformChange = (e) => {
    const { name, checked } = e.target;
    setInputData({
      ...inputData,
      [name]: checked ? 1 : 0,
    });
  };

  // Action Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      name,
      description,
      category,
      release_year,
      size,
      price,
      rating,
      image_url,
      is_android_app,
      is_ios_app,
    } = inputData;

    if (currentId === -1) {
      axios
        .post("https://quiz-api-rho.vercel.app/api/mobile-apps", {
          name,
          description,
          category,
          release_year,
          size,
          price,
          rating,
          image_url,
          is_android_app,
          is_ios_app,
        })
        .then(() => {
          setFetchStatus(true);
        })
        .catch(() => {
          console.log(err);
        });
    } else {
      axios
        .put(`https://quiz-api-rho.vercel.app/api/mobile-apps/${currentId}`, {
          name,
          description,
          category,
          release_year,
          size,
          price,
          rating,
          image_url,
          is_android_app,
          is_ios_app,
        })
        .then((res) => {
          setFetchStatus(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // balikin indikator ke -1
    setCurrentId(-1);
    // clear data
    setInputData({
      name: "",
      description: "",
      category: "",
      release_year: 2009,
      size: "",
      price: "",
      rating: "",
      image_url: "",
      is_android_app: 0,
      is_ios_app: 0,
    });
  };
  // Edit Data
  const handleEdit = (e) => {
    let idData = e.target.value;
    setCurrentId(idData);
    axios
      .get(`https://quiz-api-rho.vercel.app/api/mobile-apps/${idData}`)
      .then((res) => {
        let data = res.data;
        setInputData({
          name: data.name,
          description: data.description,
          category: data.category,
          release_year: data.release_year,
          size: data.size,
          price: data.price,
          rating: data.rating,
          image_url: data.image_url,
          is_android_app: data.is_android_app,
          is_ios_app: data.is_ios_app,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 className="w-[90%] mx-auto my-5 text-lg font-semibold">
        Manage Data
      </h1>
      <div className="relative overflow-x-auto w-[95%] mx-auto rounded-md mb-5 shadow-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-violet-500 dark:bg-gray-700 dark:text-gray-400">
            <tr className="font-light">
              <th scope="col" className="px-4 py-1 font-medium">
                NO
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                NAMA
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                KATEGORI
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                DESCRIPTION
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                PRICE
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                RATING
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                RELEASE YEAR
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                SIZE
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                IS_ANDROID_APP
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                IS_IOS_APP
              </th>
              <th scope="col" className="px-4 py-1 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((res, index) => {
                return (
                  <Data
                    key={index}
                    number={index + 1}
                    res={res}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      {/* FORM INPUT */}
      <div className="w-[75%] mx-auto rounded-md mb-5 shadow-lg bg-white p-5">
        <h1 className="text-xl font-semibold text-center mb-4">Create Data</h1>
        <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
          <p className="mb-5">Gambar Data Game</p>
          <hr />
          <Input
            label="Image URL"
            name="image_url"
            type="text"
            placeholder="Masukkan URL Gambar"
            value={inputData.image_url}
            onChange={handleInputChange}
            required
          />
          <p className="mb-5">Data Game</p>
          <hr />
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Masukkan Nama"
            value={inputData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Category"
            name="category"
            type="text"
            placeholder="Masukkan Kategori"
            value={inputData.category}
            onChange={handleInputChange}
            required
          />
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={inputData.description}
              onChange={handleInputChange}
              required
              placeholder="Masukkan Deskripsi"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Input
            label="Price"
            name="price"
            type="number"
            value={inputData.price}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Rating (0 - 5)"
            name="rating"
            type="number"
            min="0"
            max="5"
            value={inputData.rating}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Release Year"
            name="release_year"
            type="number"
            min="2009"
            max="2024"
            value={inputData.release_year}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Size (MB)"
            name="size"
            type="number"
            min="1"
            value={inputData.size}
            onChange={handleInputChange}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Platform
            </label>
            <div className="flex items-center">
              <label htmlFor="is_android_app" className="mr-4">
                Android ?
              </label>
              <input
                type="checkbox"
                id="is_android_app"
                name="is_android_app"
                checked={inputData.is_android_app === 1}
                onChange={handlePlatformChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="is_ios_app" className="mr-4">
                iOS ?
              </label>
              <input
                type="checkbox"
                id="is_ios_app"
                name="is_ios_app"
                checked={inputData.is_ios_app === 1}
                onChange={handlePlatformChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ManageData;
