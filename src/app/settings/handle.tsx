import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useSettingsHandlers = () => {
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [therapist_contact, setTherapistContact] = useState("");
    const [emergency_contact, setEmergencyContact] = useState("");
    const [user, setUser] = useState<any>(null);
    const [latestEmergencyContact, setLatestEmergencyContact] = useState("");
    const [latestTherapistContact, setLatestTherapistContact] = useState("");

    const loadUserSettings = async (userId: string) => {
        const { data, error } = await supabase
            .from("userSettings")
            .select("emergency_contact, therapist_contact")
            .eq("user_id", userId)
            .single();

        if (error && error.code !== 'PGRST116') { 
            console.error("Error loading user settings:", error);
            return;
        }

        if (data) {
            setLatestEmergencyContact(data.emergency_contact || "Enter emergency contact");
            setLatestTherapistContact(data.therapist_contact || "Enter therapist contact");
        } else {
            setLatestEmergencyContact("Enter emergency contact");
            setLatestTherapistContact("Enter therapist contact");
        }
        setEmergencyContact("");
        setTherapistContact("");
    };

    const handleSaveAllSettings = async () => {
        if (!user) {
            setError("User not loaded. Cannot save.");
            return;
        }

        const { error: saveError } = await supabase
            .from("userSettings")
            .upsert({
                user_id: user.id,
                emergency_contact: emergency_contact,
                therapist_contact: therapist_contact,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

        if (saveError) {
            setError(saveError.message);
            throw saveError;
        }
    };

    return {
        error,
        setError,
        submitting,
        setSubmitting,
        therapist_contact,
        setTherapistContact,
        emergency_contact,
        setEmergencyContact,
        user,
        setUser,
        loadUserSettings,
        handleSaveAllSettings,
        latestEmergencyContact,
        latestTherapistContact,
    };
};

export default function Handle() {
    return null;
}