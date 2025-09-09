"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useCompactView } from "@/contexts/compact-view-context"
import {
  Wifi,
  Thermometer,
  Droplets,
  Activity,
  Download,
  Upload,
  Trash2,
  Plus,
  Minus,
  Vibrate as Calibrate,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

const networkSettings = {
  ssid: "HydroFarm_Network",
  status: "connected",
  signalStrength: 85,
  ipAddress: "192.168.1.100",
  macAddress: "AA:BB:CC:DD:EE:FF",
}

const colonyChannels = [
  { id: "A1", name: "Channel A1", status: "active", crop: "Lettuce" },
  { id: "A2", name: "Channel A2", status: "inactive", crop: null },
  { id: "B1", name: "Channel B1", status: "active", crop: "Tomato" },
  { id: "B2", name: "Channel B2", status: "active", crop: "Basil" },
  { id: "C1", name: "Channel C1", status: "inactive", crop: null },
  { id: "C2", name: "Channel C2", status: "active", crop: "Cucumber" },
  { id: "D1", name: "Channel D1", status: "inactive", crop: null },
  { id: "D2", name: "Channel D2", status: "inactive", crop: null },
]

const sensors = [
  { id: "PH001", name: "pH Sensor", lastCalibration: "2024-01-25", status: "good" },
  { id: "EC001", name: "EC/TDS Sensor", lastCalibration: "2024-01-20", status: "due_soon" },
  { id: "TEMP001", name: "Temperature Sensor", lastCalibration: "2024-01-15", status: "good" },
  { id: "WL001", name: "Water Level Sensor", lastCalibration: "2024-01-10", status: "overdue" },
]

const pumps = [
  { id: "PUMP001", name: "Main Water Pump", flowRate: 85, maxFlow: 100 },
  { id: "PUMP002", name: "Circulation Pump", flowRate: 92, maxFlow: 100 },
  { id: "DOSE001", name: "Water Dosing Pump", flowRate: 45, maxFlow: 50 },
  { id: "DOSE002", name: "Nutrient Dosing Pump", flowRate: 38, maxFlow: 50 },
  { id: "DOSE003", name: "pH Dosing Pump", flowRate: 25, maxFlow: 30 },
  { id: "DOSE004", name: "Micro-Macro Dosing Pump", flowRate: 30, maxFlow: 40 },
]

export default function SystemSettings() {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius")
  const [autoBackup, setAutoBackup] = useState(true)
  const [dataRetention, setDataRetention] = useState("90")
  const [pumpFlowRates, setPumpFlowRates] = useState(
    pumps.reduce((acc, pump) => ({ ...acc, [pump.id]: pump.flowRate }), {}),
  )
  const [isNetworkExpanded, setIsNetworkExpanded] = useState(false)
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(false)
  const [isSensorsExpanded, setIsSensorsExpanded] = useState(false)
  const [isPumpsExpanded, setIsPumpsExpanded] = useState(false)

  const { isCompactView, toggleCompactView } = useCompactView()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "connected":
      case "active":
        return "bg-chart-2/10 text-chart-2"
      case "due_soon":
      case "inactive":
        return "bg-chart-3/10 text-chart-3"
      case "overdue":
      case "disconnected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const updatePumpFlowRate = (pumpId: string, newRate: number[]) => {
    setPumpFlowRates({ ...pumpFlowRates, [pumpId]: newRate[0] })
  }

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-foreground flex flex-col sm:flex-row sm:items-baseline">
              <span className="text-xl sm:text-2xl font-muli font-normal">Shrumer</span>
              <span className="text-sm sm:text-base font-sans font-medium sm:ml-2 text-muted-foreground">
                Settings & Configuration
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <Navigation />
            <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export Settings</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button size="sm" className="text-xs sm:text-sm h-8 sm:h-10">
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save All Changes</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="system" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">System Config</span>
              <span className="sm:hidden">System</span>
            </TabsTrigger>
            <TabsTrigger value="hardware" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Hardware</span>
              <span className="sm:hidden">Hardware</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">User Preferences</span>
              <span className="sm:hidden">Prefs</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Data Management</span>
              <span className="sm:hidden">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-4">
            {/* Network Configuration - Collapsible on Mobile */}
            <Collapsible open={isNetworkExpanded} onOpenChange={setIsNetworkExpanded}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors sm:cursor-default sm:hover:bg-transparent">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                        <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                        <span className="truncate">Network Configuration</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className={`${getStatusColor(networkSettings.status)} text-xs whitespace-nowrap`}>
                          {networkSettings.status}
                        </Badge>
                        {isNetworkExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:hidden" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:hidden" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="sm:block">
                  <CardContent className="pt-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Network Status</Label>
                          <Badge className={`${getStatusColor(networkSettings.status)} text-xs`}>
                            {networkSettings.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ssid" className="text-sm">
                            WiFi Network (SSID)
                          </Label>
                          <Input id="ssid" value={networkSettings.ssid} readOnly className="text-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ip" className="text-sm">
                            IP Address
                          </Label>
                          <Input id="ip" value={networkSettings.ipAddress} readOnly className="text-sm" />
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Signal Strength</Label>
                          <span className="font-semibold text-sm">{networkSettings.signalStrength}%</span>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mac" className="text-sm">
                            MAC Address
                          </Label>
                          <Input id="mac" value={networkSettings.macAddress} readOnly className="text-sm" />
                        </div>
                        <Button variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                          <Wifi className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Change Network
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Colony Channels - Collapsible on Mobile */}
            <Collapsible open={isChannelsExpanded} onOpenChange={setIsChannelsExpanded}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors sm:cursor-default sm:hover:bg-transparent">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                        <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                        <span className="truncate">Colony Channels</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className="bg-chart-2/10 text-chart-2 text-xs whitespace-nowrap">
                          {colonyChannels.filter((c) => c.status === "active").length} Active
                        </Badge>
                        {isChannelsExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:hidden" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:hidden" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="sm:block">
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {colonyChannels.map((channel) => (
                        <Card key={channel.id} className="border-l-4 border-l-chart-1">
                          <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4">
                            <div className="space-y-2 sm:space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm truncate">{channel.name}</h4>
                                <Badge className={`${getStatusColor(channel.status)} text-xs`}>{channel.status}</Badge>
                              </div>
                              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Crop:</span>
                                  <span className="font-medium truncate ml-2">{channel.crop || "None"}</span>
                                </div>
                              </div>
                              <div className="flex gap-1 sm:gap-2">
                                {channel.status === "inactive" ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs h-7 sm:h-8 bg-transparent"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Enable
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs h-7 sm:h-8 bg-transparent"
                                  >
                                    <Minus className="h-3 w-3 mr-1" />
                                    Disable
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-4">
            {/* Sensor Calibration - Collapsible on Mobile */}
            <Collapsible open={isSensorsExpanded} onOpenChange={setIsSensorsExpanded}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors sm:cursor-default sm:hover:bg-transparent">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                        <Calibrate className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                        <span className="truncate">Sensor Calibration</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className="bg-chart-3/10 text-chart-3 text-xs whitespace-nowrap">
                          <span className="hidden sm:inline">
                            {sensors.filter((s) => s.status !== "good").length} Need Attention
                          </span>
                          <span className="sm:hidden">{sensors.filter((s) => s.status !== "good").length}</span>
                        </Badge>
                        {isSensorsExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:hidden" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:hidden" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="sm:block">
                  <CardContent className="pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      {sensors.map((sensor) => (
                        <div
                          key={sensor.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{sensor.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Last calibrated: {new Date(sensor.lastCalibration).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <Badge className={`${getStatusColor(sensor.status)} text-xs whitespace-nowrap`}>
                              {sensor.status.replace("_", " ")}
                            </Badge>
                            <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8 bg-transparent">
                              <Calibrate className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              Calibrate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Pump Flow Rate Adjustments - Collapsible on Mobile */}
            <Collapsible open={isPumpsExpanded} onOpenChange={setIsPumpsExpanded}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors sm:cursor-default sm:hover:bg-transparent">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                        <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                        <span className="truncate">Pump Flow Rate Adjustments</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className="bg-chart-2/10 text-chart-2 text-xs whitespace-nowrap">
                          <span className="hidden sm:inline">{pumps.length} Pumps</span>
                          <span className="sm:hidden">{pumps.length}</span>
                        </Badge>
                        {isPumpsExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:hidden" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:hidden" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="sm:block">
                  <CardContent className="pt-0">
                    <div className="space-y-4 sm:space-y-6">
                      {pumps.map((pump) => (
                        <div key={pump.id} className="space-y-2 sm:space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{pump.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                                Current: {pumpFlowRates[pump.id] || pump.flowRate}% of max capacity
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-semibold text-sm sm:text-base">
                                {pumpFlowRates[pump.id] || pump.flowRate}/{pump.maxFlow}
                              </div>
                              <div className="text-xs sm:text-sm text-muted-foreground">L/min</div>
                            </div>
                          </div>
                          <Slider
                            value={[pumpFlowRates[pump.id] || pump.flowRate]}
                            onValueChange={(value) => updatePumpFlowRate(pump.id, value)}
                            max={pump.maxFlow}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            {/* Display Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                  <span className="truncate">Display Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="temp-unit" className="text-sm sm:text-base">
                      Temperature Unit
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                      Choose between Celsius and Fahrenheit
                    </p>
                  </div>
                  <Select value={temperatureUnit} onValueChange={setTemperatureUnit}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">°C (Celsius)</SelectItem>
                      <SelectItem value="fahrenheit">°F (Fahrenheit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="dark-mode" className="text-sm sm:text-base">
                      Dark Mode
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Toggle dark mode interface</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="compact-view" className="text-sm sm:text-base">
                      Compact View
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Show more data in less space</p>
                  </div>
                  <Switch id="compact-view" checked={isCompactView} onCheckedChange={toggleCompactView} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="real-time" className="text-sm sm:text-base">
                      Real-time Updates
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Enable live data streaming</p>
                  </div>
                  <Switch id="real-time" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* System Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="auto-dosing" className="text-sm sm:text-base">
                      Automatic Dosing
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                      Enable automatic nutrient and pH dosing
                    </p>
                  </div>
                  <Switch id="auto-dosing" defaultChecked />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="smart-alerts" className="text-sm sm:text-base">
                      Smart Alerts
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI-powered predictive alerts</p>
                  </div>
                  <Switch id="smart-alerts" defaultChecked />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="energy-saving" className="text-sm sm:text-base">
                      Energy Saving Mode
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                      Optimize power consumption during off-hours
                    </p>
                  </div>
                  <Switch id="energy-saving" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                  <span className="truncate">Data Export & Backup</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor="auto-backup" className="text-sm sm:text-base">
                      Automatic Backup
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                      Daily backup of system data and settings
                    </p>
                  </div>
                  <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention" className="text-sm sm:text-base">
                    Data Retention Period
                  </Label>
                  <Select value={dataRetention} onValueChange={setDataRetention}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">6 months</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <Button variant="outline" className="justify-start text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="truncate">Export All Data</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="truncate">Import Settings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-destructive text-xs sm:text-sm h-8 sm:h-10 bg-transparent"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="truncate">Clear All Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Storage Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Sensor Data</span>
                    <span className="font-semibold text-sm sm:text-base">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Event Logs</span>
                    <span className="font-semibold text-sm sm:text-base">156 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">System Backups</span>
                    <span className="font-semibold text-sm sm:text-base">892 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Images & Media</span>
                    <span className="font-semibold text-sm sm:text-base">45 MB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-sm sm:text-base">Total Storage Used</span>
                    <span className="text-sm sm:text-base">3.5 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
