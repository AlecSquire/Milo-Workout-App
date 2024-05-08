"use client";
import { FormField } from "@/components/ui/form";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { number } from "zod";

interface IFormInput {
  workoutName: string;
  exerciseName?: string;
  bodyPart?: BodyPartEnum;
  category?: CategoryEnum;
}

enum BodyPartEnum {
  core = "core",
  arms = "arms",
  back = "back",
  chest = "chest",
  legs = "legs",
  shoulders = "shoulders",
  fullBody = "fullBody",
  other = "other",
}

enum CategoryEnum {
  barbell = "barbell",
  dumbbell = "dumbbell",
  machine = "machine",
}

type FormFields = {
  workout: {
    exerciseName: string;
    reps: number | string;
    sets: number;
    weight: number;
    complete: boolean;
  };
};

export default function StartBlankWorkoutForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      workout: [{ exercise: "", reps: 0, sets: 0, weight: 0, complete: false }],
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  // handleSubmit(async (data) => await fetchAPI(data))

  const { fields, append, remove } = useFieldArray<FormFields>({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "workout", // unique name for your Field Array
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Workout Name</label>
        <input {...register("workoutName")} />
        {fields.map((field, index) => (
          <section
            key={field.id}
            className={field.complete ? "bg-green-200" : ""}
          >
            <label>Add Exercise Name</label>
            <input type="string" {...register(`workout.${index}.exercise`)} />
            <label>Add Sets</label>
            <input type="number" {...register(`workout.${index}.sets`)} />
            <label>Add reps</label>
            <input
              type="number | string"
              {...register(`workout.${index}.reps`)}
            />
            <label>Add weight</label>
            <input
              type="number"
              {...register(`workout.${index}.weight`)}, {value}/>
            <input
              type="checkbox"
              {...register(`workout.${index}.complete`)}
            ></input>
            {/* if true row green  */}
          </section>
        ))}
        <button type="button" onClick={() => append()}>
          {" "}
          Add exercise
        </button>
        <button type="button" onClick={() => remove(index)}>
          {" "}
          Remove exercise{" "}
        </button>
        <button type="submit">Finish workout</button>
      </form>
    </>
  );
}

{
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
}
