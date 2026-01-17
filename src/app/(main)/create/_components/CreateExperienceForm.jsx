"use client";

import { useForm } from "react-hook-form";
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
import { useState } from "react";

export default function CreateExperienceForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      company: "",
      role: "",
      college: "",
      interviewType: "",
      result: "",
      tags: "",
      experience: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const interviewType = watch("interviewType");
  const result = watch("result");

  function onSubmit(data) {
    const payload = {
      ...data,
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    console.log(payload);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Interview Details</h2>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name (Optional) */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                maxLength: {
                  value: 50,
                  message: "Name is too long",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Name <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Anonymous or your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Amazon, Google..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="SDE Intern, Backend Engineer..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* College */}
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="IIT Delhi, NIT Trichy..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Interview Type */}
            <FormField
              control={form.control}
              name="interviewType"
              rules={{ required: "Select interview type" }}
              render={() => (
                <FormItem>
                  <FormLabel>Interview Type</FormLabel>
                  <div className="flex gap-2">
                    {["On-Campus", "Off-Campus"].map((type) => (
                      <Badge
                        key={type}
                        variant={interviewType === type ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setValue("interviewType", type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Result */}
            <FormField
              control={form.control}
              name="result"
              rules={{ required: "Select result" }}
              render={() => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <div className="flex gap-2">
                    <Badge
                      className={`cursor-pointer ${
                        result === "Selected" ? "bg-green-600 text-white" : ""
                      }`}
                      variant={result === "Selected" ? "default" : "outline"}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              rules={{
                required: "At least one tag is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics / Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="DSA, System Design, OS, DBMS"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              rules={{
                required: "Experience is required",
                minLength: {
                  value: 100,
                  message: "Please write at least 100 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[180px]"
                      placeholder="Explain interview rounds, questions, preparation, mistakes, tips..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" className="px-8">
                Submit Experience
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
