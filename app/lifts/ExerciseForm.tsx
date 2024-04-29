// ExerciseForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
const muscles = [
  {
    id: "biceps",
    label: "Biceps",
  },
  {
    id: "calves",
    label: "Calves",
  },
  {
    id: "chest",
    label: "Chest",
  },
  {
    id: "forearms",
    label: "Forearms",
  },
  {
    id: "glutes",
    label: "Glutes",
  },
  {
    id: "hamstrings",
    label: "Hamstrings",
  },
  {
    id: "lats",
    label: "Lats",
  },
  {
    id: "lower_back",
    label: "Lower Back",
  },
  {
    id: "middle_back",
    label: "Middle Back",
  },
  {
    id: "neck",
    label: "Neck",
  },
  {
    id: "quadriceps",
    label: "Quadriceps",
  },
  {
    id: "traps",
    label: "Traps",
  },
  {
    id: "triceps",
    label: "Triceps",
  },
  {
    id: "abdominals",
    label: "Abdominals",
  },
] as const;
const ExerciseForm = ({ onMuscleSelect }) => {
  const { register, handleSubmit, watch } = useForm();
  const selectedMuscle = watch("selectedMuscle");
  const form = useForm;
  const handleFormSubmit = (data) => {
    onMuscleSelect(data.selectedMuscle);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <label>
          Pick a muscle:
          <select
            {...register("selectedMuscle")}
            defaultValue={[""]}
            multiple={true}
          >
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
          <Button type="submit">Submit</Button>
        </label>
      </form>
    </Form>
  );
};

export default ExerciseForm;
