import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { createCommunityEvent } from "@/utils/Services/DataServices";
import { getToken } from "@/utils/Services/DataServices";
import { Event } from "@/utils/Interfaces/UserInterfaces";
import { toast } from "sonner";

interface CreateSessionModalProps {
  communityId: number;
  onSessionCreated: (session: Event) => void;
}

const CreateSessionModal = ({ communityId, onSessionCreated }: CreateSessionModalProps) => {
  const [sessionName, setSessionName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const sessionData: Partial<Event> = {
      communityId,
      eventName: sessionName,
      eventDate: new Date(`${date}T${startTime}`).toISOString(),
      eventUrl: link,
      eventDescription: "",
      eventLocation: "",
      maxParticipants: 0,
      currentParticipants: 0,
      eventIsPublic: true,
      eventIsCancelled: false,
      // eventOrganizers: [],
      // eventParticipants: [],
    };
    console.log("Sending sessionData:", sessionData);
    try {
      const token = getToken();
      const result = await createCommunityEvent(sessionData, token);
      console.log("Backend result:", result);
      const isSuccess = result.Success || result.success;
      const eventObj = result.Event || result.event;
      if (isSuccess && eventObj) {
        onSessionCreated(eventObj);
        setSessionName("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setLink("");
        localStorage.setItem("postReloadToast", JSON.stringify({
          type: "success",
          message: "Session Created!",
          description: "Your session has been created successfully!"
        }));
        window.location.reload();
      } else {
        setError(result?.Message || result?.message || "Failed to create session");
        toast.error("Error", { description: result?.Message || result?.message || "Failed to create session" });
      }
    } catch {
      setError("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          className="dark:[color-scheme:dark]"
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
          className="dark:[color-scheme:dark]"
        />
      </div>
      {/* <div className="grid gap-2">
        <Label>End Time</Label>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="dark:[color-scheme:dark]"
        />
      </div> */}
      <div className="grid gap-2">
        <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          placeholder="https://zoom.us/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>{loading ? "Creating..." : "Create Session"}</Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default CreateSessionModal;
