"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const items = [
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

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one muscle.",
  }),
});

export function LiftsForm({ muscleType, setMuscleType }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data) {
    setMuscleType(data.item);
    toast({
      title: "You submitted the following value:",
      description: `Muscle group selected: ${data.item}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Muscle groups</FormLabel>
                <FormDescription>
                  What muscles would you like to target?
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
