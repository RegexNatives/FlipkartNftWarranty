import Button from "../component/Button";

export const formatDate = (dt) => {
  return new Date(dt).toUTCString().substring(0, 16);
};



const renderRequestButton = (requestStatus, onClickFunction) => {
  if (!requestStatus.status) {
    return (
      <Button
        text="Request Warranty"
        onClickFunction={() => onClickFunction("getWarranty")}
      />
    );
  } else if (requestStatus.status && requestStatus.data.status === "Pending") {
    return "Request Pending";
  } else {
    return null;
  }
};


export const renderActionButton = (
  orderStatus,
  requestStatus,
  onClickFunction
) => {
  if (orderStatus === "Delivered" ) {
    return (
      <>
        {renderRequestButton(requestStatus, onClickFunction)}
      </>
    );
  } else {
    return orderStatus !== "Delivered"
      ? "You can ask for warranty once the product is delivered!"
      : null;
  }
};
