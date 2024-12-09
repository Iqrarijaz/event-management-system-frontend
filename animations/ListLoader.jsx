import { Skeleton } from "antd";
import React from "react";

function ListLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        border: "none",
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff7d",
        zIndex: 999,
        borderRadius: "0px",
      }}
    >
      <Skeleton
        active
        style={{
          width: "80%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}

export default ListLoader;
