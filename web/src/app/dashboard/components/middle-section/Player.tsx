"use client";
import { Button } from "@/components/Button";
import React from "react";
import { FaPlay, FaVolumeHigh } from "react-icons/fa6";
import { Slider } from "./Slider";
interface PlayerProps {}

export const Player: React.FC<PlayerProps> = ({}) => {
  return (
    <div className="bg-dark-700 rounded p-4 w-screen flex flex-col justify-center items-center"></div>
  );
};
