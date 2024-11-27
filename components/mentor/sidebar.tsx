import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const categories = [
  { id: 'programming', name: 'Programming' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'marketing', name: 'Marketing' },
]

const experienceLevels = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'expert', name: 'Expert' },
]

export function Sidebar() {
  return (
    <div className="w-64  border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6 mx-5">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center mb-2">
            <Checkbox className='text-white' id={category.id} />
            <Label htmlFor={category.id} className="ml-2">{category.name}</Label>
          </div>
        ))}
      </div>
      
      <div className='mx-5'>
        <h3 className="text-sm font-medium mb-2">Experience Level</h3>
        {experienceLevels.map((level) => (
          <div key={level.id} className="flex items-center mb-2">
            <Checkbox className='text-white checked:bg-blue-600' id={level.id} />
            <Label htmlFor={level.id} className="ml-2">{level.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

