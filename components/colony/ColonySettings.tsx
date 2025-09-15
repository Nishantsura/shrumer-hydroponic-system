"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Settings, 
  Sun, 
  Droplets, 
  Thermometer, 
  Wind,
  Clock,
  ChevronDown,
  ChevronUp,
  Save,
  Edit
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Colony } from "@/lib/data"

interface ColonySettingsProps {
  colony: Colony
}

export function ColonySettings({ colony }: ColonySettingsProps) {
  const [isLightExpanded, setIsLightExpanded] = useState(false)
  const [isNutrientExpanded, setIsNutrientExpanded] = useState(false)
  const [isWateringExpanded, setIsWateringExpanded] = useState(false)
  const [isEnvironmentalExpanded, setIsEnvironmentalExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Mock settings data - in real app this would come from props or API
  const [settings, setSettings] = useState({
    light: {
      schedule: "16/8",
      intensity: 85,
      spectrum: "Full Spectrum",
      autoMode: true
    },
    nutrient: {
      mix: "General Purpose",
      ecTarget: 1400,
      phTarget: 6.2,
      autoDosing: true
    },
    watering: {
      frequency: "Every 2 hours",
      duration: "15 minutes",
      autoMode: true
    },
    environmental: {
      tempTarget: 22,
      humidityTarget: 70,
      autoControl: true
    }
  })

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to API
    console.log("Settings saved:", settings)
  }

  const SettingSection = ({ 
    title, 
    icon, 
    isExpanded, 
    onToggle, 
    children 
  }: {
    title: string
    icon: React.ReactNode
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode
  }) => (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <Card className="glass-card border-white/10">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-white/70" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white/70" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-neon-green" />
            Colony Settings
          </CardTitle>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button 
                size="sm" 
                onClick={handleSave}
                className="bg-neon-green hover:bg-neon-green/90 text-dark-charcoal"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Configure Colony {colony.id} settings and automation
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Light Schedule */}
          <SettingSection
            title="Light Schedule"
            icon={<Sun className="h-5 w-5 text-chart-5" />}
            isExpanded={isLightExpanded}
            onToggle={() => setIsLightExpanded(!isLightExpanded)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">Photoperiod</Label>
                <Select 
                  value={settings.light.schedule} 
                  onValueChange={(value) => setSettings({...settings, light: {...settings.light, schedule: value}})}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12/12">12/12 (Flowering)</SelectItem>
                    <SelectItem value="16/8">16/8 (Vegetative)</SelectItem>
                    <SelectItem value="18/6">18/6 (Growth)</SelectItem>
                    <SelectItem value="20/4">20/4 (Maximum Growth)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Intensity</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.light.intensity}
                    onChange={(e) => setSettings({...settings, light: {...settings.light, intensity: parseInt(e.target.value)}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Spectrum</Label>
                <Select 
                  value={settings.light.spectrum} 
                  onValueChange={(value) => setSettings({...settings, light: {...settings.light, spectrum: value}})}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Spectrum">Full Spectrum</SelectItem>
                    <SelectItem value="Blue Heavy">Blue Heavy (Vegetative)</SelectItem>
                    <SelectItem value="Red Heavy">Red Heavy (Flowering)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Auto Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.light.autoMode}
                    onCheckedChange={(checked) => setSettings({...settings, light: {...settings.light, autoMode: checked}})}
                    disabled={!isEditing}
                  />
                  <span className="text-sm text-white/70">
                    {settings.light.autoMode ? "Automatic" : "Manual"}
                  </span>
                </div>
              </div>
            </div>
          </SettingSection>

          {/* Nutrient Mix */}
          <SettingSection
            title="Nutrient Mix"
            icon={<Droplets className="h-5 w-5 text-chart-1" />}
            isExpanded={isNutrientExpanded}
            onToggle={() => setIsNutrientExpanded(!isNutrientExpanded)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">Nutrient Mix</Label>
                <Select 
                  value={settings.nutrient.mix} 
                  onValueChange={(value) => setSettings({...settings, nutrient: {...settings.nutrient, mix: value}})}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Purpose">General Purpose</SelectItem>
                    <SelectItem value="Vegetative">Vegetative Growth</SelectItem>
                    <SelectItem value="Flowering">Flowering & Fruiting</SelectItem>
                    <SelectItem value="Custom">Custom Mix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">EC Target</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.nutrient.ecTarget}
                    onChange={(e) => setSettings({...settings, nutrient: {...settings.nutrient, ecTarget: parseInt(e.target.value)}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">ppm</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">pH Target</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={settings.nutrient.phTarget}
                    onChange={(e) => setSettings({...settings, nutrient: {...settings.nutrient, phTarget: parseFloat(e.target.value)}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">pH</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Auto Dosing</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.nutrient.autoDosing}
                    onCheckedChange={(checked) => setSettings({...settings, nutrient: {...settings.nutrient, autoDosing: checked}})}
                    disabled={!isEditing}
                  />
                  <span className="text-sm text-white/70">
                    {settings.nutrient.autoDosing ? "Automatic" : "Manual"}
                  </span>
                </div>
              </div>
            </div>
          </SettingSection>

          {/* Watering Schedule */}
          <SettingSection
            title="Watering Schedule"
            icon={<Clock className="h-5 w-5 text-chart-2" />}
            isExpanded={isWateringExpanded}
            onToggle={() => setIsWateringExpanded(!isWateringExpanded)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">Frequency</Label>
                <Select 
                  value={settings.watering.frequency} 
                  onValueChange={(value) => setSettings({...settings, watering: {...settings.watering, frequency: value}})}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Every hour">Every hour</SelectItem>
                    <SelectItem value="Every 2 hours">Every 2 hours</SelectItem>
                    <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                    <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Duration</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.watering.duration.replace(' minutes', '')}
                    onChange={(e) => setSettings({...settings, watering: {...settings.watering, duration: `${e.target.value} minutes`}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">minutes</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Auto Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.watering.autoMode}
                    onCheckedChange={(checked) => setSettings({...settings, watering: {...settings.watering, autoMode: checked}})}
                    disabled={!isEditing}
                  />
                  <span className="text-sm text-white/70">
                    {settings.watering.autoMode ? "Automatic" : "Manual"}
                  </span>
                </div>
              </div>
            </div>
          </SettingSection>

          {/* Environmental Targets */}
          <SettingSection
            title="Environmental Targets"
            icon={<Thermometer className="h-5 w-5 text-chart-3" />}
            isExpanded={isEnvironmentalExpanded}
            onToggle={() => setIsEnvironmentalExpanded(!isEnvironmentalExpanded)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70">Temperature Target</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.environmental.tempTarget}
                    onChange={(e) => setSettings({...settings, environmental: {...settings.environmental, tempTarget: parseInt(e.target.value)}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">°C</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Humidity Target</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.environmental.humidityTarget}
                    onChange={(e) => setSettings({...settings, environmental: {...settings.environmental, humidityTarget: parseInt(e.target.value)}})}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <span className="text-white/70">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Auto Control</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.environmental.autoControl}
                    onCheckedChange={(checked) => setSettings({...settings, environmental: {...settings.environmental, autoControl: checked}})}
                    disabled={!isEditing}
                  />
                  <span className="text-sm text-white/70">
                    {settings.environmental.autoControl ? "Automatic" : "Manual"}
                  </span>
                </div>
              </div>
            </div>
          </SettingSection>
        </div>
      </CardContent>
    </Card>
  )
}
