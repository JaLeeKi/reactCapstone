import React from "react";

export default function Total({ total }) {
  return (
    <div>
      <h2>Total: ${Math.floor(total * 100) / 100}</h2>
    </div>
  );
}
