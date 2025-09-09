"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import {
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  Droplets,
  Filter,
  TrendingUp,
  Zap,
  Info,
  Thermometer,
  Download,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mainReservoirData = [
  { time: "00:00", mainLevel: 78, nutrientLevel: 45, subLevel: 85, temperature: 22.1 },
  { time: "04:00", mainLevel: 76, nutrientLevel: 43, subLevel: 83, temperature: 21.8 },
  { time: "08:00", mainLevel: 74, nutrientLevel: 41, subLevel: 81, temperature: 22.5 },
  { time: "12:00", mainLevel: 72, nutrientLevel: 39, subLevel: 79, temperature: 23.2 },
  { time: "16:00", mainLevel: 70, nutrientLevel: 37, subLevel: 77, temperature: 22.8 },
  { time: "20:00", mainLevel: 68, nutrientLevel: 35, subLevel: 75, temperature: 22.3 },
  { time: "24:00", mainLevel: 66, nutrientLevel: 33, subLevel: 73, temperature: 22.0 },
]

// Sample data for charts
const phData = [
  { time: "00:00", value: 6.1, target: 6.2 },
  { time: "04:00", value: 6.3, target: 6.2 },
  { time: "08:00", value: 6.0, target: 6.2 },
  { time: "12:00", value: 6.4, target: 6.2 },
  { time: "16:00", value: 6.2, target: 6.2 },
  { time: "20:00", value: 6.1, target: 6.2 },
  { time: "24:00", value: 6.2, target: 6.2 },
]

const temperatureData = [
  { time: "00:00", value: 22.1, min: 20, max: 25 },
  { time: "04:00", value: 21.8, min: 20, max: 25 },
  { time: "08:00", value: 22.5, min: 20, max: 25 },
  { time: "12:00", value: 23.2, min: 20, max: 25 },
  { time: "16:00", value: 22.8, min: 20, max: 25 },
  { time: "20:00", value: 22.3, min: 20, max: 25 },
  { time: "24:00", value: 22.0, min: 20, max: 25 },
]

const ecData = [
  { time: "00:00", value: 1240 },
  { time: "04:00", value: 1235 },
  { time: "08:00", value: 1250 },
  { time: "12:00", value: 1245 },
  { time: "16:00", value: 1238 },
  { time: "20:00", value: 1242 },
  { time: "24:00", value: 1240 },
]

