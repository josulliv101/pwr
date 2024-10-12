"use client"

import { useState } from "react"
import { MapPin, Home, Settings, Users, BarChart, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardComponent() {
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const addTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Button variant="ghost" className="w-full justify-start px-4 py-2">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start px-4 py-2">
            <MapPin className="mr-2 h-4 w-4" />
            Locations
          </Button>
          <Button variant="ghost" className="w-full justify-start px-4 py-2">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start px-4 py-2">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start px-4 py-2">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <h2 className="mb-6 text-2xl font-semibold">Location Management</h2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">Location Details</legend>
              <div className="grid gap-3">
                <Label htmlFor="location-name">Name</Label>
                <Input id="location-name" type="text" placeholder="Enter location name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" placeholder="Enter city" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="state-province">State/Province</Label>
                <Input id="state-province" type="text" placeholder="Enter state or province" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" type="number" placeholder="0.0000" step="0.0001" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" type="number" placeholder="0.0000" step="0.0001" />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-4 w-4 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    type="text"
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag}>Add Tag</Button>
                </div>
              </div>
            </fieldset>

            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">Weather Details</legend>
              <Accordion type="single" collapsible className="w-full">
                {months.map((month, monthIndex) => (
                  <AccordionItem value={`month-${monthIndex}`} key={monthIndex}>
                    <AccordionTrigger>{month}</AccordionTrigger>
                    <AccordionContent>
                      <Card>
                        <CardContent className="pt-6">
                          <Tabs defaultValue="week1">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="week1">Week 1</TabsTrigger>
                              <TabsTrigger value="week2">Week 2</TabsTrigger>
                              <TabsTrigger value="week3">Week 3</TabsTrigger>
                              <TabsTrigger value="week4">Week 4</TabsTrigger>
                            </TabsList>
                            {[1, 2, 3, 4].map((week) => (
                              <TabsContent key={week} value={`week${week}`}>
                                <div className="grid gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor={`${month.toLowerCase()}-week-${week}-precipitation`}>
                                      Precipitation (mm)
                                    </Label>
                                    <Input
                                      id={`${month.toLowerCase()}-week-${week}-precipitation`}
                                      type="number"
                                      placeholder="Enter precipitation"
                                      step="0.1"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`${month.toLowerCase()}-week-${week}-temp-high`}>
                                      Temperature High (°C)
                                    </Label>
                                    <Input
                                      id={`${month.toLowerCase()}-week-${week}-temp-high`}
                                      type="number"
                                      placeholder="Enter high temperature"
                                      step="0.1"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`${month.toLowerCase()}-week-${week}-temp-low`}>
                                      Temperature Low (°C)
                                    </Label>
                                    <Input
                                      id={`${month.toLowerCase()}-week-${week}-temp-low`}
                                      type="number"
                                      placeholder="Enter low temperature"
                                      step="0.1"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`${month.toLowerCase()}-week-${week}-wind-speed`}>
                                      Wind Speed (km/h)
                                    </Label>
                                    <Input
                                      id={`${month.toLowerCase()}-week-${week}-wind-speed`}
                                      type="number"
                                      placeholder="Enter wind speed"
                                      step="0.1"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`${month.toLowerCase()}-week-${week}-humidity`}>
                                      Humidity (%)
                                    </Label>
                                    <Input
                                      id={`${month.toLowerCase()}-week-${week}-humidity`}
                                      type="number"
                                      placeholder="Enter humidity"
                                      step="1"
                                      min="0"
                                      max="100"
                                    />
                                  </div>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </fieldset>
            <Button type="submit" className="w-full">Save Location</Button>
          </form>
        </div>
      </main>
    </div>
  )
}