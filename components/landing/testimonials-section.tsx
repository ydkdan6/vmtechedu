import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Adebayo Oluwaseun",
    role: "Web Development Graduate",
    content:
      "VM Tech Edu transformed my career. I went from zero coding knowledge to building full-stack applications in just 6 months. The instructors are amazing!",
    rating: 5,
  },
  {
    name: "Mrs. Chioma Okafor",
    role: "Principal, Bright Future Academy",
    content:
      "Partnering with VM Tech Edu was the best decision for our school. Our students are now equipped with essential digital skills that set them apart.",
    rating: 5,
  },
  {
    name: "Emmanuel Nwachukwu",
    role: "Tutor, Data Science",
    content:
      "Teaching at VM Tech Edu is incredibly rewarding. The platform provides excellent resources, and seeing students grow is fulfilling.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from students, schools, and tutors who have experienced the VM
            Tech Edu difference.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card">
              <CardContent className="pt-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
