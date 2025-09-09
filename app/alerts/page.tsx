"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { toast } from "@/hooks/use-toast"
import {
  Bell,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Settings,
  Trash2,
  Eye,
  Volume2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface AlertData {
  id: number
  title: string
  description: string
  type: string
  priority: string
  timestamp: string
  status: string
  location: string
  acknowledged: boolean
  acknowledgedAt?: string
  acknowledgedBy?: string
}

const initialAlertsData: AlertData[] = [
  {
    id: 1,
    title: "Colony B2 Light Sensor Offline",
    description: "Sensor LIGHT002 has been offline for 2 hours. Battery level critical (12%).",
    type: "sensor_malfunction",
    priority: "critical",
    timestamp: "2024-01-31 12:30:00",
    status: "active",
    location: "Colony B2",
    acknowledged: false,
  },
  {
    id: 2,
    title: "Nutrient Reservoir Low Level",
    description: "Nutrient reservoir has dropped to 45%. Refill recommended within 24 hours.",
    type: "reservoir_level",
    priority: "high",
    timestamp: "2024-01-31 10:15:00",
    status: "active",
    location: "Nutrient Tank",
    acknowledged: false,
  },
  {
    id: 3,
    title: "pH Level Out of Range",
    description: "pH level has been above optimal range (6.5) for 30 minutes. Auto-adjustment in progress.",
    type: "parameter_range",
    priority: "medium",
    timestamp: "2024-01-31 09:45:00",
    status: "active",
    location: "Sub-Reservoir",
    acknowledged: true,
    acknowledgedAt: "2024-01-31 09:50:00",
    acknowledgedBy: "System Admin",
  },
  {
    id: 4,
    title: "pH Sensor Calibration Due",
    description: "pH sensor PH001 requires calibration within the next 7 days for optimal accuracy.",
    type: "maintenance",
    priority: "low",
    timestamp: "2024-01-31 08:00:00",
    status: "active",
    location: "Sub-Reservoir",
    acknowledged: false,
  },
]

const notificationCategories = [
  {
    category: "Critical Alerts",
    description: "Sensor failures, system malfunctions, emergency conditions",
    settings: {
      inApp: true,
      email: true,
      push: true,
      sound: true,
    },
  },
  {
    category: "High Priority",
    description: "Low reservoir levels, parameter warnings, pump failures",
    settings: {
      inApp: true,
      email: true,
      push: true,
      sound: false,
    },
  },
  {
    category: "Medium Priority",
    description: "Parameter fluctuations, minor system adjustments",
    settings: {
      inApp: true,
      email: false,
      push: true,
      sound: false,
    },
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-destructive/10 text-destructive border-destructive"
    case "high":
      return "bg-chart-4/10 text-chart-4 border-chart-4"
    case "medium":
      return "bg-chart-3/10 text-chart-3 border-chart-3"
    case "low":
      return "bg-chart-1/10 text-chart-1 border-chart-1"
    default:
      return "bg-muted/10 text-muted-foreground border-muted"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-destructive/10 text-destructive"
    case "resolved":
      return "bg-chart-2/10 text-chart-2"
    case "acknowledged":
      return "bg-chart-3/10 text-chart-3"
    default:
      return "bg-muted/10 text-muted-foreground"
  }
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case "critical":
      return <XCircle className="h-5 w-5" />
    case "high":
      return <AlertTriangle className="h-5 w-5" />
    case "medium":
      return <Clock className="h-5 w-5" />
    case "low":
      return <CheckCircle className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

export default function AlertsNotifications() {
  const [alertsData, setAlertsData] = useState<AlertData[]>(initialAlertsData)
  const [notificationPrefs, setNotificationPrefs] = useState(notificationCategories)
  const [expandedAlerts, setExpandedAlerts] = useState<number[]>([])

  const activeAlerts = alertsData.filter((alert) => alert.status === "active")
  const criticalAlerts = activeAlerts.filter((alert) => alert.priority === "critical")
  const unacknowledgedAlerts = activeAlerts.filter((alert) => !alert.acknowledged)
  const acknowledgedAlerts = alertsData.filter((alert) => alert.acknowledged && alert.status === "active")
  const resolvedAlerts = alertsData.filter((alert) => alert.status === "resolved")

  const handleAcknowledgeAlert = (alertId: number) => {
    setAlertsData((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              acknowledged: true,
              acknowledgedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
              acknowledgedBy: "Current User", // In a real app, this would be the logged-in user
            }
          : alert,
      ),
    )

    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    })
  }

  const handleAcknowledgeAllAlerts = () => {
    const unacknowledgedCount = unacknowledgedAlerts.length

    if (unacknowledgedCount === 0) {
      toast({
        title: "No Alerts to Acknowledge",
        description: "All active alerts have already been acknowledged.",
      })
      return
    }

    setAlertsData((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.status === "active" && !alert.acknowledged
          ? {
              ...alert,
              acknowledged: true,
              acknowledgedAt: alert.acknowledgedAt || new Date().toISOString().replace("T", " ").substring(0, 19),
              acknowledgedBy: alert.acknowledgedBy || "Current User",
            }
          : alert,
      ),
    )

    toast({
      title: "All Alerts Acknowledged",
      description: `Successfully acknowledged ${unacknowledgedCount} alert${unacknowledgedCount > 1 ? "s" : ""}.`,
    })
  }

  const handleResolveAlert = (alertId: number) => {
    setAlertsData((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "resolved",
              acknowledged: true,
              acknowledgedAt: alert.acknowledgedAt || new Date().toISOString().replace("T", " ").substring(0, 19),
              acknowledgedBy: alert.acknowledgedBy || "Current User",
            }
          : alert,
      ),
    )

    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    })
  }

  const handleDeleteAlert = (alertId: number) => {
    setAlertsData((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId))

    toast({
      title: "Alert Deleted",
      description: "The alert has been permanently removed.",
      variant: "destructive",
    })
  }

  function updateNotificationSetting(categoryIndex: number, setting: string, value: boolean) {
    const newPrefs = notificationPrefs.map((pref, index) => {
      if (index === categoryIndex) {
        return {
          ...pref,
          settings: {
            ...pref.settings,
            [setting]: value,
          },
        }
      }
      return pref
    })
    setNotificationPrefs(newPrefs)
  }

  const toggleAlertExpansion = (alertId: number) => {
    setExpandedAlerts((prev) => (prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]))
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
                Alerts & Notifications
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <Navigation />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-destructive">{criticalAlerts.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Critical Alerts</div>
                </div>
                <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-chart-4">{activeAlerts.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Active Alerts</div>
                </div>
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-chart-4 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-chart-3">{unacknowledgedAlerts.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Unacknowledged</div>
                </div>
                <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-chart-3 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold text-chart-2">2</div>
                  <div className="text-xs sm:text-sm text-muted-foreground truncate">Resolved Today</div>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-chart-2 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          {/* Tab Labels */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Active Alerts</span>
              <span className="sm:hidden">Active</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Alert History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Notification Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab Content */}
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-chart-4 flex-shrink-0" />
                    <span className="truncate">Active System Alerts ({activeAlerts.length})</span>
                  </CardTitle>
                  {unacknowledgedAlerts.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleAcknowledgeAllAlerts} className="bg-transparent">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Acknowledge All ({unacknowledgedAlerts.length})</span>
                      <span className="sm:hidden">Ack All</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className={`border-l-4 ${getPriorityColor(alert.priority)}`}>
                      <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                        <div className="space-y-3">
                          {/* Mobile Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
                              <div
                                className={`p-1.5 sm:p-2 rounded-lg ${getPriorityColor(alert.priority)} flex-shrink-0`}
                              >
                                {getPriorityIcon(alert.priority)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm sm:text-base truncate">{alert.title}</h4>
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                  <Badge className={`${getPriorityColor(alert.priority)} text-xs`}>
                                    {alert.priority}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs truncate max-w-[80px] sm:max-w-none">
                                    {alert.location}
                                  </Badge>
                                  {alert.acknowledged && (
                                    <Badge className="bg-chart-2/10 text-chart-2 text-xs">Acknowledged</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="sm:hidden flex-shrink-0 h-8 w-8 p-0"
                              onClick={() => toggleAlertExpansion(alert.id)}
                            >
                              {expandedAlerts.includes(alert.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          {/* Mobile Collapsible Content */}
                          <Collapsible open={expandedAlerts.includes(alert.id)} className="sm:hidden">
                            <CollapsibleContent>
                              <div className="space-y-2 pt-2 border-t">
                                <p className="text-xs text-muted-foreground">{alert.description}</p>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(alert.timestamp).toLocaleString()}
                                </div>
                                {alert.acknowledged && alert.acknowledgedAt && (
                                  <div className="text-xs text-chart-2 bg-chart-2/10 p-2 rounded">
                                    Acknowledged: {new Date(alert.acknowledgedAt).toLocaleString()}
                                    {alert.acknowledgedBy && <div>By: {alert.acknowledgedBy}</div>}
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-1">
                                  {!alert.acknowledged && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-7 bg-transparent"
                                      onClick={() => handleAcknowledgeAlert(alert.id)}
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      Ack
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-transparent"
                                    onClick={() => handleResolveAlert(alert.id)}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive text-xs h-7 bg-transparent"
                                    onClick={() => handleDeleteAlert(alert.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Desktop Layout */}
                          <div className="hidden sm:block">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(alert.timestamp).toLocaleString()}
                                </div>
                                {alert.acknowledged && alert.acknowledgedAt && (
                                  <div className="text-xs text-chart-2 bg-chart-2/10 p-2 rounded max-w-md">
                                    <div className="font-medium">
                                      Acknowledged: {new Date(alert.acknowledgedAt).toLocaleString()}
                                    </div>
                                    {alert.acknowledgedBy && <div>By: {alert.acknowledgedBy}</div>}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                {!alert.acknowledged && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent"
                                    onClick={() => handleAcknowledgeAlert(alert.id)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Acknowledge
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Resolve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive bg-transparent"
                                  onClick={() => handleDeleteAlert(alert.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert History Tab Content */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                  <span className="truncate">Alert History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="acknowledged" className="text-xs">
                      Acknowledged
                    </TabsTrigger>
                    <TabsTrigger value="resolved" className="text-xs">
                      Resolved
                    </TabsTrigger>
                    <TabsTrigger value="deleted" className="text-xs">
                      Deleted
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="space-y-2 sm:space-y-3">
                      {alertsData.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                        >
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg ${getPriorityColor(alert.priority)} flex-shrink-0 self-start sm:self-center`}
                          >
                            {getPriorityIcon(alert.priority)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-3 mb-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{alert.title}</h4>
                              <Badge className={`${getPriorityColor(alert.priority)} text-xs`}>{alert.priority}</Badge>
                              <Badge className={`${getStatusColor(alert.status)} text-xs`}>{alert.status}</Badge>
                              <Badge variant="outline" className="text-xs truncate max-w-[80px] sm:max-w-none">
                                {alert.location}
                              </Badge>
                              {alert.acknowledged && (
                                <Badge className="bg-chart-2/10 text-chart-2 text-xs">Acknowledged</Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-2">
                              {alert.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <div>Created: {new Date(alert.timestamp).toLocaleString()}</div>
                              {alert.acknowledged && alert.acknowledgedAt && (
                                <div className="text-chart-2">
                                  Acknowledged: {new Date(alert.acknowledgedAt).toLocaleString()}
                                  {alert.acknowledgedBy && ` by ${alert.acknowledgedBy}`}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="acknowledged">
                    <div className="space-y-2 sm:space-y-3">
                      {acknowledgedAlerts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No acknowledged alerts</p>
                        </div>
                      ) : (
                        acknowledgedAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg bg-chart-2/5"
                          >
                            <div
                              className={`p-1.5 sm:p-2 rounded-lg ${getPriorityColor(alert.priority)} flex-shrink-0 self-start sm:self-center`}
                            >
                              {getPriorityIcon(alert.priority)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-3 mb-1">
                                <h4 className="font-semibold text-sm sm:text-base truncate">{alert.title}</h4>
                                <Badge className={`${getPriorityColor(alert.priority)} text-xs`}>
                                  {alert.priority}
                                </Badge>
                                <Badge className="bg-chart-2/10 text-chart-2 text-xs">Acknowledged</Badge>
                                <Badge variant="outline" className="text-xs truncate max-w-[80px] sm:max-w-none">
                                  {alert.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-2">
                                {alert.description}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                <div>Created: {new Date(alert.timestamp).toLocaleString()}</div>
                                {alert.acknowledgedAt && (
                                  <div className="text-chart-2 font-medium">
                                    Acknowledged: {new Date(alert.acknowledgedAt).toLocaleString()}
                                    {alert.acknowledgedBy && ` by ${alert.acknowledgedBy}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="resolved">
                    <div className="space-y-2 sm:space-y-3">
                      {resolvedAlerts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No resolved alerts</p>
                        </div>
                      ) : (
                        resolvedAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg bg-primary/5"
                          >
                            <div
                              className={`p-1.5 sm:p-2 rounded-lg ${getPriorityColor(alert.priority)} flex-shrink-0 self-start sm:self-center opacity-60`}
                            >
                              {getPriorityIcon(alert.priority)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-3 mb-1">
                                <h4 className="font-semibold text-sm sm:text-base truncate opacity-75">
                                  {alert.title}
                                </h4>
                                <Badge className={`${getPriorityColor(alert.priority)} text-xs opacity-75`}>
                                  {alert.priority}
                                </Badge>
                                <Badge className="bg-primary/10 text-primary text-xs">Resolved</Badge>
                                <Badge variant="outline" className="text-xs truncate max-w-[80px] sm:max-w-none">
                                  {alert.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-1 line-clamp-2 opacity-75">
                                {alert.description}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                <div>Created: {new Date(alert.timestamp).toLocaleString()}</div>
                                {alert.acknowledgedAt && (
                                  <div className="text-primary font-medium">
                                    Resolved: {new Date(alert.acknowledgedAt).toLocaleString()}
                                    {alert.acknowledgedBy && ` by ${alert.acknowledgedBy}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="deleted">
                    <div className="text-center py-8 text-muted-foreground">
                      <Trash2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Deleted alerts are permanently removed</p>
                      <p className="text-xs mt-2">No deleted alerts to display</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings Tab Content */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1 flex-shrink-0" />
                  <span className="truncate">Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {notificationPrefs.map((category, index) => (
                    <div key={category.category} className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">{category.category}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      {/* Responsive Notification Settings Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pl-2 sm:pl-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${index}-inapp`}
                            checked={category.settings.inApp}
                            onCheckedChange={(checked) => updateNotificationSetting(index, "inApp", checked)}
                          />
                          <Label
                            htmlFor={`${index}-inapp`}
                            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Bell className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">In-App</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${index}-email`}
                            checked={category.settings.email}
                            onCheckedChange={(checked) => updateNotificationSetting(index, "email", checked)}
                          />
                          <Label
                            htmlFor={`${index}-email`}
                            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">Email</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${index}-push`}
                            checked={category.settings.push}
                            onCheckedChange={(checked) => updateNotificationSetting(index, "push", checked)}
                          />
                          <Label
                            htmlFor={`${index}-push`}
                            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">Push</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${index}-sound`}
                            checked={category.settings.sound}
                            onCheckedChange={(checked) => updateNotificationSetting(index, "sound", checked)}
                          />
                          <Label
                            htmlFor={`${index}-sound`}
                            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">Sound</span>
                          </Label>
                        </div>
                      </div>
                      {index < notificationPrefs.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                  <Button variant="outline" className="text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                    Reset to Defaults
                  </Button>
                  <Button className="text-xs sm:text-sm h-8 sm:h-10">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <Button variant="outline" className="justify-start text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                    <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Test All Notifications</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-xs sm:text-sm h-8 sm:h-10 bg-transparent"
                    onClick={handleAcknowledgeAllAlerts}
                  >
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Acknowledge All Alerts</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-xs sm:text-sm h-8 sm:h-10 bg-transparent">
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Clear Alert History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
