"use client";
import { useEffect, useState, FormEvent } from "react";
import { FormField } from "@/components/ui/form";
import {
  useForm,
  SubmitHandler,
  // setValue,
  useFieldArray,
} from "react-hook-form";
import { number } from "zod";

import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Description } from "@radix-ui/react-toast";
import { FormFields, IWorkout, StartNewForm } from "@/types";

// interface IFormInput {
//   workoutName: string;
//   exerciseName?: string;
//   bodyPart?: BodyPartEnum;
//   category?: CategoryEnum;
// }

// enum BodyPartEnum {
//   core = "core",
//   arms = "arms",
//   back = "back",
//   chest = "chest",
//   legs = "legs",
//   shoulders = "shoulders",
//   fullBody = "fullBody",
//   other = "other",
// }

// enum CategoryEnum {
//   barbell = "barbell",
//   dumbbell = "dumbbell",
//   machine = "machine",
// }

export default function StartBlankWorkoutForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StartNewForm>({
    defaultValues: {
      workout: [{ exercise: "", reps: 0, sets: 0, weight: 0, complete: false }],
    },
  });

  const { fields, append, remove } = useFieldArray<
    StartNewForm,
    "workout",
    "id"
  >({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "workout", // unique name for your Field Array
  });

  //add item to DB
  const onSubmit: SubmitHandler<StartNewForm> = async (data) => {
    console.log(data);
    try {
      // const { workout, workoutFields } = data; // Destructure workoutName and workout from data
      // const combinedData = [{ workoutFields }, { workout }]; // Create an array containing both objects
      const docRef = await addDoc(collection(db, "userRoutines"), {
        // combinedData: combinedData, // Push the array of combined objects
        data: data,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Workout Name</label>
        <input
          type="string"
          {...register(`workoutName`, { required: true })}
          style={{ background: "blue" }}
        />
        <label>Description</label>
        <input
          type="string"
          {...register("description", { required: false })}
          style={{ background: "blue" }}
        />
        {fields.map((field, index) => (
          <section key={field.id} style={{ background: "grey" }}>
            <label>Exercise Name</label>
            <input
              type="string"
              {...register(`workout.${index}.exercise` as const)}
              style={{ background: "blue" }}
            />
            <label>Add Sets</label>
            <input
              type="number"
              {...register(`workout.${index}.sets` as const, {
                valueAsNumber: true,
              })}
              style={{ background: "blue" }}
            />
            <label>Add reps</label>
            <input
              type="number | string"
              {...register(`workout.${index}.reps` as const)}
              style={{ background: "blue" }}
            />
            <label>Add weight</label>
            <input
              type="number"
              {...register(`workout.${index}.weight` as const, {
                valueAsNumber: true,
              })}
              style={{ background: "blue" }}
            />
            <input
              type="checkbox"
              className="checkBox"
              {...register(`workout.${index}.complete` as const)}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove exercise
            </button>
          </section>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              exercise: "",
              reps: 0,
              sets: 0,
              weight: 0,
              complete: false,
            })
          }
        >
          Add exercise
        </button>

        <p>{errors.workout?.root?.message}</p>
        <button type="submit">Finish workout</button>
      </form>
    </>
  );
}

/* <label>Add Exercise Name</label>
<input {...register("exerciseName")} />
<label>Body Part</label>
<select {...register("bodyPart")}>
  <option value="core">core</option>
  <option value="arms">arms</option>
  <option value="back">back</option>
  <option value="chest">chest</option>
  <option value="legs">legs</option>
  <option value="shoulders">shoulders</option>
  <option value="fullBody">full body</option>
  <option value="other">other</option>
</select>
<label>Category</label>
<select {...register("category")}>
  <option value="barbell">barbel</option>
  <option value="dumbbell">dumbbell</option>
  <option value="machine">machine</option>
</select> */
