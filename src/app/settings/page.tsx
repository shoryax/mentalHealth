"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Shield, Palette, Heart, Globe, Database, Users, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '../../components/Header';
import { supabase } from "@/lib/supabaseClient";
import { useDarkMode } from '@/components/DarkModeProvider';

const Settings = () => {
  const [dailyReminders, setDailyReminders] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  const [therapist_contact, setTherapistContact] = useState("");
  const [emergency_contact, setEmergencyContact] = useState("");

  const handleSetEmergencyContact = async (emergency_contact: string) => {
    if (!user) {
      console.warn("User not loaded yet");
      return;
    }
    if (!emergency_contact.trim()) {
      console.warn("Emergency contact empty");
    }
    const { error: insertError } = await supabase
      .from("userSettings")
      .upsert({
        user_id: user.id,
        emergencycontact: emergency_contact.trim(),
        therapistcontact: therapist_contact.trim(),
        updated_at: new Date().toISOString()
      },)
    if (insertError) {
      console.error("Error inserting emergency contact", insertError.message);
    } else {
      console.log("Contacts saved");
    }
  }

  const settingsSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme & display preferences',
      settings: [
        { type: 'switch', label: 'Dark Mode', value: isDarkMode, onChange: () => toggleDarkMode() }
      ]
    },
    {
      id: 'profile',
      title: 'Profile & Privacy',
      icon: Shield,
      description: 'Manage your profile visibility and privacy settings',
      settings: [
        { type: 'switch', label: 'Allow Data Sharing for Research', value: true },
        { type: 'input', label: 'Emergency Contact', placeholder: 'Enter phone number', value: emergency_contact, onChange: (e: any) => setEmergencyContact(e.target.value) }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications & Reminders',
      icon: Bell,
      description: 'Control when and how you receive notifications',
      settings: [
        { type: 'switch', label: 'Daily Check-in Reminders', value: dailyReminders, onChange: setDailyReminders },
        { type: 'switch', label: 'Mood Tracking Notifications', value: true },
        { type: 'switch', label: 'Crisis Resource Alerts', value: true },
        { type: 'switch', label: 'Community Activity Updates', value: false },
        { type: 'switch', label: 'Medication Reminders', value: false }
      ]
    },
    {
      id: 'wellness',
      title: 'Wellness Preferences',
      icon: Heart,
      description: 'Personalize your mental health journey',
      settings: [
        { type: 'select', label: 'Preferred Coping Strategies', options: ['breathing', 'meditation', 'journaling', 'exercise'] },
        { type: 'input', label: 'Therapist Contact', placeholder: 'Enter therapist info', value: therapist_contact, onChange: (e: any) => setTherapistContact(e.target.value) },
        { type: 'switch', label: 'Therapy Session Reminders', value: false },
        { type: 'select', label: 'Crisis Support Level', options: ['minimal', 'moderate', 'intensive'] }
      ]
    },
    {
      id: 'location',
      title: 'Language & Location',
      icon: Globe,
      description: 'Set your language and regional preferences',
      settings: [
        { type: 'select', label: 'Language', options: ['english', 'spanish', 'french', 'german', 'chinese'] },
        { type: 'select', label: 'Timezone', options: ['UTC', 'EST', 'PST', 'CET', 'JST'] },
        { type: 'switch', label: 'Show Local Resources', value: true },
        { type: 'select', label: 'Cultural Considerations', options: ['Western', 'Eastern', 'Multicultural'] }
      ]
    },
    {
      id: 'data',
      title: 'Data & Security',
      icon: Database,
      description: 'Manage your data and account security',
      settings: [
        { type: 'switch', label: 'Two-Factor Authentication', value: false },
        { type: 'switch', label: 'Automatic Backup', value: true },
        { type: 'button', label: 'Export Personal Data', action: 'export' },
        { type: 'button', label: 'Delete Account', action: 'delete', variant: 'destructive' }
      ]
    },
  ];

  const renderSetting = (setting: any, index: number) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div key={index} className={`flex items-center justify-between py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            <Label htmlFor={`setting-${index}`} className="text-sm font-medium text-gray-400">
              {setting.label}
            </Label>
            <Switch
              id={`setting-${index}`}
              checked={setting.value}
              onCheckedChange={setting.onChange}
            />
          </div>
        );
      case 'select':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-medium mb-2 block text-gray-700">{setting.label}</Label>
            <Select defaultValue={setting.value || setting.options?.[0]}>
              <SelectTrigger className="text-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map((option: string) => (
                  <SelectItem key={option} value={option} className="text-gray-700">
                    {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'slider':
        return (
          <div key={index} className="py-4">
            <Label className="text-sm font-medium mb-2 block text-gray-700">
              {setting.label}: {setting.value[0]}px
            </Label>
            <Slider
              value={setting.value}
              onValueChange={setting.onChange}
              min={setting.min}
              max={setting.max}
              step={1}
              className="w-full bg-gray-200"
            />
          </div>
        );
      case 'input':
        return (
          <div key={index} className="py-2">
            <Label className="text-sm font-medium mb-2 block text-gray-700">{setting.label}</Label>
            <Input
              placeholder={setting.placeholder}
              className="text-gray-400"
              value={setting.value}
              onChange={setting.onChange}
            />
          </div>
        );
      case 'button':
        return (
          <div key={index} className="py-2">
            <Button
              variant={setting.variant || 'outline'}
              className={`w-full ${setting.variant === 'destructive' ? '' : 'bg-gray-400 hover:bg-gray-500 text-white'}`}
            >
              {setting.label}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className=''>
      <div className='py-14'>
        <Header />
      </div>
      <div className={`min-h-screen bg-gradient-to-br`}>
        <div className={`fix backdrop-blur-sm shadow-sm sticky top-0 z-50 ${isDarkMode ? 'bg-inherit' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}>
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>App Settings</h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customize your mental health journey</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {settingsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card key={section.id} className={`h-fit ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'} p-2 rounded-lg`}>
                          <IconComponent className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <CardTitle className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{section.title}</CardTitle>
                          <CardDescription className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {section.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {section.settings.map((setting, index) => (
                          <div key={index}>
                            {renderSetting(setting, index)}
                            {index < section.settings.length - 1 && (
                              <Separator className={`my-3 ${isDarkMode ? 'bg-gray-700' : ''}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className={`${isDarkMode ? 'border-red-500/30 bg-red-900/30' : 'border-red-200 bg-red-50/50'}`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${isDarkMode ? 'bg-red-800' : 'bg-red-100'} p-2 rounded-lg`}>
                    <Phone className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <CardTitle className={`text-lg ${isDarkMode ? 'text-red-300' : 'text-red-900'}`}>Crisis Support</CardTitle>
                    <CardDescription className={`${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                      24/7 emergency resources and contacts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className={`${isDarkMode ? 'border-red-600 text-red-400 hover:bg-red-800/40' : 'border-red-300 text-red-700 hover:bg-red-100'}`}>
                      Crisis Hotline: 988
                    </Button>
                    <Button variant="outline" className={`${isDarkMode ? 'border-red-600 text-red-400 hover:bg-red-800/40' : 'border-red-300 text-red-700 hover:bg-red-100'}`}>
                      Text HOME to 741741
                    </Button>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    If you're experiencing a mental health emergency, please contact emergency services immediately.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center pt-6">
              <Button size="lg" onClick={() => handleSetEmergencyContact(emergency_contact)} className={`px-8 ${isDarkMode ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'text-gray-700'}`}>
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;