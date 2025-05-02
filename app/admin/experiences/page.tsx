import type { Metadata } from "next"
import Link from "next/link"
import { getExperiences } from "@/app/actions/experience-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { ExperienceList } from "./experience-list"

export const metadata: Metadata = {
  title: "Manage Experiences",
  description: "Manage your work experiences",
}

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Experiences</h1>
          <p className="text-muted-foreground">Manage your work experiences that appear on your portfolio.</p>
        </div>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No experiences found</CardTitle>
            <CardDescription>Get started by adding your first work experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/experiences/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Experience
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ExperienceList experiences={experiences} />
      )}
    </div>
  )
}
