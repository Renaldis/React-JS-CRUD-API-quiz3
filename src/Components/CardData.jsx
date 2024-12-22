const CardData = ({ res }) => {
  // Mengubah ke GB
  function convertToGB(input) {
    if (typeof input !== "number" || input < 0) {
      return "Invalid input. Please provide a non-negative integer.";
    }

    const gb = Math.floor(input / 1000);
    return `${gb}GB`;
  }

  // logika phone
  let phone;
  if (res.is_android_app && res.is_ios_app) {
    phone = "Android & iOS";
  } else if (res.is_android_app) {
    phone = "Android";
  } else if (res.is_ios_app) {
    phone = "iOS";
  } else {
    phone = "";
  }

  // convert rupiah
  function convertToRupiah(amount) {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "Invalid input. Please provide a valid number.";
    }

    // Format angka menjadi Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }

  return (
    <div className="mt-10 h-72 flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden ">
      <img
        src={res.image_url}
        className="w-1/3 bg-cover bg-center bg-landscape"
      />
      <div className="w-2/3 p-4">
        <h1 className="text-gray-900 font-bold text-2xl">{res.name}</h1>
        <small>{res.release_year}</small>
        <p className="mt-2 text-gray-600 text-sm">
          {res.description.length > 150
            ? res.description.substring(0, 150) + "..."
            : res.description}
        </p>
        <div className=" item-center mt-2 text-gray-500">
          <span>{res.category} </span>
          <span>{convertToGB(res.size)}</span>
          <span>, {phone}</span>
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">
            {res.price === 0 ? "Free" : convertToRupiah(res.price)}
          </h1>
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
            {res.rating} RATINGS
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardData;
