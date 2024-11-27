'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import Button from '@/components/button/Button'

export default function FreelancerProfileForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [hourlyRate, setHourlyRate] = useState('')
  const [availableTime, setAvailableTime] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    console.log({ title, description, image, skills, hourlyRate, availableTime })
  }

  return (
    <Card className="w-full max-w-7xl mx-auto my-5 mb-5 border-none shadow-none">
      <CardHeader>
        <CardTitle>Be a mentor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Web Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {image && (
              <div className="mt-2">
                <img src={image} alt="Profile" className="w-32 h-32 object-cover rounded" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Select onValueChange={(value) => setSkills([...skills, value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="e.g. 50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableTime">Daily Available Time From</Label>
            <Input
              id="availableTime"
              type="time"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Daily Available Time To</Label>
            <Input
              id="availableTime"
              type="time"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              required
            />
          </div>

          <Button variant='Blue' text='Submit Profile'/>
        </form>
      </CardContent>
    </Card>
  )
}

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const handleBold = () => {
    onChange(value + ' **bold text**')
  }

  const handleItalic = () => {
    onChange(value + ' *italic text*')
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button variant="White" onClick={handleBold}>B</Button>
        <Button  variant="White" onClick={handleItalic}>I</Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your experience and skills..."
        className="min-h-[100px]"
      />
    </div>
  )
}

