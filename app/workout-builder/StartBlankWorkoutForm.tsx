"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { getAuth } from "firebase/auth";

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
      sets: z
        .string()
        .min(2, {
          message: "no more than 50 sets (you animal ;) )",
        })
        .max(50),
      weight: z.union([z.string(), z.number()]).optional(),
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
  const { toast } = useToast();

  const onSubmit: SubmitHandler<WorkoutFormValues> = async (data) => {
    try {
      // Get the current authenticated user
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is signed in.");
      }

      // Get the user's unique ID (UID)
      const userID = user.uid;

      // Format the workout name to be used as a document ID
      const formattedRoutineId = data.workoutName
        .replace(/\s+$/, "")
        .replace(/\s+/g, "-");

      // Create a document reference with the generated ID
      const docRef = doc(db, "routines", formattedRoutineId);

      // Set the data with the generated ID and include the user ID
      await setDoc(docRef, {
        ...data,
        userID: userID, // Include the user ID
        id: formattedRoutineId,
      });

      // Display success toast
      toast({
        title: "Success",
        description: `Document written with ID: ${formattedRoutineId}`,
        status: "success",
      });

      console.log("Document written with ID: ", formattedRoutineId);
    } catch (error) {
      // Display error toast
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
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
            {/* hidden */}
            <FormField
              control={control}
              name={`workout.${index}.complete`}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Complete</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      {...register(`workout.${index}.complete` as const)}
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
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
          onClick={() => {
            append({
              exercise: "",
              reps: 0,
              sets: 0,
              weight: 0,
              complete: false,
            });
          }}
        >
          Add Exercise
        </Button>

        <Button type="submit">Finish workout</Button>
      </form>
    </Form>
  );
}
