"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateExperience } from "@/app/actions/experience";

export default function EditExperienceForm({ initialData, token }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      ...initialData,
      tags: initialData.tags?.join(", "),
    },
  });

  const { handleSubmit, watch, setValue } = form;

  const interviewType = watch("interviewType");
  const experienceLevel = watch("experienceLevel");
  const result = watch("result");

  async function onSubmit(data) {
    try {
      setLoading(true);
      await updateExperience(token, data);
      router.push("/explore");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Edit Interview Experience</h2>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Experience Level */}
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <div className="flex gap-2">
                {["Fresher", "Experienced"].map((type) => (
                  <Badge
                    key={type}
                    variant={experienceLevel === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setValue("experienceLevel", type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </FormItem>

            {/* Interview Type */}
            <FormItem>
              <FormLabel>Interview Type</FormLabel>
              <div className="flex gap-2">
                {["On-Campus", "Off-Campus"].map((type) => (
                  <Badge
                    key={type}
                    variant={interviewType === type ? "default" : "outline"}
                    onClick={() => setValue("interviewType", type)}
                    className="cursor-pointer"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </FormItem>

            {/* Result */}
            <FormItem>
              <FormLabel>Result</FormLabel>
              <div className="flex gap-2">
                <Badge
                  variant={result === "Selected" ? "default" : "outline"}
                  className="cursor-pointer bg-green-600 text-white"
                  onClick={() => setValue("result", "Selected")}
                >
                  Selected
                </Badge>
                <Badge
                  variant={result === "Rejected" ? "destructive" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setValue("result", "Rejected")}
                >
                  Rejected
                </Badge>
              </div>
            </FormItem>

            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Experience</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[180px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Additional Tips */}
            <FormField
              control={form.control}
              name="additionalTips"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Tips</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Experience"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
