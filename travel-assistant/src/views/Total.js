import React from "react";
import "./Total.css";

export default function Total({ total }) {
  return (
    <div className="tripTotal">
      <h2>Total: ${Math.floor(total * 100) / 100}</h2>
    </div>
  );
}
