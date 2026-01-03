import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Calendar, ExternalLink } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  time: string;
  platform: "Google Meet" | "Zoom" | "Slack" | "Teams";
  tag: string;
  color: string;
  link?: string;
}

const platformIcons = {
  "Google Meet": <Video className="h-4 w-4" />,
  "Zoom": <Video className="h-4 w-4" />,
  "Slack": <MessageSquare className="h-4 w-4" />,
  "Teams": <Video className="h-4 w-4" />,
};

const platformColors = {
  "Google Meet": "text-green-600 bg-green-100",
  "Zoom": "text-blue-600 bg-blue-100",
  "Slack": "text-purple-600 bg-purple-100",
  "Teams": "text-indigo-600 bg-indigo-100",
};

interface MeetingsWidgetProps {
  meetings: Meeting[];
}

export function MeetingsWidget({ meetings }: MeetingsWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Upcoming Meetings
        </CardTitle>
        <Button variant="ghost" size="sm">
          See All
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">{meeting.title}</h4>
                <p className="text-xs text-muted-foreground">{meeting.time}</p>
              </div>
              <Badge className={meeting.color}>{meeting.tag}</Badge>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${platformColors[meeting.platform]}`}>
                {platformIcons[meeting.platform]}
                <span>{meeting.platform}</span>
              </div>
              
              {meeting.link && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  Join
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
