"use client";
import {
  useForm,
  FormProvider,
  Controller,
  useController,
} from "react-hook-form";
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

const FormSchema = z.object({
  muscle: z.array(z.string()).optional(),
  name: z.string().optional(),
  exerciseType: z.string().optional(),
});

interface FormProps {
  onMuscleSelect: (muscles: string[]) => void;
  onExerciseType: (exerciseType: string) => void;
  onName: (name: string) => void;
  onFetch: () => void;
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
  onFetch,
  isLoading,
}: FormProps) => {
  const formMethods = useForm<Data>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      muscle: [],
      name: "",
      exerciseType: "",
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = (data: Data) => {
    onMuscleSelect(data.muscle || []);
    onName(data.name || "");
    onExerciseType(data.exerciseType || "");
    onFetch();
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
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-base">Muscle groups</FormLabel>
              <FormDescription>Select muscles</FormDescription>
              <div className="mt-2">
                {muscleOptions.map((muscle: { id: string; label: string }) => (
                  <div key={muscle.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(muscle.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), muscle.id]);
                        } else {
                          field.onChange(
                            (field.value || []).filter((id) => id !== muscle.id)
                          );
                        }
                      }}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <FormLabel className="font-normal">
                      {muscle.label}
                    </FormLabel>
                  </div>
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
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
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
        <div className="flex items-center mt-4 md:mt-0">
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ExerciseForm;
