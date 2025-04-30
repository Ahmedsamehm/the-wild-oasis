import React from "react";

function LayOutForm({ Fields, EditSetting }) {
  const handelUpdate = (e, filed) => {
    const { value } = e.target;
    EditSetting({ [filed]: value });
  };

  return (
    <>
      <form className="bg-[#1a202c] text-white p-6 rounded-xl shadow-md w-full  mx-auto ">
        <div className="space-y-4">
          {Fields?.map((field, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row  items-center space-x-0 md:space-x-[6vw] basis-auto gap-3"
            >
              <label
                htmlFor={field.label}
                className="w-full md:w-2/5 text-md 2xl:text-lg text-start"
              >
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                id={index}
                placeholder="Type here"
                className="input w-full  md:w-1/2  text-md 2xl:text-lg bg-gray-700 border-gray-600"
                defaultValue={field.value}
                onBlur={(e) => {
                  handelUpdate(e, field.label);
                }}
              />
            </div>
          ))}

          <div className="flex basis-auto justify-end gap-3">
            <button type="button" className="btn btn-neutral">
              Cancel
            </button>
            <button type="button" className="btn btn-success">
              Create New Acc
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LayOutForm;
