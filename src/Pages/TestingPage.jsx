import React, { useEffect, useState } from "react";
import supabase from "../services/subabase";
import useGetCabins from "../features/cabins/useGetCabins";
import { useForm } from "react-hook-form";
import Loading from "../UI/Loading";
import { updateCabinData } from "../services/CabinsApi";

function TestingPage() {
  return (
    <div className="card bg-base-100 w-96 shadow-xl ">
      <figure className="relative">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="w-full h-48 object-cover"
        />

        <span className="absolute -bottom-1  w-full h-[60px]  bg-gradient-to-t from-black/50 to-transparent  "></span>
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          Card Title
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}

export default TestingPage;
