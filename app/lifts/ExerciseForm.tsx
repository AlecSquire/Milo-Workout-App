"use client";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { muscleOptions, exerciseTypes } from "../../lib/ExerciseMappingData";
import { FileSpreadsheetIcon } from "lucide-react";

const FormSchema = z.object({
  muscle: z.array(z.string()).optional(),
  name: z.string().optional(),
  exerciseType: z.string().optional(),
});
interface FormProps {
  onMuscleSelect: Function;
  onExerciseType: Function;
  onName: Function;
  isLoading: boolean;
}
interface Data {
  muscle?: string[];
  name?: string;
  exerciseType?: string;
}
const ExerciseForm = ({
  onMuscleSelect,
  onName,
  onExerciseType,
  isLoading,
}: FormProps) => {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      muscle: [],
      name: "",
      exerciseType: "",
    },
  });

  const { handleSubmit, control, register } = formMethods;

  const onSubmit = (data: Data) => {
    onMuscleSelect(data.muscle);
    onName(data.name);
    onExerciseType(data.exerciseType);
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row md:space-x-4 px-4 py-2"
      >
        <FormField
          control={control}
          name="muscle"
          render={() => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-base">Muscle groups</FormLabel>
              <FormDescription>Select muscles</FormDescription>
              <div className="mt-2">
                {muscleOptions.map((muscle) => (
                  <FormField
                    key={muscle.id}
                    control={control}
                    name="muscle"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...field}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <FormLabel className="font-normal">
                          {muscle.label}
                        </FormLabel>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-base">Name of exercise</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This value can be partial"
                  {...field}
                  className="mt-1"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="exerciseType"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-base">Select an option</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type of exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Exercise Type</SelectLabel>
                      {exerciseTypes.map((exercise) => (
                        <SelectItem key={exercise.id} value={exercise.id}>
                          {exercise.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        {isLoading ? <ButtonLoading /> : <Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  );
};

export default ExerciseForm;