const eventLogs = [
  {
    id: 1,
    timestamp: "2024-01-31 14:30:25",
    type: "dosing",
    event: "Nutrient Dosing Cycle",
    details: "Added 18ml nutrient solution to sub-reservoir",
    status: "completed",
    location: "Main Water Reservoir → Sub-Reservoir Tank",
    colony: null,
    specificLocation: "Main System",
    component: "Sub-Reservoir Tank",
  },
  {
    id: 2,
    timestamp: "2024-01-31 14:15:10",
    type: "manual",
    event: "Manual Override",
    details: "User manually adjusted pH dosing pump to 45% power",
    status: "completed",
    location: "Main System → pH Dosing Pump",
    colony: null,
    specificLocation: "Main System",
    component: "pH Dosing Pump",
  },
  {
    id: 3,
    timestamp: "2024-01-31 13:45:00",
    type: "growth",
    event: "Growth Stage Transition",
    details: "Colony A1 advanced from 'Small Plant' to 'Plant' stage",
    status: "completed",
    location: "Colony A1 → Channel 2 → Growth Monitor",
    colony: "A1",
    specificLocation: "Colony A1",
    component: "Channel 2 Growth Monitor",
  },
  {
    id: 4,
    timestamp: "2024-01-31 12:00:00",
    type: "system",
    event: "Drain and Refill Cycle",
    details: "Completed scheduled drain and refill of sub-reservoir (85L)",
    status: "completed",
    location: "Main Water Reservoir → Sub-Reservoir System",
    colony: null,
    specificLocation: "Main System",
    component: "Sub-Reservoir System",
  },
  {
    id: 5,
    timestamp: "2024-01-31 11:30:15",
    type: "alert",
    event: "Sensor Alert Resolved",
    details: "Colony B2 light sensor back online after battery replacement",
    status: "resolved",
    location: "Colony B2 → Channel 4 → Light Sensor",
    colony: "B2",
    specificLocation: "Colony B2",
    component: "Channel 4 Light Sensor",
  },
  {
    id: 6,
    timestamp: "2024-01-31 09:15:30",
    type: "dosing",
    event: "pH Adjustment",
    details: "Added 7ml pH solution to maintain optimal levels (6.2)",
    status: "completed",
    location: "Main Water Reservoir → pH Control System",
    colony: null,
    specificLocation: "Main System",
    component: "pH Control System",
  },
  {
    id: 7,
    timestamp: "2024-01-31 08:00:00",
    type: "system",
    event: "Daily System Check",
    details: "All sensors calibrated and functioning within normal parameters",
    status: "completed",
    location: "Main System → Overall Health Monitor",
    colony: null,
    specificLocation: "Main System",
    component: "Overall Health Monitor",
  },
  {
    id: 8,
    timestamp: "2024-01-30 20:45:12",
    type: "alert",
    event: "Low Reservoir Alert",
    details: "Nutrient reservoir level dropped below 50% threshold",
    status: "acknowledged",
    location: "Main Water Reservoir → Nutrient Tank → Level Sensor",
    colony: null,
    specificLocation: "Main System",
    component: "Nutrient Tank Level Sensor",
  },
  {
    id: 9,
    timestamp: "2024-01-30 18:22:45",
    type: "system",
    event: "Ambient Climate Adjustment",
    details: "Temperature control activated in Colony A1 ambient environment",
    status: "completed",
    location: "Colony A1 → Ambient Climate Control",
    colony: "A1",
    specificLocation: "Colony A1",
    component: "Ambient Climate Control",
  },
  {
    id: 10,
    timestamp: "2024-01-30 16:10:33",
    type: "dosing",
    event: "Micro-Macro Nutrient Dosing",
    details: "Added 12ml micro-macro solution to Colony D4 sub-reservoir",
    status: "completed",
    location: "Colony D4 → Channel 3 → Sub-Reservoir",
    colony: "D4",
    specificLocation: "Colony D4",
    component: "Channel 3 Sub-Reservoir",
  },
  {
    id: 11,
    timestamp: "2024-01-30 15:45:20",
    type: "system",
    event: "Water Circulation Cycle",
    details: "Completed 15-minute water circulation cycle for Colony C3",
    status: "completed",
    location: "Colony C3 → Channel 1 → Water Pump",
    colony: "C3",
    specificLocation: "Colony C3",
    component: "Channel 1 Water Pump",
  },
  {
    id: 12,
    timestamp: "2024-01-30 14:20:15",
    type: "alert",
    event: "High Temperature Alert",
    details: "Colony B2 temperature exceeded 28°C threshold",
    status: "resolved",
    location: "Colony B2 → Channel 2 → Temperature Sensor",
    colony: "B2",
    specificLocation: "Colony B2",
    component: "Channel 2 Temperature Sensor",
  },
  {
    id: 13,
    timestamp: "2024-01-30 13:10:45",
    type: "growth",
    event: "Harvest Ready Notification",
    details: "Colony E5 lettuce plants ready for harvest (35 days)",
    status: "completed",
    location: "Colony E5 → Channel 1 → Growth Monitor",
    colony: "E5",
    specificLocation: "Colony E5",
    component: "Channel 1 Growth Monitor",
  },
  {
    id: 14,
    timestamp: "2024-01-30 12:30:00",
    type: "system",
    event: "LED Light Schedule Update",
    details: "Updated light schedule for Colony A1 to 16-hour photoperiod",
    status: "completed",
    location: "Colony A1 → LED Light Controller",
    colony: "A1",
    specificLocation: "Colony A1",
    component: "LED Light Controller",
  },
  {
    id: 15,
    timestamp: "2024-01-30 11:15:30",
    type: "dosing",
    event: "EC Adjustment",
    details: "Added nutrients to increase EC from 1180 to 1240 ppm",
    status: "completed",
    location: "Colony B2 → Channel 3 → Sub-Reservoir",
    colony: "B2",
    specificLocation: "Colony B2",
    component: "Channel 3 Sub-Reservoir",
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "dosing":
      return "bg-chart-1/10 text-chart-1"
    case "system":
      return "bg-chart-2/10 text-chart-2"
    case "growth":
      return "bg-chart-5/10 text-chart-5"
    case "manual":
      return "bg-chart-3/10 text-chart-3"
    case "alert":
      return "bg-destructive/10 text-destructive"
    default:
      return "bg-muted/10 text-muted-foreground"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-chart-2/10 text-chart-2"
    case "resolved":
      return "bg-chart-2/10 text-chart-2"
    case "acknowledged":
      return "bg-chart-3/10 text-chart-3"
    case "pending":
      return "bg-chart-1/10 text-chart-1"
    default:
      return "bg-muted/10 text-muted-foreground"
  }
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("24h")
  const [eventFilter, setEventFilter] = useState("all")
  const [expandedCharts, setExpandedCharts] = useState<Record<string, boolean>>({})

  const filteredEvents = eventFilter === "all" ? eventLogs : eventLogs.filter((event) => event.type === eventFilter)

  const toggleChartExpansion = (chartId: string) => {
    setExpandedCharts((prev) => ({
      ...prev,
      [chartId]: !prev[chartId],
    }))
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-foreground flex flex-col sm:flex-row sm:items-baseline">
              <span className="text-2xl sm:text-4xl font-muli font-normal">Shrumer</span>
              <span className="text-lg sm:text-xl font-sans font-medium sm:ml-2 text-muted-foreground">
                Analytics & History
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="order-3 sm:order-1">
              <Navigation />
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-24 sm:w-32 h-9 order-1 sm:order-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7d</SelectItem>
                <SelectItem value="30d">30d</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="order-4 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-chart-2">98.5%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">System Uptime</div>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-chart-2 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg sm:text-2xl font-bold">156</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Dosing Cycles</div>
                </div>
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-chart-1 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg sm:text-2xl font-bold">24</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Active Sensors</div>
                </div>
                <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-chart-1 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg sm:text-2xl font-bold">6.2</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Avg pH Level</div>
                </div>
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-chart-5 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="parameters" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="parameters" className="text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">System Parameters</span>
              <span className="sm:hidden">System</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">Event Timeline</span>
              <span className="sm:hidden">Events</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                  <span className="truncate">Main Reservoir & System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mobile: Collapsible charts, Desktop: Grid layout */}
                <div className="block lg:hidden space-y-4">
                  <Collapsible
                    open={expandedCharts["reservoir"]}
                    onOpenChange={() => toggleChartExpansion("reservoir")}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span className="text-sm">Reservoir Levels</span>
                        {expandedCharts["reservoir"] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <Card>
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={mainReservoirData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" fontSize={12} />
                              <YAxis domain={[0, 100]} fontSize={12} />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="mainLevel"
                                stackId="1"
                                stroke="hsl(var(--chart-1))"
                                fill="hsl(var(--chart-1))"
                                fillOpacity={0.6}
                              />
                              <Area
                                type="monotone"
                                dataKey="nutrientLevel"
                                stackId="2"
                                stroke="hsl(var(--chart-2))"
                                fill="hsl(var(--chart-2))"
                                fillOpacity={0.6}
                              />
                              <Area
                                type="monotone"
                                dataKey="subLevel"
                                stackId="3"
                                stroke="hsl(var(--chart-5))"
                                fill="hsl(var(--chart-5))"
                                fillOpacity={0.6}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    open={expandedCharts["temperature"]}
                    onOpenChange={() => toggleChartExpansion("temperature")}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span className="text-sm">System Temperature</span>
                        {expandedCharts["temperature"] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <Card>
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={mainReservoirData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" fontSize={12} />
                              <YAxis domain={[18, 27]} fontSize={12} />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="hsl(var(--chart-1))"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={expandedCharts["ph"]} onOpenChange={() => toggleChartExpansion("ph")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span className="text-sm">pH Level Trends</span>
                        {expandedCharts["ph"] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <Card>
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={phData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" fontSize={12} />
                              <YAxis domain={[5.5, 6.8]} fontSize={12} />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="hsl(var(--chart-2))"
                                strokeDasharray="5 5"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={expandedCharts["ec"]} onOpenChange={() => toggleChartExpansion("ec")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span className="text-sm">EC/TDS Levels</span>
                        {expandedCharts["ec"] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <Card>
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={ecData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" fontSize={12} />
                              <YAxis domain={[1200, 1280]} fontSize={12} />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Desktop layout - unchanged */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Reservoir Levels */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Reservoir Levels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={mainReservoirData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="mainLevel"
                              stackId="1"
                              stroke="hsl(var(--chart-1))"
                              fill="hsl(var(--chart-1))"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="nutrientLevel"
                              stackId="2"
                              stroke="hsl(var(--chart-2))"
                              fill="hsl(var(--chart-2))"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="subLevel"
                              stackId="3"
                              stroke="hsl(var(--chart-5))"
                              fill="hsl(var(--chart-5))"
                              fillOpacity={0.6}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* System Temperature */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">System Temperature</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={mainReservoirData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[18, 27]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* pH Trends */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">pH Level Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={phData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[5.5, 6.8]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                            <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* EC/TDS Levels */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">EC/TDS Levels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={ecData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[1200, 1280]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                    <span className="truncate">Detailed Event Timeline</span>
                  </CardTitle>
                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-full sm:w-40 h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="dosing">Dosing</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="alert">Alerts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="space-y-2 sm:space-y-3">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-chart-1 mt-2"></div>
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{event.event}</h4>
                              <Badge className={`${getEventTypeColor(event.type)} text-xs`}>{event.type}</Badge>
                              {event.colony && (
                                <Badge variant="outline" className="text-xs">
                                  Colony {event.colony}
                                </Badge>
                              )}
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/50">
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <div className="space-y-2 text-xs">
                                    <div className="font-medium">Location Details</div>
                                    <div className="space-y-1">
                                      <div>
                                        <span className="font-medium">Full Path:</span>
                                        <div className="bg-muted/50 px-2 py-1 rounded mt-1 font-mono text-xs">
                                          {event.location}
                                        </div>
                                      </div>
                                      {event.colony && (
                                        <div>
                                          <span className="font-medium">Colony:</span>
                                          <span className="ml-2 bg-chart-1/20 text-chart-1 px-2 py-0.5 rounded">
                                            {event.colony}
                                          </span>
                                        </div>
                                      )}
                                      <div>
                                        <span className="font-medium">System:</span>
                                        <span className="ml-2">{event.specificLocation}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium">Component:</span>
                                        <span className="ml-2">{event.component}</span>
                                      </div>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </UITooltip>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Badge className={`${getStatusColor(event.status)} text-xs`}>{event.status}</Badge>
                              <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{event.details}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">Location:</span>
                            <span className="bg-muted/50 px-2 py-1 rounded text-xs font-mono truncate">
                              {event.colony ? `Colony ${event.colony}` : "Main System"} → {event.component}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
