"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Footer() {
  const router = useRouter();
  const [editToken, setEditToken] = useState("");

  const handleEdit = () => {
    if (!editToken.trim()) return;
    router.push(`/edit/${editToken.trim()}`);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/40 to-background" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] bg-[size:18px_18px]" />

      <div className="relative border-t border-primary/20">
        <div className="max-w-6xl mx-auto px-6 py-14 space-y-12">

          {/* Community Section */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                ❤️ Community Guidelines
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share only real interview experiences. Please avoid spam,
                promotional content, or fake stories. Your honesty can genuinely
                change someone’s preparation journey.
              </p>
            </div>

            <div className="flex items-center">
              <div className="bg-background/70 backdrop-blur-md border border-primary/20 rounded-xl p-5 text-sm italic text-muted-foreground shadow-sm">
                “Every honest experience shared here helps someone walk into
                their interview with more confidence.”
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact */}
            <div className="bg-background/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-md">
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Mail size={14} /> Have a question or suggestion?
              </h4>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-background"
                />
                <Button>Contact</Button>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                We’ll only use your email to respond — no spam.
              </p>
            </div>

            {/* Edit Post */}
            <div className="bg-background/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-md">
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Edit3 size={14} /> Edit your post
              </h4>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter your edit token"
                  value={editToken}
                  onChange={(e) => setEditToken(e.target.value)}
                />
                <Button variant="outline" onClick={handleEdit}>
                  Edit
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Use the private edit token you received while posting.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-primary/20 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between">
            <span>© {new Date().getFullYear()} IntervueExp</span>
            <span>Built with care for aspirants 🚀</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
