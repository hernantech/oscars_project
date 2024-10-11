import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Brain, Stars, Zap, Image as ImageIcon, Cube } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function MemoryPalaceBuilder() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [visualCount, setVisualCount] = useState(5)
  const [visualType, setVisualType] = useState('images')

  useEffect(() => {
    const words = text.trim().split(/\s+/)
    setWordCount(words.length)
  }, [text])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to build the memory palace
    alert(`Building your memory palace with ${visualCount} ${visualType}! (This is where the actual implementation would go)`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-4 flex items-center justify-center">
            <Brain className="mr-2 h-8 w-8 text-yellow-400 animate-pulse" />
            Memory Palace Builder
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your passage here (max 500 words)"
                className="w-full h-40 p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 resize-none"
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {wordCount}/500 words
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visualCount" className="text-sm font-medium text-gray-700">
                Number of visuals:
              </Label>
              <Input
                id="visualCount"
                type="number"
                min="1"
                max="20"
                value={visualCount}
                onChange={(e) => setVisualCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="w-full p-2 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Visual type:
              </Label>
              <RadioGroup value={visualType} onValueChange={setVisualType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="images" id="images" />
                  <Label htmlFor="images" className="flex items-center cursor-pointer">
                    <ImageIcon className="mr-1 h-4 w-4" />
                    Images
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3d" id="3d" />
                  <Label htmlFor="3d" className="flex items-center cursor-pointer">
                    <Cube className="mr-1 h-4 w-4" />
                    3D Objects
                  </Label>
                </div>
              </RadioGroup>
              {visualType === '3d' && (
                <p className="text-xs text-yellow-600 font-medium">
                  Note: 3D objects are a premium feature
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={wordCount > 500 || wordCount === 0}
              className={cn(
                "w-full py-3 px-6 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded-full shadow-md hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transform hover:scale-105 transition-all duration-300",
                (wordCount > 500 || wordCount === 0) && "opacity-50 cursor-not-allowed"
              )}
            >
              <Stars className="mr-2 h-5 w-5 animate-spin" />
              Build my memory palace!
            </Button>
          </form>
        </div>
        <div className="absolute top-4 left-4 animate-bounce">
          <Zap className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="absolute bottom-4 right-4 animate-bounce">
          <Zap className="h-8 w-8 text-yellow-400" />
        </div>
      </div>
    </div>
  )
}