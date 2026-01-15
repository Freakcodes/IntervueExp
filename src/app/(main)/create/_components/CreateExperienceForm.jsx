"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CreateExperienceForm() {
  const [tags, setTags] = useState("");

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Interview Details</h2>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Company */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Company</label>
          <Input placeholder="Amazon, Google, Flipkart..." />
        </div>

        {/* Role */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Role</label>
          <Input placeholder="SDE Intern, Backend Engineer..." />
        </div>

        {/* College */}
        <div className="space-y-1">
          <label className="text-sm font-medium">College (optional)</label>
          <Input placeholder="IIT Delhi, NIT Trichy..." />
        </div>

        {/* Interview Type */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Interview Type</label>
          <div className="flex gap-2">
            <Badge variant="outline">On-Campus</Badge>
            <Badge variant="outline">Off-Campus</Badge>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Result</label>
          <div className="flex gap-2">
            <Badge className="bg-green-600 text-white">Selected</Badge>
            <Badge variant="destructive">Rejected</Badge>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Topics / Tags (comma separated)
          </label>
          <Input
            placeholder="DSA, System Design, OS, DBMS"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Experience */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Interview Experience
          </label>
          <Textarea
            placeholder="Explain the interview rounds, questions asked, preparation strategy, mistakes, tips..."
            className="min-h-[180px]"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button className="px-8">Submit Experience</Button>
        </div>
      </CardContent>
    </Card>
  );
}
