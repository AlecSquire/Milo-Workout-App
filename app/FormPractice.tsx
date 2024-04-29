import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { constructURL } from "./utils"; // Import the URL construction function
import DataResponse from "./DataResponse";

interface IForm {
  name?: string;
  type?: string;
  muscle?: string;
}

const FormPractice = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IForm>();
  const [lifts, setLifts] = useState([]);
  let [finalURL, setFinalURL] = useState<string | null>(null); // Initialize finalURL as null

  const onSubmit: SubmitHandler<IForm> = async (formData) => {
    try {
      const baseURL = "https://api.api-ninjas.com/v1/exercises";
      const constructedURL = constructURL(baseURL, formData);
      setFinalURL(constructedURL); // Update finalURL with the constructed URL
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center bg-gray-100 p-8 border-r border-dashed">
        <div className="shadow-lg rounded-md bg-white p-2 flex flex-col">
          <h2 className="text-center font-medium text-2xl">
            Exercise list api call
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col justify-evenly"
          >
            <label className=" text-black">
              name (optional) - name of exercise. This value can be partial
              (e.g. press will match Dumbbell Bench Press)
              <input
                className="border-2 outline-none p-2 rounded-md bg-gray-200 p-8  text-black"
                placeholder="Name of exercise"
                {...register("name")}
              />
            </label>
            <label className=" text-black">
              type (optional) - exercise type. Possible values are:
              <select
                {...register("type")}
                className="flex justify-center p-2 rounded-md w-1/2 self-center bg-yellow-900 text-white hover:bg-gray-800"
              >
                <option value="">Select a type of exericse</option>
                <option value="cardio">cardio</option>
                <option value="olympic_weightlifting">
                  olympic_weightlifting
                </option>
                <option value="plyometrics">plyometrics</option>{" "}
                <option value="powerlifting">powerlifting</option>{" "}
                <option value="strength">strength</option>{" "}
                <option value="strongman">strongman</option>{" "}
                <option value="stretching">stretching</option>{" "}
              </select>
            </label>
            <label className=" text-black">
              Muscle (optional) - muscle group targeted by the exercise.
              Possible values are:
            </label>
            <select
              id="muscle"
              {...register("muscle")}
              className="flex justify-center p-2 rounded-md w-1/2 self-center bg-yellow-900 text-white hover:bg-gray-800"
            >
              <option value="">Select a muscle group</option>
              <option value="abdominals">Abdominals</option>
              <option value="abductors">Abductors</option>
              <option value="adductors">Adductors</option>
              <option value="biceps">Biceps</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="forearms">Forearms</option>
              <option value="glutes">Glutes</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="lats">Lats</option>
              <option value="lower_back">Lower Back</option>
              <option value="middle_back">Middle Back</option>
              <option value="neck">Neck</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="traps">Traps</option>
              <option value="triceps">Triceps</option>
            </select>
            <button
              className=" flex justify-center p-2 rounded-md w-1/2 self-center bg-yellow-400  text-white hover:bg-gray-800"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <DataResponse finalURL={finalURL} />
    </>
  );
};

export default FormPractice;
