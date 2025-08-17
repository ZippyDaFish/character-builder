"use client";
import CustomButton from "./components/customButton";

export default function Home() {
  return (
    <div>
      <h1>Unregistered Homepage</h1>
      <p>News about the ttrpg</p>
      <p>Basic informational section</p>
      <CustomButton 
        onClick={() => console.log("Button clicked")} 
        label={"Test Button"}
        classes={"smallText"}
      />
    </div>
  );
}
