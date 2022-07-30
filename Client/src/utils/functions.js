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

const renderRevailButton = (requestStatus, revailStatus, onClickFunction) => {
  if (requestStatus?.data?.status == "Minted") {
    if (!revailStatus?.status) {
      return (
        <Button
          text="Revail Warranty"
          onClickFunction={() => onClickFunction("revailWarranty")}
        />
      );
    } else if (
      revailStatus?.status &&
      revailStatus?.data?.status == "Pending"
    ) {
      return "Revail Pending";
    }
  }
  return null;
};
const renderResaleButton = (requestStatus, resaleStatus, onClickFunction) => {
  if (requestStatus?.data?.status == "Minted") {
    if (!resaleStatus?.status) {
      return (
        <Button
          text="Resale Warranty"
          onClickFunction={() => onClickFunction("resaleWarranty")}
        />
      );
    } else if (
      resaleStatus?.status &&
      resaleStatus?.data?.status == "Pending"
    ) {
      return "Resale Pending";
    }
  }
  return null;
};

export const renderActionButton = (
  orderStatus,
  requestStatus,
  revailStatus,
  resaleStatus,
  onClickFunction
) => {
  if (orderStatus === "Delivered" && resaleStatus?.data?.status != "Minted") {
    return (
      <>
        {renderRequestButton(requestStatus, onClickFunction)}
        {/* {renderRevailButton(requestStatus, revailStatus, onClickFunction)} */}
        {/* {renderResaleButton(requestStatus, resaleStatus, onClickFunction)} */}
      </>
    );
  } else {
    return orderStatus !== "Delivered"
      ? "You can ask for warranty once the product is delivered!"
      : resaleStatus?.data?.status == "Minted"
      ? `You have sold the warranty to ${resaleStatus?.data?.customerWallet}`
      : null;
  }
};

{
  /* {order?.orderStatus === "Delivered" ? null : null}
                {requestStatus?.status &&
                requestStatus?.data.status == "Pending" ? (
                  "Request Pending"
                ) : (
                  <Button
                    onClickFunction={() => handleWarranty("getWarranty")}
                    text={"Request"}
                  />
                )}
                {requestStatus?.status &&
                requestStatus?.data.status == "Minted" ? (
                  <Button
                    onClickFunction={() => handleWarranty("revailWarranty")}
                    text={"Avail"}
                  />
                ) : null}
                {requestStatus?.status &&
                requestStatus?.data.status == "Minted" ? (
                  <Button
                    onClickFunction={() => handleWarranty("resaleWarranty")}
                    text={"Resale"}
                  />
                ) : null} */
}
