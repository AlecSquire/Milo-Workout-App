"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { capitalize } from "@/lib/utils";
const workoutSchema = z.object({
  description: z.string().optional(),
  workoutName: z
    .string()
    .min(2, { message: "Workout must have a name, between 2-50 characters." })
    .max(50),
  workout: z.array(
    z.object({
      exercise: z
        .string()
        .min(2, {
          message: "You need to name your exercise, between 2-50 characters.",
        })
        .max(50),
      reps: z.union([z.string(), z.number()]).optional(),
      sets: z.union([z.string(), z.number()]).optional(),
      weight: z.number().optional(),
      complete: z.boolean().default(false).optional(),
    })
  ),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

export default function StartBlankWorkoutForm() {
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workout: [{ exercise: "", reps: 0, sets: 0, weight: 0, complete: false }],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workout",
  });

  const onSubmit: SubmitHandler<WorkoutFormValues> = async (data) => {
    console.log(data);

    try {
      // Join workoutName with hyphens between words
      const formattedRoutineId = data.workoutName
        .replace(/\s+$/, "")
        .replace(/\s+/g, "-");

      // Use the formatted workoutName as the document ID
      const documentId = formattedRoutineId;

      // Create a document reference with the generated ID
      const docRef = doc(db, "userRoutines", documentId);

      // Set the data with the generated ID
      await setDoc(docRef, {
        ...data,
        id: documentId,
      });
      console.log("Document written with ID: ", documentId);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="workoutName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...register("workoutName", { required: true })}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your unique name for the workout routine
              </FormDescription>
              <FormMessage>
                {errors.workoutName && (
                  <span>{errors.workoutName.message}</span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" {...register("description")} {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of the workout
              </FormDescription>
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <section key={field.id} className="space-y-4">
            <FormField
              control={control}
              name={`workout.${index}.exercise`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...register(`workout.${index}.exercise` as const)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.workout?.[index]?.exercise && (
                      <span>{errors.workout?.[index]?.exercise?.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workout.${index}.sets`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Sets</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...register(`workout.${index}.sets` as const, {
                        valueAsNumber: true,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workout.${index}.reps`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Reps</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...register(`workout.${index}.reps` as const)}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workout.${index}.weight`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...register(`workout.${index}.weight` as const, {
                        valueAsNumber: true,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workout.${index}.complete`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      {...register(`workout.${index}.complete` as const)}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="button" onClick={() => remove(index)}>
              Remove exercise
            </Button>
          </section>
        ))}

        <Button
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
        </Button>

        <Button type="submit">Finish workout</Button>
      </form>
    </Form>
  );
}
