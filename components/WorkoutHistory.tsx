"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface IconProps {
  className?: string;
}
export default function WorkoutHistory() {
  const router = useRouter();
  return (
    <div
      className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      onClick={() => router.push("/Dashboard/WorkoutSessionVisual")}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Workout History</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Strength Training</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 15, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  45 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  320 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Cardio</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 12, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  30 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  250 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Yoga</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 10, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  60 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  180 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Cycling</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 8, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  90 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  450 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Running</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 5, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  60 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  400 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Swimming</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                April 2, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  45 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  300 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Pilates</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                March 30, 2023
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  60 mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  220 cals
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FireExtinguisherIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
      <path d="M9 18h8" />
      <path d="M18 3h-3" />
      <path d="M11 3a6 6 0 0 0-6 6v11" />
      <path d="M5 13h4" />
      <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
    </svg>
  );
}
