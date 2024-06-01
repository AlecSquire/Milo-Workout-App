"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { setDoc, doc } from "firebase/firestore";
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
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Description } from "@radix-ui/react-toast";

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
      sets: z.union([z.string(), z.number()]).optional(),
      set: z.array(
        z.object({
          reps: z.union([z.string(), z.number()]),
          weight: z.union([z.string(), z.number()]),
        })
      ),
    })
  ),
});
type WorkoutFormValues = z.infer<typeof workoutSchema>;

export default function StartBlankWorkoutForm() {
  const [submitting, IsSubmitting] = useState(false);
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workout: [
        {
          exercise: "",
          set: [{ reps: "", weight: "" }],
        },
      ],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
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

      // Update the data to include the number of sets for each exercise
      const updatedData = {
        ...data,
        description: data.description || "",
        workout: data.workout.map((exercise) => ({
          ...exercise,
          sets: exercise.set.length,
        })),
        userID: userID, // Include the user ID
        id: formattedRoutineId,
      };

      // Set the data with the generated ID and include the user ID
      await setDoc(docRef, updatedData);

      // Display success toast
      toast({
        title: "Success",
        description: `Document written with ID: ${formattedRoutineId}`,
      });

      console.log("Document written with ID: ", formattedRoutineId);
    } catch (error) {
      // Display error toast
      toast({
        title: "Error",
        description: `Error adding document: ${error}`,
      });
      console.error("Error adding document: ", error);
    }
  };

  const workout = watch("workout");

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

        {fields.map((field, exerciseIndex) => (
          <section key={field.id} className="space-y-4">
            <FormField
              control={control}
              name={`workout.${exerciseIndex}.exercise`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...register(
                        `workout.${exerciseIndex}.exercise` as const
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.workout?.[exerciseIndex]?.exercise && (
                      <span>
                        {errors.workout?.[exerciseIndex]?.exercise?.message}
                      </span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workout.${exerciseIndex}.sets`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Sets</FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      type="number"
                      {...register(`workout.${exerciseIndex}.sets` as const)}
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.workout?.[exerciseIndex]?.sets && (
                      <span>
                        {errors.workout?.[exerciseIndex]?.sets?.message}
                      </span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Controller
              control={control}
              name={`workout.${exerciseIndex}.set`}
              render={({ field: { value, onChange } }) => (
                <>
                  {value.map((set, setIndex) => (
                    <div key={setIndex} className="mb-4">
                      <FormLabel>Set {setIndex + 1}</FormLabel>
                      <FormField
                        control={control}
                        name={`workout.${exerciseIndex}.set.${setIndex}.reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reps</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={
                                  (value[setIndex - 1]?.reps as string) || ""
                                }
                                {...register(
                                  `workout.${exerciseIndex}.set.${setIndex}.reps` as const,
                                  { valueAsNumber: true }
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage>
                              {errors.workout?.[exerciseIndex]?.set?.[setIndex]
                                ?.reps && (
                                <span>
                                  {
                                    errors.workout?.[exerciseIndex]?.set?.[
                                      setIndex
                                    ]?.reps?.message
                                  }
                                </span>
                              )}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`workout.${exerciseIndex}.set.${setIndex}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={
                                  (value[setIndex - 1]?.weight as string) || ""
                                }
                                {...register(
                                  `workout.${exerciseIndex}.set.${setIndex}.weight` as const,
                                  { valueAsNumber: true }
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage>
                              {errors.workout?.[exerciseIndex]?.set?.[setIndex]
                                ?.weight && (
                                <span>
                                  {
                                    errors.workout?.[exerciseIndex]?.set?.[
                                      setIndex
                                    ]?.weight?.message
                                  }
                                </span>
                              )}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          const newSets = value.filter(
                            (_, i) => i !== setIndex
                          );
                          onChange(newSets);
                        }}
                      >
                        Remove set
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      const lastSet = value[value.length - 1] || {};
                      onChange([
                        ...value,
                        {
                          reps: lastSet.reps || "",
                          weight: lastSet.weight || "",
                        },
                      ]);
                    }}
                  >
                    Add Set
                  </Button>
                </>
              )}
            />
            <Button type="button" onClick={() => remove(exerciseIndex)}>
              Remove exercise
            </Button>
          </section>
        ))}

        <Button
          type="button"
          onClick={() => {
            append({
              exercise: "",
              set: [{ reps: "", weight: "" }],
            });
          }}
        >
          Add Exercise
        </Button>

        <Button onClick={() => IsSubmitting(true)} type="submit">
          Finish workout
        </Button>
      </form>
    </Form>
  );
}
