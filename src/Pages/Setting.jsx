import Header from "../UI/Header";
import LayOutForm from "../UI/LayOutForm";
import useEditSetting from "../features/settings/useEditSetting";
import useGetSetting from "../features/settings/useGetSetting";

function Setting() {
  const { Setting, isPending } = useGetSetting();

  const { EditSetting } = useEditSetting();

  const Fields = [
    {
      label: "minBookingLength",
      type: "text",
      value: isPending ? "" : Setting[0]?.minBookingLength,
    },
    {
      label: "MaxBookingLength",
      type: "text",
      value: isPending ? "" : Setting[0]?.MaxBookingLength,
    },
    {
      label: "maxGuestsPerBooking",
      type: "text",
      value: isPending ? "" : Setting[0]?.maxGuestsPerBooking,
    },
    {
      label: "breakfastPrice",
      type: "text",
      value: isPending ? "" : Setting[0]?.breakfastPrice,
    },
  ];

  return (
    <>
      <Header className="w-full md:w-1/3 lg:w-1/4">Setting</Header>
      <LayOutForm
        Fields={Fields}
        isPending={isPending}
        EditSetting={EditSetting}
      />
    </>
  );
}

export default Setting;
