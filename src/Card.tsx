import "./styles.css";
//import { useState } from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode,
};

export default function Card({ children}:Props) {
  return <div className="card bg-body-secondary px-5 py-3 cssw-500px">{children} </div>;
}