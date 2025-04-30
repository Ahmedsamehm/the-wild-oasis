import React, { useState } from "react";
import Table from "../../UI/Table";

import CabinForm from "./CabinForm";
import useDeletingCabin from "./useDeletingCabin";
import { useFilter } from "./useFilter";

import useGetCabins from "./useGetCabins";
import Loading from "../../UI/Loading";

function CabinsTable() {
  const { cabins, isLoading } = useGetCabins();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState();
  const { isDeleting, OnClickDeleteCabin } = useDeletingCabin();

  const { sortedCabins } = useFilter(cabins || []);

  const columns = [
    { header: "Cabin", width: "w-1/6" },
    { header: "Name", width: "w-1/6" },
    { header: "Capacity", width: "w-1/6" },
    { header: "Price", width: "w-1/6" },
    { header: "Discount", width: "w-1/6" },
    { header: "Actions", width: "w-1/6" },
  ];

  // i have to send this data to db  [id:CabinId,description,discount,regularPrice,maxCapacity ,Name, image]
  const handelSelectedCabin = (id) => {
    const selectedCabin = sortedCabins.find((cabin) => cabin.id === id);

    if (selectedCabin) {
      const upDateData = {
        id: selectedCabin.id,
        description: selectedCabin.description,
        discount: selectedCabin.discount,
        regularPrice: selectedCabin.regularPrice,
        maxCapacity: selectedCabin.maxCapacity,
        Name: selectedCabin.Name,
        image: selectedCabin.image,
      };
      setSelectedCabin(upDateData);
      setIsOpen(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table columns={columns}>
          {sortedCabins?.map((cabin) => (
            <tr
              key={cabin.id}
              className="hover:bg-base-300 transition-colors text-center"
            >
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar mx-auto">
                    <div className="mask mask-squircle size-12">
                      <img src={cabin.image} alt={cabin.Name} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{cabin.Name}</td>
              <td>{cabin.maxCapacity}</td>
              <td>{cabin.regularPrice}</td>
              <th>${cabin.discount}</th>
              <th>
                <div className="flex gap-2">
                  <button
                    className="btn btn-error"
                    onClick={() => OnClickDeleteCabin(cabin.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>

                  <button
                    onClick={() => handelSelectedCabin(cabin.id)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </Table>
      )}

      <button
        className="btn btn-primary mt-4"
        onClick={() => {
          setSelectedCabin(null); // Clear for adding new cabin
          setIsOpen(true);
        }}
      >
        Add Cabin
      </button>

      {isOpen && (
        <dialog
          open
          className="modal modal-open"
          onClose={() => setIsOpen(false)}
        >
          <div className="modal-box max-w-2xl bg-base-200 p-6 shadow-lg">
            <CabinForm setIsOpen={setIsOpen} cabinToEdit={selectedCabin} />
          </div>
        </dialog>
      )}
    </>
  );
}

export default CabinsTable;
