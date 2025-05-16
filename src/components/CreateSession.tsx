import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useState } from "react";
  import { CalendarIcon, Clock } from "lucide-react";
  
  export function CreateSessionModal() {
    const [sessionName, setSessionName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [link, setLink] = useState("");
  
    const handleSubmit = () => {
      const timeRange = `${startTime} - ${endTime}`;
      const sessionData = {
        sessionName,
        date,
        time: timeRange,
        link,
      };
      console.log("Session created:", sessionData);
      // Add your logic here to actually create the session (e.g. API call)
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full">Create Session</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a Session</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule your session.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sessionName">Session Name</Label>
              <Input
                id="sessionName"
                placeholder="Enter session name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />
            </div>
  
            <div className="grid gap-2">
              <Label htmlFor="date">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  Date
                </div>
              </Label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
  
            <div className="grid gap-2">
              <Label>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Start Time
                </div>
              </Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
  
            <div className="grid gap-2">
                
              <Label>End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
  
            <div className="grid gap-2">
              <Label htmlFor="link">Link:</Label>
              <Input
                id="link"
                placeholder="https://zoom.us/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
          <Button className="cursor-pointer" onClick={handleSubmit}>Create Session</Button>
        </DialogContent>
      </Dialog>
    );
  }
  