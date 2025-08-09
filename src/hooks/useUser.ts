'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (!user || error) {
        router.push('/signin');
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return user;
};