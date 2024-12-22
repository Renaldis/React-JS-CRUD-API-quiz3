export default function Data({ res, number, handleDelete, handleEdit }) {
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
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xs">
      <th
        scope="row"
        className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {number}
      </th>
      <td className="px-4 py-1">{res.name}</td>
      <td className="px-4 py-1">{res.category}</td>
      <td className="px-4 py-1">
        {res.description.length > 20
          ? res.description.substring(0, 20) + "..."
          : res.description}
      </td>
      <td className="px-4 py-1">{convertToRupiah(res.price)}</td>
      <td className="px-4 py-1">{res.rating}</td>
      <td className="px-4 py-1">{res.release_year}</td>
      <td className="px-4 py-1">{res.size}</td>
      <td className="px-4 py-1">{res.is_android_app}</td>
      <td className="px-4 py-1">{res.is_ios_app}</td>
      <td className="py-1">
        <button
          className="border-[1px] p-1 rounded-md bg-yellow-500 text-white"
          onClick={handleEdit}
          value={res._id}
        >
          edit
        </button>
        <button
          className="border-[1px] p-1 rounded-md bg-red-500 text-white"
          value={res._id}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
