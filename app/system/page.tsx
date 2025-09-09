"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PageHeader } from "@/components/page-header"
import {
  Activity,
  Zap,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Droplets,
  Thermometer,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"

const mainSystemSensors = [
  {
    id: "WL001",
    name: "Main Water Reservoir Level",
    type: "Water Level",
    status: "online",
    lastReading: "78%",
    lastUpdate: "2 min ago",
    calibration: "Good",
    batteryLevel: 85,
    location: "Main Tank",
  },
  {
    id: "WL002",
    name: "Nutrient Reservoir Level",
    type: "Water Level",
    status: "online",
    lastReading: "45%",
    lastUpdate: "2 min ago",
    calibration: "Good",
    batteryLevel: 92,
    location: "Nutrient Tank",
  },
  {
    id: "WL003",
    name: "Sub-Reservoir Level",
    type: "Water Level",
    status: "online",
    lastReading: "85%",
    lastUpdate: "1 min ago",
    calibration: "Good",
    batteryLevel: 78,
    location: "Sub-Reservoir",
  },
  {
    id: "TEMP001",
    name: "Sub-Reservoir Temperature",
    type: "Temperature",
    status: "online",
    lastReading: "22.5°C",
    lastUpdate: "30 sec ago",
    calibration: "Good",
    batteryLevel: null,
    location: "Sub-Reservoir",
  },
  {
    id: "PH001",
    name: "pH Sensor",
    type: "pH Level",
    status: "online",
    lastReading: "6.2",
    lastUpdate: "1 min ago",
    calibration: "Due Soon",
    batteryLevel: null,
    location: "Sub-Reservoir",
  },
  {
    id: "EC001",
    name: "EC/TDS Sensor",
    type: "Conductivity",
    status: "online",
    lastReading: "1,240 ppm",
    lastUpdate: "1 min ago",
    calibration: "Good",
    batteryLevel: null,
    location: "Sub-Reservoir",
  },
  {
    id: "AIR001",
    name: "O₂/CO₂ Sensor",
    type: "Air Quality",
    status: "online",
    lastReading: "O₂: 21.2%, CO₂: 420ppm",
    lastUpdate: "4 min ago",
    calibration: "Good",
    batteryLevel: null,
    location: "Main Chamber",
  },
]

const colonySensors = {
  "Colony A1": [
    {
      id: "LIGHT001",
      name: "Light Sensor",
      type: "Light Intensity",
      status: "online",
      lastReading: "42,000 lux",
      lastUpdate: "5 min ago",
      calibration: "Good",
      batteryLevel: 67,
      location: "Colony A1",
    },
    {
      id: "HUM001",
      name: "Humidity Sensor",
      type: "Humidity",
      status: "online",
      lastReading: "68%",
      lastUpdate: "3 min ago",
      calibration: "Good",
      batteryLevel: 89,
      location: "Colony A1",
    },
    {
      id: "TEMP_A1",
      name: "Ambient Temperature",
      type: "Temperature",
      status: "online",
      lastReading: "24.2°C",
      lastUpdate: "2 min ago",
      calibration: "Good",
      batteryLevel: 76,
      location: "Colony A1",
    },
  ],
  "Colony B2": [
    {
      id: "LIGHT002",
      name: "Light Sensor",
      type: "Light Intensity",
      status: "offline",
      lastReading: "N/A",
      lastUpdate: "2 hours ago",
      calibration: "Unknown",
      batteryLevel: 12,
      location: "Colony B2",
    },
    {
      id: "HUM002",
      name: "Humidity Sensor",
      type: "Humidity",
      status: "online",
      lastReading: "72%",
      lastUpdate: "1 min ago",
      calibration: "Good",
      batteryLevel: 84,
      location: "Colony B2",
    },
    {
      id: "TEMP_B2",
      name: "Ambient Temperature",
      type: "Temperature",
      status: "online",
      lastReading: "23.8°C",
      lastUpdate: "1 min ago",
      calibration: "Good",
      batteryLevel: 91,
      location: "Colony B2",
    },
  ],
}

const mainSystemActuators = [
  {
    id: "PUMP001",
    name: "Main Water Pump",
    type: "Pump",
    status: "running",
    power: 85,
    runtime: "2.5 hours",
    cycles: 156,
    location: "Main System",
  },
  {
    id: "PUMP002",
    name: "Circulation Pump",
    type: "Pump",
    status: "running",
    power: 92,
    runtime: "Continuous",
    cycles: 1,
    location: "Sub-Reservoir",
  },
  {
    id: "DOSE001",
    name: "Water Dosing Pump",
    type: "Dosing Pump",
    status: "idle",
    power: 0,
    runtime: "15 min ago",
    cycles: 23,
    location: "Main Tank",
  },
  {
    id: "DOSE002",
    name: "Nutrient Dosing Pump",
    type: "Dosing Pump",
    status: "running",
    power: 45,
    runtime: "Active",
    cycles: 89,
    location: "Nutrient Tank",
  },
  {
    id: "DOSE003",
    name: "pH Dosing Pump",
    type: "Dosing Pump",
    status: "idle",
    power: 0,
    runtime: "4 hours ago",
    cycles: 12,
    location: "pH Tank",
  },
  {
    id: "DOSE004",
    name: "Micro-Macro Dosing Pump",
    type: "Dosing Pump",
    status: "idle",
    power: 0,
    runtime: "1 day ago",
    cycles: 7,
    location: "Nutrient Tank",
  },
  {
    id: "VALVE001",
    name: "Main Inlet Valve",
    type: "Solenoid Valve",
    status: "closed",
    power: 0,
    runtime: "N/A",
    cycles: 45,
    location: "Main System",
  },
  {
    id: "VALVE002",
    name: "Drain Valve",
    type: "Solenoid Valve",
    status: "closed",
    power: 0,
    runtime: "N/A",
    cycles: 8,
    location: "Sub-Reservoir",
  },
  {
    id: "TEMP_CTRL001",
    name: "Sub-Reservoir Heater",
    type: "Temperature Control",
    status: "idle",
    power: 0,
    runtime: "6 hours ago",
    cycles: 3,
    location: "Sub-Reservoir",
  },
]

const colonyActuators = {
  "Colony A1": [
    {
      id: "LED001",
      name: "LED Array",
      type: "LED Grow Light",
      status: "running",
      power: 78,
      runtime: "12 hours",
      cycles: 1,
      location: "Colony A1",
    },
    {
      id: "MIST001",
      name: "Misting System",
      type: "Misting System",
      status: "idle",
      power: 0,
      runtime: "30 min ago",
      cycles: 24,
      location: "Colony A1",
    },
  ],
  "Colony B2": [
    {
      id: "LED002",
      name: "LED Array",
      type: "LED Grow Light",
      status: "running",
      power: 85,
      runtime: "12 hours",
      cycles: 1,
      location: "Colony B2",
    },
    {
      id: "MIST002",
      name: "Misting System",
      type: "Misting System",
      status: "idle",
      power: 0,
      runtime: "45 min ago",
      cycles: 18,
      location: "Colony B2",
    },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
    case "running":
      return "bg-chart-2/10 text-chart-2"
    case "offline":
    case "error":
      return "bg-destructive/10 text-destructive"
    case "idle":
    case "closed":
      return "bg-chart-3/10 text-chart-3"
    default:
      return "bg-muted/10 text-muted-foreground"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
    case "running":
      return <CheckCircle className="h-4 w-4" />
    case "offline":
    case "error":
      return <XCircle className="h-4 w-4" />
    case "idle":
    case "closed":
      return <Clock className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getCalibrationColor = (calibration: string) => {
  switch (calibration) {
    case "Good":
      return "bg-chart-2/10 text-chart-2"
    case "Due Soon":
      return "bg-chart-3/10 text-chart-3"
    case "Overdue":
      return "bg-destructive/10 text-destructive"
    default:
      return "bg-muted/10 text-muted-foreground"
  }
}

export default function SystemStatus() {
  const [selectedColony, setSelectedColony] = useState<string>("Colony A1")
  const [isMainSystemExpanded, setIsMainSystemExpanded] = useState(false)
  const [isColonySystemExpanded, setIsColonySystemExpanded] = useState(false)
  const [isAlertsExpanded, setIsAlertsExpanded] = useState(true)

  const allSensors = [...mainSystemSensors, ...Object.values(colonySensors).flat()]
  const allActuators = [...mainSystemActuators, ...Object.values(colonyActuators).flat()]

  const onlineSensors = allSensors.filter((s) => s.status === "online").length
  const offlineSensors = allSensors.filter((s) => s.status === "offline").length
  const runningSystems = allActuators.filter((a) => a.status === "running").length
  const totalSystems = allActuators.length

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        <PageHeader pageName="System Status" />

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-chart-2">{onlineSensors}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Sensors Online</div>
                </div>
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-chart-2 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-destructive">{offlineSensors}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Sensors Offline</div>
                </div>
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-chart-2">{runningSystems}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Systems Running</div>
                </div>
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-chart-2 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold">{totalSystems}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Total Components</div>
                </div>
                <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main System - Collapsible on Mobile */}
        <Collapsible open={isMainSystemExpanded} onOpenChange={setIsMainSystemExpanded}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                    <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                    <span className="truncate">Main Reservoir & Overall System</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-chart-2/10 text-chart-2 text-xs whitespace-nowrap">
                      <span className="hidden sm:inline">{onlineSensors + runningSystems} Active</span>
                      <span className="sm:hidden">{onlineSensors + runningSystems}</span>
                    </Badge>
                    {isMainSystemExpanded ? (
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Main System Sensors */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Activity className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">System Sensors</span>
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {mainSystemSensors.map((sensor) => (
                          <Card key={sensor.id} className="border-l-4 border-l-chart-1">
                            <CardContent className="pt-2 pb-2 sm:pt-3 sm:pb-3 p-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                  {getStatusIcon(sensor.status)}
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-xs sm:text-sm truncate">{sensor.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{sensor.location}</p>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="font-semibold text-xs sm:text-sm">{sensor.lastReading}</div>
                                  <Badge className={`${getStatusColor(sensor.status)} text-xs`}>{sensor.status}</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Main System Actuators */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Zap className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">System Components</span>
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {mainSystemActuators.map((actuator) => (
                          <Card key={actuator.id} className="border-l-4 border-l-chart-1">
                            <CardContent className="pt-2 pb-2 sm:pt-3 sm:pb-3 p-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                  {getStatusIcon(actuator.status)}
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-xs sm:text-sm truncate">{actuator.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{actuator.location}</p>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="font-semibold text-xs sm:text-sm">{actuator.power}%</div>
                                  <Badge className={`${getStatusColor(actuator.status)} text-xs`}>
                                    {actuator.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Colony System - Collapsible on Mobile */}
        <Collapsible open={isColonySystemExpanded} onOpenChange={setIsColonySystemExpanded}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                    <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                    <span className="truncate">Colony-Specific Monitoring</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto gap-2 sm:gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
                      <label className="text-xs sm:text-sm font-medium whitespace-nowrap">Colony:</label>
                      <Select value={selectedColony} onValueChange={setSelectedColony}>
                        <SelectTrigger className="w-24 sm:w-32 h-7 sm:h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(colonySensors).map((colony) => (
                            <SelectItem key={colony} value={colony}>
                              {colony}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className="bg-chart-2/10 text-chart-2 text-xs whitespace-nowrap">
                        <span className="hidden sm:inline">
                          {colonySensors[selectedColony as keyof typeof colonySensors]?.length || 0} Sensors
                        </span>
                        <span className="sm:hidden">
                          {colonySensors[selectedColony as keyof typeof colonySensors]?.length || 0}
                        </span>
                      </Badge>
                      {isColonySystemExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent className="sm:block">
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Colony Sensors */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Activity className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedColony} Sensors</span>
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {colonySensors[selectedColony as keyof typeof colonySensors]?.map((sensor) => (
                        <Card key={sensor.id} className="border-l-4 border-l-chart-2">
                          <CardContent className="pt-2 pb-2 sm:pt-3 sm:pb-3 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                {getStatusIcon(sensor.status)}
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-xs sm:text-sm truncate">{sensor.name}</h4>
                                  <p className="text-xs text-muted-foreground truncate">{sensor.type}</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="font-semibold text-xs sm:text-sm">{sensor.lastReading}</div>
                                <Badge className={`${getStatusColor(sensor.status)} text-xs`}>{sensor.status}</Badge>
                              </div>
                            </div>
                            {sensor.batteryLevel !== null && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Battery</span>
                                  <span>{sensor.batteryLevel}%</span>
                                </div>
                                <Progress value={sensor.batteryLevel} className="h-1 mt-1" />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Colony Actuators */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Zap className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedColony} Components</span>
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {colonyActuators[selectedColony as keyof typeof colonyActuators]?.map((actuator) => (
                        <Card key={actuator.id} className="border-l-4 border-l-chart-2">
                          <CardContent className="pt-2 pb-2 sm:pt-3 sm:pb-3 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                {getStatusIcon(actuator.status)}
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-xs sm:text-sm truncate">{actuator.name}</h4>
                                  <p className="text-xs text-muted-foreground truncate">{actuator.type}</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="font-semibold text-xs sm:text-sm">{actuator.power}%</div>
                                <Badge className={`${getStatusColor(actuator.status)} text-xs`}>
                                  {actuator.status}
                                </Badge>
                              </div>
                            </div>
                            {actuator.power > 0 && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Power Usage</span>
                                  <span>{actuator.power}%</span>
                                </div>
                                <Progress value={actuator.power} className="h-1 mt-1" />
                              </div>
                            )}
                            <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
                              <Button variant="outline" size="sm" className="flex-1 text-xs h-6 sm:h-7 bg-transparent">
                                Control
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 text-xs h-6 sm:h-7 bg-transparent">
                                Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* System Alerts - Always visible but collapsible on mobile */}
        <Collapsible open={isAlertsExpanded} onOpenChange={setIsAlertsExpanded}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors sm:cursor-default sm:hover:bg-transparent">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg min-w-0 flex-1">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3 flex-shrink-0" />
                    <span className="truncate">System Alerts</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-destructive/10 text-destructive text-xs whitespace-nowrap">
                      <span className="hidden sm:inline">3 Active</span>
                      <span className="sm:hidden">3</span>
                    </Badge>
                    {isAlertsExpanded ? (
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
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-destructive text-sm sm:text-base">
                        Colony B2 Light Sensor Offline
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Sensor LIGHT002 has been offline for 2 hours. Battery level critical (12%).
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0 text-xs h-7 sm:h-8 bg-transparent">
                      Investigate
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-chart-3/10 rounded-lg border border-chart-3/20">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-chart-3 text-sm sm:text-base">
                        pH Sensor Calibration Due Soon
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Sensor PH001 requires calibration within the next 7 days for optimal accuracy.
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0 text-xs h-7 sm:h-8 bg-transparent">
                      Schedule
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-chart-2/10 rounded-lg border border-chart-2/20">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-chart-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-chart-2 text-sm sm:text-base">
                        All Critical Systems Operational
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Main pumps, dosing systems, and primary sensors are functioning normally.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  )
}
