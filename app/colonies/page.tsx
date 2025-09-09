"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PageHeader } from "@/components/page-header"
import {
  Plus,
  Sprout,
  TreePine,
  Edit,
  Trash2,
  Settings,
  Save,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

const cropGroups = {
  "Leafy Greens": ["Lettuce", "Spinach", "Kale", "Arugula", "Mustard", "Bok Choy", "Swiss Chard"],
  Herbs: ["Basil", "Mint", "Cilantro", "Parsley", "Dill", "Chives", "Oregano", "Thyme"],
  Cruciferous: ["Cabbage", "Mizuna", "Tatsoi"],
  "Fruit-Bearing": ["Tomatoes", "Cucumbers", "Peppers", "Eggplant"],
  Microgreens: ["Broccoli Microgreens", "Radish Microgreens", "Sunflower Microgreens", "Pea Shoots"],
}

const allCrops = Object.values(cropGroups).flat()

const cropRequirements = {
  Lettuce: { group: "Leafy Greens", ph: [5.5, 6.0], ec: [0.8, 1.8], temp: [18, 24], duration: 45 },
  Spinach: { group: "Leafy Greens", ph: [5.5, 6.0], ec: [0.8, 1.8], temp: [18, 24], duration: 45 },
  Kale: { group: "Leafy Greens", ph: [5.5, 6.0], ec: [0.8, 1.8], temp: [18, 24], duration: 45 },
  Basil: { group: "Herbs", ph: [5.5, 6.0], ec: [0.7, 1.6], temp: [18, 24], duration: 45 },
  Mint: { group: "Herbs", ph: [5.5, 6.0], ec: [0.7, 1.6], temp: [18, 24], duration: 45 },
  Cilantro: { group: "Herbs", ph: [5.5, 6.0], ec: [0.7, 1.6], temp: [18, 24], duration: 45 },
  Tomatoes: { group: "Fruit-Bearing", ph: [5.8, 6.2], ec: [1.2, 3.0], temp: [22, 28], duration: 90 },
  Cucumbers: { group: "Fruit-Bearing", ph: [5.8, 6.2], ec: [1.2, 3.0], temp: [22, 28], duration: 90 },
  Peppers: { group: "Fruit-Bearing", ph: [5.8, 6.2], ec: [1.2, 3.0], temp: [22, 28], duration: 90 },
  Cabbage: { group: "Cruciferous", ph: [6.0, 6.5], ec: [1.0, 2.2], temp: [18, 24], duration: 60 },
  "Broccoli Microgreens": { group: "Microgreens", ph: [5.5, 6.0], ec: [0.4, 0.9], temp: [20, 25], duration: 21 },
}

const calculateGrowthStage = (daysFromSeed: number, cropType: string) => {
  if (cropGroups["Microgreens"].includes(cropType)) {
    if (daysFromSeed <= 7) return "Seedling"
    return "Mature"
  } else if (cropGroups["Leafy Greens"].includes(cropType) || cropGroups["Herbs"].includes(cropType)) {
    if (daysFromSeed <= 10) return "Seedling"
    if (daysFromSeed <= 25) return "Vegetative"
    return "Mature"
  } else if (cropGroups["Fruit-Bearing"].includes(cropType)) {
    if (daysFromSeed <= 14) return "Seedling"
    if (daysFromSeed <= 35) return "Vegetative"
    if (daysFromSeed <= 60) return "Flowering"
    return "Fruiting"
  }
  return "Vegetative"
}

const colonies = [
  {
    id: "A1",
    crops: [
      { type: "Lettuce", daysFromSeed: 18, count: 12 },
      { type: "Spinach", daysFromSeed: 15, count: 12 },
    ],
    location: "Channel A1",
    startDate: "2024-01-15",
    status: "active",
    systemType: "Grove",
  },
  {
    id: "B2",
    crops: [
      { type: "Basil", daysFromSeed: 25, count: 18 },
      { type: "Cilantro", daysFromSeed: 20, count: 18 },
    ],
    location: "Channel B2",
    startDate: "2024-01-10",
    status: "active",
    systemType: "Grove",
  },
  {
    id: "C3",
    crops: [{ type: "Tomatoes", daysFromSeed: 28, count: 12 }],
    location: "Channel C3",
    startDate: "2023-12-10",
    status: "active",
    systemType: "Grove",
  },
  {
    id: "D4",
    crops: [{ type: "Cucumbers", daysFromSeed: 18, count: 8 }],
    location: "Channel D4",
    startDate: "2024-01-05",
    status: "active",
    systemType: "Grove",
  },
]

const systemConfigs = {
  Sprout: { maxColonies: 70, channels: Array.from({ length: 70 }, (_, i) => `S${i + 1}`) },
  Grove: { maxColonies: 120, channels: Array.from({ length: 120 }, (_, i) => `G${i + 1}`) },
  Apex: { maxColonies: 200, channels: Array.from({ length: 200 }, (_, i) => `A${i + 1}`) },
}

export default function ColonyManager() {
  const [showNewColonyForm, setShowNewColonyForm] = useState(false)
  const [editingColony, setEditingColony] = useState<string | null>(null)
  const [managingCrops, setManagingCrops] = useState<string | null>(null)
  const [expandedColonies, setExpandedColonies] = useState<Record<string, boolean>>({})
  const [showStats, setShowStats] = useState(false)

  const [newColony, setNewColony] = useState({
    colony: "",
    channel: "",
    cropType: "",
    daysFromSeed: "",
    seedCount: "",
  })

  const [editColonyData, setEditColonyData] = useState({
    location: "",
    status: "",
  })

  const [newCropData, setNewCropData] = useState({
    cropType: "",
    daysFromSeed: "",
    seedCount: "",
  })

  const getCompatibleCrops = (existingCrops: string[]) => {
    if (existingCrops.length === 0) return allCrops

    const existingGroup = Object.entries(cropGroups).find(([group, crops]) =>
      existingCrops.some((crop) => crops.includes(crop)),
    )

    if (!existingGroup) return allCrops

    return existingGroup[1]
  }

  const areCropsCompatible = (crop1: string, crop2: string) => {
    const req1 = cropRequirements[crop1 as keyof typeof cropRequirements]
    const req2 = cropRequirements[crop2 as keyof typeof cropRequirements]

    if (!req1 || !req2) return false

    return req1.group === req2.group
  }

  const getIncompatibleCrops = (existingCrops: string[]) => {
    if (existingCrops.length === 0) return []

    return allCrops.filter((crop) => !existingCrops.some((existingCrop) => areCropsCompatible(crop, existingCrop)))
  }

  const handleEditColony = (colonyId: string) => {
    const colony = colonies.find((c) => c.id === colonyId)
    if (colony) {
      setEditColonyData({
        location: colony.location,
        status: colony.status,
      })
      setEditingColony(colonyId)
    }
  }

  const handleManageCrops = (colonyId: string) => {
    setManagingCrops(colonyId)
    setNewCropData({
      cropType: "",
      daysFromSeed: "",
      seedCount: "",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary border-primary/20"
      case "setup":
        return "bg-muted/10 text-muted-foreground border-muted/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const toggleColonyExpansion = (colonyId: string) => {
    setExpandedColonies((prev) => ({
      ...prev,
      [colonyId]: !prev[colonyId],
    }))
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <PageHeader pageName="Colony Manager">
          <Button onClick={() => setShowNewColonyForm(!showNewColonyForm)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">New Colony</span>
            <span className="sm:hidden">New</span>
          </Button>
        </PageHeader>

        {showNewColonyForm && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="truncate">Start New Colony</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mobile: Stack all fields vertically, Desktop: Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="colony" className="text-sm">
                      Colony
                    </Label>
                    <Select
                      value={newColony.colony}
                      onValueChange={(value) => setNewColony({ ...newColony, colony: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select colony" />
                      </SelectTrigger>
                      <SelectContent>
                        {systemConfigs["Grove"].channels.slice(0, 10).map((colony) => (
                          <SelectItem key={colony} value={colony}>
                            Colony {colony}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channel" className="text-sm">
                      Channel
                    </Label>
                    <Select
                      value={newColony.channel}
                      onValueChange={(value) => setNewColony({ ...newColony, channel: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={`CH${i + 1}`}>
                            Channel {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cropType" className="text-sm">
                      Crop Type
                    </Label>
                    <Select
                      value={newColony.cropType}
                      onValueChange={(value) => setNewColony({ ...newColony, cropType: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(cropGroups).map(([group, crops]) => (
                          <div key={group}>
                            <div className="px-2 py-1 text-sm font-medium text-muted-foreground">{group}</div>
                            {crops.map((crop) => (
                              <SelectItem key={crop} value={crop} className="pl-4">
                                {crop}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daysFromSeed" className="text-sm">
                      Days from Seed
                    </Label>
                    <Input
                      id="daysFromSeed"
                      type="number"
                      placeholder="0"
                      className="h-9"
                      value={newColony.daysFromSeed}
                      onChange={(e) => setNewColony({ ...newColony, daysFromSeed: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seedCount" className="text-sm">
                    Number of Seeds
                  </Label>
                  <Input
                    id="seedCount"
                    type="number"
                    placeholder="24"
                    className="h-9"
                    value={newColony.seedCount}
                    onChange={(e) => setNewColony({ ...newColony, seedCount: e.target.value })}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Start Colony
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewColonyForm(false)}
                    className="border-primary/20 bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TreePine className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="truncate">Active Colonies ({colonies.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {colonies.map((colony) => (
                <Card key={colony.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4 sm:pt-6">
                    {/* Mobile: Collapsible layout, Desktop: Grid layout */}
                    <div className="block lg:hidden">
                      <Collapsible
                        open={expandedColonies[colony.id]}
                        onOpenChange={() => toggleColonyExpansion(colony.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-semibold">Colony {colony.id}</h3>
                            <Badge className={`${getStatusColor(colony.status)} text-xs`}>{colony.status}</Badge>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1">
                              {expandedColonies[colony.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>

                        {/* Always visible summary */}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Plants:</span>
                            <span className="font-medium">
                              {colony.crops.reduce((sum, crop) => sum + crop.count, 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium text-xs max-w-[120px] text-right">{colony.location}</span>
                          </div>
                        </div>

                        <CollapsibleContent className="space-y-4">
                          {/* Colony Details */}
                          <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">System:</span>
                              <span className="font-medium">{colony.systemType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Started:</span>
                              <span className="font-medium">{new Date(colony.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Crops */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Crops in Colony</h4>
                            {colony.crops.map((crop, index) => (
                              <div key={index} className="border rounded-lg p-3 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">{crop.type}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {calculateGrowthStage(crop.daysFromSeed, crop.type)}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Count:</span>
                                    <span>{crop.count}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Days:</span>
                                    <span>{crop.daysFromSeed}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 pt-3 border-t">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-primary/20 hover:bg-primary/5 bg-transparent text-sm"
                                  onClick={() => handleEditColony(colony.id)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Colony
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-sm mx-4">
                                <DialogHeader>
                                  <DialogTitle className="text-base">Edit Colony {colony.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm">
                                      Location
                                    </Label>
                                    <Input
                                      id="location"
                                      className="h-9"
                                      value={editColonyData.location}
                                      onChange={(e) =>
                                        setEditColonyData({ ...editColonyData, location: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="status" className="text-sm">
                                      Status
                                    </Label>
                                    <Select
                                      value={editColonyData.status}
                                      onValueChange={(value) => setEditColonyData({ ...editColonyData, status: value })}
                                    >
                                      <SelectTrigger className="h-9">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="setup">Setup</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button className="w-full bg-primary hover:bg-primary/90">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-primary/20 hover:bg-primary/5 bg-transparent text-sm"
                                  onClick={() => handleManageCrops(colony.id)}
                                >
                                  <Settings className="h-4 w-4 mr-2" />
                                  Manage Crops
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-base">Manage Crops - Colony {colony.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {/* Current Crops */}
                                  <div>
                                    <h4 className="font-medium mb-3 text-sm">Current Crops</h4>
                                    <div className="space-y-2">
                                      {colony.crops.map((crop, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-2 border rounded-lg"
                                        >
                                          <div className="flex flex-col gap-1">
                                            <span className="font-medium text-sm">{crop.type}</span>
                                            <div className="flex items-center gap-2">
                                              <Badge variant="outline" className="text-xs">
                                                {calculateGrowthStage(crop.daysFromSeed, crop.type)}
                                              </Badge>
                                              <span className="text-xs text-muted-foreground">{crop.count} plants</span>
                                            </div>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive border-destructive bg-transparent p-1"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Add New Crop */}
                                  <div>
                                    <h4 className="font-medium mb-3 text-sm">Add New Crop</h4>
                                    <div className="space-y-3">
                                      <div className="space-y-2">
                                        <Label htmlFor="newCropType" className="text-sm">
                                          Crop Type
                                        </Label>
                                        <Select
                                          value={newCropData.cropType}
                                          onValueChange={(value) => setNewCropData({ ...newCropData, cropType: value })}
                                        >
                                          <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select crop" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {/* Compatible crops */}
                                            <div className="px-2 py-1 text-xs font-medium text-chart-2">
                                              Recommended
                                            </div>
                                            {getCompatibleCrops(colony.crops.map((c) => c.type)).map((crop) => (
                                              <SelectItem key={crop} value={crop} className="pl-4 text-sm">
                                                {crop}
                                              </SelectItem>
                                            ))}

                                            {/* Incompatible crops */}
                                            {getIncompatibleCrops(colony.crops.map((c) => c.type)).length > 0 && (
                                              <>
                                                <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-2">
                                                  <AlertTriangle className="h-3 w-3" />
                                                  Not Recommended
                                                </div>
                                                {getIncompatibleCrops(colony.crops.map((c) => c.type)).map((crop) => (
                                                  <SelectItem
                                                    key={crop}
                                                    value={crop}
                                                    className="pl-4 text-muted-foreground text-sm"
                                                    disabled
                                                  >
                                                    {crop}
                                                  </SelectItem>
                                                ))}
                                              </>
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                          <Label htmlFor="newDaysFromSeed" className="text-sm">
                                            Days from Seed
                                          </Label>
                                          <Input
                                            id="newDaysFromSeed"
                                            type="number"
                                            placeholder="0"
                                            className="h-9"
                                            value={newCropData.daysFromSeed}
                                            onChange={(e) =>
                                              setNewCropData({ ...newCropData, daysFromSeed: e.target.value })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="newSeedCount" className="text-sm">
                                            Seeds
                                          </Label>
                                          <Input
                                            id="newSeedCount"
                                            type="number"
                                            placeholder="12"
                                            className="h-9"
                                            value={newCropData.seedCount}
                                            onChange={(e) =>
                                              setNewCropData({ ...newCropData, seedCount: e.target.value })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <Button className="w-full bg-primary hover:bg-primary/90">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Crop
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent text-sm"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Terminate
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    {/* Desktop layout - unchanged */}
                    <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                      {/* Colony Info */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Colony {colony.id}</h3>
                          <Badge className={getStatusColor(colony.status)}>{colony.status}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">System:</span>
                            <span className="font-medium">{colony.systemType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium max-w-[120px] text-right">{colony.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Plants:</span>
                            <span className="font-medium">
                              {colony.crops.reduce((sum, crop) => sum + crop.count, 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Started:</span>
                            <span className="font-medium">{new Date(colony.startDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2 space-y-4">
                        <h4 className="font-medium">Crops in Colony</h4>
                        {colony.crops.map((crop, index) => (
                          <div key={index} className="border rounded-lg p-3 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{crop.type}</span>
                              <Badge variant="outline">{calculateGrowthStage(crop.daysFromSeed, crop.type)}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Count:</span>
                                <span>{crop.count}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Days:</span>
                                <span>{crop.daysFromSeed}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary/20 hover:bg-primary/5 bg-transparent"
                              onClick={() => handleEditColony(colony.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Colony
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Colony {colony.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  value={editColonyData.location}
                                  onChange={(e) => setEditColonyData({ ...editColonyData, location: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  value={editColonyData.status}
                                  onValueChange={(value) => setEditColonyData({ ...editColonyData, status: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="setup">Setup</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Button className="bg-primary hover:bg-primary/90">
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary/20 hover:bg-primary/5 bg-transparent"
                              onClick={() => handleManageCrops(colony.id)}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Crops
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Manage Crops - Colony {colony.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Current Crops */}
                              <div>
                                <h4 className="font-medium mb-3">Current Crops</h4>
                                <div className="space-y-2">
                                  {colony.crops.map((crop, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="font-medium">{crop.type}</span>
                                        <Badge variant="outline">
                                          {calculateGrowthStage(crop.daysFromSeed, crop.type)}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">{crop.count} plants</span>
                                        <span className="text-sm text-muted-foreground">{crop.daysFromSeed} days</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-destructive border-destructive bg-transparent"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Add New Crop */}
                              <div>
                                <h4 className="font-medium mb-3">Add New Crop</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="newCropType">Crop Type</Label>
                                    <Select
                                      value={newCropData.cropType}
                                      onValueChange={(value) => setNewCropData({ ...newCropData, cropType: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select crop" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {/* Compatible crops */}
                                        <div className="px-2 py-1 text-sm font-medium text-chart-2">
                                          Recommended (Compatible)
                                        </div>
                                        {getCompatibleCrops(colony.crops.map((c) => c.type)).map((crop) => (
                                          <SelectItem key={crop} value={crop} className="pl-4">
                                            {crop}
                                          </SelectItem>
                                        ))}

                                        {/* Incompatible crops */}
                                        {getIncompatibleCrops(colony.crops.map((c) => c.type)).length > 0 && (
                                          <>
                                            <div className="px-2 py-1 text-sm font-medium text-muted-foreground flex items-center gap-2">
                                              <AlertTriangle className="h-3 w-3" />
                                              Not Recommended (Different Requirements)
                                            </div>
                                            {getIncompatibleCrops(colony.crops.map((c) => c.type)).map((crop) => (
                                              <SelectItem
                                                key={crop}
                                                value={crop}
                                                className="pl-4 text-muted-foreground"
                                                disabled
                                              >
                                                {crop}
                                              </SelectItem>
                                            ))}
                                          </>
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="newDaysFromSeed">Days from Seed</Label>
                                    <Input
                                      id="newDaysFromSeed"
                                      type="number"
                                      placeholder="0"
                                      value={newCropData.daysFromSeed}
                                      onChange={(e) => setNewCropData({ ...newCropData, daysFromSeed: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="newSeedCount">Number of Seeds</Label>
                                    <Input
                                      id="newSeedCount"
                                      type="number"
                                      placeholder="12"
                                      value={newCropData.seedCount}
                                      onChange={(e) => setNewCropData({ ...newCropData, seedCount: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <Button className="mt-4 bg-primary hover:bg-primary/90">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Crop
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Terminate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Collapsible open={showStats} onOpenChange={setShowStats}>
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <span>Colony Statistics</span>
                  </CardTitle>
                  {showStats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border-primary/20">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-primary">{colonies.length}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Active Colonies</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-foreground">
                          {colonies.reduce(
                            (sum, colony) => sum + colony.crops.reduce((cropSum, crop) => cropSum + crop.count, 0),
                            0,
                          )}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Total Plants</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-primary">5</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Crop Varieties</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  )
}
